# Drive 06_ASPRON_ACTIONS index

## Purpose

This file is the GitHub-side index for the Google Drive folder `06_ASPRON_ACTIONS/`.

The Drive folder should point back to this repository as the build canon for ASPRON.

## Source-of-truth rule

| Layer | Canonical source |
|---|---|
| Build/prototype implementation | GitHub repo `9TEVE-O/ASPRON-` |
| Demo script/checklist | GitHub `docs/demo/` |
| Product specs | GitHub `docs/product-spec/` |
| Evidence schema | GitHub `docs/product-spec/evidence-receipt-schema.md` |
| Privacy/security controls | GitHub `docs/privacy-governance/` and `docs/security-risk/` |
| Claims/truth governance | Google Drive `AI Audits of Me` control docs |

## Files to link from Drive `06_ASPRON_ACTIONS/`

| Drive entry title | GitHub file |
|---|---|
| ASPRON Repo Build Canon | `README.md` |
| ASPRON Browser Prototype | `index.html` |
| ASPRON Demo Script | `docs/demo/demo-script.md` |
| ASPRON Demo Checklist | `docs/demo/demo-checklist.md` |
| ASPRON Demo Boundary and Claims | `docs/product-spec/demo-boundary-and-claims.md` |
| ASPRON Capsule Lifecycle | `docs/product-spec/capsule-lifecycle.md` |
| ASPRON Evidence Receipt Schema | `docs/product-spec/evidence-receipt-schema.md` |
| ASPRON Receipt Integrity Design | `docs/product-spec/receipt-integrity-design.md` |
| ASPRON Safe Intake Flow | `docs/product-spec/aspron-safe-intake-flow.md` |
| ASPRON Safe Intake Bridge | `docs/product-spec/safe-intake-aspron-bridge.md` |
| ASPRON Privacy Control Map | `docs/privacy-governance/privacy-control-map.md` |
| ASPRON Threat Model | `docs/security-risk/threat-model.md` |
| ASPRON Test Fixtures | `tests/fixtures/safe-intake-fixtures.json` |
| ASPRON Lifecycle / Fail-Closed Tests | `tests/lifecycle-fail-closed.test.js` |

## Recommended Drive document body

Paste the following into a Google Doc inside `06_ASPRON_ACTIONS/` if direct folder writing is unavailable:

```markdown
# ASPRON_ACTIONS — GitHub Build Links and Bridge Index

Status: action index
Purpose: Connect the Drive ASPRON action folder to the GitHub ASPRON build canon.

## Canonical build repo

GitHub repo: 9TEVE-O/ASPRON-

## Build canon

- README.md — repo overview and demo boundary
- index.html — browser-only ASPRON Safe Intake Capsule prototype
- docs/demo/demo-script.md — live walkthrough script
- docs/demo/demo-checklist.md — pre-demo and live-demo checklist
- docs/product-spec/demo-boundary-and-claims.md — safe/unsafe claims
- docs/product-spec/capsule-lifecycle.md — canonical lifecycle
- docs/product-spec/evidence-receipt-schema.md — evidence receipt schema
- docs/product-spec/receipt-integrity-design.md — receipt integrity design and demo/production boundary
- docs/product-spec/aspron-safe-intake-flow.md — Safe Intake capsule flow
- docs/product-spec/safe-intake-aspron-bridge.md — Safe Intake ↔ ASPRON relationship
- docs/privacy-governance/privacy-control-map.md — privacy controls
- docs/security-risk/threat-model.md — threat model
- tests/fixtures/safe-intake-fixtures.json — safe sample fixtures
- tests/lifecycle-fail-closed.test.js — lifecycle/fail-closed tests

## Source-of-truth rule

GitHub is the build canon.
Drive remains the claim-control and governance canon.

## Safe Intake relationship

Safe Intake is the controlled intake pipeline.
ASPRON is the dissolvable capsule pattern that wraps and demonstrates that pipeline.

## Claim boundary

Do not claim ASPRON is production-ready, compliant, secure by default, certified, or customer-proven.
Use: browser-only proof-of-concept / governed workflow pattern / demo-stage capsule.
```

## Manual Drive placement checklist

- [ ] Create or open Drive folder `06_ASPRON_ACTIONS/`.
- [ ] Add a Google Doc titled `ASPRON_ACTIONS — GitHub Build Links and Bridge Index`.
- [ ] Paste the recommended body above.
- [ ] Add direct GitHub links for each repo file.
- [ ] Keep Drive governance docs separate from GitHub build docs.
- [ ] Update the Drive Document Index to mention the GitHub repo as ASPRON build canon.

## Maintenance rule

When a new ASPRON build file is added to GitHub, update this index and the Drive folder index.
