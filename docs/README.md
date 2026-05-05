# ASPRON documentation spine

This folder connects the current ASPRON proof demo to the privacy, evidence, security, research and build material developed in conversation.

ASPRON is being treated here as a governed dissolvable-application pattern:

> create a temporary capability, perform one bounded job, preserve the proof, then dissolve the working interface.

## Folder map

| Folder | Purpose |
|---|---|
| `conversation-map/` | Connects the source texts and prior conversation concepts into one design ledger. |
| `product-spec/` | Defines the capsule lifecycle, state machine, evidence receipt and demo scope. |
| `privacy-governance/` | Translates privacy-policy patterns into product controls. |
| `security-risk/` | Captures the current threat model and safety boundaries. |
| `research-notes/` | Connects agent/research papers to ASPRON design choices. |
| `demo/` | Script, checklist and setup material for the next live demonstration. |
| `build/` | Build order, implementation backlog and production-readiness path. |

## Current status

The repository currently contains a browser-only demo in `index.html`. The documents in this folder make the demo explainable, auditable and easier to extend without drifting into unsupported compliance claims.

## Non-negotiable product principles

- Raw input and AI-visible input must remain separate.
- Sensitive information must be classified before AI processing.
- Redaction must be reviewable before approval.
- Evidence must survive after the interface dissolves.
- The demo must not claim production privacy, security or legal compliance.
- Every future integration needs a tool/data register.
- The system should fail closed when risk is uncertain.
