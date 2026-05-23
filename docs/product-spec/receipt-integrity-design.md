# Receipt integrity design

## Purpose

This document separates two different receipt concerns:

1. Receipt privacy: avoiding retention of raw or sensitive content.
2. Receipt integrity: proving that receipt evidence has not been altered.

ASPRON currently demonstrates receipt privacy boundaries. It does not yet provide production-grade receipt integrity.

## Demo receipt boundary

The current demo receipt is reduced evidence. It may show:

- capsule ID
- policy version
- exported timestamp
- detected risk fields
- approval state
- reduced event history
- payload summary
- demo fingerprint

The current demo receipt must not be described as tamper-proof, cryptographically verifiable, legally sufficient, or compliance-grade.

## Receipt ID strategy

Production receipts should use stable unique receipt IDs.

Recommended format:

```text
aspron_receipt_<timestamp>_<random-or-sequence-id>
```

The receipt ID should be generated server-side by the receipt service.

## Input fingerprint strategy

Production receipts may include a fingerprint of input material without preserving raw input.

Rules:

- fingerprint server-side
- record algorithm and version
- bind fingerprint to capsule ID and policy version
- do not expose raw input in receipt
- do not treat non-cryptographic demo fingerprints as integrity proof

## Approved-payload fingerprint strategy

The approved AI-visible payload may be fingerprinted without preserving the full approved payload by default.

Rules:

- fingerprint the exact approved AI-visible input
- bind fingerprint to reviewer approval
- bind fingerprint to policy version
- bind fingerprint to receipt ID
- avoid storing the full payload unless explicit debug mode exists and is separately documented

## What must never be stored by default

Default receipts must not retain:

```text
Raw text
Raw sensitive values
Full redaction candidate
Full AI-visible payload
Prompt-injection text
Private narrative text
```

## Summary-only evidence fields

Reduced evidence may include:

- character count
- line count
- redaction token count
- detected risk field labels
- approval metadata
- event IDs
- event types
- blocked/allowed decisions
- policy version
- capsule state
- dissolve timestamp
- tool/provider register snapshot

## Example integrity receipt block

This example shows the intended shape of a reduced receipt. It is not a production integrity guarantee unless signing, identity, verification, and durable append-only storage exist.

```json
{
  "receipt_id": "aspron_receipt_2026-05-20T20-05-45Z_000001",
  "receipt_type": "safe_intake_summary_gate",
  "receipt_maturity": "demo_reduced_evidence_only",
  "capsule_id": "aspron_capsule_001_safe_summary_gate",
  "capsule_state": "dissolved",
  "policy_version": "demo-policy-v0.1",
  "created_at": "2026-05-20T20:05:45Z",
  "dissolved_at": "2026-05-20T20:07:15Z",
  "input_fingerprint": {
    "algorithm": "demo_non_cryptographic_fingerprint",
    "value": "demo-fingerprint-placeholder",
    "raw_input_recorded": false
  },
  "approved_payload_fingerprint": {
    "algorithm": "demo_non_cryptographic_fingerprint",
    "value": "demo-approved-payload-placeholder",
    "full_payload_recorded": false
  },
  "summary_only_evidence": {
    "detected_risk_fields": ["email", "phone", "private_note"],
    "redaction_token_count": 3,
    "approval_state": "approved",
    "safe_output_created": true,
    "raw_values_recorded": false
  },
  "integrity_status": {
    "signed": false,
    "append_only_storage": false,
    "production_verifiable": false
  }
}
```

## Failed-gate receipt structure

Failed gates are evidence.

A failed-gate event should include:

```json
{
  "event_id": "string",
  "capsule_id": "string",
  "timestamp": "ISO-8601 timestamp",
  "gate": "string",
  "decision": "blocked",
  "reason_code": "string",
  "policy_version": "string",
  "raw_values_recorded": false
}
```

Examples of failed gates:

- raw access attempt
- summary before approval
- stale redaction candidate
- unknown tool/provider
- receipt export before safe output
- transition after dissolve

## Signing path

Production integrity requires signing.

Recommended signing flow:

1. Receipt service assembles reduced receipt.
2. Receipt service canonicalizes JSON.
3. Receipt service hashes canonical receipt.
4. Signing service signs the hash.
5. Receipt stores signature, signer identity, signing timestamp, and algorithm.
6. Verification service can recompute hash and verify signature.

## Append-only storage path

Production integrity requires durable append-only storage.

Possible storage strategies:

- append-only event log
- immutable object storage
- signed receipt ledger
- database table with write-once controls
- external timestamping service

The demo does not currently provide append-only storage.

## Verification path

Production verification should answer:

- Does the receipt ID exist?
- Does the signature verify?
- Does the receipt hash match the stored signature?
- Does the event sequence match the receipt summary?
- Was the policy version valid at the time?
- Was the reviewer authorized at the time?
- Was any post-dissolve transition attempted?

## Demo receipt vs production receipt

| Area | Demo receipt | Production receipt |
|---|---|---|
| Payload retention | Reduced only | Reduced by default |
| Fingerprint | Demo fingerprint | Cryptographic hash |
| Signing | None | Required for integrity claims |
| Storage | Browser/exported JSON | Durable append-only backend storage |
| Identity | Demo reviewer string | Verified reviewer identity |
| Tool register | Limited or none | Required for model/tool calls |
| Claim | Demonstrator evidence | Verifiable evidence after signing/storage |

## Non-claims

Do not claim:

- tamper-proof evidence
- legal sufficiency
- regulatory compliance
- secure deletion
- production audit integrity
- chain-of-custody strength

unless signing, append-only storage, identity, and verification are implemented and evidenced.

## Mandatory wording

Use this wording for current maturity:

> Demo fingerprints are not cryptographic integrity. Production integrity requires signing and durable append-only storage.
