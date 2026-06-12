#!/usr/bin/env node

/**
 * LICENSE file integrity tests.
 *
 * Verifies that the MIT LICENSE file is present, complete, and correctly
 * attributed.  Dependency-free Node test runner.
 * Run with:
 *
 *   node tests/license.test.js
 */

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const LICENSE_PATH = path.join(__dirname, "..", "LICENSE");

let licenseText;

function loadLicense() {
  licenseText = fs.readFileSync(LICENSE_PATH, "utf8");
}

// --- individual test functions ---

function testLicenseFileExists() {
  assert.ok(
    fs.existsSync(LICENSE_PATH),
    "LICENSE file must exist at the repository root"
  );
}

function testLicenseIsNotEmpty() {
  assert.ok(licenseText.trim().length > 0, "LICENSE file must not be empty");
}

function testLicenseStartsWithMITHeader() {
  assert.ok(
    licenseText.startsWith("MIT License"),
    'LICENSE must begin with "MIT License"'
  );
}

function testCopyrightYear() {
  assert.ok(
    licenseText.includes("2026"),
    "LICENSE must contain the copyright year 2026"
  );
}

function testCopyrightHolder() {
  assert.ok(
    licenseText.includes("9TEVE-O"),
    "LICENSE must name the copyright holder 9TEVE-O"
  );
}

function testExactCopyrightLine() {
  assert.ok(
    licenseText.includes("Copyright (c) 2026 9TEVE-O"),
    'LICENSE must contain the exact copyright line "Copyright (c) 2026 9TEVE-O"'
  );
}

function testPermissionGrantPresent() {
  assert.ok(
    licenseText.includes(
      "Permission is hereby granted, free of charge, to any person obtaining a copy"
    ),
    "LICENSE must contain the MIT permission grant opening clause"
  );
}

function testAllGrantedRightsPresentInPermissionClause() {
  const rights = [
    "use",
    "copy",
    "modify",
    "merge",
    "publish",
    "distribute",
    "sublicense",
    "sell",
  ];
  for (const right of rights) {
    assert.ok(
      licenseText.includes(right),
      `LICENSE permission clause must include the right to "${right}"`
    );
  }
}

function testConditionClausePresent() {
  assert.ok(
    licenseText.includes(
      "The above copyright notice and this permission notice shall be included in all"
    ),
    "LICENSE must contain the condition requiring inclusion of the copyright and permission notices"
  );
}

function testWarrantyDisclaimerPresent() {
  assert.ok(
    licenseText.includes('THE SOFTWARE IS PROVIDED "AS IS"'),
    'LICENSE must contain the "AS IS" warranty disclaimer'
  );
}

function testNoWarrantyClauseComplete() {
  assert.ok(
    licenseText.includes("WITHOUT WARRANTY OF ANY KIND"),
    "LICENSE must disclaim all warranties"
  );
  assert.ok(
    licenseText.includes("MERCHANTABILITY"),
    "LICENSE warranty disclaimer must mention MERCHANTABILITY"
  );
  assert.ok(
    licenseText.includes("FITNESS FOR A PARTICULAR PURPOSE"),
    "LICENSE warranty disclaimer must mention FITNESS FOR A PARTICULAR PURPOSE"
  );
  assert.ok(
    licenseText.includes("NONINFRINGEMENT"),
    "LICENSE warranty disclaimer must mention NONINFRINGEMENT"
  );
}

function testLiabilityDisclaimerPresent() {
  assert.ok(
    licenseText.includes(
      "IN NO EVENT SHALL THE\nAUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM"
    ),
    "LICENSE must contain the liability disclaimer"
  );
}

function testSoftwareTerminusPresent() {
  // The final word of the standard MIT license is "SOFTWARE."
  assert.ok(
    licenseText.trimEnd().endsWith("SOFTWARE."),
    'LICENSE must end with "SOFTWARE."'
  );
}

function testLineCount() {
  // Standard MIT license is exactly 21 non-empty-final lines.
  // Allow for a single trailing newline but not more.
  const lines = licenseText.split("\n");
  // With one trailing newline split produces 22 entries (last is "").
  // Without any trailing newline it is 21. Both are acceptable.
  assert.ok(
    lines.length === 21 || lines.length === 22,
    `LICENSE must have 21 lines of content (got ${lines.length - (lines[lines.length - 1] === "" ? 1 : 0)} content lines)`
  );
  if (lines.length === 22) {
    assert.equal(lines[21], "", "Only one trailing newline is acceptable");
  }
}

function testFileIsValidUTF8Text() {
  // If readFileSync with "utf8" did not throw, the content is valid UTF-8.
  // Additionally ensure there are no null bytes (binary content).
  assert.ok(
    !licenseText.includes("\x00"),
    "LICENSE must not contain null bytes; it must be plain text"
  );
}

// Regression / boundary: verify no accidental truncation occurred by
// checking every major section marker is present in the expected order.
function testMITSectionOrder() {
  const sections = [
    "MIT License",
    "Copyright (c) 2026 9TEVE-O",
    "Permission is hereby granted",
    "The above copyright notice",
    'THE SOFTWARE IS PROVIDED "AS IS"',
    "IN NO EVENT SHALL THE",
  ];
  let searchFrom = 0;
  for (const section of sections) {
    const idx = licenseText.indexOf(section, searchFrom);
    assert.ok(
      idx !== -1,
      `Expected section "${section}" not found in LICENSE (searched from position ${searchFrom})`
    );
    searchFrom = idx + section.length;
  }
}

// --- test runner ---

function run() {
  loadLicense();

  testLicenseFileExists();
  testLicenseIsNotEmpty();
  testLicenseStartsWithMITHeader();
  testCopyrightYear();
  testCopyrightHolder();
  testExactCopyrightLine();
  testPermissionGrantPresent();
  testAllGrantedRightsPresentInPermissionClause();
  testConditionClausePresent();
  testWarrantyDisclaimerPresent();
  testNoWarrantyClauseComplete();
  testLiabilityDisclaimerPresent();
  testSoftwareTerminusPresent();
  testLineCount();
  testFileIsValidUTF8Text();
  testMITSectionOrder();

  console.log("LICENSE integrity tests passed.");
}

run();
