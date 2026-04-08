import { toUnicode } from "../generated/wasm/gurmukhi.ts";

const result = toUnicode("gurU", "SantLipi");
if (result !== "ਗੁਰੂ") {
  console.error(`FAIL: expected "ਗੁਰੂ", got "${result}"`);
  process.exit(1);
}
console.log("PASS: JS WASM");
