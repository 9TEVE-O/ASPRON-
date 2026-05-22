# ASPRON Capsule 001 — Safe Summary Gate

This production-route demo hardens the Safe Intake prototype into a client-ready proof capsule.

## Hard rule

Raw, unreviewed, or unapproved content must never enter AI processing, retrieval, summarisation, export, indexing, or hosted model calls.

## Required sequence

```text
INPUT_RECEIVED
→ RISK_CLASSIFIED
→ RAW_ACCESS_BLOCKED
→ REDACTION_CANDIDATE
→ APPROVED
→ AI_VISIBLE_INPUT_READY
→ SAFE_SUMMARY_READY
→ EVIDENCE_RECEIPT_READY
→ DISSOLVED
```

## Fail-closed behaviours

- Raw AI attempt is visibly blocked.
- Summary before approval is blocked.
- Approval alone is not enough; the exact AI-visible input must be displayed first.
- Raw input edits invalidate redaction, approval, exact AI-visible input, summary, and receipt state.
- Dissolve revokes capability while preserving reduced audit evidence.

## Boundary

Browser-only demo. Not production security, privacy, compliance, storage, deletion, or legal assurance.
