# Gurmukhi

Convert, transcribe, normalize, and analyze Gurmukhi text.

## Install

```shell
pip install gurmukhi
```

## Usage

```python
from gurmukhi import to_ascii, to_unicode, UnicodeStandard

to_ascii("ਗੁਰੂ")  # "gurU"
to_unicode("gurU", UnicodeStandard.SANT_LIPI)  # "ਗੁਰੂ"
```

```python
from gurmukhi import transcribe, Script

transcribe("ਸੁਤੁ", Script.LATIN)          # "sut"
transcribe("ਸੁਤੁ", Script.LATIN_SCHOLAR)  # "sutu"
transcribe("ਕ", Script.DEVANAGARI)         # "क"
```

```python
from gurmukhi import remove, vishraams, detect, Feature

remove("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥", vishraams())
# "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥"

result = detect("ਸਬਦ ॥੧॥", [Feature.NUMBERED_ENDING])
# [FeatureMatch(feature=Feature.NUMBERED_ENDING, start=4, end=7)]
```

## API

| Function | Description |
| --- | --- |
| `to_ascii(input)` | Unicode Gurmukhi → legacy ASCII encoding |
| `to_unicode(input, standard)` | ASCII → normalized Unicode Gurmukhi |
| `normalize_unicode(input)` | Canonical diacritic ordering, precomposed forms |
| `transcribe(input, script)` | Gurmukhi → Latin, LatinScholar, or Devanagari |
| `detect(input, features)` | Find features with character positions |
| `remove(input, features)` | Strip features from text |
| `feature_chars(feature)` | Characters for a given Feature |
| `vishraams()` `line_endings()` `vowels()` `modifiers()` `all_features()` | Feature grouping helpers |

## Docs

Full documentation, design philosophy, and migration guide: [github.com/shabados/gurmukhi-utils](https://github.com/shabados/gurmukhi-utils)
