// Smoke test for the ubrn-generated bindings, run under Node/Bun via @ubjs/node.
// Exercises the same generated TS + Rust library that the React Native JSI
// entry point uses, without needing an emulator. Requires libgurmukhi to be
// colocated in smoke/napi/ (see mise task smoke:react-native).
import { toUnicode, transcribe, remove, vishraams, UnicodeStandard, Script } from "./napi/gurmukhi";

const checks: [string, string, string][] = [
  ["toUnicode", toUnicode("gurU", UnicodeStandard.SantLipi), "ਗੁਰੂ"],
  ["transcribe", transcribe("ਜਪੁ", Script.Latin), transcribe("ਜਪੁ", Script.Latin)],
  ["remove", remove("ਸਬਦ; ਸਬਦ", vishraams()), "ਸਬਦ ਸਬਦ"],
];

let failed = false;
for (const [name, actual, expected] of checks) {
  if (actual !== expected) {
    console.error(`FAIL: ${name} — expected "${expected}", got "${actual}"`);
    failed = true;
  }
}
if (failed) process.exit(1);
console.log("PASS: JS native (ubrn/napi)");
