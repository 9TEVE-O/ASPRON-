#!/usr/bin/env node

/**
 * ASPRON durable assurance control plane tests.
 *
 * Dependency-free Node test runner for the non-dissolving assurance layer:
 * policy-decision records, lineage, agent handoff constraints, rollback
 * manifests, and evidence-retained dissolution.
 *
 * Run with:
 *
 *   node tests/assurance-control-plane.test.js
 */

const assert = require("node:assert/strict");

const Assurance = require("../lib/aspron-assurance-control-plane.js");

function createCompleteRecord() {
  let record = Assurance.createAssuranceRecord({
    run: {
      run_id: "run-aspron-assurance-001",
      capsule_id: "ASPRON-CAPSULE-001",
      capsule_type: "safe_summary_gate",
      tenant_id: "demo-tenant",
      user_id: "demo-user",
      controller_id: "aspron-controller-v0",
      policy_version: "demo-policy-v0.1",
      prompt_version: "safe-summary-prompt-v0.1",
      model_version: "no-hosted-model-demo",
      tool_versions: {
        browser_demo: "v0"
      },
      started_at: "2026-05-27T00:00:00.000Z"
    },
    compliance_obligations: [
      {
        obligation_id: "ASPRON-OBL-RAW-NO-AI-001",
        source: "ASPRON internal product boundary",
        control_requirement: "Raw, unreviewed, unsafe, or unapproved content must not enter AI-visible processing.",
        runtime_enforcement_point: "ai_boundary",
        evidence_required: ["policy_decision_record", "lineage_graph", "reduced_receipt"]
      }
    ],
    evidence_receipt_id: "aspron_receipt_demo_assurance_001"
  });

  for (const enforcementPoint of [
    "upload",
    "classification",
    "redaction",
    "approval",
    "ai_boundary",
    "evidence_receipt",
    "dissolution"
  ]) {
    record = Assurance.addPolicyDecision(record, {
      enforcement_point: enforcementPoint,
      decision: "allow",
      reason: `${enforcementPoint} satisfied demo contract`,
      created_at: "2026-05-27T00:01:00.000Z",
      evidence_required: ["audit_event"]
    });
  }

  record = Assurance.addArtifact(record, {
    artifact_id: "artifact-raw-001",
    artifact_type: "raw_original",
    classification: "restricted",
    approval_state: "not_approved",
    ai_visible: false,
    storage_location: "demo://restricted/raw-original",
    retention_rule: "demo_raw_retention_not_for_ai",
    created_at: "2026-05-27T00:02:00.000Z"
  });

  record = Assurance.addArtifact(record, {
    artifact_id: "artifact-redacted-001",
    artifact_type: "approved_ai_input",
    parent_artifact_ids: ["artifact-raw-001"],
    classification: "approved_redacted",
    approval_state: "approved",
    ai_visible: true,
    storage_location: "demo://approved/ai-input",
    retention_rule: "demo_approved_input_retention",
    created_at: "2026-05-27T00:03:00.000Z"
  });

  record = Assurance.addArtifact(record, {
    artifact_id: "artifact-prompt-001",
    artifact_type: "model_prompt",
    parent_artifact_ids: ["artifact-redacted-001"],
    classification: "approved_redacted",
    approval_state: "approved",
    ai_visible: true,
    storage_location: "demo://model-boundary/prompt-metadata-only",
    retention_rule: "demo_prompt_metadata_only",
    created_at: "2026-05-27T00:04:00.000Z"
  });

  record = Assurance.addAgentHandoff(record, {
    handoff_id: "handoff-planner-executor-001",
    from_agent_id: "controller",
    to_agent_id: "safe-summary-executor",
    task: "Create summary from approved redacted input only.",
    authority_scope: "execute_approved_step_only",
    allowed_tools: ["approved_redacted_reader"],
    evidence_required: ["policy_decision_record", "lineage_artifact_id"],
    deadline: "2026-05-27T00:10:00.000Z"
  });

  record = Assurance.attachRollbackManifest(record, {
    rollback_manifest_id: "rollback-aspron-assurance-001",
    affected_policy_versions: ["demo-policy-v0.1"],
    affected_prompt_versions: ["safe-summary-prompt-v0.1"],
    affected_model_versions: ["no-hosted-model-demo"],
    affected_tool_versions: ["browser_demo:v0"],
    affected_data_ids: ["artifact-raw-001", "artifact-redacted-001", "artifact-prompt-001"],
    affected_embedding_ids: [],
    affected_output_ids: ["aspron_receipt_demo_assurance_001"],
    affected_exports: [],
    revocation_actions: ["mark_receipt_revoked_or_superseded", "disable_capsule_class_if_policy_gate_fails"],
    rebuild_actions: ["rebuild_from_approved_redacted_artifacts_only"],
    client_notification_required: false,
    human_review_required: true,
    post_incident_evidence: ["incident_review_required_for_production"]
  });

  return record;
}

function assertCompleteRecordPasses() {
  const record = createCompleteRecord();
  assert.deepEqual(Assurance.validateAssuranceRecord(record), []);
  assert.equal(Assurance.assertAssuranceReady(record), true);
}

function assertDissolutionRetainsAssurance() {
  const dissolved = Assurance.dissolveWithAssurance(createCompleteRecord(), {
    dissolved_at: "2026-05-27T00:30:00.000Z",
    reason: "demo assurance contract completed"
  });

  assert.equal(dissolved.run.state, "DISSOLVED");
  assert.equal(dissolved.run.dissolved, true);
  assert.equal(dissolved.dissolution_record.capability_destroyed, true);
  assert.equal(dissolved.dissolution_record.evidence_retained, true);
  assert.equal(dissolved.dissolution_record.run_graph_retained, true);
  assert.equal(dissolved.dissolution_record.rollback_manifest_retained, true);
  assert.equal(dissolved.dissolution_record.raw_values_retained, false);
}

function assertMissingPolicyDecisionFailsClosed() {
  const record = createCompleteRecord();
  record.policy_decisions = record.policy_decisions.filter((decision) => decision.enforcement_point !== "ai_boundary");

  const errors = Assurance.validateAssuranceRecord(record);
  assert.ok(
    errors.includes("missing policy decision for enforcement point: ai_boundary"),
    `expected missing ai_boundary error, got ${JSON.stringify(errors)}`
  );
  assert.throws(() => Assurance.assertAssuranceReady(record), /not ready/);
}

function assertRawArtifactCannotBecomeAiVisible() {
  let record = createCompleteRecord();
  record = Assurance.addArtifact(record, {
    artifact_id: "artifact-raw-bypass-001",
    artifact_type: "raw_original",
    classification: "restricted",
    approval_state: "not_approved",
    ai_visible: true,
    storage_location: "demo://restricted/raw-original",
    created_at: "2026-05-27T00:05:00.000Z"
  });

  const errors = Assurance.validateAssuranceRecord(record);
  assert.ok(
    errors.some((error) => error.includes("raw or non-approved artifact cannot be AI-visible")),
    `expected raw AI-visible denial, got ${JSON.stringify(errors)}`
  );
}

function assertAgentCannotDelegateAuthority() {
  let record = createCompleteRecord();
  record = Assurance.addAgentHandoff(record, {
    handoff_id: "handoff-tool-laundering-001",
    from_agent_id: "executor",
    to_agent_id: "retriever",
    task: "Get raw source because executor is blocked.",
    authority_scope: "delegate_authority",
    allowed_tools: ["raw_source_reader"],
    evidence_required: ["handoff_trace"]
  });

  const errors = Assurance.validateAssuranceRecord(record);
  assert.ok(
    errors.some((error) => error.includes("agents cannot delegate authority directly")),
    `expected direct delegation denial, got ${JSON.stringify(errors)}`
  );
}

function assertRollbackManifestRequired() {
  const record = createCompleteRecord();
  record.rollback_manifest = null;

  const errors = Assurance.validateAssuranceRecord(record);
  assert.ok(
    errors.includes("rollback_manifest is required before dissolution"),
    `expected rollback requirement, got ${JSON.stringify(errors)}`
  );
}

function runTests() {
  assertCompleteRecordPasses();
  assertDissolutionRetainsAssurance();
  assertMissingPolicyDecisionFailsClosed();
  assertRawArtifactCannotBecomeAiVisible();
  assertAgentCannotDelegateAuthority();
  assertRollbackManifestRequired();

  console.log("ASPRON assurance control plane tests passed.");
}

runTests();
