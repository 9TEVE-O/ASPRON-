#!/usr/bin/env node

const assert = require("node:assert/strict");
const Capsule = require("../02_PRODUCTION/ASPRON_Capsule_001_Safe_Summary_Gate/capsule-001-policy.js");
const Assurance = require("../lib/aspron-assurance-control-plane.js");

const RAW = [
  "Name: Jordan Ellis",
  "Phone: 0400 123 456",
  "Email: jordan.ellis@example.test",
  "Private reason: sensitive private narrative."
].join("\n");

function mustBlock(fn, code) {
  assert.throws(fn, (error) => error && error.name === "PolicyGateError" && error.code === code);
}

function testTamperedRedactionCandidateCannotBeApproved() {
  const c = Capsule.createCapsule(RAW);
  Capsule.classifyRisk(c);
  Capsule.createRedactionCandidate(c);
  c.redaction_candidate = c.raw_text;

  mustBlock(() => Capsule.approveCandidate(c, "reviewer_001"), "TAMPERED_REDACTION_CANDIDATE");
  assert.equal(c.approved, false);
  assert.equal(c.ai_visible_input, "");
}

function testTamperingAfterApprovalCannotBecomeAiVisible() {
  const c = Capsule.createCapsule(RAW);
  Capsule.classifyRisk(c);
  Capsule.createRedactionCandidate(c);
  Capsule.approveCandidate(c, "reviewer_001");
  c.redaction_candidate = c.raw_text;

  mustBlock(() => Capsule.createAiVisibleInput(c), "TAMPERED_REDACTION_CANDIDATE");
  assert.equal(c.ai_visible_input, "");
}

function testRawPurposeCannotLeakIntoReceipt() {
  const c = Capsule.createCapsule(RAW);
  Capsule.classifyRisk(c);
  Capsule.attemptRawAgentAccess(c, RAW);
  Capsule.createRedactionCandidate(c);
  Capsule.approveCandidate(c, "reviewer_001");
  Capsule.createAiVisibleInput(c);
  Capsule.createSafeSummary(c);
  Capsule.createEvidenceReceipt(c);

  const receiptText = JSON.stringify(c.receipt);
  assert.ok(!receiptText.includes("jordan.ellis@example.test"));
  assert.ok(!receiptText.includes("0400 123 456"));
  assert.ok(!receiptText.includes("sensitive private narrative"));
}

function createCompleteRecord() {
  let record = Assurance.createAssuranceRecord({
    run: {
      run_id: "run-security-regression-001",
      capsule_id: "ASPRON-CAPSULE-001",
      capsule_type: "safe_summary_gate",
      tenant_id: "demo-tenant",
      user_id: "demo-user",
      controller_id: "aspron-controller-v0",
      policy_version: "demo-policy-v0.1",
      prompt_version: "safe-summary-prompt-v0.1",
      model_version: "no-hosted-model-demo",
      tool_versions: { browser_demo: "v0" },
      started_at: "2026-08-25T00:00:00.000Z"
    },
    compliance_obligations: [{
      obligation_id: "ASPRON-OBL-RAW-NO-AI-001",
      control_requirement: "Raw content must not enter AI-visible processing.",
      runtime_enforcement_point: "ai_boundary",
      evidence_required: ["policy_decision_record", "lineage_graph"]
    }],
    evidence_receipt_id: "aspron_receipt_security_regression_001"
  });

  for (const enforcementPoint of ["upload", "classification", "redaction", "approval", "ai_boundary", "evidence_receipt", "dissolution"]) {
    record = Assurance.addPolicyDecision(record, {
      enforcement_point: enforcementPoint,
      decision: "allow",
      reason: `${enforcementPoint} satisfied test contract`,
      created_at: "2026-08-25T00:01:00.000Z"
    });
  }

  record = Assurance.addArtifact(record, {
    artifact_id: "artifact-raw-001",
    artifact_type: "raw_original",
    classification: "restricted",
    approval_state: "not_approved",
    ai_visible: false,
    storage_location: "demo://restricted/raw-original",
    created_at: "2026-08-25T00:02:00.000Z"
  });

  record = Assurance.addArtifact(record, {
    artifact_id: "artifact-approved-001",
    artifact_type: "approved_ai_input",
    parent_artifact_ids: ["artifact-raw-001"],
    classification: "approved_redacted",
    approval_state: "approved",
    ai_visible: true,
    storage_location: "demo://approved/ai-input",
    created_at: "2026-08-25T00:03:00.000Z"
  });

  record = Assurance.addArtifact(record, {
    artifact_id: "artifact-prompt-001",
    artifact_type: "model_prompt",
    parent_artifact_ids: ["artifact-approved-001"],
    classification: "approved_redacted",
    approval_state: "approved",
    ai_visible: true,
    storage_location: "demo://model-boundary/prompt",
    created_at: "2026-08-25T00:04:00.000Z"
  });

  record = Assurance.attachRollbackManifest(record, {
    rollback_manifest_id: "rollback-security-regression-001",
    affected_policy_versions: ["demo-policy-v0.1"],
    affected_prompt_versions: ["safe-summary-prompt-v0.1"],
    affected_model_versions: ["no-hosted-model-demo"],
    affected_tool_versions: ["browser_demo:v0"],
    affected_data_ids: ["artifact-raw-001", "artifact-approved-001", "artifact-prompt-001"],
    affected_output_ids: ["aspron_receipt_security_regression_001"],
    revocation_actions: ["revoke"],
    rebuild_actions: ["rebuild"],
    human_review_required: true
  });

  return record;
}

function testModelPromptMustDescendFromApprovedInput() {
  const record = createCompleteRecord();
  const prompt = record.lineage_artifacts.find((artifact) => artifact.artifact_id === "artifact-prompt-001");
  prompt.parent_artifact_ids = ["artifact-raw-001"];

  const errors = Assurance.validateAssuranceRecord(record);
  assert.ok(errors.includes("model_prompt raw ancestry must pass through approved_ai_input: artifact-prompt-001"), JSON.stringify(errors));
  assert.throws(() => Assurance.assertAssuranceReady(record), /not ready/);
}

function testMixedRawAndApprovedPromptParentsFail() {
  const record = createCompleteRecord();
  const prompt = record.lineage_artifacts.find((artifact) => artifact.artifact_id === "artifact-prompt-001");
  prompt.parent_artifact_ids = ["artifact-approved-001", "artifact-raw-001"];

  const errors = Assurance.validateAssuranceRecord(record);
  assert.ok(errors.includes("model_prompt raw ancestry must pass through approved_ai_input: artifact-prompt-001"), JSON.stringify(errors));
}

function testLegitimateLineageStillPasses() {
  assert.deepEqual(Assurance.validateAssuranceRecord(createCompleteRecord()), []);
}

function run() {
  testTamperedRedactionCandidateCannotBeApproved();
  testTamperingAfterApprovalCannotBecomeAiVisible();
  testRawPurposeCannotLeakIntoReceipt();
  testModelPromptMustDescendFromApprovedInput();
  testMixedRawAndApprovedPromptParentsFail();
  testLegitimateLineageStillPasses();
  console.log("ASPRON security boundary regression tests passed.");
}

run();
