# Client demo receipt boundary addendum

## Purpose

Use this addendum with `client-demo-script.md` whenever Capsule 001 is shown to a buyer, partner, reviewer, or adviser.

The client-facing demo must not let the phrase `audit receipt` sound stronger than the current implementation.

## Replace loose receipt wording

When the script says:

```text
Generate the audit receipt.
```

Use this wording instead:

```text
Generate the demo reduced evidence receipt.
```

## Speaker line

Say this when the receipt appears:

> This receipt is demo reduced evidence only. It is not signed, not append-only, not production-verifiable, and not cryptographic integrity. It records the control sequence without retaining raw sensitive values or the full AI-visible payload.

## Safe buyer message

It is safe to say:

- the prototype records a receipt ID;
- the prototype records policy version and capsule identity;
- the prototype records detected risk field labels;
- the prototype records human approval state;
- the prototype records that raw access was blocked or not attempted;
- the prototype records summary-only payload metadata;
- the prototype shows the boundary between raw input and approved AI-visible input;
- the prototype dissolves the working capability while preserving reduced evidence.

## Do not say

Do not say or imply:

- tamper-proof audit;
- cryptographic proof;
- production-verifiable evidence;
- secure deletion;
- legal compliance;
- certification;
- regulator approval;
- production-grade PII detection;
- hosted AI integrations are already safely enforced;
- customer-proven production system.

## If asked whether the receipt proves deletion

Say:

> No. This demo shows the lifecycle pattern: the temporary working capability is dissolved and reduced evidence remains. It does not prove secure deletion.

## If asked whether the receipt is an audit log

Say:

> It is a demo reduced evidence receipt, not a production audit ledger. A production version would need server-side enforcement, durable append-only storage, reviewer identity controls, signing, and retention policy mapping.

## Exact closing line

Use this line if the room starts treating the receipt as stronger than it is:

```text
The receipt proves the demo sequence, not production security, compliance, or deletion.
```
