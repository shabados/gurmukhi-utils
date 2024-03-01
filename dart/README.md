# Gurmukhi Utils (Dart)

Dart library for converting, analyzing, and testing [Gurmukhi](https://en.wikipedia.org/wiki/Gurmukhi) strings.

[SantLipi](https://github.com/ShabadOS/SantLipi) extensions are supported.

## Gurmukhi String Extensions

### Remove Vishraams

```dart
'ਸਭਨਾ ਜੀਆ ਕਾ, ਇਕੁ ਦਾਤਾ; ਸੋ. ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥'.removeVishraams() == 'ਸਭਨਾ ਜੀਆ ਕਾ ਇਕੁ ਦਾਤਾ ਸੋ ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥'
```

### First Letters

```dart
'ਜਿਸਨੋ ਕ੍ਰਿਪਾ ਕਰਹਿ ਤਿਨਿ ਨਾਮ ਰਤਨੁ ਪਾਇਆ ॥'.firstGurmukhiLetters() == ['ਜ', 'ਕ', 'ਕ', 'ਤ', 'ਨ', 'ਰ', 'ਪ']
```

### Split

```dart
'ਕੈਸੀ ਆਰਤੀ ਹੋਇ ॥'.splitGurmukhi() == ['ਕੈ', 'ਸੀ', ' ', 'ਆ', 'ਰ', 'ਤੀ', ' ', 'ਹੋ', 'ਇ', ' ', '॥']
```

Characters joined by Virama `੍` can be split as:

```dart
'ਅੰਮ੍ਰਿਤ'.splitGurmukhi() == ['ਅੰ', 'ਮ੍ਰਿ', 'ਤ']
```

```dart
'ਅੰਮ੍ਰਿਤ'.splitGurmukhi(splitVirama: true) == ['ਅੰ', 'ਮ੍', 'ਰਿ', 'ਤ']
```

Support SantLipi modifiers:

```dart
'ਸ︁ਯਾਮ'.splitGurmukhi(extensions: true) == ['ਸ', '︁ਯਾ', 'ਮ']
```

### Unicode Normalization

Fix Matras of `ੳ`, `ਅ`, and `ੲ`:

```dart
'ਅਾਦਿ'.normalizeGurmukhi() == 'ਆਦਿ'
```

Fix Order of Diacritics:

```dart
'ਕੰੁਚਰ'.normalizeGurmukhi() == 'ਕੁੰਚਰ'
```

Remove Sant Lipi Modifiers if `extensions` is not enabled:

```dart
'ਮਧ︀ਯ'.normalizeGurmukhi() == 'ਮਧ੍ਯ'
```

## Conversion

### Number to Gurmukhi

```dart
123.toGurmukhi() == '੧੨੩'
```

### Ascii to Gurmukhi

Gurmukhi Text encoded in Ascii fonts (See fonts by [Dr Kulbir Thind](https://www.gurbanifiles.net/other/Fonts_TT.zip)):

```dart
asciiToGurmukhi('goibMd imlx kI ieh qyrI brIAw') == 'ਗੋਬਿੰਦ ਮਿਲਣ ਕੀ ਇਹ ਤੇਰੀ ਬਰੀਆ'
```

Support SantLipi modifiers (See Ascii Font [OpenGurbaniAkhar](https://github.com/gurbaninow/gurmukhi-fonts)):

```dart
asciiToGurmukhi('qRsîo', extensions: true) == 'ਤ੍ਰਸ︀︁ਯੋ'
```

## Contribute

If you want to help, please get started with the [CONTRIBUTING.md](CONTRIBUTING.md) doc

## Related

Gurmukhi Utils comes in many programming languages. [Use the Gurmukhi Utils library in another language](/README.md).
