# ASPRON Capsule 001 rules — Safe Summary Gate

## Capsule purpose

Perform one bounded task: create a safe summary only after sensitive intake has been risk-classified, redacted, human-approved, and displayed as exact AI-visible input.

## Non-negotiable rules

1. Raw, unreviewed, or unapproved content must never enter AI.
2. Summary before approval must be blocked.
3. Approval alone is not enough; exact AI-visible input must be displayed before summary.
4. Raw AI attempt must be visibly blocked and logged.
5. Redacted copy must be created before approval.
6. Human approval must be recorded before AI-visible input is created.
7. Audit JSON must be exportable as reduced evidence.
8. Dissolve must revoke capability.
9. Audit evidence must remain after dissolve.
10. Negative tests must prove fail-closed behaviour.

## Dissolve rule

Destroy the working capability. Preserve the accountability.

After dissolve, the capsule must clear working raw text, redaction candidate, AI-visible input, and risk state from the active capsule object while retaining the reduced receipt.

## Evidence boundary

The receipt may retain fingerprints, summaries, event names, event timestamps, state transitions, risk field labels, and reviewer metadata.

The receipt must not retain raw text, raw sensitive values, the redaction candidate, or the full AI-visible input.

## Claims boundary

This demo must not be described as production-ready, compliant, certified, secure by default, tamper-proof, regulator-approved, legally sufficient, or customer-proven without separate evidence.
