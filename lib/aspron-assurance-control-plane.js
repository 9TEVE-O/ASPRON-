(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ASPRONAssuranceControlPlane = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const REQUIRED_RUN_FIELDS = Object.freeze([
    "run_id",
    "capsule_id",
    "tenant_id",
    "user_id",
    "controller_id",
    "policy_version",
    "capsule_type",
    "started_at"
  ]);

  const REQUIRED_POLICY_DECISION_FIELDS = Object.freeze([
    "decision_id",
    "run_id",
    "policy_version",
    "enforcement_point",
    "decision",
    "reason",
    "created_at"
  ]);

  const REQUIRED_ARTIFACT_FIELDS = Object.freeze([
    "artifact_id",
    "artifact_type",
    "classification",
    "approval_state",
    "hash",
    "storage_location",
    "created_at"
  ]);

  const REQUIRED_AGENT_HANDOFF_FIELDS = Object.freeze([
    "handoff_id",
    "from_agent_id",
    "to_agent_id",
    "run_id",
    "task",
    "authority_scope",
    "allowed_tools",
    "evidence_required"
  ]);

  const REQUIRED_ROLLBACK_FIELDS = Object.freeze([
    "rollback_manifest_id",
    "run_id",
    "affected_policy_versions",
    "affected_prompt_versions",
    "affected_model_versions",
    "affected_tool_versions",
    "affected_data_ids",
    "affected_output_ids",
    "revocation_actions",
    "rebuild_actions",
    "human_review_required"
  ]);

  const VALID_POLICY_DECISIONS = Object.freeze([
    "allow",
    "block",
    "escalate",
    "refuse"
  ]);

  const AI_VISIBLE_ARTIFACT_TYPES = Object.freeze([
    "approved_ai_input",
    "chunk",
    "embedding",
    "retrieval_context",
    "model_prompt",
    "model_output",
    "client_export"
  ]);

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function toText(value) {
    return typeof value === "string" ? value : String(value || "");
  }

  function isPlainObject(value) {
    return Boolean(value) && typeof value === "object" && !Array.isArray(value);
  }

  function hasValue(object, field) {
    return Object.prototype.hasOwnProperty.call(object, field) && object[field] !== undefined && object[field] !== null && object[field] !== "";
  }

  function pushMissing(errors, prefix, object, fields) {
    for (const field of fields) {
      if (!hasValue(object, field)) {
        errors.push(`${prefix} missing required field: ${field}`);
      }
    }
  }

  function createDemoHash(seed) {
    const source = toText(seed);
    let hash = 2166136261;

    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return `demo-fnv1a-32:${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function createRunGraph(options) {
    const runId = toText(options.run_id || options.runId || `aspron_run_${createDemoHash(Date.now()).slice(-8)}`);
    const startedAt = toText(options.started_at || options.startedAt || new Date().toISOString());

    return {
      run_id: runId,
      capsule_id: toText(options.capsule_id || options.capsuleId || "ASPRON-CAPSULE"),
      capsule_type: toText(options.capsule_type || options.capsuleType || "safe_summary_gate"),
      tenant_id: toText(options.tenant_id || options.tenantId || "demo_tenant"),
      user_id: toText(options.user_id || options.userId || "demo_user"),
      controller_id: toText(options.controller_id || options.controllerId || "aspron_controller_v0"),
      policy_version: toText(options.policy_version || options.policyVersion || "demo-policy-v0.1"),
      prompt_version: toText(options.prompt_version || options.promptVersion || "demo-prompt-v0.1"),
      model_version: toText(options.model_version || options.modelVersion || "no-hosted-model-demo"),
      tool_versions: clone(options.tool_versions || options.toolVersions || {}),
      started_at: startedAt,
      state: "RUN_OPEN",
      dissolved: false
    };
  }

  function createPolicyDecisionRecord(options) {
    const decision = toText(options.decision || "block");
    return {
      decision_id: toText(options.decision_id || options.decisionId || `pdr_${createDemoHash(JSON.stringify(options)).slice(-8)}`),
      run_id: toText(options.run_id || options.runId),
      policy_version: toText(options.policy_version || options.policyVersion),
      enforcement_point: toText(options.enforcement_point || options.enforcementPoint),
      decision,
      reason: toText(options.reason),
      created_at: toText(options.created_at || options.createdAt || new Date().toISOString()),
      obligation_ids: clone(options.obligation_ids || options.obligationIds || []),
      evidence_required: clone(options.evidence_required || options.evidenceRequired || []),
      fail_closed: options.fail_closed !== false
    };
  }

  function createArtifactRecord(options) {
    const artifactType = toText(options.artifact_type || options.artifactType);
    const parentArtifactIds = clone(options.parent_artifact_ids || options.parentArtifactIds || []);
    const approvalState = toText(options.approval_state || options.approvalState || "not_approved");
    const classification = toText(options.classification || "unknown");

    return {
      artifact_id: toText(options.artifact_id || options.artifactId || `artifact_${createDemoHash(JSON.stringify(options)).slice(-8)}`),
      artifact_type: artifactType,
      parent_artifact_ids: parentArtifactIds,
      classification,
      approval_state: approvalState,
      ai_visible: options.ai_visible === true,
      hash: toText(options.hash || createDemoHash([artifactType, parentArtifactIds.join("|"), classification, approvalState].join("::"))),
      storage_location: toText(options.storage_location || options.storageLocation || "demo://reduced-metadata-only"),
      retention_rule: toText(options.retention_rule || options.retentionRule || "demo_retention_rule_required_before_production"),
      revocation_status: toText(options.revocation_status || options.revocationStatus || "active"),
      downstream_dependents: clone(options.downstream_dependents || options.downstreamDependents || []),
      created_at: toText(options.created_at || options.createdAt || new Date().toISOString())
    };
  }

  function createAgentHandoffRecord(options) {
    return {
      handoff_id: toText(options.handoff_id || options.handoffId || `handoff_${createDemoHash(JSON.stringify(options)).slice(-8)}`),
      run_id: toText(options.run_id || options.runId),
      from_agent_id: toText(options.from_agent_id || options.fromAgentId),
      to_agent_id: toText(options.to_agent_id || options.toAgentId),
      task: toText(options.task),
      authority_scope: toText(options.authority_scope || options.authorityScope),
      allowed_tools: clone(options.allowed_tools || options.allowedTools || []),
      evidence_required: clone(options.evidence_required || options.evidenceRequired || []),
      deadline: toText(options.deadline || ""),
      created_at: toText(options.created_at || options.createdAt || new Date().toISOString())
    };
  }

  function createRollbackManifest(options) {
    return {
      rollback_manifest_id: toText(options.rollback_manifest_id || options.rollbackManifestId || `rollback_${createDemoHash(JSON.stringify(options)).slice(-8)}`),
      run_id: toText(options.run_id || options.runId),
      affected_policy_versions: clone(options.affected_policy_versions || options.affectedPolicyVersions || []),
      affected_prompt_versions: clone(options.affected_prompt_versions || options.affectedPromptVersions || []),
      affected_model_versions: clone(options.affected_model_versions || options.affectedModelVersions || []),
      affected_tool_versions: clone(options.affected_tool_versions || options.affectedToolVersions || []),
      affected_data_ids: clone(options.affected_data_ids || options.affectedDataIds || []),
      affected_embedding_ids: clone(options.affected_embedding_ids || options.affectedEmbeddingIds || []),
      affected_output_ids: clone(options.affected_output_ids || options.affectedOutputIds || []),
      affected_exports: clone(options.affected_exports || options.affectedExports || []),
      revocation_actions: clone(options.revocation_actions || options.revocationActions || []),
      rebuild_actions: clone(options.rebuild_actions || options.rebuildActions || []),
      client_notification_required: Boolean(options.client_notification_required || options.clientNotificationRequired),
      human_review_required: options.human_review_required !== false && options.humanReviewRequired !== false,
      post_incident_evidence: clone(options.post_incident_evidence || options.postIncidentEvidence || [])
    };
  }

  function createAssuranceRecord(options) {
    const run = createRunGraph(options.run || options);
    return {
      assurance_record_type: "aspron_durable_assurance_control_plane",
      assurance_maturity: "design_contract_v0",
      run,
      compliance_obligations: clone(options.compliance_obligations || options.complianceObligations || []),
      policy_decisions: clone(options.policy_decisions || options.policyDecisions || []),
      lineage_artifacts: clone(options.lineage_artifacts || options.lineageArtifacts || []),
      agent_handoffs: clone(options.agent_handoffs || options.agentHandoffs || []),
      tool_calls: clone(options.tool_calls || options.toolCalls || []),
      observability_events: clone(options.observability_events || options.observabilityEvents || []),
      rollback_manifest: options.rollback_manifest || options.rollbackManifest || null,
      evidence_receipt_id: toText(options.evidence_receipt_id || options.evidenceReceiptId),
      dissolution_record: options.dissolution_record || options.dissolutionRecord || null
    };
  }

  function addPolicyDecision(record, decision) {
    const next = clone(record);
    next.policy_decisions.push(createPolicyDecisionRecord(Object.assign({}, decision, {
      run_id: decision.run_id || next.run.run_id,
      policy_version: decision.policy_version || next.run.policy_version
    })));
    return next;
  }

  function addArtifact(record, artifact) {
    const next = clone(record);
    next.lineage_artifacts.push(createArtifactRecord(artifact));
    return next;
  }

  function addAgentHandoff(record, handoff) {
    const next = clone(record);
    next.agent_handoffs.push(createAgentHandoffRecord(Object.assign({}, handoff, {
      run_id: handoff.run_id || next.run.run_id
    })));
    return next;
  }

  function attachRollbackManifest(record, manifest) {
    const next = clone(record);
    next.rollback_manifest = createRollbackManifest(Object.assign({}, manifest, {
      run_id: manifest.run_id || next.run.run_id
    }));
    return next;
  }

  function hasPolicyDecisionAt(record, enforcementPoint, allowedDecisions) {
    const allowed = allowedDecisions || VALID_POLICY_DECISIONS;
    return record.policy_decisions.some((decision) => (
      decision.run_id === record.run.run_id &&
      decision.policy_version === record.run.policy_version &&
      decision.enforcement_point === enforcementPoint &&
      allowed.includes(decision.decision)
    ));
  }

  function validatePolicyDecisions(record, errors) {
    const requiredEnforcementPoints = [
      "upload",
      "classification",
      "redaction",
      "approval",
      "ai_boundary",
      "evidence_receipt",
      "dissolution"
    ];

    record.policy_decisions.forEach((decision, index) => {
      pushMissing(errors, `policy_decisions[${index}]`, decision, REQUIRED_POLICY_DECISION_FIELDS);
      if (!VALID_POLICY_DECISIONS.includes(decision.decision)) {
        errors.push(`policy_decisions[${index}] invalid decision: ${decision.decision}`);
      }
      if (decision.run_id !== record.run.run_id) {
        errors.push(`policy_decisions[${index}] run_id does not match run graph`);
      }
      if (decision.policy_version !== record.run.policy_version) {
        errors.push(`policy_decisions[${index}] policy_version does not match run graph`);
      }
    });

    for (const enforcementPoint of requiredEnforcementPoints) {
      if (!hasPolicyDecisionAt(record, enforcementPoint)) {
        errors.push(`missing policy decision for enforcement point: ${enforcementPoint}`);
      }
    }
  }

  function validateLineage(record, errors) {
    const artifactIds = new Set();

    record.lineage_artifacts.forEach((artifact, index) => {
      pushMissing(errors, `lineage_artifacts[${index}]`, artifact, REQUIRED_ARTIFACT_FIELDS);
      if (artifactIds.has(artifact.artifact_id)) {
        errors.push(`lineage_artifacts[${index}] duplicate artifact_id: ${artifact.artifact_id}`);
      }
      artifactIds.add(artifact.artifact_id);

      if (artifact.ai_visible && !AI_VISIBLE_ARTIFACT_TYPES.includes(artifact.artifact_type)) {
        errors.push(`lineage_artifacts[${index}] raw or non-approved artifact cannot be AI-visible`);
      }

      if (
        artifact.artifact_type === "approved_ai_input" &&
        artifact.approval_state !== "approved"
      ) {
        errors.push(`lineage_artifacts[${index}] approved_ai_input must have approval_state=approved`);
      }

      if (
        AI_VISIBLE_ARTIFACT_TYPES.includes(artifact.artifact_type) &&
        artifact.ai_visible &&
        artifact.approval_state !== "approved" &&
        artifact.artifact_type !== "model_output" &&
        artifact.artifact_type !== "client_export"
      ) {
        errors.push(`lineage_artifacts[${index}] AI-visible input artifact must be approved`);
      }
    });

    record.lineage_artifacts.forEach((artifact, index) => {
      for (const parentId of artifact.parent_artifact_ids || []) {
        if (!artifactIds.has(parentId)) {
          errors.push(`lineage_artifacts[${index}] missing parent artifact: ${parentId}`);
        }
      }
    });

    const hasRawOriginal = record.lineage_artifacts.some((artifact) => artifact.artifact_type === "raw_original");
    const hasApprovedInput = record.lineage_artifacts.some((artifact) => artifact.artifact_type === "approved_ai_input" && artifact.approval_state === "approved");
    const hasModelPrompt = record.lineage_artifacts.some((artifact) => artifact.artifact_type === "model_prompt");

    if (!hasRawOriginal) {
      errors.push("lineage must include a raw_original artifact metadata record");
    }
    if (!hasApprovedInput) {
      errors.push("lineage must include an approved_ai_input artifact before model boundary");
    }
    if (!hasModelPrompt) {
      errors.push("lineage must include a model_prompt artifact that records model-boundary input metadata");
    }
  }

  function validateAgentHandoffs(record, errors) {
    record.agent_handoffs.forEach((handoff, index) => {
      pushMissing(errors, `agent_handoffs[${index}]`, handoff, REQUIRED_AGENT_HANDOFF_FIELDS);
      if (!Array.isArray(handoff.allowed_tools)) {
        errors.push(`agent_handoffs[${index}] allowed_tools must be an array`);
      }
      if (!Array.isArray(handoff.evidence_required) || handoff.evidence_required.length === 0) {
        errors.push(`agent_handoffs[${index}] evidence_required must be non-empty`);
      }
      if (handoff.authority_scope === "delegate_authority") {
        errors.push(`agent_handoffs[${index}] agents cannot delegate authority directly`);
      }
    });
  }

  function validateRollback(record, errors) {
    if (!isPlainObject(record.rollback_manifest)) {
      errors.push("rollback_manifest is required before dissolution");
      return;
    }

    pushMissing(errors, "rollback_manifest", record.rollback_manifest, REQUIRED_ROLLBACK_FIELDS);

    if (!Array.isArray(record.rollback_manifest.affected_data_ids) || record.rollback_manifest.affected_data_ids.length === 0) {
      errors.push("rollback_manifest must identify affected data ids");
    }
    if (!Array.isArray(record.rollback_manifest.revocation_actions) || record.rollback_manifest.revocation_actions.length === 0) {
      errors.push("rollback_manifest must include revocation actions");
    }
    if (!Array.isArray(record.rollback_manifest.rebuild_actions) || record.rollback_manifest.rebuild_actions.length === 0) {
      errors.push("rollback_manifest must include rebuild actions");
    }
  }

  function validateCompliance(record, errors) {
    if (!Array.isArray(record.compliance_obligations) || record.compliance_obligations.length === 0) {
      errors.push("at least one compliance obligation mapping is required");
      return;
    }

    record.compliance_obligations.forEach((obligation, index) => {
      const required = ["obligation_id", "control_requirement", "runtime_enforcement_point", "evidence_required"];
      pushMissing(errors, `compliance_obligations[${index}]`, obligation, required);
    });
  }

  function validateAssuranceRecord(record) {
    const errors = [];

    if (!isPlainObject(record)) {
      return ["assurance record must be an object"];
    }

    if (!isPlainObject(record.run)) {
      return ["run graph is required"];
    }

    pushMissing(errors, "run", record.run, REQUIRED_RUN_FIELDS);

    if (!Array.isArray(record.policy_decisions)) {
      errors.push("policy_decisions must be an array");
    }
    if (!Array.isArray(record.lineage_artifacts)) {
      errors.push("lineage_artifacts must be an array");
    }
    if (!Array.isArray(record.agent_handoffs)) {
      errors.push("agent_handoffs must be an array");
    }

    if (Array.isArray(record.policy_decisions)) {
      validatePolicyDecisions(record, errors);
    }
    if (Array.isArray(record.lineage_artifacts)) {
      validateLineage(record, errors);
    }
    if (Array.isArray(record.agent_handoffs)) {
      validateAgentHandoffs(record, errors);
    }

    validateCompliance(record, errors);
    validateRollback(record, errors);

    if (!hasValue(record, "evidence_receipt_id")) {
      errors.push("evidence_receipt_id is required before dissolution");
    }

    if (record.run.dissolved && !isPlainObject(record.dissolution_record)) {
      errors.push("dissolved runs require a dissolution_record");
    }

    return errors;
  }

  function assertAssuranceReady(record) {
    const errors = validateAssuranceRecord(record);
    if (errors.length) {
      const error = new Error(`ASPRON assurance record is not ready:\n- ${errors.join("\n- ")}`);
      error.validationErrors = errors;
      throw error;
    }
    return true;
  }

  function dissolveWithAssurance(record, options) {
    assertAssuranceReady(record);

    const next = clone(record);
    const dissolvedAt = toText((options && (options.dissolved_at || options.dissolvedAt)) || new Date().toISOString());

    next.run.state = "DISSOLVED";
    next.run.dissolved = true;
    next.dissolution_record = {
      dissolved_at: dissolvedAt,
      capability_destroyed: true,
      evidence_retained: true,
      run_graph_retained: true,
      rollback_manifest_retained: true,
      raw_values_retained: false,
      reason: toText(options && options.reason || "bounded capsule completed")
    };

    return next;
  }

  return Object.freeze({
    requiredRunFields: REQUIRED_RUN_FIELDS,
    createDemoHash,
    createRunGraph,
    createPolicyDecisionRecord,
    createArtifactRecord,
    createAgentHandoffRecord,
    createRollbackManifest,
    createAssuranceRecord,
    addPolicyDecision,
    addArtifact,
    addAgentHandoff,
    attachRollbackManifest,
    validateAssuranceRecord,
    assertAssuranceReady,
    dissolveWithAssurance
  });
});
