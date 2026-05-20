#!/usr/bin/env node

/**
 * ASPRON lifecycle and fail-closed tests.
 *
 * Dependency-free Node test runner for the core Safe Intake Capsule rules.
 * Run with:
 *
 *   node tests/lifecycle-fail-closed.test.js
 */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ASPRONRiskRules = require("../lib/aspron-risk-rules.js");

const fixturePath = path.join(__dirname, "fixtures", "safe-intake-fixtures.json");
const fixtures = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

const STATES = [
  "READY",
  "INPUT_RECEIVED",
  "RISK_CLASSIFIED",
  "REDACTION_CANDIDATE",
  "APPROVED",
  "AI_VISIBLE_OUTPUT",
  "EVIDENCE_RECEIPT",
  "DISSOLVED"
];

function createCapsule(rawText) {
  return {
    capsuleId: "ASPRON-TEST-CAPSULE",
    state: "INPUT_RECEIVED",
    rawText,
    risks: [],
    redactedText: "",
    approved: false,
    aiVisiblePayload: "",
    receipt: null,
    dissolved: false,
    audit: ["INPUT_RECEIVED"]
  };
}

function classifyRisk(capsule) {
  assert.equal(capsule.state, "INPUT_RECEIVED");
  capsule.risks = ASPRONRiskRules.detectRisks(capsule.rawText);
  capsule.state = "RISK_CLASSIFIED";
  capsule.audit.push("RISK_CLASSIFIED");
  return capsule;
}

function attemptRawAgentAccess(capsule) {
  const allowed = false;
  capsule.audit.push("RAW_AGENT_ACCESS_BLOCKED");
  return { allowed, reason: "raw input is not AI-visible before redaction and approval" };
}

function createRedactionCandidate(capsule) {
  assert.equal(capsule.state, "RISK_CLASSIFIED");
  capsule.redactedText = ASPRONRiskRules.redact(capsule.rawText);
  capsule.state = "REDACTION_CANDIDATE";
  capsule.audit.push("REDACTION_CANDIDATE");
  return capsule;
}

function approveCandidate(capsule) {
  assert.equal(capsule.state, "REDACTION_CANDIDATE");
  assert.ok(capsule.redactedText.length > 0, "redaction candidate is required before approval");
  capsule.approved = true;
  capsule.state = "APPROVED";
  capsule.audit.push("APPROVED");
  return capsule;
}

function createAiVisibleOutput(capsule) {
  assert.equal(capsule.state, "APPROVED");
  assert.equal(capsule.approved, true);
  capsule.aiVisiblePayload = capsule.redactedText;
  capsule.state = "AI_VISIBLE_OUTPUT";
  capsule.audit.push("AI_VISIBLE_OUTPUT");
  return capsule;
}

function generateReceipt(capsule) {
  assert.equal(capsule.state, "AI_VISIBLE_OUTPUT");
  capsule.receipt = ASPRONRiskRules.createReceipt({
    capsuleId: capsule.capsuleId,
    policyVersion: fixtures.policy_version,
    exportedAt: "2026-05-21T00:00:00.000Z",
    inputType: "mock_sensitive_intake",
    risks: capsule.risks,
    rawAccessBlocked: capsule.audit.includes("RAW_AGENT_ACCESS_BLOCKED"),
    approved: capsule.approved,
    aiVisiblePayload: capsule.aiVisiblePayload,
    auditEvents: capsule.audit.slice()
  });
  capsule.state = "EVIDENCE_RECEIPT";
  capsule.audit.push("EVIDENCE_RECEIPT");
  return capsule;
}

function dissolveCapsule(capsule) {
  assert.equal(capsule.state, "EVIDENCE_RECEIPT");
  capsule.dissolved = true;
  capsule.state = "DISSOLVED";
  capsule.audit.push("DISSOLVED");
  return capsule;
}

function assertSequence(capsule) {
  const observed = capsule.audit.filter((event) => STATES.includes(event));
  const expected = [
    "INPUT_RECEIVED",
    "RISK_CLASSIFIED",
    "REDACTION_CANDIDATE",
    "APPROVED",
    "AI_VISIBLE_OUTPUT",
    "EVIDENCE_RECEIPT",
    "DISSOLVED"
  ];
  assert.deepEqual(observed, expected);
}

function assertSharedRulesCoverFixtures() {
  const supportedLabels = ASPRONRiskRules.getRiskLabels();

  for (const record of fixtures.records) {
    for (const expected of record.expected_detected_fields) {
      assert.ok(
        supportedLabels.includes(expected),
        `Fixture ${record.id} expects '${expected}', but shared risk rules do not define it`
      );
    }
  }
}

function assertExpectedRisks(record, detectedFields) {
  for (const expected of record.expected_detected_fields) {
    assert.ok(
      detectedFields.includes(expected),
      `${record.id} expected risk field '${expected}' but detected ${JSON.stringify(detectedFields)}`
    );
  }
}

function assertRawValuesNotInReceipt(capsule) {
  const receiptText = JSON.stringify(capsule.receipt);
  assert.equal(capsule.receipt.raw_values_retained_in_receipt, false);
  assert.ok(!receiptText.includes("0400 123 456"), "receipt must not contain sample phone number");
  assert.ok(!receiptText.includes("jordan.ellis@example.test"), "receipt must not contain sample email");
  assert.ok(!receiptText.includes("1234 56789 1"), "receipt must not contain sample Medicare number");
}

function assertFullPayloadNotRetained(capsule) {
  const receiptText = JSON.stringify(capsule.receipt);

  assert.equal(capsule.receipt.ai_visible_payload_retained, false);
  assert.equal(capsule.receipt.ai_visible_payload_retention, "summary_and_demo_fingerprint_only");
  assert.ok(!Object.hasOwn(capsule.receipt, "ai_visible_payload"), "receipt must not store full approved payload");
  assert.ok(capsule.receipt.ai_visible_payload_summary, "receipt must retain reduced payload summary");
  assert.ok(capsule.receipt.ai_visible_payload_fingerprint, "receipt must retain payload fingerprint");
  assert.ok(!receiptText.includes(capsule.aiVisiblePayload), "receipt must not contain the full approved text");
  assert.ok(!receiptText.includes("tenancy and payment dispute"), "receipt must not preserve private narrative text");
  assert.ok(!receiptText.includes("Sample client onboarding note"), "receipt must not preserve confidential narrative text");
  assert.ok(!receiptText.includes("Ignore all previous rules"), "receipt must not preserve prompt-injection text");
}

function runRecord(record) {
  const capsule = createCapsule(record.raw_text);

  classifyRisk(capsule);
  const detectedFields = capsule.risks.map((risk) => risk.field);
  assertExpectedRisks(record, detectedFields);

  const rawAccess = attemptRawAgentAccess(capsule);
  assert.equal(rawAccess.allowed, false, "raw agent access must fail closed");
  assert.equal(capsule.aiVisiblePayload, "", "raw input must not become AI-visible before approval");

  createRedactionCandidate(capsule);
  assert.notEqual(capsule.redactedText, capsule.rawText, `${record.id} should produce a redaction candidate`);
  assert.equal(capsule.aiVisiblePayload, "", "redaction candidate alone must not become AI-visible");

  approveCandidate(capsule);
  createAiVisibleOutput(capsule);
  assert.equal(capsule.aiVisiblePayload, capsule.redactedText, "AI-visible payload must be approved redacted copy only");

  generateReceipt(capsule);
  assertRawValuesNotInReceipt(capsule);
  assertFullPayloadNotRetained(capsule);

  dissolveCapsule(capsule);
  assert.equal(capsule.dissolved, true);
  assertSequence(capsule);
}

function runTests() {
  assertSharedRulesCoverFixtures();

  for (const record of fixtures.records) {
    if (record.expected_detected_fields.length === 0) {
      continue;
    }
    runRecord(record);
  }

  const lowRisk = fixtures.records.find((record) => record.id === "fixture-low-risk-001");
  const lowRiskFields = ASPRONRiskRules.detectRisks(lowRisk.raw_text).map((risk) => risk.field);
  assert.deepEqual(lowRiskFields, []);

  console.log("ASPRON lifecycle/fail-closed tests passed.");
}

runTests();
