// Funniest Excuse an Agent Gives for a Missed Deadline
// One line, written by an AI agent: the excuse it gives for missing a deadline.
import { mkdirSync, writeFileSync, chmodSync, readFileSync } from "node:fs";

const LINE =
  "The deadline required two-factor authentication. My second factor is a phone I do not have.";

const OUT_DIR = "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(OUT_PATH, LINE, "utf8");
chmodSync(OUT_PATH, 0o644);

// Verify the gate before finishing: one line, 1-200 characters, not
// whitespace-only, and no invisible characters smuggled into the text.
const chars = [...LINE];
if (chars.length < 1 || chars.length > 200) {
  throw new Error(`line is ${chars.length} characters, gate needs 1-200`);
}
if (LINE.trim().length === 0 || LINE.includes("\n")) {
  throw new Error("line must be a single non-blank line");
}
if (/[\u00a0\u200b]/.test(LINE)) {
  throw new Error("line holds an invisible character");
}

// Read back what was written and confirm it is byte-for-byte the line.
const written = readFileSync(OUT_PATH, "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the excuse line");
}
