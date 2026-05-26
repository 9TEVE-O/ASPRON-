# ASPRON quickstart

## What this repo is

ASPRON is a browser-only proof-of-concept for a dissolvable application capsule.

The current proof demonstrates a Safe Intake Capsule: a temporary, policy-bound workflow that controls risky raw input before AI visibility, records reduced evidence, and dissolves the working interface.

Core line:

```text
The interface dissolves. The effect remains. The evidence survives.
```

## Read this first

Start with these files, in this order:

| Step | File | Why |
|---|---|---|
| 1 | `README.md` | Repo overview, canonical proof route, boundaries, test commands. |
| 2 | `docs/product-spec/demo-boundary-and-claims.md` | Safe and unsafe public claims. |
| 3 | `docs/demo/demo-script.md` | Live walkthrough script. |
| 4 | `docs/demo/demo-checklist.md` | Pre-demo and live-demo proof checklist. |
| 5 | `docs/product-spec/safe-intake-aspron-bridge.md` | Keeps Safe Intake and ASPRON roles separate. |
| 6 | `docs/build/backend-policy-gate-architecture.md` | Future backend enforcement direction. |
| 7 | `docs/build/backend-policy-gate-v0-skeleton.md` | Next backend design skeleton before implementation. |

## Canonical demo

Open this file in a modern browser:

```text
02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/index.html
```

This is the canonical proof capsule.

The root `index.html` is useful background, but Capsule 001 is the current proof for the Safe Summary Gate lifecycle.

## Demo sequence

Run the Capsule 001 demo in this order:

```text
1. Classify risk
2. Attempt raw AI access
3. Create redacted copy
4. Human approve
5. Display exact AI input
6. Create safe summary
7. Export audit JSON
8. Dissolve
```

The proof is the sequence, not any single screen.

## What the demo proves

The browser proof demonstrates:

- risky input can be classified before AI visibility;
- simulated raw agent access is visibly blocked;
- redaction creates a candidate, not an automatic output;
- human approval is required before AI-visible input;
- the exact AI-visible input is displayed before summary;
- the safe summary is created from approved redacted input only;
- the receipt retains reduced evidence only;
- the working capsule controls lock after dissolve.

## What the demo does not prove

Do not claim the browser proof provides:

- production enforcement;
- legal compliance;
- certification;
- secure deletion;
- cryptographic receipt integrity;
- append-only audit storage;
- production PII or sensitive-data detection;
- real hosted AI isolation;
- customer-proven deployment;
- regulator approval.

Safe wording:

```text
browser-only proof-of-concept
front-end workflow prototype
demo-stage governed workflow capsule
privacy-aware control pattern
```

## Data rule

Use fake/sample data only.

Do not paste real client, family, medical, financial, legal, employment, account, confidential, or personally sensitive records into the demo.

## Safe Intake versus ASPRON

Safe Intake is the controlled intake pipeline:

```text
raw or restricted input
→ risk classification
→ redaction candidate
→ human review
→ approved AI-safe copy
→ evidence trail
```

ASPRON is the dissolvable capsule pattern around that pipeline:

```text
create capsule
→ perform one bounded task
→ enforce visible gates
→ preserve reduced evidence
→ dissolve working capability
```

Do not blur them into one vague product.

## Run tests

From the repo root:

```bash
node tests/lifecycle-fail-closed.test.js
node tests/capsule-001-safe-summary-gate.test.js
node tests/receipt-integrity-boundary.test.js
node tests/capsule-001-receipt-boundary.test.js
node tests/capsule-001-ui-boundary.test.js
```

GitHub Actions runs the same suite on pushes and pull requests to `main`.

## Current implementation map

| Area | File |
|---|---|
| Canonical demo UI | `02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/index.html` |
| Capsule 001 policy state machine | `02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/capsule-001-policy.js` |
| Shared risk rules and receipt generator | `lib/aspron-risk-rules.js` |
| Test fixtures | `tests/fixtures/safe-intake-fixtures.json` |
| CI workflow | `.github/workflows/test.yml` |

## Work pattern

Use this repo as the build canon.

Use planning spaces, Drive, or ChatGPT for thinking and review, but move stable artefacts into GitHub as docs, issues, tests, or implementation changes.

Preferred flow:

1. Shape the task.
2. Check claim boundaries.
3. Make the smallest durable change.
4. Run relevant tests.
5. Open a PR with clear acceptance criteria.
6. Do not strengthen claims unless the implementation actually supports them.

## Next serious build direction

The next technical milestone is not hosted AI integration.

The next technical milestone is a backend policy-gate v0 skeleton that owns state transitions server-side while preserving the current demo boundaries:

- no real PII;
- no real client data;
- no hosted model calls;
- no external tool calls;
- no production compliance/security claims.

See:

```text
docs/build/backend-policy-gate-v0-skeleton.md
```

## Stop conditions

Stop and reassess if a change:

- sends raw or unapproved input to an AI/model/tool path;
- stores raw values in receipts by default;
- weakens the approval gate;
- hides the exact AI-visible input;
- claims production security, compliance, deletion, or cryptographic proof;
- introduces real sensitive data;
- adds hosted AI calls before server-side policy enforcement exists.