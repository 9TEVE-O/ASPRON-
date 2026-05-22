# ASPRON Safe Intake flow

## Purpose

This document shows how Safe Intake sits inside the ASPRON capsule lifecycle.

Safe Intake is the controlled data-preparation pipeline.

ASPRON is the dissolvable capsule pattern that wraps the pipeline, limits the task, controls AI visibility, records reduced evidence, and dissolves working capability.

## Flow

```text
Raw Input
  ↓
ASPRON Capsule Boundary
  ↓
Risk Classification
  ↓
Redaction Candidate
  ↓
Human Approval Gate
  ↓
Exact AI-Visible Input
  ↓
Safe Summary / Controlled Output
  ↓
Evidence Receipt
  ↓
Dissolve Working Capability
  ↓
Reduced Evidence Remains
```

## Concept boundaries

| Concept | Meaning |
|---|---|
| Safe Intake | Controlled data-preparation pipeline |
| ASPRON | Dissolvable capsule lifecycle around a bounded task |
| Policy gate | Decision point that blocks unsafe transitions |
| Receipt | Reduced evidence of what happened |
| Dissolve | Revocation of working capability |

## Lifecycle explanation

1. Raw input enters the capsule boundary.
2. Risk classification identifies sensitive or restricted fields.
3. A redaction candidate is created.
4. Human approval is required before AI visibility.
5. The exact AI-visible input is displayed.
6. Safe output is created only from the approved redacted input.
7. A reduced evidence receipt is generated.
8. The working capsule capability dissolves.
9. Reduced evidence remains for accountability.

## Demo boundary

The current flow is demonstrated in a browser-only proof capsule.

The browser demo visualizes policy behavior. It is not production enforcement.

Production ASPRON requires backend-owned state, server-side policy gates, approval identity, audit logging, receipt generation, and tool/provider access control.

## Canonical proof route

The current canonical proof capsule is:

```text
02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/
```

## Non-claims

This flow does not claim ASPRON is:

- production-ready
- compliant
- certified
- secure by default
- tamper-proof
- regulator-approved
- capable of secure deletion
- customer-proven