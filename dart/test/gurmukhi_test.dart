import 'package:test/test.dart';
import 'package:gurmukhi_utils/gurmukhi_utils.dart';

void main() {
  group('gurmukhi utils:', () {
    test('remove vishraams', () {
      expect(
        'ਸਭਨਾ ਜੀਆ ਕਾ, ਇਕੁ ਦਾਤਾ; ਸੋ. ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥'.removeVishraams(),
        'ਸਭਨਾ ਜੀਆ ਕਾ ਇਕੁ ਦਾਤਾ ਸੋ ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥',
      );
    });

    test('first letters', () {
      expect(
        'ਜਿਸਨੋ ਕ੍ਰਿਪਾ ਕਰਹਿ ਤਿਨਿ ਨਾਮ ਰਤਨੁ ਪਾਇਆ ॥'.firstGurmukhiLetters(),
        ['ਜ', 'ਕ', 'ਕ', 'ਤ', 'ਨ', 'ਰ', 'ਪ'],
      );
    });

    test('split', () {
      expect(
        'ਕੈਸੀ ਆਰਤੀ ਹੋਇ ॥'.splitGurmukhi(),
        ['ਕੈ', 'ਸੀ', ' ', 'ਆ', 'ਰ', 'ਤੀ', ' ', 'ਹੋ', 'ਇ', ' ', '॥'],
      );
      expect(
        'ਅੰਮ੍ਰਿਤ'.splitGurmukhi(),
        ['ਅੰ', 'ਮ੍ਰਿ', 'ਤ'],
      );
      expect(
        'ਅੰਮ੍ਰਿਤ'.splitGurmukhi(splitVirama: true),
        ['ਅੰ', 'ਮ੍', 'ਰਿ', 'ਤ'],
      );
      expect(
        'ਸ꠴ਯਾਮ'.splitGurmukhi(extensions: true),
        ['ਸ', '꠴ਯਾ', 'ਮ'],
      );
    });

    test('normalization', () {
      expect('ਅਾਦਿ'.normalizeGurmukhi(), 'ਆਦਿ');
      expect('ਕੰੁਚਰ'.normalizeGurmukhi(), 'ਕੁੰਚਰ');
    });
  });
}
