const vishraams = Object.values( require( './vishraams' ) )

// Mappings
const shahmukhiMappings = {
  'ਖ਼ੁ': 'ِخو',
  ਖ਼ੁ: 'ِخو',
  ਉਹ: 'اوہ',
  '\bਆਏਗਾ\b': 'گا\u200cآۓ',
  'ਆਏਗਾ\b': 'گا\u200cاۓ',
  'ਾਏਗਾ\b': 'گا\u200cاۓ',
  'ਏਗਾ\b': 'گا\u200cے',
  ਇਆ: 'يا',
  '\bਆਈ': 'آئی',
  'ਆਈ': 'ائی',
  'ਾਈ': 'ائی',
  'ਿਓ': 'يو',
  'ਾਏ\b': 'اۓ',
  'ਾਏ': 'ائ',
  'ਾਓ': 'اؤ',
  'ਆਓ\b': 'اؤ',
  ਆਓ: 'آؤ',
  'ੰਪ': 'مپ',
  'ੰਨ': 'نّ',
  ਇ: 'ِا',
  '\bਉ': 'اُ',
  ਉ: 'و',
  '\bਊ': 'اُو',
  ਊ: 'ؙو',
  ਈ: 'ای',
  ਏ: 'اے',
  'ਆ\b': 'ا',
  ਆ: 'آ',
  'ਐ\b': 'اَے',
  ਐ: 'اَی',
  ਔ: 'اَو',
  'ਆਂ\b': 'اں',
  ਆਂ: 'آن',
  ੴ: 'اک اونکار',
  '੍ਟ': 'ٹ',
  '੍ਨ': 'ن',
  '੍ਯ\b': 'ے',
  '੍ਯ': 'ی',
  '੍ਚ': 'چ',
  '੍ਤ': 'ت',
  'ੰ\b': 'ں',
  'ੰ': 'ن',
  '੍ਹ': 'ھ',
  'ਿ': 'ِ',
  'ੀ': 'ی',
  'ੁ': 'ُ',
  'ੂ': 'ُو',
  'ੇ\b': 'ے',
  'ੇ': 'ی',
  'ੈ\b': 'َے',
  'ੈ': 'َی',
  'ਂ\b': 'ں',
  'ਂ': 'ن',
  'ੋ': 'و',
  'ੌ': 'َو',
  '੍ਰ': 'ر',
  'ਾ': 'ا',
  'ੵ\b': 'ے',
  'ੵ': 'ی',
  'ੑ': 'ھ',
  'ੱ': 'ّ',
  '੍ਵ': 'و',
  'ਃ': ':',
  ਙ: 'نگ',
  ੳ: 'ا',
  ਅ: 'ا',
  ਬ: 'ب',
  ਭ: 'بھ',
  ਚ: 'چ',
  ਛ: 'چھ',
  ਦ: 'د',
  ਧ: 'دھ',
  ੲ: 'ا',
  ਓ: 'اَو',
  ਡ: 'ڈ',
  ਢ: 'ڈھ',
  'ਗ਼': 'غ',
  ਗ਼: 'غ',
  ਗ: 'گ',
  ਘ: 'گھ',
  ਹ: 'ہ',
  'ਜ਼': 'ز',
  ਜ਼: 'ز',
  ਜ: 'ج',
  ਝ: 'جھ',
  'ਕ਼': 'ق',
  ਕ: 'ک',
  'ਖ਼': 'خ',
  ਖ਼: 'خ',
  ਖ: 'کھ',
  'ਲ਼': 'ࣇ',
  ਲ਼: 'ࣇ',
  ਲ: 'ل',
  ਮ: 'م',
  ਨ: 'ن',
  ਪ: 'پ',
  'ਫ਼': 'ف',
  ਫ਼: 'ف',
  ਫ: 'پھ',
  ਤ: 'ت',
  ਥ: 'تھ',
  ਰ: 'ر',
  'ਸ਼': 'ش',
  ਸ: 'س',
  ਟ: 'ٹ',
  ਠ: 'ٹھ',
  ਵ: 'و',
  ੜ: 'ڑ',
  ਣ: 'ݨ',
  'ਯ\b': 'ے',
  ਯ: 'ی',
  ਞ: 'نج',
  '੧': '۱',
  '੨': '۲',
  '੩': '۳',
  '੪': '۴',
  '੫': '۵',
  '੬': '۶',
  '੭': '۷',
  '੮': '۸',
  '੯': '۹',
  '੦': '۰',
  '।': '۔',
  '॥': '۔۔',
  '.': '۔',
  ',': '،',
  ';': '؛',
  '-': ' ',
  '਼': '',
}

// Make each mapping an escaped global regex
const mappings = Object
  .entries( shahmukhiMappings )
  .map( ( [ exp, sub ] ) => [ new RegExp( exp.replace(/-/g, '\\x2d'), 'g' ), sub ] )

// Replacement rule to remove trailing ੁ and ਿ for pronunciation
const replacements = [
  [ new RegExp( `(\\S[^ਹ])([ਿੁ])([\\s$${vishraams.join( '' )}])`, 'ug' ), '$1$3' ], // Remove trailing ੁ and ਿ except when on ਹ or on a standalone akhar
]

const stress = [
  [ new RegExp( `ੱ([\u0A00-\u0A7F])`, 'ug' ), '$1ੱ' ], // Shift position of stress markers to after consonant to allow replacement for Shahmukhi
]

// Precompute the replacements and mappings
const finalReplacements = [ ...stress, ...replacements, ...mappings ]

/**
 * Transliterates Unicode Gurmukhi text to the Shahmukhi script.
 * @param {String} text The Unicode Gurmukhi text to convert.
 * @return {String} A Shahmukhi transliteration of the provided Unicode Gurmukhi string.
 * @example
 * toShahmukhi('ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥') // => هما ساِال لُتف هک پرورش ۔۔
 * toShahmukhi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => سُ بَےٹھ ِاکںتر ۔۔۵۷۸۔۔
 */
const toShahmukhi = ( text ) => finalReplacements
  .reduce( ( text, [ pre, exp, sub ] ) => text.replace( pre, exp, sub ), text )

module.exports = toShahmukhi
