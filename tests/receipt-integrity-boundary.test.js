#!/usr/bin/env node

/**
 * ASPRON receipt integrity boundary tests.
 *
 * Dependency-free Node test runner for the demo receipt shape.
 * Run with:
 *
 *   node tests/receipt-integrity-boundary.test.js
 */

const assert = require("node:assert/strict");
const ASPRONRiskRules = require("../lib/aspron-risk-rules.js");

const approvedPayload = [
  "Name: [REDACTED_NAME]",
  "DOB: [REDACTED_DOB]",
  "Phone: [REDACTED_PHONE]",
  "Private reason: [REDACTED_PRIVATE_REASON_SUMMARY_REQUIRED]"
].join("\n");

const receipt = ASPRONRiskRules.createReceipt({
  capsuleId: "ASPRON-TEST-CAPSULE",
  policyVersion: "safe-intake-policy-v0.1",
  exportedAt: "2026-05-21T00:00:00.000Z",
  inputType: "mock_sensitive_intake",
  risks: [
    { field: "name", count: 1, action: "redact_or_review" },
    { field: "date_of_birth", count: 1, action: "redact_or_review" },
    { field: "phone", count: 1, action: "redact_or_review" },
    { field: "private_reason", count: 1, action: "redact_or_review" }
  ],
  rawAccessBlocked: true,
  approved: true,
  aiVisiblePayload: approvedPayload,
  auditEvents: ["INPUT_RECEIVED", "RISK_CLASSIFIED", "RAW_AGENT_ACCESS_BLOCKED"]
});

assert.match(receipt.receipt_id, /^aspron_receipt_/);
assert.equal(receipt.receipt_type, "safe_intake_summary_gate");
assert.equal(receipt.receipt_maturity, "demo_reduced_evidence_only");
assert.equal(receipt.capsule_id, "ASPRON-TEST-CAPSULE");
assert.equal(receipt.policy_version, "safe-intake-policy-v0.1");

assert.equal(receipt.input_fingerprint.raw_input_recorded, false);
assert.equal(receipt.approved_payload_fingerprint.full_payload_recorded, false);
assert.equal(receipt.summary_only_evidence.raw_values_recorded, false);
assert.equal(receipt.summary_only_evidence.approval_state, "approved");
assert.equal(receipt.summary_only_evidence.raw_agent_access_attempt, "blocked");
assert.equal(receipt.summary_only_evidence.safe_output_created, true);

assert.equal(receipt.integrity_status.signed, false);
assert.equal(receipt.integrity_status.append_only_storage, false);
assert.equal(receipt.integrity_status.production_verifiable, false);

assert.equal(receipt.ai_visible_payload_retained, false);
assert.equal(receipt.ai_visible_payload_retention, "summary_and_demo_fingerprint_only");
assert.ok(!Object.hasOwn(receipt, "ai_visible_payload"), "receipt must not store the approved payload");

const receiptText = JSON.stringify(receipt);
assert.ok(!receiptText.includes(approvedPayload), "receipt must not contain the full approved payload");
assert.match(receipt.fingerprint_algorithm, /not cryptographic integrity/);
assert.match(receipt.input_fingerprint.algorithm, /not cryptographic integrity/);
assert.match(receipt.approved_payload_fingerprint.algorithm, /not cryptographic integrity/);

console.log("ASPRON receipt integrity boundary tests passed.");
