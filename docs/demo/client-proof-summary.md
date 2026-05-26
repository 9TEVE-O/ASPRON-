# ASPRON client proof summary

## Purpose

Use this summary when explaining the current ASPRON Safe Intake Capsule proof to a buyer, adviser, partner, reviewer, or internal stakeholder.

This is a client-readable proof note. It is not a legal, security, compliance, or production-readiness claim.

## One-line explanation

ASPRON demonstrates a temporary, policy-bound Safe Intake Capsule that controls risky raw input before AI visibility, preserves reduced evidence, and dissolves the working interface.

## What was tested

The current Capsule 001 proof tests this sequence:

```text
raw input
→ risk classification
→ raw agent access blocked
→ redacted working copy
→ human approval
→ exact AI-visible input
→ safe summary
→ demo reduced evidence receipt
→ capsule dissolved
→ lifecycle controls locked
```

The test is about control flow:

- raw input is not treated as AI-visible by default;
- risky fields are detected using simple local demo rules;
- an attempted raw-agent access path is visibly blocked;
- a redacted candidate is created;
- human approval is required before AI-visible input;
- the exact AI-visible input is shown before summary;
- a safe summary is created from the approved redacted copy only;
- a reduced evidence receipt is generated;
- the working capsule controls lock after dissolve.

## What was blocked

The proof blocks or prevents these unsafe workflow paths:

| Unsafe path | Current proof behaviour |
|---|---|
| Raw input to AI-visible output | Blocked by the demo policy sequence. |
| Summary before approval | Blocked by Capsule 001 state machine. |
| Approval without exact AI-visible input display | Not enough to create a summary. |
| Changed raw input after redaction/approval | Derived state is invalidated. |
| Receipt before safe summary | Blocked by state sequence. |
| Action after dissolve | Blocked because the capsule has dissolved. |
| Full raw values in default receipt | Not retained by design. |
| Full AI-visible payload in default receipt | Not retained by design. |

## Evidence artefacts

The proof package includes:

| Artefact | Location |
|---|---|
| Canonical browser demo | `02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/index.html` |
| Capsule state machine | `02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/capsule-001-policy.js` |
| Shared risk rules and receipt generator | `lib/aspron-risk-rules.js` |
| Demo script | `docs/demo/demo-script.md` |
| Demo checklist | `docs/demo/demo-checklist.md` |
| Demo boundary and claims | `docs/product-spec/demo-boundary-and-claims.md` |
| Evidence receipt schema | `docs/product-spec/evidence-receipt-schema.md` |
| Receipt integrity design | `docs/product-spec/receipt-integrity-design.md` |
| Threat model | `docs/security-risk/threat-model.md` |
| Fail-closed tests | `tests/` |
| CI workflow | `.github/workflows/test.yml` |

## What a client can safely infer

A client can safely infer that the current proof demonstrates:

- a clear workflow distinction between raw input and AI-visible input;
- a visible fail-closed moment for raw access;
- review before AI visibility;
- evidence of workflow sequence;
- reduced receipt design that avoids retaining raw/full payload content by default;
- a dissolvable interface pattern for one bounded task;
- a sensible architecture direction for future backend enforcement.

## What a client must not infer

A client must not infer that the current browser proof is:

- production-ready;
- legally compliant;
- certified;
- secure by default;
- tamper-proof;
- regulator-approved;
- customer-proven;
- production-grade PII detection;
- hosted model isolation;
- secure deletion;
- cryptographic receipt integrity;
- durable append-only audit storage.

## Known limitations

The current proof has deliberate limits:

- browser-only state can be inspected, modified, or bypassed;
- risk detection uses simple local patterns;
- there is no authentication or reviewer identity system;
- there is no backend-owned state machine;
- there is no durable audit log;
- there is no cryptographic signing;
- there is no append-only storage;
- there are no real hosted AI/model calls;
- there are no external tool/provider integrations;
- dissolve means working interface/capability revocation in the demo, not proven secure deletion.

## Safe demo wording

Use:

> This is a browser-only proof-of-concept. It demonstrates workflow mechanics only. It is not production privacy, security, legal compliance, secure deletion, cryptographic receipt integrity, or production PII detection.

Use:

> ASPRON separates risky raw input from approved AI-visible input, preserves reduced evidence, and dissolves the temporary working interface.

Use:

> The receipt proves the demo sequence, not production security, compliance, or deletion.

## Do not say

Do not say:

- ASPRON guarantees privacy.
- ASPRON is compliant.
- ASPRON is secure by default.
- ASPRON deletes data securely.
- ASPRON has production-grade PII detection.
- ASPRON produces tamper-proof audit receipts.
- ASPRON already enforces hosted AI isolation.
- ASPRON is ready for real client records.

## Buyer-relevant value

The value of the proof is not that it solves all privacy/security requirements today.

The value is that it shows a controlled operating pattern:

```text
before AI sees anything risky,
force classification,
force redaction,
force review,
show the exact AI-visible input,
record reduced evidence,
then dissolve the working capability.
```

That is the first credible proof for Safe Intake.

## Next proof milestone

The next milestone should be a backend policy-gate v0 skeleton that moves lifecycle decisions out of browser-only state and into server-owned transition control.

That milestone should still avoid:

- real client data;
- real PII;
- hosted AI calls;
- external tool calls;
- production security/compliance claims.