extension GurmukhiExtensions on String {
  /// Remove vishraams from Gurmukhi text.
  ///
  /// ```dart
  /// 'ਸਭਨਾ ਜੀਆ ਕਾ, ਇਕੁ ਦਾਤਾ; ਸੋ. ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥'.removeVishraams();
  /// // 'ਸਭਨਾ ਜੀਆ ਕਾ ਇਕੁ ਦਾਤਾ ਸੋ ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥'
  /// ```
  String removeVishraams() => replaceAll(RegExp('[.,;]'), '');

  /// Get first letters from Gurmukhi text.
  ///
  /// ```dart
  /// 'ਜਿਸਨੋ ਕ੍ਰਿਪਾ ਕਰਹਿ ਤਿਨਿ ਨਾਮ ਰਤਨੁ ਪਾਇਆ ॥'.firstGurmukhiLetters();
  /// // ['ਜ', 'ਕ', 'ਕ', 'ਤ', 'ਨ', 'ਰ', 'ਪ']
  /// ```
  Iterable<String> firstGurmukhiLetters() {
    return split(' ')
        .where((word) => word.isNotEmpty && _isGurmukhiChar(word.codeUnitAt(0)))
        .map((word) => word[0]);
  }

  /// Split Gurmukhi text into letters.
  ///
  /// ```dart
  /// 'ਕੈਸੀ ਆਰਤੀ ਹੋਇ ॥'.splitGurmukhi();
  /// // ['ਕੈ', 'ਸੀ', ' ', 'ਆ', 'ਰ', 'ਤੀ', ' ', 'ਹੋ', 'ਇ', ' ', '॥']
  /// ```
  ///
  /// Enable [splitVirama] to split chars joined by virama.
  ///
  /// ```dart
  /// 'ਅੰਮ੍ਰਿਤ'.splitGurmukhi();
  /// // ['ਅੰ', 'ਮ੍ਰਿ', 'ਤ']
  /// 'ਅੰਮ੍ਰਿਤ'.splitGurmukhi(splitVirama: true);
  /// // ['ਅੰ', 'ਮ੍', 'ਰਿ', 'ਤ']
  /// ```
  ///
  /// Enable [extensions] to support SantLipi modifiers.
  ///
  /// ```dart
  /// 'ਸ꠴ਯਾਮ'.splitGurmukhi(extensions: true);
  /// // ['ਸ', '꠴ਯਾ', 'ਮ']
  /// ```
  Iterable<String> splitGurmukhi({
    bool splitVirama = false,
    bool extensions = false,
  }) sync* {
    var br = 0; // starting index of gurmukhi letter break

    for (var i = 0; i < length; i++) {
      final curr = codeUnitAt(i);
      final next = i + 1 < length ? codeUnitAt(i + 1) : null;

      if ((next != null && _isGurmukhiDiacritic(next)) ||
          (!splitVirama && _isGurmukhiVirama(curr)) ||
          (extensions && _isSantLipiYayyaModifier(curr))) {
        continue;
      }

      yield substring(br, i + 1);
      br = i + 1;
    }
  }

  /// Unicode normalization of Gurmukhi text.
  ///
  /// Fix Matras of 'ੳ', 'ਅ', and 'ੲ':
  /// ```dart
  /// 'ਅਾਦਿ'.normalizeGurmukhi();
  /// // ਆਦਿ
  /// ```
  ///
  /// Fix Order of Diacritics:
  /// ```dart
  /// 'ਕੰੁਚਰ'.normalizeGurmukhi();
  /// // ਕੁੰਚਰ
  /// ```
  String normalizeGurmukhi() {
    return _sanitizeGurmukhi(_sortGurmukhiDiacritics(this));
  }
}

bool _isGurmukhiChar(int char) => char >= 0x0A00 && char <= 0x0A7F;

bool _isGurmukhiVirama(int char) => char == 0x0A4D;

bool _isGurmukhiDiacritic(int char) => _getGurmukhiDiacriticOrder(char) != 0;

bool _isSantLipiYayyaModifier(int char) {
  return (char == 0xA833)  // ꠳
      || (char == 0xA834)  // ꠴
      || (char == 0xA835); // ꠵
}

int _getGurmukhiDiacriticOrder(int char) {
  // nukta, virama, consonant after virama, sign, vowel (left, top, bottom, right), nasal, visarga
  return const {
    0x0A3C: -2, // ਼
    0x0A4D: -1, // ੍
    // consonant after virama: 0
    0x0A51: 1, // ੑ
    0x0A75: 1, // ੵ
    0x0A3F: 2, // ਿ
    0x0A47: 3, // ੇ
    0x0A48: 3, // ੈ
    0x0A4B: 3, // ੋ
    0x0A4C: 3, // ੌ
    0x0A41: 4, // ੁ
    0x0A42: 4, // ੂ
    0x0A3E: 5, // ਾ
    0x0A40: 5, // ੀ
    0x0A01: 6, // ਁ
    0x0A02: 6, // ਂ
    0x0A70: 6, // ੰ
    0x0A71: 6, // ੱ
    0x0A03: 7, // ਃ
  }[char] ?? 0;
}

int _gurmukhiDiacriticComparator(int a, int b) {
  return _getGurmukhiDiacriticOrder(a) - _getGurmukhiDiacriticOrder(b);
}

String _sortGurmukhiDiacritics(String text) {
  return text.splitGurmukhi().map((letter) {
    if (letter.length > 1) {
      final diacritics = letter.codeUnits.sublist(1);
      diacritics.sort(_gurmukhiDiacriticComparator);
      return String.fromCharCodes([letter.codeUnitAt(0), ...diacritics]);
    } else {
      return letter;
    }
  }).join();
}

String _sanitizeGurmukhi(String text) {
  const map = {
    '\u0A05\u0A3E': '\u0A06', // ਅਾ -> ਆ
    '\u0A05\u0A48': '\u0A10', // ਅੈ -> ਐ
    '\u0A05\u0A4C': '\u0A14', // ਅੌ -> ਔ
    '\u0A72\u0A3F': '\u0A07', // ੲਿ -> ਇ
    '\u0A72\u0A40': '\u0A08', // ੲੀ -> ਈ
    '\u0A72\u0A47': '\u0A0F', // ੲੇ -> ਏ
    '\u0A73\u0A4B': '\u0A13', // ੳੋ -> ਓ
    '\u0A73\u0A41': '\u0A09', // ੳੁ -> ਉ
    '\u0A73\u0A42': '\u0A0A', // ੳੂ -> ਊ
    '\u0A16\u0A3C': '\u0A59', // ਖ਼ -> ਖ਼
    '\u0A17\u0A3C': '\u0A5A', // ਗ਼ -> ਗ਼
    '\u0A1C\u0A3C': '\u0A5B', // ਜ਼ -> ਜ਼
    '\u0A2B\u0A3C': '\u0A5E', // ਫ਼ -> ਫ਼
    '\u0A32\u0A3C': '\u0A33', // ਲ਼ -> ਲ਼
    '\u0A38\u0A3C': '\u0A36', // ਸ਼ -> ਸ਼
    '\u0A71\u0A02': '\u0A01', // ੱਂ -> ਁ
    '\u0A2F\uFE00': '\u0A4D\u0A2F', // ਯ︀ -> ੍ਯ
  };
  return text.replaceAllMapped(
    RegExp([
      '\u0A05[\u0A3E\u0A48\u0A4C]',
      '\u0A72[\u0A3F\u0A40\u0A47]',
      '\u0A73[\u0A4B\u0A41\u0A42]',
      '[\u0A16\u0A17\u0A1C\u0A2B\u0A32\u0A38]\u0A3C',
      '\u0A71\u0A02',
      '\u0A2F\uFE00',
    ].join('|')),
    (match) => map[text.substring(match.start, match.end)]!,
  );
}
