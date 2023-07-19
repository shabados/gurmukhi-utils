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
  Iterable<String> splitGurmukhi({bool splitVirama = false}) sync* {
    var br = 0; // starting index of gurmukhi letter break

    for (var i = 0; i < length; i++) {
      final curr = codeUnitAt(i);
      final next = i + 1 < length ? codeUnitAt(i + 1) : null;

      if ((next != null && _isGurmukhiDiacritic(next)) ||
          (!splitVirama && _isGurmukhiVirama(curr))) {
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

int _getGurmukhiDiacriticOrder(int char) {
  switch (char) {
    /// nukta
    case 0x0A3C: // ਼
      return -2;

    /// virama/halant
    case 0x0A4D: // ੍
      return -1;

    /// signs bottom
    case 0x0A51: // ੑ
    case 0x0A75: // ੵ
      return 1;

    /// vowels left
    case 0x0A3F: // ਿ
      return 2;

    /// vowels top
    case 0x0A47: // ੇ
    case 0x0A48: // ੈ
    case 0x0A4B: // ੋ
    case 0x0A4C: // ੌ
      return 3;

    /// vowels bottom
    case 0x0A41: // ੁ
    case 0x0A42: // ੂ
      return 4;

    /// vowels right
    case 0x0A3E: // ਾ
    case 0x0A40: // ੀ
      return 5;

    /// nasalization
    case 0x0A01: // ਁ
    case 0x0A02: // ਂ
    case 0x0A70: // ੰ
    case 0x0A71: // ੱ
      return 6;

    /// sign after letter
    case 0x0A03: // ਃ
      return 7;

    /// consonant after virama
    default:
      return 0;
  }
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
  };
  return text.replaceAllMapped(
    RegExp([
      '\u0A05[\u0A3E\u0A48\u0A4C]',
      '\u0A72[\u0A3F\u0A40\u0A47]',
      '\u0A73[\u0A4B\u0A41\u0A42]',
      '[\u0A16\u0A17\u0A1C\u0A2B\u0A32\u0A38]\u0A3C',
      '\u0A71\u0A02',
    ].join('|')),
    (match) => map[text.substring(match.start, match.end)]!,
  );
}
