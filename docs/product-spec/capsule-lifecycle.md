# ASPRON capsule lifecycle

## What this is

The canonical lifecycle for the ASPRON demonstration and future production architecture.

## Lifecycle

```text
Create capsule
→ receive bounded input
→ classify risk
→ generate redaction candidate
→ review and approve
→ create AI-visible copy
→ generate evidence receipt
→ dissolve active interface
→ retain accountability record
```

## State model

| State | Meaning | Allowed next state |
|---|---|---|
| Ready | Capsule exists but has no approved input. | Input received |
| Input received | Raw text exists inside controlled workspace. | Risk classified |
| Risk classified | System has detected configured risk classes. | Redaction candidate |
| Redaction candidate | Safer candidate text exists but is not yet approved. | Approved or rejected |
| Approved | Human/user has approved the AI-visible version. | AI-visible output |
| AI-visible output | Output was generated from approved redacted text only. | Evidence receipt |
| Evidence receipt | Proof record has been generated. | Dissolved |
| Dissolved | Active capability is disabled. Evidence remains. | Archived/restarted as new capsule |

## Product rules

- Raw input cannot be used as AI-visible input.
- Redaction candidate cannot become output until approved.
- Evidence receipt cannot be generated before an approved output exists.
- Dissolve disables the active workflow surface.
- A new task requires a new capsule.

## Demo boundary

The current browser demo proves the sequence and interaction model only. It does not yet prove secure storage, secure deletion, identity management, cryptographic evidence integrity, server-side enforcement or regulatory compliance.
