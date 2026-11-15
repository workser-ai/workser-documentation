#!/usr/bin/env node
/**
 * COPY DRIFT GUARD (docs/plans/documentation/PLAN.md, Phase 6).
 *
 * The facts in these pages once drifted from the product: a Free plan that no
 * longer existed, 18 roles, 20 Automations, a 20% phone markup. This catches the
 * words, not the numbers in tables; run it with `node scripts/check-copy.mjs`
 * before publishing, and read the drift table in the plan when it fires.
 *
 * It only scans customer-facing product pages. The changelog is history and is
 * left alone.
 */
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const ROOT = new URL("..", import.meta.url).pathname;
const SCAN = ["index.mdx", "ai-workforce", "code", "using", "workser-desktop", "enterprise-vs-consumer.mdx"];
const SKIP = new Set(["changelog.mdx"]);

const BANNED = [
  [/\b18 ready-made\b/i, "the hire sheet has 16 roles"],
  [/\b5 teams\b/i, "the hire sheet has 11 teams"],
  [/\b18 roles\b/i, "the hire sheet has 16 roles"],
  [/\b50 credits\b/i, "there is no Free plan and no free credits"],
  [/\bStart free\b/i, "plans are paid only"],
  [/\bFree plan\b/i, "there is no Free plan (only the no-plan state)"],
  [/\bcost \+ 20%/i, "phone calls and texts are cost + 30%"],
  [/\bStarter 20\b/i, "Starter has 10 Automations"],
  [/\bSoftware Developer\b/i, "software work is Workser Code, not a hired role"],
  [/\bneeds-you page\b/i, "the page is titled Requests"],
];

const files = [];
function walk(path) {
  const stat = statSync(path);
  if (stat.isDirectory()) {
    for (const entry of readdirSync(path)) walk(join(path, entry));
    return;
  }
  if (path.endsWith(".mdx") && !SKIP.has(path.split("/").pop())) files.push(path);
}

for (const entry of SCAN) {
  try {
    walk(join(ROOT, entry));
  } catch {
    // A path that does not exist yet is not a failure.
  }
}

let failures = 0;
for (const file of files) {
  const text = readFileSync(file, "utf8").split("\n");
  text.forEach((line, index) => {
    // A page may say a thing does NOT exist: "there is no free plan", "no Software
    // Developer role", "do not say start free". Those are the honest uses.
    if (/\bno (free plan|software developer)\b|\bdo not say\b|\bthere is no free plan\b|\bnot a free plan\b|\bnot available\b.*free plan/i.test(line)) return;
    for (const [pattern, why] of BANNED) {
      if (pattern.test(line)) {
        failures += 1;
        console.error(`${relative(ROOT, file)}:${index + 1}  ${pattern}  — ${why}`);
      }
    }
  });
}

if (failures) {
  console.error(`\n${failures} stale line(s). Fix them before publishing.`);
  process.exit(1);
}
console.log(`No stale copy in ${files.length} pages.`);
