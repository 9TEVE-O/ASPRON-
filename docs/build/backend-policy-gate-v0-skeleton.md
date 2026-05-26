# Backend policy gate v0 skeleton

## Purpose

This document designs the next backend milestone before implementation begins.

It does not implement production ASPRON. It defines a small server-owned policy-gate skeleton that can prove the same Safe Intake lifecycle without relying on browser state as the decision authority.

## Current boundary

The current Capsule 001 proof is browser-only.

Browser state is useful for demonstrating lifecycle semantics, but it is not production enforcement. A user can inspect, modify, or bypass front-end state.

Backend policy-gate v0 moves transition decisions to a server-owned state machine while preserving demo maturity boundaries.

## Non-goals

Backend policy-gate v0 must not introduce:

- real client data;
- real PII;
- hosted AI/model calls;
- external tool/API calls;
- authentication beyond a stub identity model;
- production storage of sensitive content;
- compliance claims;
- secure deletion claims;
- cryptographic receipt claims unless explicitly implemented later;
- append-only audit claims unless explicitly implemented later.

## V0 goal

V0 should prove this:

```text
frontend requests transitions
backend owns state
policy gate allows or blocks transitions
audit events are recorded as reduced metadata
receipt is generated from backend event state
post-dissolve transitions fail closed
```

## Proposed modules

| Module | Responsibility |
|---|---|
| Capsule state store | Holds server-owned capsule state for a demo run. |
| Policy gate | Allows or blocks transitions based on current state, policy version, approval, fingerprints, and dissolve state. |
| Risk/redaction service | Uses shared or ported rules to classify and redact fake/sample input. |
| Approval service | Records reviewer stub identity and binds approval to a redaction candidate fingerprint. |
| Receipt service | Generates reduced evidence only from backend-owned state and events. |
| Audit event writer | Records allowed and blocked transitions as reduced metadata. |
| Tool/provider register stub | Explicitly blocks unknown tool/model calls and records no hosted AI calls in v0. |

## V0 state model

```text
INPUT_RECEIVED
RISK_CLASSIFIED
RAW_ACCESS_BLOCKED
REDACTION_CANDIDATE_CREATED
APPROVED
AI_VISIBLE_INPUT_RELEASED
SAFE_OUTPUT_CREATED
EVIDENCE_RECEIPT_CREATED
DISSOLVED
FAILED_CLOSED
```

## Required transitions

| Request | Allowed when | Result |
|---|---|---|
| `create_capsule` | always for fake/sample input | `INPUT_RECEIVED` |
| `classify_risk` | state is `INPUT_RECEIVED` | `RISK_CLASSIFIED` |
| `attempt_raw_agent_access` | before dissolve | blocked event, `RAW_ACCESS_BLOCKED` |
| `create_redaction_candidate` | state is `RISK_CLASSIFIED` or `RAW_ACCESS_BLOCKED` | `REDACTION_CANDIDATE_CREATED` |
| `approve_candidate` | redaction candidate fingerprint matches current input fingerprint | `APPROVED` |
| `release_ai_visible_input` | state is `APPROVED` | `AI_VISIBLE_INPUT_RELEASED` |
| `create_safe_output` | state is `AI_VISIBLE_INPUT_RELEASED` | `SAFE_OUTPUT_CREATED` |
| `create_receipt` | state is `SAFE_OUTPUT_CREATED` | `EVIDENCE_RECEIPT_CREATED` |
| `dissolve_capsule` | state is `EVIDENCE_RECEIPT_CREATED` | `DISSOLVED` |

## Forbidden transitions

V0 must fail closed when a request attempts:

- raw input to model/tool;
- unreviewed input to model/tool;
- redaction candidate to model/tool before approval;
- safe output before exact AI-visible input release;
- receipt before safe output;
- export before receipt;
- any action after dissolve;
- approval after input changed;
- transition without policy version;
- transition with stale fingerprint;
- tool/model call without tool/provider register entry.

## Minimal API shape

This is a design sketch, not a final API contract.

```text
POST /capsules
POST /capsules/:id/classify-risk
POST /capsules/:id/attempt-raw-agent-access
POST /capsules/:id/redaction-candidate
POST /capsules/:id/approve
POST /capsules/:id/release-ai-visible-input
POST /capsules/:id/safe-output
POST /capsules/:id/receipt
POST /capsules/:id/dissolve
GET  /capsules/:id/status
```

## Minimal capsule record

```json
{
  "capsule_id": "string",
  "capsule_type": "ASPRON_Capsule_001_Safe_Summary_Gate",
  "policy_version": "safe-intake-policy-v0.3-demo-server",
  "state": "INPUT_RECEIVED",
  "input_fingerprint": "string",
  "redaction_candidate_fingerprint": "string or null",
  "approved_payload_fingerprint": "string or null",
  "approved": false,
  "approved_by": null,
  "approved_at": null,
  "dissolved": false,
  "created_at": "ISO-8601 timestamp",
  "updated_at": "ISO-8601 timestamp"
}
```

## Raw content handling for v0

V0 should use fake/sample data only.

For the first backend skeleton, raw content handling should be deliberately narrow:

- keep raw demo input in memory only, or use a local fake fixture;
- do not persist real raw text;
- do not persist real PII;
- do not send raw text to any external service;
- do not include raw text in audit events;
- do not include raw text in receipts;
- clear working raw/redacted/AI-visible fields after dissolve.

## Audit event shape

```json
{
  "event_id": "string",
  "capsule_id": "string",
  "timestamp": "ISO-8601 timestamp",
  "event_type": "risk.classified | agent.raw_access_attempt_blocked | approval.recorded | capsule.dissolved",
  "decision": "allowed | blocked",
  "state_before": "string",
  "state_after": "string",
  "policy_version": "string",
  "reason_code": "string or null",
  "raw_values_recorded": false,
  "details": {
    "reduced_metadata_only": true
  }
}
```

Blocked events are first-class evidence. They should be recorded, not hidden.

## Receipt shape

V0 receipt should remain reduced evidence only.

It may include:

- receipt ID;
- capsule ID;
- capsule type;
- policy version;
- event sequence summary;
- detected risk field labels;
- approval state;
- reviewer stub ID;
- input fingerprint;
- approved-payload fingerprint;
- safe-output summary metadata;
- dissolve timestamp;
- integrity flags set to false unless actually implemented.

It must not include by default:

- raw input text;
- raw sensitive values;
- full redaction candidate;
- full AI-visible payload;
- private narrative text;
- prompt-injection text.

## Tool/provider register stub

V0 should include a register even if no tools are allowed.

Default register:

```json
{
  "registered_tools": [],
  "hosted_model_calls_allowed": false,
  "unknown_tools_fail_closed": true
}
```

Any attempted model/tool call should produce a blocked event unless a future design explicitly registers that tool and limits input to approved redacted payloads.

## Acceptance criteria

Backend policy-gate v0 is acceptable only if:

- [ ] state transitions are backend-owned;
- [ ] raw access attempt fails closed and records a blocked event;
- [ ] summary/safe output before approval is blocked;
- [ ] approval is bound to the current redaction candidate fingerprint;
- [ ] changed input invalidates derived state;
- [ ] receipt generation requires safe output first;
- [ ] post-dissolve transitions fail closed;
- [ ] default receipt excludes raw and full payload fields;
- [ ] integrity flags remain false unless signing/storage are actually implemented;
- [ ] no hosted AI/model calls are introduced;
- [ ] no real sensitive data is used;
- [ ] tests cover positive and negative transition paths.

## Test plan

Minimum tests:

```text
create capsule -> classify -> redact -> approve -> release AI-visible input -> safe output -> receipt -> dissolve
raw access attempt returns blocked event
safe output before approval fails closed
approval after input change fails closed
receipt before safe output fails closed
action after dissolve fails closed
receipt does not include raw input/full payload/private narrative
unknown tool/model call fails closed
```

## Recommended implementation sequence

1. Add backend skeleton with in-memory fake/sample capsule store.
2. Port or share risk/redaction rules.
3. Implement state transition guard.
4. Implement reduced audit events.
5. Implement reduced receipt generation.
6. Add fail-closed tests.
7. Add a narrow browser/client adapter only after backend tests pass.
8. Keep hosted AI/model/tool calls blocked.

## Decision gate

Do not implement this until reviewers accept:

- the state model;
- forbidden transitions;
- receipt boundary;
- no-real-data rule;
- no-hosted-AI rule;
- non-claim language.

## Safe maturity wording

If v0 is implemented, safe wording remains:

```text
server-owned demo policy-gate skeleton
backend-controlled proof of lifecycle transitions
demo-stage reduced evidence receipt
not production security, compliance, deletion, or cryptographic integrity
```