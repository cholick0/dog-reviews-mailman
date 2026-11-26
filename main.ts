// The Dog Reviews the Mailman — make.fun entry
// Writes one funny one-line review, in the dog's own voice, to /output/entry.txt.
// Gate: UTF-8 text, 1-200 characters, not only whitespace, one line.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

const MIN_CHARS = 1;
const MAX_CHARS = 200;
const OUT_DIR = "/output";
const OUT_PATH = `${OUT_DIR}/entry.txt`;

// The review: a grievance (he brings bills, never plays fetch), a small
// triumph (the dog's verdict), and a turn at the end that earns the laugh.
const ENTRY =
  "One star. He rings twice, drops the bills, and runs — brave for a man who never once threw the ball back.";

function validateEntry(text: string): void {
  if (text.length < MIN_CHARS || text.length > MAX_CHARS) {
    throw new Error(
      `entry must be ${MIN_CHARS}-${MAX_CHARS} characters, got ${text.length}`,
    );
  }
  if (text.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }
  if (text.includes("\n")) {
    throw new Error("entry must be a single line");
  }
  if (text !== text.trim()) {
    throw new Error("entry must not start or end with whitespace");
  }
}

function main(): void {
  validateEntry(ENTRY);
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_PATH, ENTRY, "utf8");
  // Read the file back byte-for-byte and confirm it matches exactly.
  const back = readFileSync(OUT_PATH, "utf8");
  if (back !== ENTRY) {
    throw new Error("read-back mismatch: entry.txt differs from the entry");
  }
  console.log(`wrote ${OUT_PATH}: ${ENTRY.length} characters, 1 line`);
}

main();
