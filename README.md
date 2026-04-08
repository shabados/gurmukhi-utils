# Gurmukhi

Convert, transcribe, normalize, and analyze Gurmukhi text. Successor to [gurmukhi-utils](https://github.com/shabados/gurmukhi-utils/tree/3.2.2). Rust core with bindings for JavaScript, Python, Ruby, Kotlin, and Swift.

## Install

**Rust**

```shell
cargo add gurmukhi
```

**JavaScript** ([npm](https://www.npmjs.com/package/gurmukhi))

```shell
npm i gurmukhi
```

Uses WASM — works in Node, Bun, and browsers.

**Python** ([PyPI](https://pypi.org/project/gurmukhi/))

```shell
pip install gurmukhi
```

**Ruby** ([RubyGems](https://rubygems.org/gems/gurmukhi))

```shell
gem install gurmukhi
```

**Kotlin** (Gradle)

```kotlin
implementation("com.shabados:gurmukhi:1.0.0")
```

**Swift** (SPM)

```swift
.package(url: "https://github.com/shabados/gurmukhi.git", from: "1.0.0")
```

## API

All languages get the same functions from a single Rust core. Examples below show Rust and JavaScript — other languages follow the same signatures with idiomatic naming (see [naming conventions](#naming-conventions)).

### to_ascii

Converts Gurmukhi Unicode to the legacy ASCII encoding used by older fonts and databases.

```rust
use gurmukhi::ascii::to_ascii;

to_ascii("ਗੁਰੂ".into()) // "gurU"
to_ascii("ਸਬਦ".into())  // "sbd"
```

```javascript
import { toAscii } from 'gurmukhi'

toAscii('ਗੁਰੂ') // "gurU"
```

### to_unicode

Converts ASCII-encoded (or mixed) Gurmukhi to normalized Unicode. Requires a [`UnicodeStandard`](#unicodestandard) — Sant Lipi is recommended for better rendering across fonts.

```rust
use gurmukhi::unicode::{to_unicode, UnicodeStandard};

to_unicode("gurU".into(), UnicodeStandard::SantLipi) // "ਗੁਰੂ"
```

```javascript
import { toUnicode, UnicodeStandard } from 'gurmukhi'

toUnicode('gurU', UnicodeStandard.SantLipi) // "ਗੁਰੂ"
```

#### UnicodeStandard

| Variant             | Use                                                                 |
| ------------------- | ------------------------------------------------------------------- |
| `SantLipi`          | Recommended. Preserves yayya variants using variation selectors.    |
| `UnicodeConsortium` | Official Unicode encoding. Destructive for open-top yayya variants. |

### normalize_unicode

Normalizes Gurmukhi Unicode to canonical form — orders diacritics, sorts variation selectors, and replaces decomposed vowel sequences with precomposed equivalents.

Called internally by `to_ascii` and `transcribe`, but also available directly when working with raw Unicode Gurmukhi input.

```rust
use gurmukhi::unicode::normalize::normalize_unicode;

normalize_unicode("ਅੌ".into()) // "ਔ" (decomposed → precomposed)
```

```javascript
import { normalizeUnicode } from 'gurmukhi'

normalizeUnicode('ਅੌ') // "ਔ"
```

### transcribe

Renders Gurmukhi text in another script. Each [`Script`](#script) target is an opinionated conversion for a specific audience.

```rust
use gurmukhi::transcribe::{transcribe, Script};

transcribe("ਸੁਤੁ".into(), Script::LatinScholar) // "sutu"
transcribe("ਸੁਤੁ".into(), Script::Latin)        // "sut"
transcribe("ਜਾਨ".into(), Script::Latin)          // "jān"
transcribe("ਕ".into(), Script::Devanagari)        // "क"
```

```javascript
import { transcribe, Script } from 'gurmukhi'

transcribe('ਸੁਤੁ', Script.LatinScholar) // "sutu"
transcribe('ਸੁਤੁ', Script.Latin) // "sut"
transcribe('ਕ', Script.Devanagari) // "क"
```

#### Script

| Variant        | Audience         | Behavior                                                                                          |
| -------------- | ---------------- | ------------------------------------------------------------------------------------------------- |
| `Latin`        | English speakers | Pronunciation-aware. Applies haha rules, drops grammatical vowels. For following along in sangat. |
| `LatinScholar` | Scholars         | Mechanical ISO/IAST-like mapping. Every orthographic distinction preserved.                       |
| `Devanagari`   | Hindi readers    | Pure character mapping. No pronunciation rules applied.                                           |

### Feature detection

Detect and remove semantic features in Gurmukhi text. Features are composable — pass any combination.

```rust
use gurmukhi::feature::{remove, vishraams};

// Remove all vishram markers
remove("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥".into(), vishraams())
// "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥"
```

```javascript
import { remove, vishraams, detect, Feature } from 'gurmukhi'

remove('ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥', vishraams())
// "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥"

// Detect features — returns character positions you can use with string.slice()
const input = 'ਸਬਦ ॥੧॥'
const match = detect(input, [Feature.NumberedEnding])[0]
// { feature: "NumberedEnding", start: 4, end: 7 }
input.slice(match.start, match.end) // "॥੧॥"
```

#### Feature variants

| Group        | Variants                                                  |
| ------------ | --------------------------------------------------------- |
| Vishrams     | `VishramHeavy` (;) `VishramMedium` (,) `VishramLight` (.) |
| Line endings | `RahaoEnding` `NumberedEnding` `BareEnding`               |
| Vowels       | `VowelSign` `VowelCarrier`                                |
| Modifiers    | `Nukta` `Adhak` `Nasal` `Accent` `Visarga`                |

#### Grouping helpers

Instead of remembering individual Feature variants, these functions return preset lists you can pass directly to `detect` or `remove`:

| Helper          | Returns                                       |
| --------------- | --------------------------------------------- |
| `vishraams()`   | `[VishramHeavy, VishramMedium, VishramLight]` |
| `lineEndings()` | `[RahaoEnding, NumberedEnding, BareEnding]`   |
| `vowels()`      | `[VowelSign, VowelCarrier]`                   |
| `modifiers()`   | `[Nukta, Adhak, Nasal, Accent, Visarga]`      |
| `allFeatures()` | All 13 variants                               |

`featureChars(feature)` returns the actual characters associated with a given Feature variant.

## Naming conventions

| Language                  | Convention   | Example                         |
| ------------------------- | ------------ | ------------------------------- |
| Rust, Python, Ruby        | `snake_case` | `to_ascii`, `normalize_unicode` |
| JavaScript, Kotlin, Swift | `camelCase`  | `toAscii`, `normalizeUnicode`   |

## Migrating from older packages

If you're upgrading from `gurmukhi-utils` (JavaScript v2/v3), `gurmukhiutils` (Python), or `gurmukhi_utils` (Ruby), see [MIGRATING.md](MIGRATING.md) for a full mapping of old functions to new ones.

## Resources

- Unicode [Online Tools](https://unicode.org/resources/online-tools.html)
  - [Unicode Code Converter](https://r12a.github.io/app-conversion/)
  - [Unicode Breaks (Segmentation)](https://util.unicode.org/UnicodeJsps/breaks.jsp)

## Community

The easiest way to communicate is via [GitHub issues](https://github.com/shabados/gurmukhi-utils/issues). Please search for similar issues before opening a new one.

Join us on [Slack](https://chat.shabados.com/).
