# Gurmukhi Utils (Dart)

Dart library for converting, analyzing, and testing [Gurmukhi](https://en.wikipedia.org/wiki/Gurmukhi) strings.

## Gurmukhi String Extensions

### Remove Vishraams
```dart
'ਸਭਨਾ ਜੀਆ ਕਾ, ਇਕੁ ਦਾਤਾ; ਸੋ. ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥'.removeVishraams();
// 'ਸਭਨਾ ਜੀਆ ਕਾ ਇਕੁ ਦਾਤਾ ਸੋ ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥'
```

### First Letters
```dart
'ਜਿਸਨੋ ਕ੍ਰਿਪਾ ਕਰਹਿ ਤਿਨਿ ਨਾਮ ਰਤਨੁ ਪਾਇਆ ॥'.firstGurmukhiLetters();
// ['ਜ', 'ਕ', 'ਕ', 'ਤ', 'ਨ', 'ਰ', 'ਪ']
```

### Split
```dart
'ਕੈਸੀ ਆਰਤੀ ਹੋਇ ॥'.splitGurmukhi();
// ['ਕੈ', 'ਸੀ', ' ', 'ਆ', 'ਰ', 'ਤੀ', ' ', 'ਹੋ', 'ਇ', ' ', '॥']
```
Characters joined by virama `੍` can be split as:
```dart
'ਅੰਮ੍ਰਿਤ'.splitGurmukhi();
// ['ਅੰ', 'ਮ੍ਰਿ', 'ਤ']
```
```dart
'ਅੰਮ੍ਰਿਤ'.splitGurmukhi(splitVirama: true);
// ['ਅੰ', 'ਮ੍', 'ਰਿ', 'ਤ']
```
Support SantLipi modifiers:
```dart
'ਸ꠴ਯਾਮ'.splitGurmukhi(extensions: true);
// ['ਸ', '꠴ਯਾ', 'ਮ']
```

### Unicode Normalization
Fix Matras of `ੳ`, `ਅ`, and `ੲ`:
```dart
'ਅਾਦਿ'.normalizeGurmukhi();
// ਆਦਿ
```
Fix Order of Diacritics:
```dart
'ਕੰੁਚਰ'.normalizeGurmukhi();
// ਕੁੰਚਰ
```

## Conversion

### Ascii to Gurmukhi
```dart
asciiToGurmukhi('goibMd imlx kI ieh qyrI brIAw ]');
// ਗੋਬਿੰਦ ਮਿਲਣ ਕੀ ਇਹ ਤੇਰੀ ਬਰੀਆ ॥
```
Support SantLipi modifiers:
```dart
asciiToGurmukhi('qRsîo', extensions: true);
// ਤ੍ਰਸ꠵ਯੋ
```
