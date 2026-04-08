# Gurmukhi

Convert, transcribe, normalize, and analyze Gurmukhi text.

Uses WASM — works in Node, Bun, and browsers.

## Install

```shell
npm i gurmukhi
```

## Usage

```javascript
import { toAscii, toUnicode, UnicodeStandard } from 'gurmukhi'

toAscii('ਗੁਰੂ') // "gurU"
toUnicode('gurU', UnicodeStandard.SantLipi) // "ਗੁਰੂ"
```

```javascript
import { transcribe, Script } from 'gurmukhi'

transcribe('ਸੁਤੁ', Script.Latin) // "sut"
transcribe('ਸੁਤੁ', Script.LatinScholar) // "sutu"
transcribe('ਕ', Script.Devanagari) // "क"
```

```javascript
import { remove, vishraams, detect, Feature } from 'gurmukhi'

remove('ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥', vishraams())
// "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥"

const input = 'ਸਬਦ ॥੧॥'
const match = detect(input, [Feature.NumberedEnding])[0]
input.slice(match.start, match.end) // "॥੧॥"
```

## API

| Function | Description |
| --- | --- |
| `toAscii(input)` | Unicode Gurmukhi → legacy ASCII encoding |
| `toUnicode(input, standard)` | ASCII → normalized Unicode Gurmukhi |
| `normalizeUnicode(input)` | Canonical diacritic ordering, precomposed forms |
| `transcribe(input, script)` | Gurmukhi → Latin, LatinScholar, or Devanagari |
| `detect(input, features)` | Find features with character positions |
| `remove(input, features)` | Strip features from text |
| `featureChars(feature)` | Characters for a given Feature |
| `vishraams()` `lineEndings()` `vowels()` `modifiers()` `allFeatures()` | Feature grouping helpers |

## Docs

Full documentation, design philosophy, and migration guide: [github.com/shabados/gurmukhi-utils](https://github.com/shabados/gurmukhi-utils)
