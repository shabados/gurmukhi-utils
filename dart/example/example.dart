import 'package:gurmukhi_utils/gurmukhi_utils.dart';

void main() {
  // Remove vishraams from Gurmukhi text.
  print('ਸਭਨਾ ਜੀਆ ਕਾ, ਇਕੁ ਦਾਤਾ; ਸੋ. ਮੈ ਵਿਸਰਿ ਨ ਜਾਈ ॥੫॥'.removeVishraams());

  // Get first letters from Gurmukhi text.
  print('ਜਿਸਨੋ ਕ੍ਰਿਪਾ ਕਰਹਿ ਤਿਨਿ ਨਾਮ ਰਤਨੁ ਪਾਇਆ ॥'.firstGurmukhiLetters());

  // Split Gurmukhi text into letters.
  print('ਕੈਸੀ ਆਰਤੀ ਹੋਇ ॥'.splitGurmukhi());
  print('ਅੰਮ੍ਰਿਤ'.splitGurmukhi());
  print('ਅੰਮ੍ਰਿਤ'.splitGurmukhi(splitVirama: true));
  print('ਸ꠴ਯਾਮ'.splitGurmukhi(extensions: true));

  // Unicode normalization of Gurmukhi text.
  print('ਅਾਦਿ'.normalizeGurmukhi());
  print('ਕੰੁਚਰ'.normalizeGurmukhi());
  print('ਮਧ꠳ਯ'.normalizeGurmukhi());
  print('ਮਧ꠳ਯ'.normalizeGurmukhi(extensions: true));

  // Conversion from Ascii To Gurmukhi.
  print(asciiToGurmukhi('goibMd imlx kI ieh qyrI brIAw ]'));
  print(asciiToGurmukhi('qRsîo', extensions: true));
}
