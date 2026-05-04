# ASPRON

**The interface dissolves. The effect remains. The evidence survives.**

ASPRON is a dissolvable application proof-of-concept: a temporary workflow capsule that activates inside a task, performs one bounded job, then dissolves while preserving evidence.

This repository currently contains a browser-only demo for the ASPRON Capsule UI v1.

## What the demo proves

The demo shows a controlled document/input workflow:

1. Create capsule
2. Enter raw text
3. Detect risk
4. Generate redaction
5. Review and approve
6. Generate AI-visible output
7. Export evidence receipt
8. Dissolve the working interface

The core rule is simple:

> Destroy the capability. Preserve the accountability.

## Run it

Open `index.html` in any modern browser.

No install. No backend. No external dependencies.

## Current safety boundary

This is a **front-end proof demo**, not a production privacy or compliance system.

It demonstrates the product mechanics only:

- visible workflow gates
- blocked raw input path
- redacted AI-visible input path
- approval step
- evidence receipt
- audit trail
- disabled controls after dissolve

It does **not** provide production-grade PII detection, secure storage, authentication, encrypted audit logging, access control, server-side policy enforcement, or legal compliance.

## Core product line

**ASPRON: the app that disappears after the job is done, but leaves the proof behind.**
