# ASPRON demo checklist

Use this checklist before every ASPRON Safe Intake Capsule walkthrough.

## Pre-demo setup

- [ ] Open `index.html` in a modern browser.
- [ ] Confirm the page title says `ASPRON Safe Intake Capsule`.
- [ ] Confirm the fake intake record is visible.
- [ ] Confirm the fake record contains sample data only.
- [ ] Confirm no real client, family, medical, financial, legal, or account data is pasted into the demo.
- [ ] Confirm the evidence log starts with `capsule.created`.
- [ ] Confirm the bunny mark is visible in the hero area.
- [ ] Keep `docs/demo/demo-script.md` open as speaker support.

## Boundary statement

Before demonstrating, say:

> This is a browser-only prototype. It demonstrates workflow mechanics only. It is not production privacy, security, legal compliance, secure deletion, or production PII detection.

- [ ] Boundary statement said out loud.
- [ ] Audience understands this is a proof-of-concept.

## Walkthrough sequence

### 1. Detect risk

- [ ] Click `1. Detect risk`.
- [ ] Risk fields are shown.
- [ ] Output states raw input remains blocked from AI-visible path.
- [ ] Audit log records `risk.detected`.

### 2. Simulate raw agent access

- [ ] Click `2. Simulate raw agent access`.
- [ ] Output shows `BLOCKED BY POLICY GATE`.
- [ ] Audit log records `agent.raw_access_attempt_blocked`.
- [ ] Explain fail-closed rule.

### 3. Create redacted copy

- [ ] Click `3. Create redacted copy`.
- [ ] Redacted copy appears.
- [ ] Sensitive fields are replaced with tokens.
- [ ] Copy is still pending approval.
- [ ] Audit log records `redaction.generated`.

### 4. Approve safe version

- [ ] Click `4. Approve safe version`.
- [ ] Output shows approved safe version.
- [ ] Audit log records `approval.recorded`.
- [ ] Explain human review gate.

### 5. Show AI-visible payload

- [ ] Click `5. Show AI-visible payload`.
- [ ] Exact AI-visible payload appears.
- [ ] Confirm raw input is not the AI-visible payload.
- [ ] Audit log records `ai_visible_payload.recorded`.

### 6. Generate evidence receipt

- [ ] Click `6. Generate evidence receipt`.
- [ ] Receipt JSON appears.
- [ ] Receipt contains capsule ID.
- [ ] Receipt contains policy version.
- [ ] Receipt contains detected risk fields.
- [ ] Receipt records human approval.
- [ ] Receipt does not intentionally preserve raw sensitive values.
- [ ] Audit log records `receipt.generated`.

### 7. Dissolve capsule

- [ ] Click `7. Dissolve capsule`.
- [ ] Capsule state changes to `DISSOLVED`.
- [ ] Working controls are disabled.
- [ ] Evidence remains.
- [ ] Bunny appears.
- [ ] Audit log records `capsule.dissolved`.

## Proof points to verify live

- [ ] Raw input is not AI-visible by default.
- [ ] A simulated raw-agent access attempt is blocked.
- [ ] Redaction is not treated as approval.
- [ ] Human approval is required before AI-visible payload.
- [ ] Evidence survives after dissolve.
- [ ] Active workflow capability is disabled after dissolve.

## Things not to say

- [ ] Do not say ASPRON is compliant.
- [ ] Do not say ASPRON is secure by default.
- [ ] Do not say ASPRON performs secure deletion.
- [ ] Do not say ASPRON is production-ready.
- [ ] Do not say the regex detector is production PII detection.
- [ ] Do not say the browser receipt is tamper-proof.
- [ ] Do not say hosted AI integrations are already safely enforced.

## After-demo notes

Record answers to these questions after each walkthrough:

1. Did the audience understand the raw-versus-AI-visible distinction?
2. Did the fail-closed moment land clearly?
3. Did anyone confuse demo proof with compliance?
4. Did the evidence receipt feel useful or too technical?
5. What part of the capsule lifecycle needs clearer UI language?
6. What next build task was requested most often?

## Demo pass condition

The demo passes if all of these are true:

- [ ] workflow completed in correct order
- [ ] raw access block was shown
- [ ] approved redacted payload was shown
- [ ] evidence receipt was generated
- [ ] capsule dissolved
- [ ] no production/compliance overclaim was made
