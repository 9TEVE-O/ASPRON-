# Backend policy gate architecture

## Purpose

This document defines the backend enforcement architecture required before ASPRON can move beyond a browser-only proof capsule.

The browser demo visualizes the policy lifecycle. Production ASPRON must enforce the lifecycle server-side, with backend-owned state, identity, audit, receipt generation, and tool access control.

## Current demo boundary

The current ASPRON Capsule 001 demo is a front-end proof. It demonstrates:

- risk classification
- raw-access blocking
- redaction candidate creation
- human approval
- exact AI-visible input display
- safe summary generation from approved redacted input
- reduced evidence receipt creation
- dissolve behavior

It does not provide production enforcement.

Browser state can be inspected, modified, or bypassed. Therefore, browser gating must be treated as lifecycle visualization only.

## Backend-owned state machine

Production ASPRON requires backend-owned capsule state.

Initial state model:

```text
INPUT_RECEIVED
RISK_CLASSIFIED
RAW_ACCESS_BLOCKED
REDACTION_CANDIDATE_CREATED
HUMAN_REVIEW_REQUIRED
APPROVED
AI_VISIBLE_INPUT_RELEASED
SAFE_OUTPUT_CREATED
EVIDENCE_RECEIPT_CREATED
DISSOLVED
FAILED_CLOSED
```

The frontend may request transitions. The backend owns transition decisions.

## Core enforcement rule

```text
Frontend requests transitions.
Backend owns transitions.
Policy gate decides transitions.
Audit records transitions.
Receipt summarizes transitions.
Dissolve terminates capability.
```

## Policy gate rules

The backend policy gate must block any transition that violates capsule sequence, policy version, approval identity, retention boundary, or tool/provider registration.

### Forbidden transitions

```text
Raw input -> model/tool
Unreviewed input -> model/tool
Redaction candidate -> model/tool before approval
Approval flag -> summary without exact AI-visible input release
Receipt generation before safe output
Export before receipt
Any action after dissolve
Any action with stale input fingerprint
Any tool/model call without tool/provider register entry
Any transition without policy version
```

### Fail-closed principle

When state, identity, policy, receipt service, or tool registry status is uncertain, the backend must block the transition and record a failed-gate event.

## Approval identity model

Approvals must be scoped to one capsule run and one redaction candidate fingerprint.

```json
{
  "reviewer_id": "string",
  "reviewer_role": "human_reviewer | admin | delegated_reviewer",
  "approved_at": "ISO-8601 timestamp",
  "approval_scope": "single_capsule_run",
  "approval_subject_fingerprint": "fingerprint of redaction candidate",
  "policy_version": "string"
}
```

Approval must fail closed when:

- reviewer identity is missing
- reviewer role is not authorized
- approval subject fingerprint is stale
- policy version is missing
- capsule has dissolved

## Receipt service responsibilities

The receipt service must generate reduced evidence from backend events, not from browser state.

Receipt service responsibilities:

- assign receipt ID
- record capsule ID
- record policy version
- record event sequence
- record failed gates
- record approval metadata
- record risk labels
- record approved-payload fingerprint
- record tool/provider register snapshot
- record dissolve timestamp when applicable
- exclude raw text and full payloads by default

The receipt service must not retain by default:

- raw input text
- raw sensitive values
- full redaction candidate
- full AI-visible payload
- private narrative text
- prompt-injection text

## Audit event model

Every allowed or blocked transition should emit an event.

Minimum event shape:

```json
{
  "event_id": "string",
  "capsule_id": "string",
  "timestamp": "ISO-8601 timestamp",
  "event_type": "string",
  "decision": "allowed | blocked",
  "state_before": "string",
  "state_after": "string",
  "policy_version": "string",
  "raw_values_recorded": false,
  "details": "reduced string or structured metadata"
}
```

Blocked events are first-class evidence. They should be recorded, not hidden.

## Tool/provider register

Every model or tool interaction must be registered before execution.

```json
{
  "tool_name": "string",
  "provider": "string",
  "purpose": "string",
  "input_class": "approved_redacted_only",
  "raw_input_sent": false,
  "policy_gate_decision": "allowed | blocked",
  "receipt_event_id": "string"
}
```

Unknown tools fail closed.

## Retention and dissolve semantics

Dissolve means the working capability is revoked.

In the current demo, dissolve clears working fields inside the active capsule object. In production, dissolve must be backed by backend-owned state, retention policy, access control, and auditable evidence.

Production dissolve should:

- prevent future transitions
- prevent future tool/model calls
- prevent future raw access
- retain reduced receipt evidence
- retain event metadata required for accountability
- avoid claiming secure deletion unless separately implemented and evidenced

## Fail-closed behavior

The backend must block:

| Condition | Result |
|---|---|
| Missing policy version | Block transition |
| Missing approval | Block AI-visible input and summary |
| Stale redaction candidate | Block approval and summary |
| Unknown tool/provider | Block tool call |
| Receipt service unavailable | Block export |
| Dissolved capsule accessed | Block all transitions |
| Reviewer identity unavailable | Block approval |
| Audit event write fails | Block transition or mark system unsafe |
| State mismatch | Block transition |

## Non-claims

This architecture document does not claim ASPRON is:

- production-ready
- compliant
- certified
- secure by default
- tamper-proof
- regulator-approved
- capable of secure deletion
- proven in customer production environments

## Future production path

Minimum production path:

1. Backend-owned state machine.
2. Policy gate service.
3. Approval identity service.
4. Append-only event log.
5. Receipt service.
6. Tool/provider register.
7. Receipt integrity and signing.
8. Controlled frontend that only requests backend transitions.

Backend implementation is blocked until this architecture has been reviewed and accepted.