# Evidence receipt schema

## What this is

A draft receipt shape for proving what ASPRON did during a capsule run without turning the receipt into another privacy leak.

This schema describes the current demo receipt boundary used by the browser proof and Capsule 001.

It is **demo reduced evidence only**. It is not a production audit, compliance record, cryptographic integrity proof, secure log, or deletion guarantee.

## Current demo receipt shape

```json
{
  "receipt_id": "aspron_receipt_<timestamp>_<capsule>",
  "receipt_type": "safe_intake_summary_gate",
  "receipt_maturity": "demo_reduced_evidence_only",
  "capsule_id": "string",
  "capsule_type": "string or omitted",
  "capsule_state": "audit_ready | EVIDENCE_RECEIPT_READY | DISSOLVED",
  "policy_version": "string",
  "created_at": "ISO-8601 timestamp",
  "exported_at": "ISO-8601 timestamp",
  "dissolved_at": "ISO-8601 timestamp or omitted",
  "prototype_boundary": "front-end simulation only; not production security or compliance",
  "input_type": "mock_sensitive_intake | capsule_001_safe_summary_gate | string",
  "input_fingerprint": {
    "algorithm": "demo-fnv1a-32; not cryptographic integrity",
    "value": "demo-fnv1a-32:<hex>",
    "raw_input_recorded": false
  },
  "approved_payload_fingerprint": {
    "algorithm": "demo-fnv1a-32; not cryptographic integrity",
    "value": "demo-fnv1a-32:<hex>",
    "full_payload_recorded": false
  },
  "summary_only_evidence": {
    "detected_risk_fields": ["string"],
    "redaction_token_count": 0,
    "approval_state": "approved | not_approved",
    "raw_agent_access_attempt": "blocked | not_attempted",
    "safe_output_created": false,
    "raw_values_recorded": false
  },
  "integrity_status": {
    "signed": false,
    "append_only_storage": false,
    "production_verifiable": false
  },
  "raw_values_retained_in_receipt": false,
  "human_review": "approved | not_approved",
  "ai_visible_payload_type": "approved_redacted_copy_only",
  "ai_visible_payload_retained": false,
  "ai_visible_payload_retention": "summary_and_demo_fingerprint_only",
  "ai_visible_payload_summary": {
    "character_count": 0,
    "line_count": 0,
    "redaction_token_count": 0,
    "contains_redaction_tokens": false
  },
  "ai_visible_payload_fingerprint": "demo-fnv1a-32:<hex>",
  "fingerprint_algorithm": "demo-fnv1a-32; not cryptographic integrity",
  "safe_summary": "object or omitted",
  "events": []
}
```

## Receipt rules

- The receipt should prove sequence, not expose sensitive content.
- Raw input must not be recorded in the receipt.
- Full raw text must not be recorded in the receipt.
- Full redaction candidate must not be recorded in the receipt.
- Full approved AI-visible payload must not be recorded in the receipt.
- Demo fingerprints are reduced-evidence markers only. They are not cryptographic integrity.
- Record policy version and capsule identity every time.
- Record failed gates as evidence, not only successful runs.
- Record whether raw access was blocked or not attempted.
- Keep signing, append-only storage, and production verification explicitly false until implemented.
- Do not allow the evidence receipt itself to become a privacy leak.

## Current implementation links

The shared receipt generator lives in:

```text
lib/aspron-risk-rules.js
```

Capsule 001 uses the shared receipt generator and adds capsule-specific metadata only:

```text
02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/capsule-001-policy.js
```

The receipt boundary is covered by:

```text
tests/receipt-integrity-boundary.test.js
tests/capsule-001-receipt-boundary.test.js
```

## Production upgrade path

Production ASPRON would need separate implementation evidence before stronger claims are allowed.

Required future upgrades include:

- cryptographic signing;
- durable append-only audit storage;
- reviewer identity and approval authority controls;
- backend-owned capsule state;
- server-side policy enforcement;
- event-level audit log integrity;
- export formats such as JSON, PDF, and Markdown;
- integrity check for approved redacted output;
- retention and deletion policy mapping;
- incident and failed-gate reporting.

Until those upgrades exist, safe wording is:

```text
browser-only proof-of-concept / governed workflow pattern / demo-stage capsule
```

Do not claim the receipt is tamper-proof, production-verifiable, compliant, certified, regulator-approved, customer-proven, secure by default, or proof of true deletion.
