# Gurmukhi

Convert, transcribe, normalize, and analyze Gurmukhi text.

## Install

```shell
gem install gurmukhi
```

## Usage

```ruby
require "gurmukhi"

Gurmukhi.to_ascii("ਗੁਰੂ") # "gurU"
Gurmukhi.to_unicode("gurU", Gurmukhi::UnicodeStandard::SANT_LIPI) # "ਗੁਰੂ"
```

```ruby
Gurmukhi.transcribe("ਸੁਤੁ", Gurmukhi::Script::LATIN)          # "sut"
Gurmukhi.transcribe("ਸੁਤੁ", Gurmukhi::Script::LATIN_SCHOLAR)  # "sutu"
Gurmukhi.transcribe("ਕ", Gurmukhi::Script::DEVANAGARI)         # "क"
```

```ruby
Gurmukhi.remove("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥", Gurmukhi.vishraams)
# "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥"

result = Gurmukhi.detect("ਸਬਦ ॥੧॥", [Gurmukhi::Feature::NUMBERED_ENDING])
# [#<Gurmukhi::FeatureMatch feature=NUMBERED_ENDING start=4 end=7>]
```

## API

| Function | Description |
| --- | --- |
| `Gurmukhi.to_ascii(input)` | Unicode Gurmukhi → legacy ASCII encoding |
| `Gurmukhi.to_unicode(input, standard)` | ASCII → normalized Unicode Gurmukhi |
| `Gurmukhi.normalize_unicode(input)` | Canonical diacritic ordering, precomposed forms |
| `Gurmukhi.transcribe(input, script)` | Gurmukhi → Latin, LatinScholar, or Devanagari |
| `Gurmukhi.detect(input, features)` | Find features with character positions |
| `Gurmukhi.remove(input, features)` | Strip features from text |
| `Gurmukhi.feature_chars(feature)` | Characters for a given Feature |
| `Gurmukhi.vishraams` `Gurmukhi.vowels` `Gurmukhi.modifiers` `Gurmukhi.line_endings` `Gurmukhi.all_features` | Feature grouping helpers |

## Docs

Full documentation, design philosophy, and migration guide: [github.com/shabados/gurmukhi-utils](https://github.com/shabados/gurmukhi-utils)
