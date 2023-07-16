export type UnicodeStandard = 'Sant Lipi' | 'Unicode Consortium'

// Font mapping
// AnmolLipi/GurbaniAkhar & GurbaniLipi by Kulbir S. Thind, MD
// OpenGurbaniAkhar by Sarabveer Singh (GurbaniNow)
const ASCII_TO_SL_REPLACEMENTS = {
  // Ordered as such to support both font input methods
  ˆØI: 'ੀਁ', // Handle pre-bihari-bindi with unused adakbindi
  //
  '<>': 'ੴ', // AnmolLipi/GurbaniAkhar variant
  '<': 'ੴ', // GurbaniLipi variant
  '>': '☬', // GurbaniLipi variant
  //
  Åå: 'ੴ', // AnmolLipi/GurbaniAkhar variant
  Å: 'ੴ', // GurbaniLipi variant
  å: 'ੴ', // GurbaniLipi variant
  //
  a: 'ੳ',
  b: 'ਬ',
  c: 'ਚ',
  d: 'ਦ',
  e: 'ੲ',
  f: 'ਡ',
  g: 'ਗ',
  h: 'ਹ',
  i: 'ਿ',
  j: 'ਜ',
  k: 'ਕ',
  l: 'ਲ',
  m: 'ਮ',
  n: 'ਨ',
  o: 'ੋ',
  p: 'ਪ',
  q: 'ਤ',
  r: 'ਰ',
  s: 'ਸ',
  t: 'ਟ',
  u: 'ੁ',
  v: 'ਵ',
  w: 'ਾ',
  x: 'ਣ',
  y: 'ੇ',
  z: 'ਜ਼',
  A: 'ਅ',
  B: 'ਭ',
  C: 'ਛ',
  D: 'ਧ',
  E: 'ਓ',
  F: 'ਢ',
  G: 'ਘ',
  H: '੍ਹ',
  I: 'ੀ',
  J: 'ਝ',
  K: 'ਖ',
  L: 'ਲ਼',
  M: 'ੰ',
  N: 'ਂ',
  O: 'ੌ',
  P: 'ਫ',
  Q: 'ਥ',
  R: '੍ਰ',
  S: 'ਸ਼',
  T: 'ਠ',
  U: 'ੂ',
  V: 'ੜ',
  W: 'ਾਂ',
  X: 'ਯ',
  Y: 'ੈ',
  Z: 'ਗ਼',
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
  '[': '।',
  ']': '॥',
  '\\': 'ਞ',
  '|': 'ਙ',
  '`': 'ੱ',
  '~': 'ੱ',
  '@': 'ੑ',
  '^': 'ਖ਼',
  '&': 'ਫ਼',
  '†': '੍ਟ', // dagger symbol
  ü: 'ੁ', // u-diaeresis letter
  '®': '੍ਰ', // registered symbol
  '\u00b4': 'ੵ', // acute accent (´)
  '\u00a8': 'ੂ', // diaeresis accent (¨)
  µ: 'ੰ', // mu letter
  æ: '਼',
  '\u00a1': 'ੴ', // inverted exclamation (¡)
  ƒ: 'ਨੂੰ', // florin symbol
  œ: '੍ਤ',
  Í: '੍ਵ', // capital i-acute letter
  //   Î: '੍ਯ', // capital i-circumflex letter
  Ï: 'ੵ', // capital i-diaeresis letter
  Ò: '॥', // capital o-grave letter
  Ú: 'ਃ', // capital u-acute letter
  '\u02c6': 'ਂ', // circumflex accent (ˆ)
  '\u02dc': '੍ਨ', // small tilde (˜)
  //
  //
  // AnmolLipi/GurbaniAkhar mappings:
  '§': '੍ਹੂ', // section symbol
  '¤': 'ੱ', // currency symbol
  //
  //
  // GurbaniLipi mappings:
  ç: '੍ਚ', // c-cedilla letter
  //
  //
  // AnmolLipi/GurbaniAkhar overriding GurbaniLipi mapping:
  Ç: '☬', // khanda instead of california state symbol
  //
  //
  // Miscellaneous:
  '\u201a': '❁', // single low-9 quotation (‚) mark
  //
  //
  // Nullify
  // Either the 2nd portion of ੴ or a symbol of USA:
  Æ: '',
  Ø: '', // This is a topline / shirorekha (शिरोरेखा) extender
  ÿ: '', // This is the author Kulbir S Thind's stamp
  Œ: '', // Box drawing left flower
  '‰': '', // Box drawing right flower
  Ó: '', // Box drawing top flower
  Ô: '', // Box drawing bottom flower
  //
  //
  // Open Gurbani Akhar
  // translate capital i-circumflex letter to indic one-sixteenth + yayya:
  Î: '꠳ਯ', // half-yayya
  // translate i-diaeresis letter to indic one-eight + yayya:
  ï: '꠴ਯ', // open-top yayya
  // translate i-circumflex letter to indic three-sixtenths + yayya:
  î: '꠵ਯ', // open-top half-yayya
}

const UNICODE_TO_SL_REPLACEMENTS = {
  '੍ਯ': '꠳ਯ', // replace unicode half-yayya with Sant Lipi ligature (north indic one-sixteenth fraction + yayya)
}

// Sant Lipi to Unicode Consortium
const SL_TO_UNICODE_REPLACEMENTS = {
  '꠳ਯ': '੍ਯ',
  '꠴ਯ': 'ਯ',
  '꠵ਯ': '੍ਯ',
  'ਁ': 'ਂ', // pre-bihari-bindi
}

// Regex to move ASCII sihari (before mapping to unicode)
const ASCII_BASE_LETTERS = 'a-zA-Z|^&Îîï\\\\'
const ASCII_SIHARI_PATTERN = new RegExp(`(i)([${ASCII_BASE_LETTERS}])`, 'g')

/**
 * Converts any ascii gurmukhi characters into sanitized unicode gurmukhi.
 * @param {string} str
 * @param {UnicodeStandard} unicodeStandard
 * @returns {string}
 */
export default function toUnicode(
  str: string,
  unicodeStandard: UnicodeStandard = 'Unicode Consortium',
): string {
  // Move ASCII sihari before mapping to unicode
  str = str.replaceAll(ASCII_SIHARI_PATTERN, '$2$1')

  // Map any ASCII / Unicode Gurmukhi to Sant Lipi format
  for (const [key, value] of Object.entries(ASCII_TO_SL_REPLACEMENTS)) {
    str = str.replaceAll(key, value)
  }

  for (const [key, value] of Object.entries(UNICODE_TO_SL_REPLACEMENTS)) {
    str = str.replaceAll(key, value)
  }

  // Normalize Unicode
  str = unicodeNormalize(str)

  if (unicodeStandard === 'Unicode Consortium') {
    for (const [key, value] of Object.entries(SL_TO_UNICODE_REPLACEMENTS)) {
      str = str.replaceAll(key, value)
    }
  }

  return str
}

/**
 * Normalizes Gurmukhi according to Unicode Standards.
 * @param {string} string
 * @returns {string}
 */
export function unicodeNormalize(str: string): string {
  str = sortDiacritics(str)

  str = sanitizeUnicode(str)

  return str
}

const BASE_LETTER_MODIFIERS = ['਼', 'ੑ', 'ੵ']

const VOWEL_ORDER = ['ਿ', 'ੇ', 'ੈ', 'ੋ', 'ੌ', 'ੁ', 'ੂ', 'ਾ', 'ੀ']

const REMAINING_MODIFIER_ORDER = ['ਁ', 'ੱ', 'ਂ', 'ੰ', 'ਃ']

const GENERATED_MARKS =
  BASE_LETTER_MODIFIERS.join('') +
  VOWEL_ORDER.join('') +
  REMAINING_MODIFIER_ORDER.join('')

const MARK_PATTERN = new RegExp(`([${GENERATED_MARKS}]*)`)

const VIRAMA = '੍'
const BELOW_BASE_LETTERS = 'ਹਰਵਟਤਨਚ'
const BELOW_BASE_PATTERN = new RegExp(`(${VIRAMA}[${BELOW_BASE_LETTERS}])?`)

// The following regex will capture all sequential diacritics containing at most one subjoined letter.
const REGEX_MATCH_PATTERN = new RegExp(
  MARK_PATTERN.source + BELOW_BASE_PATTERN.source + MARK_PATTERN.source,
  'g',
)

const GENERATED_MATCH_ORDER = [
  ...BASE_LETTER_MODIFIERS,
  VIRAMA,
  ...BELOW_BASE_LETTERS.split(''),
  ...VOWEL_ORDER,
  ...REMAINING_MODIFIER_ORDER,
]

/**
 * Orders the gurmukhi diacritics in a string according to Unicode standards.
 * @param {string} str
 * @returns {string}
 */
export function sortDiacritics(str: string): string {
  return str.replaceAll(REGEX_MATCH_PATTERN, diacriticReplacer)
}

function diacriticReplacer(match: string) {
  return match
    .split('')
    .sort(
      (a, b): number =>
        GENERATED_MATCH_ORDER.indexOf(a) - GENERATED_MATCH_ORDER.indexOf(b),
    )
    .join('')
}

const UNICODE_SANITIZATION_MAP = {
  '\u0a73\u0a4b': '\u0a13', // ਓ
  '\u0a05\u0a3e': '\u0a06', // ਅ + ਾ = ਆ
  '\u0a72\u0a3f': '\u0a07', // ਇ
  '\u0a72\u0a40': '\u0a08', // ਈ
  '\u0a73\u0a41': '\u0a09', // ਉ
  '\u0a73\u0a42': '\u0a0a', // ਊ
  '\u0a72\u0a47': '\u0a0f', // ਏ
  '\u0a05\u0a48': '\u0a10', // ਐ
  '\u0a05\u0a4c': '\u0a14', // ਔ
  '\u0a32\u0a3c': '\u0a33', // ਲ਼
  '\u0a38\u0a3c': '\u0a36', // ਸ਼
  '\u0a16\u0a3c': '\u0a59', // ਖ਼
  '\u0a17\u0a3c': '\u0a5a', // ਗ਼
  '\u0a1c\u0a3c': '\u0a5b', // ਜ਼
  '\u0a2b\u0a3c': '\u0a5e', // ਫ਼
  '\u0a71\u0a02': '\u0a01', // ਁ adak bindi (quite literally never used today or in the Shabad OS Database, only included for parity with the Unicode block)
}

/**
 * Use single char representations of constructed characters.
 * @param {string} str
 * @returns {string}
 */
export function sanitizeUnicode(str: string): string {
  for (const [key, value] of Object.entries(UNICODE_SANITIZATION_MAP)) {
    str = str.replaceAll(key, value)
  }

  return str
}
