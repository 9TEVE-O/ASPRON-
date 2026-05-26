# P0 triage review

## Purpose

This file records the current P0 status before any new ASPRON implementation work begins.

The goal is to remove stale blocker language, preserve the decisions already made, and keep the backend path gated until the next design contract is accepted.

## Current decision

The original P0 blockers have been resolved for the browser proof package.

Backend implementation remains blocked until the backend policy-gate v0 skeleton is reviewed and accepted.

## Status summary

| Item | Current status | Decision |
|---|---|---|
| #7 Risk-rule alignment | Closed as completed | Shared browser and Node rule source is now `lib/aspron-risk-rules.js`. |
| #8 Receipt payload retention | Closed as completed | Default receipts retain reduced evidence only and do not preserve raw or full AI-visible payloads. |
| #9 UI-only enforcement boundary | Closed as completed for demo boundary hardening | The demo now states browser-only enforcement limits and points to backend policy-gate architecture. |

## #7 Risk-rule alignment

**Decision:** Closed as completed for the browser proof.

### Current read

Issue #7 reported that the browser prototype and tests did not share the same risk-detection rules, creating a false-confidence risk.

The current code uses `lib/aspron-risk-rules.js` as the shared browser and Node-compatible risk-rule source.

The shared rule list includes:

- `name`
- `date_of_birth`
- `phone`
- `email`
- `address`
- `medicare_number`
- `private_reason`
- `client_marker`
- `private_marker`
- `prompt_injection_instruction`

### Evidence now in repo

- Capsule 001 imports the shared risk-rule source.
- The root browser demo imports the shared risk-rule source.
- Tests import the same shared risk-rule source.
- Fixtures are checked against the shared supported label list.

### Follow-up rule

If future risk labels are added, add them to `lib/aspron-risk-rules.js` first, then update fixtures, browser surfaces, and tests from that shared source.

## #8 Receipt payload retention

**Decision:** Closed as completed for default demo receipt privacy.

### Current read

Issue #8 reported that the browser receipt preserved the full `ai_visible_payload`, creating a second privacy surface.

Current receipt behaviour retains only summary/fingerprint evidence by default and does not intentionally retain raw values, the full redaction candidate, or the full AI-visible payload.

### Evidence now in repo

- Receipt output sets `ai_visible_payload_retained` to `false`.
- Receipt output uses `summary_and_demo_fingerprint_only` retention.
- Receipt output avoids `ai_visible_payload`, `ai_visible_input`, `raw_text`, `raw_input`, and `redaction_candidate` fields by default.
- Tests assert that raw values and private narrative are not preserved in receipt output.

### Follow-up rule

Future work on signing, append-only storage, and verification belongs under receipt integrity design. Do not reopen this as a privacy-retention bug unless the receipt again preserves full/raw content by default.

## #9 UI-only enforcement boundary

**Decision:** Closed as completed for browser-demo boundary hardening.

### Current read

Issue #9 was the core claim-boundary blocker.

The current demo still visualizes policy behaviour through browser state and JavaScript functions. That is acceptable for the proof capsule, provided it is never described as production enforcement.

### Evidence now in repo

- Capsule 001 UI states the demo is local/browser-only and not production enforcement.
- Front-end policy code comments state the browser state machine is proof logic, not production security.
- README states production ASPRON requires backend-owned state, server-side policy gates, approval identity, audit logging, receipt generation, and tool/provider access control.
- `docs/build/backend-policy-gate-architecture.md` defines the production enforcement direction.

### Follow-up rule

Backend work must start from the backend policy-gate architecture and the v0 skeleton design. Do not add hosted AI calls, external tools, real client data, real PII, database persistence, auth, or compliance claims as part of the browser proof.

## Remaining gates before backend implementation

Backend implementation should not begin until these gates are accepted:

- [ ] Backend policy-gate v0 skeleton reviewed.
- [ ] State transition contract accepted.
- [ ] Receipt privacy boundary retained.
- [ ] Receipt integrity non-claims retained.
- [ ] Tool/provider register requirement retained.
- [ ] Human approval identity model defined at least for demo/server skeleton maturity.
- [ ] No real sensitive data, hosted AI calls, or production claims introduced.

## Exit criteria

- [x] #7 has a recorded decision.
- [x] #8 has a recorded decision.
- [x] #9 has a recorded decision for browser-demo boundary hardening.
- [x] No stale P0 remains unexplained.
- [ ] Backend v0 skeleton has been reviewed and accepted before any backend implementation begins.

## Stop condition

Do not start backend implementation until the backend policy-gate v0 skeleton is reviewed and accepted.

Do not describe the current browser demo as production enforcement, legal compliance, secure deletion, cryptographic proof, or production-grade privacy/security.