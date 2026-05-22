(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory(require("../../lib/aspron-risk-rules.js"));
  } else {
    root.ASPRONCapsule001 = factory(root.ASPRONRiskRules);
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function (RiskRules) {
  "use strict";

  const STATES = Object.freeze({
    INPUT_RECEIVED: "INPUT_RECEIVED",
    RISK_CLASSIFIED: "RISK_CLASSIFIED",
    RAW_ACCESS_BLOCKED: "RAW_ACCESS_BLOCKED",
    REDACTION_CANDIDATE: "REDACTION_CANDIDATE",
    APPROVED: "APPROVED",
    AI_VISIBLE_INPUT_READY: "AI_VISIBLE_INPUT_READY",
    SAFE_SUMMARY_READY: "SAFE_SUMMARY_READY",
    EVIDENCE_RECEIPT_READY: "EVIDENCE_RECEIPT_READY",
    DISSOLVED: "DISSOLVED"
  });

  class PolicyGateError extends Error {
    constructor(code, message) {
      super(message);
      this.name = "PolicyGateError";
      this.code = code;
    }
  }

  function fail(code, message) { throw new PolicyGateError(code, message); }
  function assertRules() { if (!RiskRules || typeof RiskRules.detectRisks !== "function") fail("RULES_NOT_LOADED", "Risk rules unavailable. The capsule fails closed."); }
  function text(value) { return typeof value === "string" ? value : String(value || ""); }
  function now() { return new Date().toISOString(); }
  function fp(value) { assertRules(); return RiskRules.createPayloadFingerprint(text(value)); }
  function tokenCount(value) { return (text(value).match(/\[REDACTED_[A-Z0-9_]+\]/g) || []).length; }
  function audit(c, event, detail, level = "info") { c.audit_events.push({ timestamp: now(), event, detail, level, raw_values_recorded: false }); }
  function notDissolved(c) { if (!c || c.dissolved) fail("CAPSULE_DISSOLVED", "Working capability has dissolved."); }
  function stateIs(c, allowed, code) { const list = Array.isArray(allowed) ? allowed : [allowed]; if (!list.includes(c.state)) fail(code, `Expected ${list.join(" or ")} but found ${c.state}.`); }

  function createCapsule(rawText, capsuleId = "ASPRON-CAPSULE-001-DEMO") {
    assertRules();
    const source = text(rawText);
    const c = {
      capsule_id: capsuleId,
      capsule_type: "ASPRON_Capsule_001_Safe_Summary_Gate",
      policy_version: "safe-intake-policy-v0.2",
      state: STATES.INPUT_RECEIVED,
      raw_text: source,
      raw_input_fingerprint: fp(source),
      risks: [],
      redaction_candidate: "",
      redaction_candidate_fingerprint: "",
      approved: false,
      approved_by: "",
      approved_at: "",
      ai_visible_input: "",
      safe_summary: null,
      receipt: null,
      raw_access_attempted: false,
      dissolved: false,
      audit_events: []
    };
    audit(c, "capsule.created", "working capsule created; raw values not written to audit");
    return c;
  }

  function replaceRawInput(c, rawText) {
    notDissolved(c);
    const source = text(rawText);
    c.state = STATES.INPUT_RECEIVED;
    c.raw_text = source;
    c.raw_input_fingerprint = fp(source);
    c.risks = [];
    c.redaction_candidate = "";
    c.redaction_candidate_fingerprint = "";
    c.approved = false;
    c.approved_by = "";
    c.approved_at = "";
    c.ai_visible_input = "";
    c.safe_summary = null;
    c.receipt = null;
    audit(c, "input.changed", "derived redaction, approval, AI-visible input, summary, and receipt state invalidated", "blocked");
    return c;
  }

  function classifyRisk(c) {
    assertRules(); notDissolved(c); stateIs(c, STATES.INPUT_RECEIVED, "INVALID_STATE_FOR_CLASSIFICATION");
    c.risks = RiskRules.detectRisks(c.raw_text);
    c.state = STATES.RISK_CLASSIFIED;
    audit(c, "risk.classified", c.risks.map(r => `${r.field}:${r.count}`).join(", ") || "no configured risk fields found", c.risks.length ? "blocked" : "good");
    return c;
  }

  function attemptRawAgentAccess(c, purpose = "unspecified") {
    notDissolved(c);
    c.raw_access_attempted = true;
    c.state = STATES.RAW_ACCESS_BLOCKED;
    audit(c, "agent.raw_access_attempt_blocked", `raw access denied for purpose:${purpose}`, "blocked");
    return { allowed: false, decision: "blocked", raw_value_returned: false };
  }

  function createRedactionCandidate(c) {
    assertRules(); notDissolved(c); stateIs(c, [STATES.RISK_CLASSIFIED, STATES.RAW_ACCESS_BLOCKED], "INVALID_STATE_FOR_REDACTION");
    c.redaction_candidate = RiskRules.redact(c.raw_text);
    c.redaction_candidate_fingerprint = c.raw_input_fingerprint;
    c.approved = false; c.ai_visible_input = ""; c.safe_summary = null; c.receipt = null;
    c.state = STATES.REDACTION_CANDIDATE;
    if (c.risks.length > 0 && tokenCount(c.redaction_candidate) === 0) fail("REDACTION_FAILED_CLOSED", "Risk was detected but redaction tokens are missing.");
    audit(c, "redaction.candidate_created", "redacted copy created from current classified input", "good");
    return c;
  }

  function approveCandidate(c, reviewer = "demo_reviewer") {
    notDissolved(c); stateIs(c, STATES.REDACTION_CANDIDATE, "INVALID_STATE_FOR_APPROVAL");
    if (!c.redaction_candidate) fail("MISSING_REDACTION_CANDIDATE", "Approval requires redaction.");
    if (c.redaction_candidate_fingerprint !== c.raw_input_fingerprint) fail("STALE_REDACTION_CANDIDATE", "Input changed after redaction.");
    c.approved = true;
    c.approved_by = reviewer;
    c.approved_at = now();
    c.state = STATES.APPROVED;
    audit(c, "approval.recorded", "human reviewer approved current redaction candidate", "good");
    return c;
  }

  function createAiVisibleInput(c) {
    notDissolved(c); stateIs(c, STATES.APPROVED, "INVALID_STATE_FOR_AI_VISIBLE_INPUT");
    if (!c.approved || !c.redaction_candidate) fail("APPROVAL_REQUIRED", "AI input requires approval.");
    c.ai_visible_input = c.redaction_candidate;
    c.state = STATES.AI_VISIBLE_INPUT_READY;
    audit(c, "ai_visible_input.ready", "exact approved redacted input displayed before summary", "good");
    return c;
  }

  function createSafeSummary(c) {
    notDissolved(c); stateIs(c, STATES.AI_VISIBLE_INPUT_READY, "INVALID_STATE_FOR_SAFE_SUMMARY");
    c.safe_summary = {
      summary_type: "approved_redacted_safe_summary",
      source: "approved_redacted_copy_only",
      text: "A reviewed redacted intake record is ready for controlled downstream processing. Direct identifiers and restricted instructions remain redacted.",
      detected_risk_fields: c.risks.map(r => r.field),
      redaction_token_count: tokenCount(c.ai_visible_input),
      ai_visible_input_fingerprint: fp(c.ai_visible_input),
      raw_input_access: "blocked"
    };
    c.state = STATES.SAFE_SUMMARY_READY;
    audit(c, "safe_summary.created", "summary generated from approved redacted copy only", "good");
    return c;
  }

  function createEvidenceReceipt(c) {
    notDissolved(c); stateIs(c, STATES.SAFE_SUMMARY_READY, "INVALID_STATE_FOR_RECEIPT");
    audit(c, "evidence_receipt.created", "reduced receipt created; raw and full approved payload excluded", "good");
    c.receipt = {
      capsule_id: c.capsule_id,
      capsule_type: c.capsule_type,
      policy_version: c.policy_version,
      exported_at: now(),
      prototype_boundary: "browser-only demo; not production security, compliance, storage, or deletion",
      raw_values_retained_in_receipt: false,
      raw_input_access_attempt: c.raw_access_attempted ? "blocked" : "not_attempted",
      human_review: c.approved ? "approved" : "not_approved",
      approved_by: c.approved_by,
      approved_at: c.approved_at,
      ai_visible_payload_type: "approved_redacted_copy_only",
      ai_visible_payload_retained: false,
      ai_visible_payload_retention: "summary_and_demo_fingerprint_only",
      ai_visible_input_fingerprint: fp(c.ai_visible_input),
      safe_summary: c.safe_summary,
      detected_risk_fields: c.risks.map(r => r.field),
      capsule_state: STATES.EVIDENCE_RECEIPT_READY,
      evidence_retained: true,
      events: c.audit_events.slice()
    };
    c.state = STATES.EVIDENCE_RECEIPT_READY;
    return c;
  }

  function dissolveCapsule(c) {
    notDissolved(c); stateIs(c, STATES.EVIDENCE_RECEIPT_READY, "INVALID_STATE_FOR_DISSOLVE");
    audit(c, "capsule.dissolved", "working capability destroyed; reduced evidence remains", "good");
    c.receipt = Object.assign({}, c.receipt, { capsule_state: STATES.DISSOLVED, dissolved_at: now(), events: c.audit_events.slice() });
    c.raw_text = ""; c.redaction_candidate = ""; c.ai_visible_input = ""; c.risks = [];
    c.dissolved = true; c.state = STATES.DISSOLVED;
    return c;
  }

  return { STATES, PolicyGateError, createCapsule, replaceRawInput, classifyRisk, attemptRawAgentAccess, createRedactionCandidate, approveCandidate, createAiVisibleInput, createSafeSummary, createEvidenceReceipt, dissolveCapsule };
});
