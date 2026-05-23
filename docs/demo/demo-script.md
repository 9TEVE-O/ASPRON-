# ASPRON demo script

## Purpose

Use this script for a short live walkthrough of the ASPRON Safe Intake Capsule 001 prototype.

The goal is not to claim production privacy, security, or legal compliance. The goal is to show the controlled sequence:

```text
raw input
→ risk classification
→ raw agent access blocked
→ redacted working copy
→ human approval
→ exact AI-visible input
→ safe summary
→ demo reduced evidence receipt
→ capsule dissolved
→ lifecycle controls locked
```

## Audience promise

By the end of the demo, the audience should understand one thing:

> ASPRON separates risky raw input from approved AI-visible input, preserves reduced evidence, and dissolves the temporary working interface.

## 0. Opening line

"ASPRON is a dissolvable application pattern. Instead of leaving a permanent app surface open, it creates a temporary capsule for one bounded task, records what happened, then dissolves the working capability while keeping reduced evidence."

## 1. Set the boundary

Say this before clicking anything:

"This is a browser-only prototype. It proves the workflow mechanics only. It is not production privacy, security, legal compliance, secure deletion, cryptographic receipt integrity, or production PII detection."

Point to the visible boundary text in the demo UI if needed.

## 2. Show the fake intake record

Point out that the demo uses sample/fake data only.

Say:

"The capsule starts with a mock sensitive intake record. The raw text is inside the controlled workspace, but it is not automatically AI-visible."

## 3. Click: 1. Classify risk

Expected proof point:

- risk fields are identified
- raw input remains blocked from the AI-visible path
- the audit log records the event without preserving raw values

Say:

"The first control is classification. ASPRON has to know whether the input is risky before anything can become AI-visible."

## 4. Click: 2. Attempt raw AI access

Expected proof point:

- the simulated agent is blocked
- the UI clearly shows the fail-closed behaviour

Say:

"This is the core rule. Raw, unreviewed, unsafe, or unapproved content cannot enter AI processing, retrieval, summarisation, export, indexing, or hosted model calls."

## 5. Click: 3. Create redacted copy

Expected proof point:

- a safer working copy is created
- sensitive fields are replaced with redaction tokens
- the copy is still not approved yet

Say:

"Redaction alone is not enough. The redacted copy becomes a candidate, not an automatic output."

## 6. Click: 4. Human approve

Expected proof point:

- human approval is recorded
- approved redacted text becomes eligible for AI-visible use

Say:

"The human review step is the gate between redaction and AI visibility."

## 7. Click: 5. Display exact AI input

Expected proof point:

- the audience sees exactly what the AI would receive
- the raw record is not used as the AI-visible payload

Say:

"This is the most important product moment. The system shows the exact AI-visible input, so there is no hidden ambiguity about what the AI is allowed to see."

## 8. Click: 6. Create safe summary

Expected proof point:

- the summary is created only after the exact AI-visible input exists
- the summary is based on the approved redacted copy only

Say:

"The summary is not generated from the raw record. It is generated only after the approved AI-visible input is explicit."

## 9. Click: 7. Export audit JSON

Expected proof point:

- the Audit JSON panel shows a visible receipt boundary
- the readable receipt summary appears above the raw JSON
- the receipt records demo reduced evidence only
- raw sensitive values and the full AI-visible payload are not retained in the receipt

Point to the receipt boundary and summary panel.

Say:

"The receipt is demo reduced evidence only. It is not signed, not append-only, not production-verifiable, and not cryptographic integrity. The capsule can disappear, but the accountability structure survives without turning the receipt into a privacy leak."

Then point to the summary values:

```text
Receipt maturity: demo_reduced_evidence_only
Signed: false
Append-only: false
Production-verifiable: false
Raw values recorded: false
Raw input recorded: false
Full AI payload recorded: false
```

## 10. Click: 8. Dissolve

Expected proof point:

- capsule state changes to `DISSOLVED`
- working controls visually lock
- evidence remains visible
- the output states that lifecycle controls are locked

Say:

"This is the dissolvable application moment: destroy the capability, preserve the accountability. After dissolve, the lifecycle controls are locked."

## 11. Close with the product sentence

Use this exact close:

"One bounded task. Private data controlled. Safe version approved. Evidence retained. Capsule dissolved."

## Questions to expect

### Is this production-ready?

No. It is a front-end prototype that proves workflow semantics. Production needs server-side enforcement, durable logging, identity, retention controls, stronger detection, and legal/security review.

### Is this a privacy or compliance product?

Not yet. It is a privacy-aware workflow control demo. It must not be described as compliant, certified, secure, or production-ready.

### Is the receipt cryptographic proof?

No. The receipt is demo reduced evidence only. It is not signed, not append-only, not production-verifiable, and not cryptographic integrity.

### What makes ASPRON different from a normal app?

A normal app tends to persist as a general-purpose surface. ASPRON is framed as a temporary policy-bound capability that performs one bounded task, preserves reduced evidence, and dissolves.

### What is Safe Intake in this context?

Safe Intake is the control pipeline. ASPRON is the dissolvable capsule pattern that wraps and demonstrates that pipeline.

## Demo success criteria

The demo succeeds if the audience can repeat these five points:

1. raw input is not AI-visible by default
2. approval is required before AI-visible output
3. the receipt is demo reduced evidence only
4. evidence survives the workflow
5. the active capsule dissolves and lifecycle controls lock after the task
