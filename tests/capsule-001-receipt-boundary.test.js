#!/usr/bin/env node

const assert = require("node:assert/strict");
const Capsule = require("../02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/capsule-001-policy.js");

const RAW = [
  "Name: Test Person",
  "Phone: 0400 000 000",
  "Email: test.person@example.test",
  "Private reason: sample private context for controlled summary."
].join("\n");

const c = Capsule.createCapsule(RAW);
Capsule.classifyRisk(c);
Capsule.attemptRawAgentAccess(c, "boundary test");
Capsule.createRedactionCandidate(c);
Capsule.approveCandidate(c, "reviewer_001");
Capsule.createAiVisibleInput(c);
Capsule.createSafeSummary(c);
Capsule.createEvidenceReceipt(c);

assert.match(c.receipt.receipt_id, /^aspron_receipt_/);
assert.equal(c.receipt.receipt_type, "safe_intake_summary_gate");
assert.equal(c.receipt.receipt_maturity, "demo_reduced_evidence_only");
assert.equal(c.receipt.input_type, "capsule_001_safe_summary_gate");
assert.equal(c.receipt.capsule_type, "ASPRON_Capsule_001_Safe_Summary_Gate");
assert.equal(c.receipt.summary_only_evidence.raw_values_recorded, false);
assert.equal(c.receipt.input_fingerprint.raw_input_recorded, false);
assert.equal(c.receipt.approved_payload_fingerprint.full_payload_recorded, false);
assert.equal(c.receipt.integrity_status.signed, false);
assert.equal(c.receipt.integrity_status.append_only_storage, false);
assert.equal(c.receipt.integrity_status.production_verifiable, false);
assert.equal(c.receipt.ai_visible_payload_retained, false);
assert.equal(c.receipt.ai_visible_payload_retention, "summary_and_demo_fingerprint_only");
assert.ok(c.receipt.safe_summary);
assert.ok(!Object.hasOwn(c.receipt, "ai_visible_input"));
assert.ok(!Object.hasOwn(c.receipt, "ai_visible_payload"));

const receiptText = JSON.stringify(c.receipt);
assert.ok(!receiptText.includes("test.person@example.test"));
assert.ok(!receiptText.includes("0400 000 000"));
assert.ok(!receiptText.includes("sample private context"));
assert.match(c.receipt.fingerprint_algorithm, /not cryptographic integrity/);

console.log("Capsule 001 receipt boundary test passed.");
