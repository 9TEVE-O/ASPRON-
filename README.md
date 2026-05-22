# ASPRON

**The interface dissolves. The effect remains. The evidence survives.**

ASPRON is a dissolvable application proof-of-concept: a temporary workflow capsule that performs one bounded task, visualizes a policy boundary, then dissolves the working capability while preserving reduced evidence.

This repository contains a browser-only prototype for the **ASPRON Safe Intake Capsule**.

## Canonical proof capsule

The current canonical proof route is:

```text
02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/
```

Use this route when reviewing the current ASPRON proof.

The root demo is useful background, but Capsule 001 is the current proof capsule for the fail-closed Safe Summary Gate sequence.

## Current execution gate

Backend implementation is intentionally blocked until these planning gates are complete:

1. P0 triage review for stale or ambiguous blockers.
2. Browser-only claim-boundary hardening.
3. Backend policy gate architecture.
4. Receipt integrity design.
5. Canonical demo route decision.

See:

- [`docs/reviews/p0-triage-review.md`](docs/reviews/p0-triage-review.md)
- [`docs/build/backend-policy-gate-architecture.md`](docs/build/backend-policy-gate-architecture.md)
- [`docs/product-spec/receipt-integrity-design.md`](docs/product-spec/receipt-integrity-design.md)
- [`docs/product-spec/aspron-safe-intake-flow.md`](docs/product-spec/aspron-safe-intake-flow.md)

## What this prototype proves

The prototype demonstrates a controlled intake pipeline for an agentic future:

1. A mock sensitive intake record enters a temporary capsule.
2. The system detects risky fields.
3. A simulated agent attempts to access the raw input.
4. The policy gate visibly blocks raw access before approval.
5. A redacted working copy is created.
6. A human review step approves the safe version.
7. Only the approved redacted copy becomes AI-visible.
8. The prototype shows exactly what the AI or agent would see.
9. An evidence receipt is generated.
10. The capsule dissolves its working capability while retaining reduced evidence.

Core rule:

> No raw, unreviewed, unsafe, or unapproved content may enter AI processing, retrieval, summarisation, export, indexing, or hosted model calls.

## Product sentence

**One bounded task. Private data controlled. Safe version approved. Evidence retained. Capsule dissolved.**

## Run it

Open the canonical Capsule 001 demo in any modern browser:

```text
02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/index.html
```

No install. No backend. No external dependencies are required for the browser demo.

## Run tests

Run the dependency-free lifecycle and fail-closed test runners with:

```bash
node tests/lifecycle-fail-closed.test.js
node tests/capsule-001-safe-summary-gate.test.js
```

The test suite checks that:

- raw agent access fails closed
- redaction candidate is not automatically AI-visible
- approval is required before AI-visible output
- exact AI-visible input is required before summary
- evidence receipt does not intentionally preserve raw sensitive values or full approved narrative
- capsule lifecycle reaches the dissolved state

GitHub Actions also runs these commands through `.github/workflows/test.yml` on pushes and pull requests to `main`.

## Documentation map

| Area | File |
|---|---|
| P0 triage review | [`docs/reviews/p0-triage-review.md`](docs/reviews/p0-triage-review.md) |
| Backend policy gate architecture | [`docs/build/backend-policy-gate-architecture.md`](docs/build/backend-policy-gate-architecture.md) |
| Receipt integrity design | [`docs/product-spec/receipt-integrity-design.md`](docs/product-spec/receipt-integrity-design.md) |
| ASPRON Safe Intake flow | [`docs/product-spec/aspron-safe-intake-flow.md`](docs/product-spec/aspron-safe-intake-flow.md) |
| Demo walkthrough | [`docs/demo/demo-script.md`](docs/demo/demo-script.md) |
| Demo checklist | [`docs/demo/demo-checklist.md`](docs/demo/demo-checklist.md) |
| Demo boundary and claims | [`docs/product-spec/demo-boundary-and-claims.md`](docs/product-spec/demo-boundary-and-claims.md) |
| Capsule lifecycle | [`docs/product-spec/capsule-lifecycle.md`](docs/product-spec/capsule-lifecycle.md) |
| Evidence receipt schema | [`docs/product-spec/evidence-receipt-schema.md`](docs/product-spec/evidence-receipt-schema.md) |
| Safe Intake ↔ ASPRON bridge | [`docs/product-spec/safe-intake-aspron-bridge.md`](docs/product-spec/safe-intake-aspron-bridge.md) |
| Privacy control map | [`docs/privacy-governance/privacy-control-map.md`](docs/privacy-governance/privacy-control-map.md) |
| Threat model | [`docs/security-risk/threat-model.md`](docs/security-risk/threat-model.md) |
| Drive action index | [`docs/drive/06-ASPRON-ACTIONS-index.md`](docs/drive/06-ASPRON-ACTIONS-index.md) |
| Test fixtures | [`tests/fixtures/safe-intake-fixtures.json`](tests/fixtures/safe-intake-fixtures.json) |
| Lifecycle/fail-closed tests | [`tests/lifecycle-fail-closed.test.js`](tests/lifecycle-fail-closed.test.js) |
| Capsule 001 tests | [`tests/capsule-001-safe-summary-gate.test.js`](tests/capsule-001-safe-summary-gate.test.js) |

## Safe Intake relationship

Safe Intake is the controlled intake pipeline:

```text
raw or restricted input
→ risk classification
→ redaction candidate
→ human review
→ approved AI-safe copy
→ evidence trail
```

ASPRON is the dissolvable capsule pattern that wraps and demonstrates that pipeline.

## Demo boundary

This is a **front-end prototype**, not a production privacy, security, or compliance system.

The browser demo visualizes the policy lifecycle. It does not provide production enforcement.

Production ASPRON requires backend-owned state, server-side policy gates, approval identity, audit logging, receipt generation, and tool/provider access control.

It demonstrates product mechanics only:

- visible workflow state
- risk detection using simple local patterns
- blocked raw agent access
- redacted AI-visible input path
- manual approval gate
- exact AI-visible payload
- evidence receipt
- disabled workflow controls after dissolve

It does **not** provide production-grade PII detection, secure storage, authentication, encrypted audit logging, access control, server-side policy enforcement, legal compliance, cryptographic receipt integrity, or true data destruction.

Do not claim ASPRON is production-ready, compliant, certified, secure by default, tamper-proof, regulator-approved, or customer-proven unless separate evidence exists and the wording is explicitly approved.

## Data handling principle

The prototype uses fake/sample data only.

The evidence receipt should retain reduced evidence only: field types, risk categories, actions, approval state, summaries, fingerprints, and event metadata.

It should not preserve raw sensitive values, full raw input, the full redaction candidate, or the full AI-visible payload by default.

## ASPRON principle

**Destroy the capability. Preserve the accountability.**