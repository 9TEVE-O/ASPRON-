# P0 triage review

## Purpose

This review removes stale or ambiguous blocker noise before any new ASPRON implementation work begins.

The project may proceed only after each open P0 is either closed, re-scoped, or explicitly kept open with a documented next action.

## Council decision

Backend implementation remains blocked until this review is completed.

## #7 Risk-rule alignment

**Decision:** Review before closing or re-scoping.

### Current read

Issue #7 reported that the browser prototype and tests did not share the same risk-detection rules, creating a false-confidence risk.

The current code now uses `lib/aspron-risk-rules.js` as a shared browser and Node-compatible risk-rule source. The shared rule list includes:

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

### Evidence to check

- Browser demo imports the shared risk-rule source.
- Capsule 001 imports the shared risk-rule source.
- Tests import the same shared risk-rule source.
- Fixtures do not expect labels that are absent from the shared source.

### Remaining work

- Confirm the tests pass against the shared rule source.
- Confirm the browser demo no longer has a separate hard-coded risk list.
- Close #7 if fully satisfied.
- Re-scope #7 if only documentation or additional coverage remains.

## #8 Receipt payload retention

**Decision:** Review before closing or re-scoping.

### Current read

Issue #8 reported that the browser receipt preserved the full `ai_visible_payload`, creating a second privacy surface.

Current receipt behavior should retain only summary/fingerprint evidence by default and should not retain raw values, the full redaction candidate, or the full AI-visible payload.

### Evidence to check

- Receipt output sets `ai_visible_payload_retained` to `false`.
- Receipt output uses `summary_and_demo_fingerprint_only` retention.
- Receipt output does not include an `ai_visible_payload`, `ai_visible_input`, `raw_text`, `raw_input`, or `redaction_candidate` field.
- Tests prove that raw values and private narrative are not preserved in receipt output.

### Remaining work

- Confirm the tests pass.
- Confirm the audit schema rejects raw/full-payload fields.
- Close #8 if fully satisfied.
- Re-scope #8 to receipt-integrity design if privacy retention is solved but signing/storage design remains.

## #9 UI-only enforcement boundary

**Decision:** Keep active.

### Current read

Issue #9 remains the core claim-boundary blocker.

The current demo visualizes policy behavior through browser state and JavaScript functions. That is useful for a proof capsule, but it must not be described as production enforcement.

### Next action

Complete claim-boundary hardening and backend architecture documentation before backend implementation begins.

Required work:

- Add explicit UI copy stating enforcement is simulated locally.
- Add code comments above front-end state/event handlers saying browser state is not security enforcement.
- Add `docs/build/backend-policy-gate-architecture.md`.
- Add docs explaining production must fail closed server-side.

## Exit criteria

- [ ] #7 has a recorded decision: close, re-scope, or keep open.
- [ ] #8 has a recorded decision: close, re-scope, or keep open.
- [ ] #9 remains active as the claim-boundary blocker until its acceptance criteria are satisfied.
- [ ] No stale P0 remains unexplained.

## Stop condition

Do not start backend implementation until this review is complete.