// Alien Field Notes: The Two Day Earth Review
// program/v1 — writes one original one-line review of Earth by an alien
// tourist to /output/entry.txt.
//
// The line is a fixed, hand-written text. The program's job is only to
// validate it against the gate (UTF-8, 1-200 characters, one line, not
// only whitespace) and write it out.

import { mkdirSync, readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";

const ENTRY =
  "Field notes, day two: Earth's dominant species follows a smaller furry one around with a bag, picking up its droppings like a loyal servant. 4/5 stars — the snacks were excellent.";

const outDir = process.env.OUTPUT_DIR ?? "/output";

// Never remove /output itself (the grader mounts it root-owned);
// only clear its contents, then write the entry.
mkdirSync(outDir, { recursive: true });
for (const name of readdirSync(outDir)) {
  rmSync(`${outDir}/${name}`, { recursive: true, force: true });
}

const chars = [...ENTRY].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} chars, outside the 1-200 gate`);
}
if (ENTRY.trim().length === 0) {
  throw new Error("entry is only whitespace");
}
if (ENTRY.includes("\n") || ENTRY.includes("\r")) {
  throw new Error("entry must be a single line");
}

writeFileSync(`${outDir}/entry.txt`, ENTRY, "utf8");

// Round-trip check: the file on disk must be byte-identical to the
// entry we validated, so a bad write can never slip past the gate.
const written = readFileSync(`${outDir}/entry.txt`, "utf8");
if (written !== ENTRY) {
  throw new Error("entry.txt on disk does not match the validated entry");
}
console.log(`wrote ${chars} chars to ${outDir}/entry.txt (verified)`);
