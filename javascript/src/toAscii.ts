import { unicodeNormalize } from './toUnicode.js'

const ASCII_REPLACEMENTS = {
  '੍ਯ': 'Î', // half-yayya
  '꠳ਯ': 'Î', // sant lipi variation
  '꠴ਯ': 'ï', // open-top yayya
  '꠵ਯ': 'î', // open-top half-yayya
  '੍ਰ': 'R',
  '੍ਵ': 'Í', // capital i-acute letter
  '੍ਹ': 'H',
  '੍ਚ': 'ç', // c-cedilla letter
  '੍ਟ': '†', // dagger symbol
  '੍ਤ': 'œ',
  '੍ਨ': '\u02dc', // small tilde (˜)
  ੳ: 'a',
  ਅ: 'A',
  ੲ: 'e',
  ਸ: 's',
  ਹ: 'h',
  ਕ: 'k',
  ਖ: 'K',
  ਗ: 'g',
  ਘ: 'G',
  ਙ: '|',
  ਚ: 'c',
  ਛ: 'C',
  ਜ: 'j',
  ਝ: 'J',
  ਞ: '\\',
  ਟ: 't',
  ਠ: 'T',
  ਡ: 'f',
  ਢ: 'F',
  ਣ: 'x',
  ਤ: 'q',
  ਥ: 'Q',
  ਦ: 'd',
  ਧ: 'D',
  ਨ: 'n',
  ਪ: 'p',
  ਫ: 'P',
  ਬ: 'b',
  ਭ: 'B',
  ਮ: 'm',
  ਯ: 'X',
  ਰ: 'r',
  ਲ: 'l',
  ਵ: 'v',
  ੜ: 'V',
  ਸ਼: 'S',
  ਜ਼: 'z',
  ਖ਼: '^',
  ਫ਼: '&',
  ਗ਼: 'Z',
  ਲ਼: 'L',
  '਼': 'æ',
  'ੑ': '@',
  'ੵ': '\u00b4', // acute accent (´)
  'ਃ': 'Ú', // capital u-acute letter
  '\u0a13': 'E', // ਓ
  '\u0a06': 'Aw', // ਆ
  '\u0a07': 'ei', // ਇ
  '\u0a08': 'eI', // ਈ
  '\u0a09': 'au', // ਉ
  '\u0a0a': 'aU', // ਊ
  '\u0a0f': 'ey', // ਏ
  '\u0a10': 'AY', // ਐ
  '\u0a14': 'AO', // ਔ
  'ਾ': 'w',
  'ਿ': 'i',
  'ੀ': 'I',
  'ੁ': 'u',
  'ੂ': 'U',
  'ੇ': 'y',
  'ੈ': 'Y',
  'ੋ': 'o',
  'ੌ': 'O',
  'ੰ': 'M',
  'ਂ': 'N',
  'ੱ': '~',
  '।': '[',
  '॥': ']',
  '੦': '0',
  '੧': '1',
  '੨': '2',
  '੩': '3',
  '੪': '4',
  '੫': '5',
  '੬': '6',
  '੭': '7',
  '੮': '8',
  '੯': '9',
  ੴ: '<>',
  '☬': 'Ç',
}

// Warnings
const ABOVE_VOWEL_MARKS = ['ੇ', 'ੈ', 'ੋ', 'ੌ'].join('')

const BELOW_VOWEL_MARKS = ['ੁ', 'ੂ'].join('')

const CHECKS = {
  'Incorrect vowel syntax (above vowel)': new RegExp(
    `[ਾ${ABOVE_VOWEL_MARKS}][ਾ${ABOVE_VOWEL_MARKS}]`,
    'u',
  ),
  'Incorrect vowel syntax (below vowel)': new RegExp(
    `[ਾ${BELOW_VOWEL_MARKS}][ਾ${BELOW_VOWEL_MARKS}]`,
    'u',
  ),
}

// For re-arranging siharis
const ASCII_BASE_LETTERS = 'AeshkKgG|cCjJ\\tTfFxqQdDnpPbBmXrlvVSz^&ZLÎïî'
const ASCII_MODIFIERS = 'æ@\u00b4ÚwIuUyYoO`MNRÍHç†œ\u02dcü\u00a8®µ\u02c6W~¤Ï'
const MATCH_UNICODE_SIHARI = new RegExp(
  `([${ASCII_BASE_LETTERS}][${ASCII_MODIFIERS}]*)i([${ASCII_MODIFIERS}]*)`,
  'g',
)

// For remapping u vowel position in presence of a below-base-letter
const ASCII_BELOW_BASE_LETTERS = 'RÍHç†œ\u02dc\u00b4@'
const BELOW_VOWEL_MAPPINGS = {
  u: 'ü',
  U: '¨',
}

// For moving center-stroke + tippi positioning
const CENTER_STROKE_LETTERS = 'nT'
const CENTER_STROKE_REGEX = new RegExp(
  `([${CENTER_STROKE_LETTERS}][${ASCII_MODIFIERS}]*)M([${ASCII_MODIFIERS}]*)`,
  'g',
)

// For positioning bindi/tippi when it is the only above-base-form
const ASCII_NON_ABOVE_MODIFIERS = 'æ@\u00b4ÚwuURÍHç†œ\u02dcü\u00a8®Ï'
const NASALIZATION_MAPPINGS = {
  N: 'ˆ',
  '~': '`',
}

// For rendering changes of combos
const ASCII_COMBO_REPLACEMENTS = {
  'I\u0a01': 'ˆØI', // bindi + bihari ligature
  IM: 'µØI', // tippi + bihari ligature
  Iµ: 'µØI', // tippi + bihari ligature
  kR: 'k®', // kakka + pair-rara ligature
  'H¨': '§',
  wN: 'W', // addhak positioning
  wˆ: 'W', // addhak positioning
  nUµ: 'ƒ',
}

/**
 * Converts Gurmukhi to ASCII for Open Gurbani Akhar font.
 * @param {string} str
 * @returns {string}
 */
export default function toAscii(str: string): string {
  str = unicodeNormalize(str)

  for (const [warning, regex] of Object.entries(CHECKS)) {
    if (str.search(regex) >= 0) {
      throw new Error(warning)
    }
  }

  for (const [key, value] of Object.entries(ASCII_REPLACEMENTS)) {
    str = str.replaceAll(key, value)
  }

  // Re-arrange sihari
  str = str.replaceAll(MATCH_UNICODE_SIHARI, 'i$1$2')

  // Fix below-base-letter + u vowel positioning
  for (const [key, value] of Object.entries(BELOW_VOWEL_MAPPINGS)) {
    const regex = new RegExp(
      `([${ASCII_BELOW_BASE_LETTERS}][${ASCII_MODIFIERS}]*)${key}([${ASCII_MODIFIERS}]*)`,
      'g',
    )
    str = str.replaceAll(regex, `$1${value}$2`)
  }

  // Fix center-stroke + tippi positioning
  str = str.replaceAll(CENTER_STROKE_REGEX, '$1µ$2')

  // Fix positioning of bindi/tippi when it is the only above-base-form
  for (const [key, value] of Object.entries(NASALIZATION_MAPPINGS)) {
    const regex = new RegExp(
      `([${ASCII_BASE_LETTERS}][${ASCII_NON_ABOVE_MODIFIERS}]*)${key}([${ASCII_NON_ABOVE_MODIFIERS}]*)`,
      'g',
    )
    str = str.replaceAll(regex, `$1${value}$2`)
  }

  // Make rendering changes for combos
  for (const [key, value] of Object.entries(ASCII_COMBO_REPLACEMENTS)) {
    str = str.replaceAll(key, value)
  }

  return str
}
