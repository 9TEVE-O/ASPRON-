# ASPRON

**The interface dissolves. The effect remains. The evidence survives.**

ASPRON is a dissolvable application proof-of-concept: a temporary workflow capsule that performs one bounded task, enforces a policy boundary, then dissolves the working capability while preserving evidence.

This repository contains a browser-only prototype for the **ASPRON Safe Intake Capsule**.

## What this prototype proves

The prototype demonstrates a controlled intake pipeline for an agentic future:

1. A mock sensitive intake record enters a temporary capsule.
2. The system detects risky fields.
3. A simulated agent attempts to access the raw input.
4. The policy gate blocks raw access before approval.
5. A redacted working copy is created.
6. A human review step approves the safe version.
7. Only the approved redacted copy becomes AI-visible.
8. The prototype shows exactly what the AI or agent would see.
9. An evidence receipt is generated.
10. The capsule dissolves its working capability while retaining the receipt.

Core rule:

> No raw, unreviewed, unsafe, or unapproved content may enter AI processing, retrieval, summarisation, export, indexing, or hosted model calls.

## Product sentence

**One bounded task. Private data controlled. Safe version approved. Evidence retained. Capsule dissolved.**

## Run it

Open `index.html` in any modern browser.

No install. No backend. No external dependencies.

## Demo boundary

This is a **front-end prototype**, not a production privacy, security, or compliance system.

It demonstrates product mechanics only:

- visible workflow state
- risk detection using simple local patterns
- blocked raw agent access
- redacted AI-visible input path
- manual approval gate
- exact AI-visible payload
- evidence receipt
- disabled workflow controls after dissolve

It does **not** provide production-grade PII detection, secure storage, authentication, encrypted audit logging, access control, server-side policy enforcement, legal compliance, or true data destruction.

## Data handling principle

The prototype uses fake/sample data only. The evidence receipt records field types, risk categories, actions, approval state, and the approved redacted payload. It should not preserve raw sensitive values.

## ASPRON principle

**Destroy the capability. Preserve the accountability.**
