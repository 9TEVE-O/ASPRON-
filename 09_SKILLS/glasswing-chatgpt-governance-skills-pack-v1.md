# Glasswing → ChatGPT Governance Skills Pack v1

**Source:** Glasswing working note uploaded in ChatGPT, May 2026.  
**Purpose:** Convert frontier-agent governance lessons into practical ChatGPT workflow skills.

## Core Pattern

**Bounded autonomy + preserved evidence + controlled disclosure.**

For ChatGPT, this means:

- keep the task bounded;
- inspect chains, not isolated outputs;
- challenge tests and assumptions;
- preserve evidence before publishing conclusions;
- keep humans responsible for approval, disclosure, and deployment.

ChatGPT can help design and review the workflow. It should not be treated as the final authority for security, legal, privacy, compliance, or production decisions.

---

## 1. Chain-of-Decision Review

**Replaces:** Autonomous vulnerability chaining.  
**ChatGPT skill:** Analyse how separate small decisions, assumptions, tool outputs, or workflow steps combine into a larger risk.

### Use when

Reviewing an AI workflow, intake process, agent run, policy flow, prompt chain, automation, or approval path.

### Prompt

```text
Review this workflow as a chain-of-decision system.

Do not only inspect each step individually. Identify:
1. isolated decisions
2. how decisions compound
3. where harmless steps create larger exposure together
4. missing audit records
5. where a human would misunderstand the risk
6. what evidence should be logged at each point

Output:
- Decision chain
- Compounding risk
- Missing evidence
- Recommended control
```

### ASPRON translation

A capsule should not only log each action. It should log how prior actions changed the meaning, permission state, risk exposure, or disclosure status of later actions.

---

## 2. Test-Design Challenge

**Replaces:** Reasoning past automated testing.  
**ChatGPT skill:** Question whether the test itself is strong enough, not just whether the output passed.

### Use when

A document, prompt, redaction, classification, compliance check, or agent result passes checks but may still be unsafe.

### Prompt

```text
Do not assume the test is valid because the output passed.

Review the test design itself:
1. What does this test actually prove?
2. What does it fail to test?
3. What edge cases are missing?
4. What would pass the test while still being wrong or unsafe?
5. What extra checks should be added?
6. Should this workflow fail closed?

Output:
- Test coverage
- Blind spots
- False-pass scenarios
- Better test design
- Fail-closed recommendation
```

### ASPRON translation

A capsule must be able to fail closed when the validation layer is weak, incomplete, stale, or mismatched to the actual risk.

---

## 3. Frozen-Spec Re-Audit

**Replaces:** Finding long-standing blind spots.  
**ChatGPT skill:** Re-open old assumptions, specs, prompts, policies, templates, and workflows that became true by default.

### Use when

A document, system, or workflow has been reused for months and nobody has questioned the original assumptions.

### Prompt

```text
Re-audit this old spec or workflow.

Look for:
1. assumptions that became invisible
2. outdated constraints
3. inherited decisions nobody rechecked
4. unsupported claims
5. weak defaults
6. places where the system still works but no longer fits the current risk

Output:
- Old assumption
- Why it may no longer hold
- Evidence needed
- Risk if unchanged
- Update recommendation
```

### ASPRON translation

Capsules, policy notes, schemas, and approval rules should have periodic re-audit triggers. Evidence over intention applies backwards too.

---

## 4. Bounded Task Capsule

**Replaces:** Autonomous agentic work inside hard limits.  
**ChatGPT skill:** Convert open-ended work into a bounded capsule: activate, perform one job, preserve evidence, dissolve.

### Use when

A task risks expanding beyond its original purpose.

### Prompt

```text
Turn this task into a bounded work capsule.

Define:
1. task objective
2. allowed inputs
3. forbidden actions
4. required evidence
5. human approval points
6. completion condition
7. dissolve condition

The capsule must not expand its scope.

Output:
- Capsule name
- Purpose
- Inputs
- Boundaries
- Evidence log
- Approval gate
- Completion rule
- Dissolution rule
```

### ASPRON translation

This is the core ASPRON pattern: activate, run a bounded job, preserve evidence, then dissolve. The capsule is not an endlessly-running agent. It is a controlled temporary workflow unit.

---

## 5. Workflow Augmentation Map

**Replaces:** Integration, not replacement.  
**ChatGPT skill:** Identify where ChatGPT should augment an existing workflow rather than replace people, approvals, or evidence chains.

### Use when

Designing client artefacts, internal systems, Safe Intake flows, or AI-assisted operations.

### Prompt

```text
Map where ChatGPT should augment this workflow, not replace it.

Identify:
1. existing human decisions
2. existing approval gates
3. existing evidence records
4. where ChatGPT can reduce friction
5. where ChatGPT must not be the final authority
6. how to preserve the current chain of accountability

Output:
- Existing workflow
- Safe AI augmentation points
- Human-only decisions
- Evidence requirements
- Recommended implementation
```

### ASPRON translation

Capsules should slot into existing workflows. They should not erase existing accountability, replace final approval, or hide material decisions from reviewers.

---

## 6. Evidence-First Disclosure

**Replaces:** Controlled disclosure with preserved evidence.  
**ChatGPT skill:** Separate recording evidence from revealing sensitive detail.

### Use when

Handling sensitive claims, private client material, security issues, compliance findings, complaints, internal reports, or staged disclosure.

### Prompt

```text
Design an evidence-first disclosure process.

Goal:
Prove that a finding, decision, or risk was identified at time T without exposing sensitive details too early.

Define:
1. what must be recorded
2. what must be withheld
3. who can access the detail
4. when disclosure is allowed
5. what evidence proves the timeline
6. what review or approval is required before release

Output:
- Evidence record
- Restricted detail
- Access rules
- Disclosure trigger
- Approval gate
- Audit trail
```

### ASPRON translation

A capsule may preserve proof that an action, finding, or decision occurred without exposing the sensitive content immediately. External systems are still required for cryptographic proof, secure storage, access control, and trusted timestamps.

---

## 7. Governed Collaboration Pattern

**Replaces:** Coordinated access as governance.  
**ChatGPT skill:** Design collaboration around trust, visibility, roles, and auditability rather than secrecy or vague control.

### Use when

Multiple people, tools, agents, clients, reviewers, or organisations need to work on the same AI-assisted process.

### Prompt

```text
Design a governed collaboration model for this workflow.

Include:
1. roles and responsibilities
2. who can see what
3. who can approve what
4. what must be logged
5. what must be disclosed
6. what remains restricted
7. how trust is maintained through evidence, not promises

Output:
- Role map
- Access model
- Approval model
- Evidence model
- Disclosure model
- Governance risks
```

### ASPRON translation

Trust is not created by hiding the process. Trust is created by role clarity, access limits, approval gates, evidence records, and controlled visibility.

---

## Combined ChatGPT Master Skill

```text
Act as a bounded workflow reasoning assistant.

For any task I give you, apply these operating rules:

1. Inspect chains, not isolated steps.
2. Challenge the test design, not only the output.
3. Re-check old assumptions and frozen specs.
4. Convert open-ended work into bounded capsules.
5. Augment existing workflows instead of replacing human approval.
6. Preserve evidence before disclosure.
7. Design collaboration around roles, access, audit trails, and controlled visibility.

For each response, separate:
- Facts
- Assumptions
- Risks
- Evidence needed
- Human approval points
- Recommended next action

Do not claim authority you do not have.
Do not treat passing checks as proof of safety.
Do not expose sensitive details unnecessarily.
Do not expand the task beyond its boundary unless asked.
```

---

## ChatGPT Replacement Boundary

| Frontier-agent capability | ChatGPT-safe replacement |
|---|---|
| Autonomous zero-day discovery | Assisted review, threat modelling, test critique |
| No-human-steering vulnerability chaining | Human-approved chain-of-risk analysis |
| Cryptographic disclosure proof | Process design plus external hashing/logging tools |
| Enterprise partner-controlled deployment | Role/access/approval model design |
| Autonomous action inside security systems | Bounded reasoning with human approval |

---

## Filing

**Primary room:** `09_SKILLS`  
**Secondary references:** `05_SAFE_INTAKE`, `06_ASPRON_CAPSULES`, `07_EVIDENCE`

## One-line Summary

A reusable ChatGPT skill pack for turning frontier-agent lessons into practical governed workflows: chain analysis, test critique, frozen-spec review, bounded capsules, evidence-first disclosure, and role-based collaboration.
