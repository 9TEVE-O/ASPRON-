# Evidence receipt schema

## What this is

A draft receipt shape for proving what ASPRON did during a capsule run.

## Minimum receipt fields

```json
{
  "receipt_id": "string",
  "capsule_id": "string",
  "capsule_version": "string",
  "policy_version": "string",
  "created_at": "ISO-8601 timestamp",
  "dissolved_at": "ISO-8601 timestamp or null",
  "input_type": "text | document | form | unknown",
  "raw_input_stored": false,
  "raw_input_hash": "string or null",
  "detected_risk_classes": ["string"],
  "redaction_summary": {
    "fields_detected": 0,
    "fields_redacted": 0,
    "manual_review_required": false
  },
  "approval": {
    "approved": false,
    "approved_by": "user | reviewer | system-not-allowed",
    "approved_at": "ISO-8601 timestamp or null"
  },
  "ai_visible_output_hash": "string or null",
  "output_generated_from": "approved_redacted_input_only",
  "tool_register_snapshot": [
    {
      "tool_name": "string",
      "purpose": "string",
      "data_sent": "string",
      "ai_visible": false
    }
  ],
  "dissolution_status": "active | dissolved | failed",
  "exceptions": []
}
```

## Receipt rules

- The receipt should prove sequence, not expose sensitive content.
- Store hashes or summaries where possible instead of raw personal information.
- Record policy version and capsule version every time.
- Record failed gates as evidence, not just successful runs.
- Do not allow the evidence receipt itself to become a privacy leak.

## Future production upgrade

- Add cryptographic signing.
- Add append-only audit log storage.
- Add user/reviewer identity controls.
- Add export format: JSON, PDF and Markdown.
- Add integrity check for approved redacted output.
