# ASPRON demo checklist

Use this checklist before every ASPRON Safe Intake Capsule 001 walkthrough.

## Pre-demo setup

- [ ] Open `02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/index.html` in a modern browser.
- [ ] Confirm the page title says `Safe Summary Gate`.
- [ ] Confirm the fake intake record is visible.
- [ ] Confirm the fake record contains sample data only.
- [ ] Confirm no real client, family, medical, financial, legal, employment, account, or confidential data is pasted into the demo.
- [ ] Confirm the Audit events panel starts with a capsule creation event.
- [ ] Confirm the Audit JSON panel shows the visible receipt boundary.
- [ ] Confirm the receipt summary initially says `Receipt summary not exported yet.`
- [ ] Keep `docs/demo/demo-script.md` open as speaker support.

## Boundary statement

Before demonstrating, say:

> This is a browser-only prototype. It demonstrates workflow mechanics only. It is not production privacy, security, legal compliance, secure deletion, cryptographic receipt integrity, or production PII detection.

- [ ] Boundary statement said out loud.
- [ ] Audience understands this is a proof-of-concept.
- [ ] Audience understands the receipt is demo reduced evidence only.

## Walkthrough sequence

### 1. Classify risk

- [ ] Click `1. Classify risk`.
- [ ] Risk fields are shown.
- [ ] Raw input remains blocked from the AI-visible path.
- [ ] Audit log records the classification event without raw values.

### 2. Attempt raw AI access

- [ ] Click `2. Attempt raw AI access`.
- [ ] Output shows the raw access attempt was blocked.
- [ ] Audit log records `agent.raw_access_attempt_blocked`.
- [ ] Explain the fail-closed rule.

### 3. Create redacted copy

- [ ] Click `3. Create redacted copy`.
- [ ] Redacted copy appears.
- [ ] Sensitive fields are replaced with tokens.
- [ ] Copy is still pending human approval.
- [ ] Explain that redaction is not automatic approval.

### 4. Human approve

- [ ] Click `4. Human approve`.
- [ ] Output confirms approval was recorded.
- [ ] Summary is still blocked until exact AI-visible input is displayed.
- [ ] Explain human review gate.

### 5. Display exact AI input

- [ ] Click `5. Display exact AI input`.
- [ ] Exact AI-visible input appears.
- [ ] Confirm raw input is not the AI-visible payload.
- [ ] Explain that this removes ambiguity about what AI may see.

### 6. Create safe summary

- [ ] Click `6. Create safe summary`.
- [ ] Safe summary appears.
- [ ] Confirm summary follows exact AI-visible input.
- [ ] Explain that summary is not generated from the raw record.

### 7. Export audit JSON

- [ ] Click `7. Export audit JSON`.
- [ ] Audit JSON appears.
- [ ] Receipt boundary is visible in the Audit JSON panel.
- [ ] Receipt summary appears above raw JSON.
- [ ] Receipt summary shows `Receipt maturity: demo_reduced_evidence_only`.
- [ ] Receipt summary shows `Signed: false`.
- [ ] Receipt summary shows `Append-only: false`.
- [ ] Receipt summary shows `Production-verifiable: false`.
- [ ] Receipt summary shows `Raw values recorded: false`.
- [ ] Receipt summary shows `Raw input recorded: false`.
- [ ] Receipt summary shows `Full AI payload recorded: false`.
- [ ] Receipt JSON contains capsule ID.
- [ ] Receipt JSON contains policy version.
- [ ] Receipt JSON contains detected risk fields.
- [ ] Receipt JSON records human approval.
- [ ] Receipt JSON does not intentionally preserve raw sensitive values.
- [ ] Explain the receipt is demo reduced evidence only, not cryptographic proof.

### 8. Dissolve

- [ ] Click `8. Dissolve`.
- [ ] Capsule state changes to `DISSOLVED`.
- [ ] Working lifecycle controls are disabled or visually locked.
- [ ] Evidence remains visible.
- [ ] Output says lifecycle controls are locked.
- [ ] Audit log records the dissolve event.

## Proof points to verify live

- [ ] Raw input is not AI-visible by default.
- [ ] A simulated raw-agent access attempt is blocked.
- [ ] Redaction is not treated as approval.
- [ ] Human approval is required before AI-visible payload.
- [ ] Safe summary follows exact AI-visible input.
- [ ] Receipt boundary is visible in the UI.
- [ ] Receipt summary shows non-production integrity flags.
- [ ] Evidence survives after dissolve.
- [ ] Active workflow capability is disabled after dissolve.

## Things not to say

- [ ] Do not say ASPRON is compliant.
- [ ] Do not say ASPRON is secure by default.
- [ ] Do not say ASPRON performs secure deletion.
- [ ] Do not say ASPRON is production-ready.
- [ ] Do not say the local detector is production PII detection.
- [ ] Do not say the browser receipt is tamper-proof.
- [ ] Do not say the browser receipt is cryptographic proof.
- [ ] Do not say the receipt is production-verifiable.
- [ ] Do not say hosted AI integrations are already safely enforced.

## After-demo notes

Record answers to these questions after each walkthrough:

1. Did the audience understand the raw-versus-AI-visible distinction?
2. Did the fail-closed moment land clearly?
3. Did anyone confuse demo proof with compliance?
4. Did the reduced evidence receipt feel useful or too technical?
5. Did the receipt summary make the non-production boundary clear?
6. Did the locked controls make the dissolve moment clear?
7. What next build task was requested most often?

## Demo pass condition

The demo passes if all of these are true:

- [ ] workflow completed in correct order
- [ ] raw access block was shown
- [ ] approved redacted payload was shown as exact AI-visible input
- [ ] safe summary was created after exact AI-visible input
- [ ] demo reduced evidence receipt was generated
- [ ] receipt summary showed non-production integrity flags
- [ ] capsule dissolved
- [ ] lifecycle controls locked after dissolve
- [ ] no production/compliance/security overclaim was made
