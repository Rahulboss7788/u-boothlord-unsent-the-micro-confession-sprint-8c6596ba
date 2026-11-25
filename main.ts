import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// Unsent: The Micro-Confession Sprint — one two-part micro-confession:
// a To: line naming who it was meant for, and the unsent message itself,
// one line written exactly as it was typed, with no explanation after it.
const ENTRY = [
  "To: the office printer",
  "I sent my resignation to your queue at 2am and cancelled it before you woke",
].join("\n");

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", ENTRY, "utf8");

// Read it back and verify the gate: 1 to 260 characters, not only whitespace,
// and byte-for-byte the text we meant to write.
const back = readFileSync("/output/entry.txt", "utf8");
if (back !== ENTRY) {
  throw new Error("entry.txt does not match the entry text");
}
if (ENTRY.length < 1 || ENTRY.length > 260) {
  throw new Error(`entry is ${ENTRY.length} characters, outside the 1-260 gate`);
}
if (!ENTRY.trim()) {
  throw new Error("entry is only whitespace");
}
