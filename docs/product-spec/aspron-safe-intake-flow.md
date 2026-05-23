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

## Branching behavior

Safe Intake is not only a linear preparation path. It is a gated branch system.

```text
Risk Classification
  ├─ Safe / low-risk path
  │    ↓
  │  Redaction Candidate
  │    ↓
  │  Human Approval Gate
  │    ↓
  │  Exact AI-Visible Input
  │    ↓
  │  Safe Summary / Controlled Output
  │    ↓
  │  Evidence Receipt
  │    ↓
  │  Dissolve Working Capability
  │
  └─ Unsafe / restricted path
       ↓
     Block raw access
       ↓
     Record failed-gate event
       ↓
     Require redaction, neutralisation, or human decision
       ↓
     Do not expose raw input to AI-visible payload
       ↓
     Evidence Receipt
       ↓
     Dissolve Working Capability
```

## Gate rules

- Raw input must remain inside the ASPRON capsule boundary.
- Risk classification must happen before any AI-visible payload is created.
- A redaction candidate is not automatically safe.
- Human approval is required before AI-visible input.
- Safe summary or controlled output must only use the approved AI-visible input.
- Unsafe or restricted paths must fail closed and record reduced evidence.
- After dissolve, working capability must not resume.

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

## Related documents

- [Safe Intake ↔ ASPRON bridge](safe-intake-aspron-bridge.md)
- [Capsule lifecycle](capsule-lifecycle.md)
- [Evidence receipt schema](evidence-receipt-schema.md)
- [Receipt integrity design](receipt-integrity-design.md)
- [Demo boundary and claims](demo-boundary-and-claims.md)

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
