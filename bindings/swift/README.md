# Gurmukhi

Convert, transcribe, normalize, and analyze Gurmukhi text.

## Install

```swift
// Package.swift
.package(url: "https://github.com/shabados/gurmukhi.git", from: "1.0.0")
```

## Usage

```swift
import Gurmukhi

toAscii(input: "ਗੁਰੂ") // "gurU"
toUnicode(input: "gurU", standard: .santLipi) // "ਗੁਰੂ"
```

```swift
transcribe(input: "ਸੁਤੁ", script: .latin)          // "sut"
transcribe(input: "ਸੁਤੁ", script: .latinScholar)  // "sutu"
transcribe(input: "ਕ", script: .devanagari)         // "क"
```

```swift
remove(input: "ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥", features: vishraams())
// "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥"

let result = detect(input: "ਸਬਦ ॥੧॥", features: [.numberedEnding])
// [FeatureMatch(feature: .numberedEnding, start: 4, end: 7)]
```

## API

| Function | Description |
| --- | --- |
| `toAscii(input:)` | Unicode Gurmukhi → legacy ASCII encoding |
| `toUnicode(input:standard:)` | ASCII → normalized Unicode Gurmukhi |
| `normalizeUnicode(input:)` | Canonical diacritic ordering, precomposed forms |
| `transcribe(input:script:)` | Gurmukhi → Latin, LatinScholar, or Devanagari |
| `detect(input:features:)` | Find features with character positions |
| `remove(input:features:)` | Strip features from text |
| `featureChars(feature:)` | Characters for a given Feature |
| `vishraams()` `lineEndings()` `vowels()` `modifiers()` `allFeatures()` | Feature grouping helpers |

## Docs

Full documentation, design philosophy, and migration guide: [github.com/shabados/gurmukhi-utils](https://github.com/shabados/gurmukhi-utils)
