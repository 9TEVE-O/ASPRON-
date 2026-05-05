# Privacy governance control map

## What this is

A practical translation of privacy-policy patterns into ASPRON product controls.

## Source pattern

The OAIC privacy policy text provided in conversation uses a clear lifecycle:

```text
collection
→ use
→ disclosure
→ storage
→ security
→ access/correction
→ destruction/de-identification
→ complaints
```

Global CBPR program requirements add a broader accountability checklist:

```text
notice
→ collection limitation
→ use limitation
→ choice
→ integrity
→ safeguards
→ access/correction
→ accountability
```

## ASPRON translation

| Privacy pattern | ASPRON control |
|---|---|
| Notice | Tell the user what the capsule will do before input is submitted. |
| Collection limitation | Ask only for task-specific input. Do not invite broad uploads by default. |
| Purpose statement | Show why the input is needed and what output will be produced. |
| Sensitive information | Detect and escalate sensitive categories before AI use. |
| Use limitation | Use approved redacted input only for AI-visible output. |
| Disclosure | List any external tools or services in the receipt/tool register. |
| Overseas processing | Mark any provider that may process data outside Australia. |
| Security safeguards | Separate raw, redacted, approved and evidence states. |
| Access/correction | Allow user/reviewer to inspect and correct redaction before approval. |
| Destruction/de-identification | Dissolve active workspace and retain only justified evidence. |
| Accountability | Generate receipt and audit trail for each capsule run. |

## Minimum privacy UX requirements

- Show a pre-input warning for personal/sensitive information.
- Mark raw input as blocked from AI use.
- Make redaction visible and editable before approval.
- Make the AI-visible version visibly different from the raw version.
- Show a receipt after output generation.
- Explain what survives after dissolve.

## Legal-position guardrail

ASPRON may say:

> This demo demonstrates privacy-aware workflow controls.

ASPRON must not yet say:

> This system is legally compliant, certified, secure, or production-ready.
