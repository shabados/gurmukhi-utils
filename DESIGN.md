# Design

The thinking behind gurmukhi's API surface, trade-offs, and extensibility model.

## Architecture: one language, many targets

Gurmukhi was originally implemented independently in JavaScript, Python, Ruby, and Dart. Each language had its own bugs, its own test gaps, and its own interpretation of edge cases. A fix in one language didn't automatically reach the others.

The Rust + UniFFI architecture solves this. One implementation, one test suite, one source of truth — with bindings automatically generated for JavaScript (native + WASM), Python, Ruby, Kotlin, and Swift.

**Trade-off:** we lost idiomatic per-language APIs. A Rubyist might prefer `String#to_ascii` over `Gurmukhi.to_ascii(s)`. We accepted this because correctness across languages matters more than per-language ergonomics for a library that processes sacred text. A single implementation can be reasoned about, audited, and trusted.

**Why not plain C FFI?** UniFFI gives us type-safe enums, records, and error handling across all targets. A C library with manual FFI would require each binding to hand-write enum mappings, string conversions, and error handling — exactly the divergence we were trying to eliminate.

## The transcribe function

We considered splitting into `transliterate` (mechanical character mapping) and `transcribe` (pronunciation-aware conversion). We rejected this because the distinction is an implementation detail, not a user-facing concept.

Each `Script` target is an opinionated conversion for a specific audience. Some apply pronunciation rules internally, some don't. The caller doesn't need to know or care which:

- **`Latin`** — pronunciation-aware for English speakers. Applies haha rules, drops grammatical vowels, handles hardcoded exceptions. Optimized for someone following along in sangat.
- **`LatinScholar`** — academic ISO/IAST-like transliteration. Mechanical character mapping with no pronunciation interpretation. Every orthographic distinction preserved. For scholars and linguists.
- **`Devanagari`** — pure script mapping for Hindi readers. No pronunciation rules needed because Devanagari readers already share similar conventions with Gurmukhi.

### Why not "pronounce" or "convert"?

`pronounce` implies audio or spoken output, but the output is text. It also doesn't fit the scholarly target, which deliberately preserves spelling over pronunciation. `convert` is too vague — it could mean anything. `transcribe` captures the intent: writing something across into another form.

### Mission

There is no single perfect pronunciation of Gurbani. The goal is to approximate what the majority of speakers say, giving non-readers enough confidence to follow along in sangat and ultimately learn to read Gurmukhi themselves.

### Extensibility

Adding a new script means:

1. Create a new scheme in `src/transcribe/schemes/`
2. Add a variant to the `Script` enum
3. Add a match arm in the `transcribe` function

Nothing else changes. The caller just passes a new enum value.

## Unicode standards and the SantLipi question

Gurmukhi Unicode has two competing standards for encoding yayya (ਯ) variants:

- **Unicode Consortium** uses virama + yayya (੍ਯ) for half-yayya. Many fonts and shaping engines fail to render this correctly.
- **Sant Lipi** uses variation selectors to distinguish yayya variants. Better rendering support, but not part of the official Unicode standard.

We support both via the `UnicodeStandard` enum but recommend Sant Lipi. We don't default to either — the caller should make an explicit choice, because the conversion to Unicode Consortium encoding is destructive (open-top yayya variants lose their distinction).

`normalize_unicode` is the foundation. It orders diacritics per Unicode 14.0 (left → top → bottom → right), sorts variation selectors, and composes decomposed vowel sequences. Both `to_ascii` and `transcribe` call it internally before doing their work.

## The Feature model

The old libraries had separate functions: `stripVishraams(s)`, `stripEndings(s)`, `stripAccents(s)`, `removeLineEndings(s)`, `removeVishrams(s)`. Each was a one-off with slightly different behavior and no composability.

The `Feature` enum unifies all of these into one model. A Feature is a semantic concept — "heavy vishram", "numbered line ending", "nasal modifier" — not a character set. The same two functions handle everything:

- `detect(input, features)` — returns character-index spans for integration with editors, search, and highlighting
- `remove(input, features)` — strips the specified features, cleaning up leftover whitespace

Grouping helpers (`vishraams()`, `vowels()`, `modifiers()`, `line_endings()`, `all_features()`) provide common subsets. They're convenience, not abstraction — you can always pass individual Feature variants for fine-grained control.

**Why character indices, not byte offsets?** `detect` returns character indices rather than byte offsets. Byte offsets are natural in Rust (`&input[start..end]`) but useless in every binding language — JavaScript, Python, Ruby, Kotlin, and Swift all index strings by character. Returning character indices means `string.slice(start, end)` just works in every language without conversion.

## ASCII encoding

The ASCII encoding is a legacy representation from older Gurmukhi fonts (GurmukhiAkhar, AnmolLipi). Each Gurmukhi character is mapped to an ASCII character that the font renders as the Gurmukhi glyph. It predates Unicode Gurmukhi support.

It still matters because existing databases (SikhiToTheMax and others), older Gurbani software, and archival data use this encoding. `to_ascii` and `to_unicode` bridge between the legacy and modern worlds.

**The round-trip is lossy.** Some ASCII characters map to multiple Unicode sequences depending on context (sihari positioning, vowel combinations). `to_ascii(to_unicode(s))` is not always identity. This is inherent to the encoding, not a bug.

## Future considerations

### Script detection (isGurmukhi)

The old JavaScript library had `isGurmukhi(s)` for detecting whether text is written in Gurmukhi. This is a different concern from the Feature model — Feature answers "what semantic elements exist in this Gurmukhi text", while script detection answers "what script is this text written in". A standalone `is_gurmukhi` function or a broader `detect_script` utility would be the right approach.

### Additional scripts

The `Script` enum is designed to grow. Adding a new target means implementing a scheme in `src/transcribe/schemes/`, adding an enum variant, and adding a match arm.
