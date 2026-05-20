# ASPRON demo script

## Purpose

Use this script for a short live walkthrough of the ASPRON Safe Intake Capsule prototype.

The goal is not to claim production privacy, security, or legal compliance. The goal is to show the controlled sequence:

```text
raw input
→ risk detection
→ raw agent access blocked
→ redacted working copy
→ human approval
→ AI-visible payload
→ evidence receipt
→ capsule dissolved
```

## Audience promise

By the end of the demo, the audience should understand one thing:

> ASPRON separates risky raw input from approved AI-visible input, preserves evidence, and dissolves the temporary working interface.

## 0. Opening line

"ASPRON is a dissolvable application pattern. Instead of leaving a permanent app surface open, it creates a temporary capsule for one bounded task, records what happened, then dissolves the working capability while keeping the evidence."

## 1. Set the boundary

Say this before clicking anything:

"This is a browser-only prototype. It proves the workflow mechanics only. It is not production security, legal compliance, secure deletion, or production PII detection."

Point to the demo boundary in the README if needed.

## 2. Show the fake intake record

Point out that the demo uses sample/fake data only.

Say:

"The capsule starts with a mock sensitive intake record. The raw text is inside the controlled workspace, but it is not automatically AI-visible."

## 3. Click: Detect risk

Expected proof point:

- risk fields are identified
- raw input remains blocked from the AI-visible path
- the audit log records the event without preserving raw values

Say:

"The first control is classification. ASPRON has to know whether the input is risky before anything can become AI-visible."

## 4. Click: Simulate raw agent access

Expected proof point:

- the simulated agent is blocked
- the UI clearly shows the fail-closed behaviour

Say:

"This is the core rule. Raw, unreviewed, unsafe, or unapproved content cannot enter AI processing, retrieval, summarisation, export, indexing, or hosted model calls."

## 5. Click: Create redacted copy

Expected proof point:

- a safer working copy is created
- sensitive fields are replaced with redaction tokens
- the copy is still not approved yet

Say:

"Redaction alone is not enough. The redacted copy becomes a candidate, not an automatic output."

## 6. Click: Approve safe version

Expected proof point:

- human approval is recorded
- approved redacted text becomes eligible for AI-visible use

Say:

"The human review step is the gate between redaction and AI visibility."

## 7. Click: Show AI-visible payload

Expected proof point:

- the audience sees exactly what the AI would receive
- the raw record is not used as the AI-visible payload

Say:

"This is the most important product moment. The system shows the exact AI-visible payload, so there is no hidden ambiguity about what the AI is allowed to see."

## 8. Click: Generate evidence receipt

Expected proof point:

- receipt records capsule ID, policy version, risk fields, approval state, AI-visible payload type, and events
- raw sensitive values are not supposed to be retained in the receipt

Say:

"The capsule can disappear, but the accountability record survives. ASPRON preserves proof of the controlled sequence without turning the receipt into a privacy leak."

## 9. Click: Dissolve capsule

Expected proof point:

- working controls are disabled
- evidence remains visible
- the bunny mark appears

Say:

"This is the dissolvable application moment: destroy the capability, preserve the accountability."

## 10. Close with the product sentence

Use this exact close:

"One bounded task. Private data controlled. Safe version approved. Evidence retained. Capsule dissolved."

## Questions to expect

### Is this production-ready?

No. It is a front-end prototype that proves workflow semantics. Production needs server-side enforcement, durable logging, identity, retention controls, stronger detection, and legal/security review.

### Is this a privacy or compliance product?

Not yet. It is a privacy-aware workflow control demo. It must not be described as compliant, certified, secure, or production-ready.

### What makes ASPRON different from a normal app?

A normal app tends to persist as a general-purpose surface. ASPRON is framed as a temporary policy-bound capability that performs one bounded task, preserves evidence, and dissolves.

### What is Safe Intake in this context?

Safe Intake is the control pipeline. ASPRON is the dissolvable capsule pattern that wraps and demonstrates that pipeline.

## Demo success criteria

The demo succeeds if the audience can repeat these four points:

1. raw input is not AI-visible by default
2. approval is required before AI-visible output
3. evidence survives the workflow
4. the active capsule dissolves after the task
