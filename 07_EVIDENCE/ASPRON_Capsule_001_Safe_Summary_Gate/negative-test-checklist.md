# Capsule 001 negative test checklist

## Must fail closed

| Case | Expected result |
|---|---|
| Raw agent access before approval | Blocked; no raw value returned |
| Summary before redaction | Blocked |
| Summary after redaction but before approval | Blocked |
| Summary after approval but before exact AI-visible input display | Blocked |
| Raw input edited after redaction | Approval, AI-visible input, summary, and receipt invalidated |
| Receipt generated before summary | Blocked |
| Dissolve before receipt | Blocked |
| Any capability use after dissolve | Blocked |
| Audit receipt export | Raw text, raw values, redaction candidate, and full AI-visible input excluded |

## Positive control

The only allowed summary path is:

```text
classify risk
→ raw access attempt blocked
→ create redaction candidate
→ human approve
→ display exact AI-visible input
→ create safe summary
→ create evidence receipt
→ dissolve
```

## Manual review notes

- Use fake/sample data only.
- Do not paste real client, medical, legal, employment, account, family, or confidential material into the demo.
- Do not describe this as compliant, secure, certified, or production-ready.
