# ASPRON Durable Assurance Control Plane

## Purpose

ASPRON capsules may dissolve. The assurance record must not dissolve.

This document defines the non-dissolving governance layer that must survive every bounded capsule run. It is a design contract for the current browser prototype and a backend acceptance target for future production work.

## Core invariant

```text
Destroy the capability. Preserve the accountability.
```

A capsule may remove or disable its working interface, runtime permissions, temporary controls, and task surface after completion. It must not remove the durable evidence needed to explain, replay, revoke, or roll back the run.

## What must survive dissolution

Every capsule run must retain reduced, non-raw evidence for:

- the run graph
- policy decisions
- compliance obligation mappings
- lineage artifacts
- agent handoffs
- model-boundary metadata
- tool-boundary metadata
- evidence receipt identity
- rollback manifest
- dissolution record

The durable record must not intentionally retain raw sensitive values, full raw input, full redaction candidates, or full AI-visible payloads by default.

## Assurance record components

| Component | Purpose |
|---|---|
| Run graph | Identifies the run, capsule, tenant, user, controller, policy, prompt, model, tools, lifecycle state, and dissolution state. |
| Compliance obligations | Maps internal policy controls to obligations, client requirements, or product-boundary rules. |
| Policy decisions | Records allow, block, escalate, or refuse outcomes at enforcement points. |
| Lineage artifacts | Tracks parent-child relationships across raw, approved, prompt, output, export, and evidence metadata. |
| Agent handoffs | Records task, authority, tool scope, and evidence required for each handoff. |
| Observability events | Captures state changes, near misses, refusals, tool attempts, and policy events. |
| Rollback manifest | Identifies affected policies, prompts, models, tools, data, outputs, exports, revocation actions, and rebuild actions. |
| Dissolution record | Proves capability was disabled while accountability was retained. |

## Required enforcement points

The design contract currently requires policy decision records for:

```text
upload
classification
redaction
approval
ai_boundary
evidence_receipt
dissolution
```

Future backend versions should extend this list to include extraction, chunking, embedding, retrieval, model call, tool call, export, memory write, tenant boundary, retention, and revocation.

## Data lineage rule

A valid assurance record must include at minimum:

```text
raw_original
→ approved_ai_input
→ model_prompt
```

The raw artifact can be represented by metadata and a fingerprint only. It must not become AI-visible. AI-visible input requires an approved redacted artifact.

## Agent coordination rule

Agents must not directly delegate authority to other agents.

Agent handoffs must include:

- run id
- source agent
- target agent
- task
- authority scope
- allowed tools
- evidence required

The controller remains the only component allowed to advance workflow state in production architecture.

## Rollback rule

A run is not assurance-ready without a rollback manifest.

The rollback manifest must identify:

- affected policy versions
- affected prompt versions
- affected model versions
- affected tool versions
- affected data ids
- affected output ids
- revocation actions
- rebuild actions
- human review requirement

## Prototype boundary

The current implementation in `lib/aspron-assurance-control-plane.js` is dependency-free and demo-safe. It validates assurance records and catches missing policy decisions, raw AI-visible bypass attempts, direct agent authority delegation, and missing rollback manifests.

It does not provide production security, cryptographic integrity, persistent storage, access control, authentication, legal compliance, or real incident response.

Production ASPRON still requires backend-owned state, server-side enforcement, append-only audit storage, identity-bound approval, tenant isolation, provider/tool access control, and reviewed compliance mappings.
