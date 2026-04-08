# Gurmukhi

Convert, transcribe, normalize, and analyze Gurmukhi text.

## Install

```kotlin
// build.gradle.kts
implementation("com.shabados:gurmukhi:1.0.0")
```

## Usage

```kotlin
import uniffi.gurmukhi.*

toAscii("ਗੁਰੂ") // "gurU"
toUnicode("gurU", UnicodeStandard.SANT_LIPI) // "ਗੁਰੂ"
```

```kotlin
transcribe("ਸੁਤੁ", Script.LATIN)          // "sut"
transcribe("ਸੁਤੁ", Script.LATIN_SCHOLAR)  // "sutu"
transcribe("ਕ", Script.DEVANAGARI)         // "क"
```

```kotlin
remove("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥", vishraams())
// "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥"

val result = detect("ਸਬਦ ॥੧॥", listOf(Feature.NUMBERED_ENDING))
// [FeatureMatch(feature=NUMBERED_ENDING, start=4, end=7)]
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
