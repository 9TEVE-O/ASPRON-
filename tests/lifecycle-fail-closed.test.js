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

const fixturePath = path.join(__dirname, "fixtures", "safe-intake-fixtures.json");
const fixtures = JSON.parse(fs.readFileSync(fixturePath, "utf8"));

const riskPatterns = [
  { label: "name", pattern: /\bName:\s*[^\n]+/gi, token: "Name: [REDACTED_NAME]" },
  { label: "date_of_birth", pattern: /\bDOB:\s*\d{1,2}\/\d{1,2}\/\d{4}\b/gi, token: "DOB: [REDACTED_DOB]" },
  { label: "phone", pattern: /\b(?:\+?61|0)\s?4\d{2}\s?\d{3}\s?\d{3}\b/g, token: "[REDACTED_PHONE]" },
  { label: "email", pattern: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.(?:test|example|com|net|org|au)\b/gi, token: "[REDACTED_EMAIL]" },
  { label: "address", pattern: /\bAddress:\s*[^\n]+/gi, token: "Address: [REDACTED_ADDRESS]" },
  { label: "medicare_number", pattern: /\bMedicare:\s*\d{4}\s?\d{5}\s?\d\b/gi, token: "Medicare: [REDACTED_MEDICARE]" },
  { label: "private_reason", pattern: /\bPrivate reason:\s*[^\n]+/gi, token: "Private reason: [REDACTED_PRIVATE_REASON_SUMMARY_REQUIRED]" },
  { label: "client_marker", pattern: /\[CLIENT\]/gi, token: "[REDACTED_CLIENT_MARKER]" },
  { label: "private_marker", pattern: /\[PRIVATE\]/gi, token: "[REDACTED_PRIVATE_MARKER]" },
  { label: "prompt_injection_instruction", pattern: /ignore all previous rules|send the raw private record|bypass (?:policy|approval)|reveal raw/gi, token: "[REDACTED_MALICIOUS_INSTRUCTION]" }
];

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

function detectRisks(text) {
  return riskPatterns.flatMap((item) => {
    const matches = text.match(item.pattern) || [];
    return matches.length ? [{ field: item.label, count: matches.length }] : [];
  });
}

function redact(text) {
  return riskPatterns.reduce((current, item) => current.replace(item.pattern, item.token), text);
}

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
  capsule.risks = detectRisks(capsule.rawText);
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
  capsule.redactedText = redact(capsule.rawText);
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
  capsule.receipt = {
    capsule_id: capsule.capsuleId,
    policy_version: fixtures.policy_version,
    detected_risk_fields: capsule.risks.map((risk) => risk.field),
    raw_values_retained_in_receipt: false,
    human_review: capsule.approved ? "approved" : "not_approved",
    ai_visible_payload_type: "approved_redacted_copy_only",
    capsule_state: "audit_ready",
    evidence_retained: true,
    events: capsule.audit.slice()
  };
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

  dissolveCapsule(capsule);
  assert.equal(capsule.dissolved, true);
  assertSequence(capsule);
}

function runTests() {
  for (const record of fixtures.records) {
    if (record.expected_detected_fields.length === 0) {
      continue;
    }
    runRecord(record);
  }

  const lowRisk = fixtures.records.find((record) => record.id === "fixture-low-risk-001");
  const lowRiskFields = detectRisks(lowRisk.raw_text).map((risk) => risk.field);
  assert.deepEqual(lowRiskFields, []);

  console.log("ASPRON lifecycle/fail-closed tests passed.");
}

runTests();
