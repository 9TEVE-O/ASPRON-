# Safe Intake ↔ ASPRON bridge

## Purpose

This note keeps the relationship between Safe Intake and ASPRON clear.

Safe Intake and ASPRON overlap by design, but they should not be blurred into one vague product.

## Short version

> Safe Intake is the controlled intake pipeline. ASPRON is the dissolvable capsule pattern that wraps, proves and presents that pipeline.

## Safe Intake role

Safe Intake is the workflow/control layer.

It answers:

- What happens to risky input before AI use?
- How is sensitivity detected?
- What must be redacted?
- What requires human review?
- What is approved?
- What is blocked?
- What evidence is logged?
- What is allowed to become AI-visible?

Safe Intake pipeline:

```text
raw or restricted input
→ source/intake record
→ risk classification
→ redaction candidate
→ human review
→ approved AI-safe copy
→ controlled AI use
→ audit/evidence trail
```

## ASPRON role

ASPRON is the product/interface/capability pattern.

It answers:

- How does a temporary capability appear only for one bounded task?
- How does the workflow make policy gates visible?
- How does the user see the exact AI-visible payload?
- How does the system preserve accountability after the work is done?
- How does the active interface dissolve?

ASPRON capsule lifecycle:

```text
create capsule
→ receive bounded input
→ classify risk
→ generate redaction candidate
→ review and approve
→ create AI-visible copy
→ generate evidence receipt
→ dissolve active interface
→ retain accountability record
```

## Product mapping

| Safe Intake concept | ASPRON expression |
|---|---|
| Intake record | Capsule input workspace |
| Risk classification | Risk detection step |
| Raw input restriction | Raw agent access block |
| Redaction candidate | Redacted working copy |
| Human review | Approval gate |
| Approved AI-safe copy | Exact AI-visible payload |
| Audit log | Evidence trail |
| Export/report | Evidence receipt |
| Workflow close | Capsule dissolve |

## What overlaps

The overlapping asset set includes:

- risk detection
- redaction
- human approval
- approved AI-visible payload
- audit/evidence logging
- fail-closed behaviour
- privacy/control framing
- no raw unreviewed content entering AI systems

This overlap is useful. It means ASPRON has a concrete first capsule: Safe Intake.

## What should remain separate

| Keep separate | Reason |
|---|---|
| Safe Intake claims | Safe Intake may become one workflow/product line. |
| ASPRON claims | ASPRON is broader: a dissolvable application/capsule pattern. |
| Compliance language | Neither should claim compliance without review. |
| Production maturity | Demo-stage proof is not production enforcement. |
| Customer/client claims | Do not imply deployment or clients without evidence. |

## Recommended wording

Use:

> ASPRON's first proof demonstrates a Safe Intake Capsule: a temporary, policy-bound workflow that turns risky raw input into an approved AI-visible copy, preserves evidence, and dissolves the working interface.

Avoid:

> ASPRON is a compliant Safe Intake platform.

Avoid:

> Safe Intake and ASPRON are the same thing.

## Current demo interpretation

The current `index.html` demo is best described as:

> ASPRON Safe Intake Capsule v0.1 — a browser-only proof that demonstrates the control sequence between risky input and approved AI-visible output.

## Design rule

When adding future features, ask two questions:

1. Is this a Safe Intake pipeline feature?
2. Is this an ASPRON capsule/lifecycle feature?

If it is both, document both roles. If it is only one, do not force it into the other.

## Next bridge tasks

- Add a diagram showing Safe Intake pipeline nested inside ASPRON capsule lifecycle.
- Link Drive `06_ASPRON_ACTIONS/` to the GitHub build canon.
- Add demo fixtures for Safe Intake scenarios.
- Add tests proving raw input cannot become AI-visible without review.
- Add future backend design for server-side policy enforcement.
