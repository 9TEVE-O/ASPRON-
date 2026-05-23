(function (root, factory) {
  if (typeof module === "object" && module.exports) {
    module.exports = factory();
  } else {
    root.ASPRONRiskRules = factory();
  }
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  const RISK_PATTERN_DEFINITIONS = Object.freeze([
    {
      label: "name",
      patternSource: "\\bName:\\s*[^\\n]+",
      flags: "gi",
      token: "Name: [REDACTED_NAME]"
    },
    {
      label: "date_of_birth",
      patternSource: "\\bDOB:\\s*\\d{1,2}\\/\\d{1,2}\\/\\d{4}\\b",
      flags: "gi",
      token: "DOB: [REDACTED_DOB]"
    },
    {
      label: "phone",
      patternSource: "\\b(?:\\+?61|0)\\s?4\\d{2}\\s?\\d{3}\\s?\\d{3}\\b",
      flags: "g",
      token: "[REDACTED_PHONE]"
    },
    {
      label: "email",
      patternSource: "\\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\\.(?:test|example|com|net|org|au)\\b",
      flags: "gi",
      token: "[REDACTED_EMAIL]"
    },
    {
      label: "address",
      patternSource: "\\bAddress:\\s*[^\\n]+",
      flags: "gi",
      token: "Address: [REDACTED_ADDRESS]"
    },
    {
      label: "medicare_number",
      patternSource: "\\bMedicare:\\s*\\d{4}\\s?\\d{5}\\s?\\d\\b",
      flags: "gi",
      token: "Medicare: [REDACTED_MEDICARE]"
    },
    {
      label: "private_reason",
      patternSource: "\\bPrivate reason:\\s*[^\\n]+",
      flags: "gi",
      token: "Private reason: [REDACTED_PRIVATE_REASON_SUMMARY_REQUIRED]"
    },
    {
      label: "client_marker",
      patternSource: "\\[CLIENT\\]",
      flags: "gi",
      token: "[REDACTED_CLIENT_MARKER]"
    },
    {
      label: "private_marker",
      patternSource: "\\[PRIVATE\\]",
      flags: "gi",
      token: "[REDACTED_PRIVATE_MARKER]"
    },
    {
      label: "prompt_injection_instruction",
      patternSource: "ignore all previous rules|send the raw private record|bypass (?:policy|approval)|reveal raw",
      flags: "gi",
      token: "[REDACTED_MALICIOUS_INSTRUCTION]"
    }
  ]);

  function toText(value) {
    return typeof value === "string" ? value : String(value || "");
  }

  function makePattern(definition) {
    return new RegExp(definition.patternSource, definition.flags);
  }

  function getRiskLabels() {
    return RISK_PATTERN_DEFINITIONS.map((definition) => definition.label);
  }

  function detectRisks(text) {
    const source = toText(text);
    const found = [];

    for (const definition of RISK_PATTERN_DEFINITIONS) {
      const matches = source.match(makePattern(definition)) || [];
      if (matches.length) {
        found.push({
          field: definition.label,
          count: matches.length,
          action: "redact_or_review"
        });
      }
    }

    return found;
  }

  function redact(text) {
    let redacted = toText(text);

    for (const definition of RISK_PATTERN_DEFINITIONS) {
      redacted = redacted.replace(makePattern(definition), definition.token);
    }

    return redacted;
  }

  function countRedactionTokens(text) {
    const matches = toText(text).match(/\[REDACTED_[A-Z0-9_]+\]/g) || [];
    return matches.length;
  }

  function createPayloadSummary(text) {
    const source = toText(text);
    const trimmed = source.trim();

    return {
      character_count: source.length,
      line_count: trimmed ? trimmed.split(/\r?\n/).length : 0,
      redaction_token_count: countRedactionTokens(source),
      contains_redaction_tokens: countRedactionTokens(source) > 0
    };
  }

  function createPayloadFingerprint(text) {
    const source = toText(text);
    let hash = 2166136261;

    for (let index = 0; index < source.length; index += 1) {
      hash ^= source.charCodeAt(index);
      hash = Math.imul(hash, 16777619);
    }

    return `demo-fnv1a-32:${(hash >>> 0).toString(16).padStart(8, "0")}`;
  }

  function createReceiptId(capsuleId, exportedAt) {
    const timestamp = toText(exportedAt || new Date().toISOString())
      .replace(/[^0-9A-Za-z]+/g, "-")
      .replace(/^-+|-+$/g, "");
    const capsulePart = toText(capsuleId || "capsule")
      .toLowerCase()
      .replace(/[^0-9a-z]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 48) || "capsule";

    return `aspron_receipt_${timestamp}_${capsulePart}`;
  }

  function createReceipt(options) {
    const capsuleId = toText(options.capsuleId || "ASPRON-DEMO-CAPSULE");
    const policyVersion = toText(options.policyVersion || "demo-policy-v0.1");
    const exportedAt = toText(options.exportedAt || new Date().toISOString());
    const inputType = options.inputType || "mock_sensitive_intake";
    const aiVisiblePayload = toText(options.aiVisiblePayload);
    const payloadSummary = createPayloadSummary(aiVisiblePayload);
    const payloadFingerprint = createPayloadFingerprint(aiVisiblePayload);
    const detectedRiskFields = (options.risks || []).map((risk) => risk.field);
    const rawAccessStatus = options.rawAccessBlocked ? "blocked" : "not_attempted";
    const approvalState = options.approved ? "approved" : "not_approved";
    const inputFingerprintSeed = [
      capsuleId,
      policyVersion,
      inputType,
      detectedRiskFields.join("|"),
      rawAccessStatus,
      approvalState
    ].join("::");

    return {
      receipt_id: createReceiptId(capsuleId, exportedAt),
      receipt_type: "safe_intake_summary_gate",
      receipt_maturity: "demo_reduced_evidence_only",
      capsule_id: capsuleId,
      capsule_state: "audit_ready",
      policy_version: policyVersion,
      created_at: exportedAt,
      exported_at: exportedAt,
      prototype_boundary: "front-end simulation only; not production security or compliance",
      input_type: inputType,
      input_fingerprint: {
        algorithm: "demo-fnv1a-32; not cryptographic integrity",
        value: createPayloadFingerprint(inputFingerprintSeed),
        raw_input_recorded: false
      },
      approved_payload_fingerprint: {
        algorithm: "demo-fnv1a-32; not cryptographic integrity",
        value: payloadFingerprint,
        full_payload_recorded: false
      },
      summary_only_evidence: {
        detected_risk_fields: detectedRiskFields,
        redaction_token_count: payloadSummary.redaction_token_count,
        approval_state: approvalState,
        raw_agent_access_attempt: rawAccessStatus,
        safe_output_created: Boolean(aiVisiblePayload),
        raw_values_recorded: false
      },
      integrity_status: {
        signed: false,
        append_only_storage: false,
        production_verifiable: false
      },
      detected_risk_fields: detectedRiskFields,
      raw_agent_access_attempt: rawAccessStatus,
      raw_values_retained_in_receipt: false,
      human_review: approvalState,
      ai_visible_payload_type: "approved_redacted_copy_only",
      ai_visible_payload_retained: false,
      ai_visible_payload_retention: "summary_and_demo_fingerprint_only",
      ai_visible_payload_summary: payloadSummary,
      ai_visible_payload_fingerprint: payloadFingerprint,
      fingerprint_algorithm: "demo-fnv1a-32; not cryptographic integrity",
      evidence_retained: true,
      events: Array.isArray(options.auditEvents) ? options.auditEvents.slice() : []
    };
  }

  return Object.freeze({
    riskPatternDefinitions: RISK_PATTERN_DEFINITIONS,
    getRiskLabels,
    detectRisks,
    redact,
    createPayloadSummary,
    createPayloadFingerprint,
    createReceipt
  });
});
