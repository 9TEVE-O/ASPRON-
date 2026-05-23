#!/usr/bin/env node

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const htmlPath = path.join(
  __dirname,
  "..",
  "02_PRODUCTION",
  "ASPRON_Capsule_001_Safe_Summary_Gate",
  "index.html"
);

const html = fs.readFileSync(htmlPath, "utf8");

assert.ok(html.includes("Receipt boundary:"), "Capsule 001 UI must show a receipt boundary label");
assert.ok(html.includes("demo reduced evidence only"), "Capsule 001 UI must state the receipt is demo reduced evidence only");
assert.ok(html.includes("Not signed"), "Capsule 001 UI must state the receipt is not signed");
assert.ok(html.includes("not append-only"), "Capsule 001 UI must state the receipt is not append-only");
assert.ok(html.includes("not production-verifiable"), "Capsule 001 UI must state the receipt is not production-verifiable");
assert.ok(html.includes("not cryptographic integrity"), "Capsule 001 UI must state the receipt is not cryptographic integrity");
assert.ok(html.includes("receiptSummary"), "Capsule 001 UI must include a readable receipt summary panel");
assert.ok(html.includes("Receipt maturity:"), "Receipt summary must expose receipt maturity");
assert.ok(html.includes("Signed:"), "Receipt summary must expose signing state");
assert.ok(html.includes("Append-only:"), "Receipt summary must expose append-only state");
assert.ok(html.includes("Production-verifiable:"), "Receipt summary must expose production verification state");
assert.ok(html.includes("Raw values recorded:"), "Receipt summary must expose raw values recording state");
assert.ok(html.includes("Raw input recorded:"), "Receipt summary must expose raw input recording state");
assert.ok(html.includes("Full AI payload recorded:"), "Receipt summary must expose full AI payload recording state");

console.log("Capsule 001 UI receipt boundary test passed.");
