# ASPRON demo boundary and claims

## Purpose

This document defines what can and cannot be claimed about the current ASPRON Safe Intake Capsule prototype.

Use this file before writing README copy, pitch copy, LinkedIn/Substack posts, demo narration, grant material, investor material, or client-facing explanations.

## Current status

ASPRON is currently a browser-only proof-of-concept demonstrating a dissolvable application pattern.

The current prototype demonstrates:

- a temporary capsule interface
- fake/sample sensitive intake data
- simple local risk detection
- raw-agent access blocking by workflow logic
- redacted working copy generation
- manual approval gate
- exact AI-visible payload display
- evidence receipt generation
- disabled working controls after dissolve

## Safe primary claim

> ASPRON demonstrates a temporary, policy-bound workflow capsule that controls risky input before AI visibility, preserves evidence, and dissolves the working interface.

## Safe short claim

> One bounded task. Private data controlled. Evidence retained. Capsule dissolved.

## Safe technical description

ASPRON is a front-end prototype of a governed workflow pattern. It separates raw input from AI-visible approved input, requires review before the approved version becomes AI-visible, records evidence of the workflow, and then disables the active capsule interface.

## Safe claims

It is safe to say:

- ASPRON is a proof-of-concept.
- ASPRON is a browser-only prototype today.
- ASPRON demonstrates a dissolvable application pattern.
- ASPRON demonstrates temporary policy-bound workflow capsules.
- ASPRON shows a controlled Safe Intake flow.
- ASPRON separates raw input from approved AI-visible input.
- ASPRON shows a fail-closed raw-agent access block in the demo workflow.
- ASPRON generates an evidence receipt in the demo.
- ASPRON makes the AI-visible payload explicit.
- ASPRON disables workflow controls after dissolve.
- ASPRON uses fake/sample data in the demo.
- ASPRON is not production-ready yet.

## Unsafe claims

Do not say:

- ASPRON is production-ready.
- ASPRON is legally compliant.
- ASPRON is certified.
- ASPRON is secure by default.
- ASPRON guarantees privacy.
- ASPRON guarantees safe AI use.
- ASPRON performs secure deletion.
- ASPRON has production-grade PII detection.
- ASPRON has production access control.
- ASPRON has encrypted or tamper-proof audit logs.
- ASPRON has server-side policy enforcement.
- ASPRON has real hosted model isolation.
- ASPRON has regulator approval.
- ASPRON has paying customers.
- ASPRON is a standard or protocol.

## Risky phrases to avoid

Avoid these unless future evidence supports them:

| Risky phrase | Safer replacement |
|---|---|
| compliant | privacy-aware / governance-aware |
| secure | controlled / policy-gated |
| deletes data | dissolves the working interface |
| guarantees privacy | reduces uncontrolled AI exposure |
| production AI safety | demo workflow safety boundary |
| automated compliance | visible control workflow |
| prevents data leaks | demonstrates raw-input blocking |
| tamper-proof audit | evidence receipt / draft receipt |

## Demo boundary statement

Use this exact boundary line in demos:

> This is a browser-only prototype. It demonstrates workflow mechanics only. It is not production privacy, security, legal compliance, secure deletion, or production PII detection.

## Evidence boundary

The current receipt is a demonstrator receipt. It is useful for showing accountability structure, but it is not yet a signed, durable, append-only, cryptographically verifiable audit record.

Future evidence hardening may include:

- receipt IDs
- policy version hashes
- approved-payload hashes
- append-only storage
- reviewer identity
- cryptographic signing
- exportable JSON / Markdown / PDF reports

## Privacy boundary

The prototype should use fake/sample data only.

Do not paste real personal, client, medical, financial, legal, family, employment, account, or confidential data into the browser demo.

## AI boundary

The current prototype does not call a hosted AI model.

That is intentional. Hosted model/tool integrations should not be added until the project has:

- server-side policy enforcement
- tool/data register
- AI-visible-only payload enforcement
- approval identity
- audit logging
- provider/data-flow documentation

## Safe Intake relationship

Safe Intake is the workflow pipeline:

```text
raw/restricted input
→ risk detection
→ redaction candidate
→ human review
→ approved AI-safe copy
→ evidence trail
```

ASPRON is the dissolvable capsule pattern that wraps and demonstrates that pipeline.

Do not blur them into one vague product.

## Public copy rule

Every public claim should pass three questions:

1. Is this proven by the current demo or docs?
2. Could a reader mistake this for production/compliance/security maturity?
3. Does the wording preserve the difference between raw input, redacted candidate, approved AI-visible payload, evidence receipt, and dissolved interface?

If the answer is uncertain, use narrower wording.
