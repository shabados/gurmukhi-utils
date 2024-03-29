import 'dart:collection';
import '../gurmukhi.dart';

final _map = HashMap.of({
  '&': 'ਫ਼',
  '0': '੦',
  '1': '੧',
  '2': '੨',
  '3': '੩',
  '4': '੪',
  '5': '੫',
  '6': '੬',
  '7': '੭',
  '8': '੮',
  '9': '੯',
  '<': 'ੴ',
  '>': '☬',
  '@': 'ੑ',
  'A': 'ਅ',
  'B': 'ਭ',
  'C': 'ਛ',
  'D': 'ਧ',
  'E': 'ਓ',
  'F': 'ਢ',
  'G': 'ਘ',
  'H': '੍ਹ',
  'I': 'ੀ',
  'J': 'ਝ',
  'K': 'ਖ',
  'L': 'ਲ਼',
  'M': 'ੰ',
  'N': 'ਂ',
  'O': 'ੌ',
  'P': 'ਫ',
  'Q': 'ਥ',
  'R': '੍ਰ',
  'S': 'ਸ਼',
  'T': 'ਠ',
  'U': 'ੂ',
  'V': 'ੜ',
  'W': 'ਾਂ',
  'X': 'ਯ',
  'Y': 'ੈ',
  'Z': 'ਗ਼',
  '[': '।',
  '\\': 'ਞ',
  ']': '॥',
  '^': 'ਖ਼',
  '`': 'ੱ',
  'a': 'ੳ',
  'b': 'ਬ',
  'c': 'ਚ',
  'd': 'ਦ',
  'e': 'ੲ',
  'f': 'ਡ',
  'g': 'ਗ',
  'h': 'ਹ',
  'i': 'ਿ',
  'j': 'ਜ',
  'k': 'ਕ',
  'l': 'ਲ',
  'm': 'ਮ',
  'n': 'ਨ',
  'o': 'ੋ',
  'p': 'ਪ',
  'q': 'ਤ',
  'r': 'ਰ',
  's': 'ਸ',
  't': 'ਟ',
  'u': 'ੁ',
  'v': 'ਵ',
  'w': 'ਾ',
  'x': 'ਣ',
  'y': 'ੇ',
  'z': 'ਜ਼',
  '|': 'ਙ',
  '~': 'ੱ',
  '¡': 'ੴ',
  '¤': 'ੱ',
  '§': '੍ਹੂ',
  '¨': 'ੂ',
  '«': '॥',
  '®': '੍ਰ',
  '´': 'ੵ',
  'µ': 'ੰ',
  '·': '੶',
  '»': '।',
  'À': 'ੰ',
  'Á': 'ੰ',
  'Å': 'ੴ',
  'Æ': '',
  'Ç': '☬',
  'Í': '੍ਵ',
  'Î': '\ufe00ਯ',
  'Ï': 'ੵ',
  'Ò': '॥',
  'Ó': '',
  'Ô': '',
  'Ø': '',
  'Ú': 'ਃ',
  'å': 'ੴ',
  'æ': '਼',
  'ç': '੍ਚ',
  'î': '\ufe00\ufe01ਯ',
  'ï': '\ufe01ਯ',
  'ñ': '੦',
  'ò': '੧',
  'ó': '੨',
  'ô': '੩',
  'õ': '੪',
  'ö': '੫',
  '÷': '੬',
  'ø': '੭',
  'ù': '੮',
  'ú': '੯',
  'ü': 'ੁ',
  'ÿ': '',
  'Œ': '',
  'œ': '੍ਤ',
  'ƒ': 'ਨੂੰ',
  'ˆ': 'ਂ',
  '˜': '੍ਨ',
  'μ': 'ੰ',
  '‚': '❁',
  '†': '੍ਟ',
  '‰': '',
});

/// Converts ASCII encoded Gurmukhi [text] to Unicode encoded Gurmukhi text.
///
/// ```dart
/// asciiToGurmukhi('goibMd imlx kI ieh qyrI brIAw') == 'ਗੋਬਿੰਦ ਮਿਲਣ ਕੀ ਇਹ ਤੇਰੀ ਬਰੀਆ'
/// ```
///
/// Enable [extensions] to support SantLipi modifiers.
///
/// ```dart
/// asciiToGurmukhi('qRsîo', extensions: true) == 'ਤ੍ਰਸ︀︁ਯੋ'
/// ```
String asciiToGurmukhi(String text, {bool extensions = false}) {
  final sb = StringBuffer();

  for (var i = 0; i < text.length; i++) {
    final curr = text[i];
    final next = i + 1 < text.length ? text[i + 1] : null;

    // skip next char if 2-char mapping of 'ੴ'
    if ((curr == '<' && next == '>') || (curr == 'Å' && next == 'Æ')) {
      i++;
    }

    // swap position of 'ਿ' with mapping of next char
    if (curr == 'i') {
      final value = _map[next];
      if (value != null) {
        sb.write(value);
        i++;
      }
    }

    if (extensions) {
      if (curr == 'ˆ' && next == 'Ø') {
        sb.write('ਂ\u200d');
        i++;
        continue;
      }
    }

    sb.write(_map[curr] ?? curr);
  }

  return sb.toString().normalizeGurmukhi(extensions: extensions);
}

extension GurmukhiIntExtension on num {
  /// Conversion from Number to Gurmukhi.
  ///
  /// ```dart
  /// 123.toGurmukhi() == '੧੨੩'
  /// ```
  String toGurmukhi() => asciiToGurmukhi(toString());
}
