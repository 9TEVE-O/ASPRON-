# Connected texts ledger

This document connects the relevant texts and ideas already given in conversation into the current ASPRON build.

## What this is

A source-to-build map for the next ASPRON demonstration.

## Connected source texts

| Source text / concept | What it contributes to ASPRON | Build translation |
|---|---|---|
| ASPRON root README | Defines the product line: temporary workflow capsule, bounded job, evidence receipt, dissolve. | Keep demo centred on capsule lifecycle rather than generic app UI. |
| Current `index.html` demo | Shows controlled input, risk detection, redaction, approval, AI-visible summary, receipt, dissolve. | Preserve as v1 proof; do not overbuild until demo story is stable. |
| OAIC privacy policy text provided in conversation | Privacy lifecycle: collection, use, disclosure, storage, security, access/correction, deletion, complaints. | Use as structure for privacy-governance controls, not as legal copy. |
| Global CBPR Program Requirements | Baseline privacy accountability pattern: notice, collection limitation, use, choice, integrity, safeguards, access/correction, accountability. | Use as checklist inspiration for third-party and cross-border readiness. |
| DeepSearchQA paper | Warns that research agents fail on recall, de-duplication and stopping criteria. | ASPRON evidence workflows need explicit stopping rules and traceable source lists. |
| Mechanistic Data Attribution paper | Shows value of tracing model behaviour back to training/source examples. | ASPRON should preserve provenance from input → redaction → approval → output. |
| Idea2Story paper | Separates offline knowledge construction from runtime generation. | ASPRON should pre-build policy/risk patterns instead of improvising every run. |
| CrowdStrike threat material | Shows AI-enabled social engineering, identity attacks, malware-free intrusions and need for guardrails. | ASPRON demo should frame itself as controlled workflow, not autonomous trust. |
| Nix reference manual | Useful design analogy: immutability, content-addressing, atomic rollback, dependency closure. | Evidence receipts should be hashable/versioned; approved outputs should be immutable records. |
| GitHub/software testing material | GitHub supports collaboration, versioning, issue tracking and testing visibility. | Keep build decisions, demo scripts and defects in repo-visible docs/issues. |
| LAB Safe Intake concept | Source pipeline: restricted original → extracted text → PII detection → redacted candidate → human review → approved AI-safe copy → ingestion. | ASPRON capsule is the UI/product expression of that intake pipeline. |

## Interpretation

ASPRON is not just a small privacy demo. It is a governed capability pattern:

```text
Temporary capability
→ bounded input
→ risk classification
→ redaction candidate
→ human approval
→ AI-visible copy
→ evidence receipt
→ dissolve active interface
```

The important product move is not the redaction itself. It is the separation of capability from accountability.

## Do not claim yet

- Do not claim legal compliance.
- Do not claim production-grade PII detection.
- Do not claim secure deletion.
- Do not claim encrypted storage.
- Do not claim model safety.
- Do not claim cross-border certification.

## Defensible claim

ASPRON v1 demonstrates a controlled, reviewable workflow for turning risky raw input into approved AI-visible text while preserving an evidence receipt and dissolving the temporary working interface.
