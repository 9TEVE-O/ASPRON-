# Demo receipt claim boundary addendum

## Purpose

This addendum tightens the ASPRON demo receipt claim boundary after the shared receipt generator and Capsule 001 were aligned.

Use this alongside:

```text
docs/product-spec/demo-boundary-and-claims.md
docs/product-spec/evidence-receipt-schema.md
docs/product-spec/receipt-integrity-design.md
```

## Current safe wording

The current ASPRON demo generates a **reduced evidence receipt**.

It is safe to say:

- the demo creates a receipt ID;
- the demo records policy version and capsule identity;
- the demo records detected risk field labels;
- the demo records approval state;
- the demo records whether raw access was blocked or not attempted;
- the demo records redaction-token count and summary-only payload metadata;
- the demo records demo fingerprints marked as non-cryptographic;
- the demo explicitly marks signing, append-only storage, and production verification as false.

## Current unsafe wording

Do not say or imply:

- cryptographic receipt integrity;
- tamper-proof audit trail;
- production-verifiable receipt;
- secure deletion;
- legal compliance;
- certification;
- regulator approval;
- secure-by-default operation;
- customer-proven production system.

## Exact demo boundary

Use this line when describing the receipt:

> The receipt is demo reduced evidence only. It is not signed, not append-only, not production-verifiable, and not cryptographic integrity.

## Receipt must not contain

The demo receipt must not contain:

- raw sensitive values;
- full raw input;
- full redaction candidate;
- full approved AI-visible payload;
- real client, family, medical, financial, legal, employment, account, or confidential records.

## Relationship to the current build

The shared receipt generator lives in:

```text
lib/aspron-risk-rules.js
```

Capsule 001 now uses the shared receipt generator and adds capsule-specific metadata only:

```text
02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/capsule-001-policy.js
```

The boundary is covered by:

```text
tests/receipt-integrity-boundary.test.js
tests/capsule-001-receipt-boundary.test.js
```

## Future production upgrade boundary

Stronger receipt claims require separate implementation evidence, including:

- cryptographic signing;
- durable append-only audit storage;
- reviewer identity and approval authority controls;
- backend-owned capsule state;
- server-side policy enforcement;
- event-level audit log integrity;
- retention and deletion policy mapping;
- incident and failed-gate reporting.

Until those exist, describe ASPRON as:

```text
browser-only proof-of-concept / governed workflow pattern / demo-stage capsule
```
