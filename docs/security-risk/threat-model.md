# ASPRON threat model

## What this is

A first-pass risk model for the ASPRON proof demo and production direction.

## Core threat statement

ASPRON is handling potentially sensitive user input before that input reaches AI systems. The danger is not only bad output. The danger is uncontrolled input exposure, hidden disclosure, poor retention, weak review gates and false confidence.

## Threat categories

| Threat | Current demo status | Production requirement |
|---|---|---|
| Raw personal information exposed to AI | Demo blocks by workflow only | Enforce server-side policy gates |
| Weak PII/sensitive-data detection | Regex demo only | Use layered detection plus human review |
| Evidence receipt leaks sensitive data | Possible if poorly designed | Hash/summarise; avoid raw content in receipts |
| User assumes compliance | README warns against this | Strong UI warnings and legal review |
| Malicious prompt/input | Not handled | Input sanitisation and model/tool boundaries |
| Third-party tool leakage | No external calls in demo | Tool register and processor assessment |
| Identity misuse | No auth in demo | Authentication, role permissions, audit identity |
| Tampered audit trail | Browser-only log is not durable | Append-only signed audit trail |
| False dissolve | Interface hides but data may remain | Clear deletion/retention semantics |
| Cross-border processing | Not applicable in local demo | Data residency and transfer assessment |

## Security posture

The correct posture is controlled demonstration, not autonomous trust.

ASPRON should be described as:

> a governed workflow pattern for reducing uncontrolled AI exposure.

Not as:

> a security product that guarantees privacy.

## Fundamental future controls

- Server-side enforcement.
- Role-based approval.
- Durable audit logging.
- Cryptographic receipt integrity.
- Configurable retention rules.
- Explicit third-party processor register.
- Production PII/sensitive information detection.
- Human review for high-risk documents.
- Incident/export logs.
- Fail-closed policy engine.
