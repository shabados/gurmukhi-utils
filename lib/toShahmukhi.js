const vishraams = Object.values( require( './vishraams' ) )

export default function escapeUnicodeStringRegexp(string) {
	if (typeof string !== 'string') {
		throw new TypeError('Expected a string');
	}
	return string.replace(/-/g, '\\x2d');
}
// Mappings
const shahmukhiMappings = {
  ਉਹ: 'اوہ',
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
  'ੈ': 'َے',
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
  'ਅ\b': 'ء',
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
  ਗ: 'گ',
  ਘ: 'گھ',
  ਹ: 'ه',
  ਜ: 'ج',
  ਝ: 'جھ',
  ਕ: 'ک',
  ਖ: 'کھ',
  ਲ: 'ل',
  ਲ਼: 'ࣇ',
  ਮ: 'م',
  ਨ: 'ن',
  ਪ: 'پ',
  ਫ: 'پھ',
  ਤ: 'ت',
  ਥ: 'تھ',
  ਰ: 'ر',
  ਸ: 'س',
  ਸ਼: 'ش',
  ਟ: 'ٹ',
  ਠ: 'ٹھ',
  ਵ: 'و',
  ੜ: 'ڑ',
  ਣ: 'ݨ',
  ਯ: 'ے',
  ਜ਼: 'ز',
  ਗ਼: 'غ',
  ਖ਼: 'خ',
  ਫ਼: 'ف',
  ਕ਼: 'ق',
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
  '਼': '',
}

// Make each mapping an escaped global regex
const mappings = Object
  .entries( shahmukhiMappings )
  .map( ( [ exp, sub ] ) => [ new RegExp( escapeUnicodeStringRegexp( exp ), 'g' ), sub ] )

// Replacement rule to remove trailing ੁ and ਿ for pronunciation
const replacements = [
  [ new RegExp( `(\\S[^ਹ])([ਿੁ])([\\s$${vishraams.join( '' )}])`, 'ug' ), '$1$3' ], // Remove trailing ੁ and ਿ except when on ਹ or on a standalone akhar
]

// Precompute the replacements and mappings
const finalReplacements = [ ...replacements, ...mappings ]

/**
 * Transliterates Unicode Gurmukhi text to the Shahmukhi script.
 * @param {String} text The Unicode Gurmukhi text to convert.
 * @return {String} A Shahmukhi transliteration of the provided Unicode Gurmukhi string.
 * @example
 * toShahmukhi('ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥') // => هما ساِال لُتف هک پرورش ۔۔
 * toShahmukhi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => سُ بَےٹھ ِاکںتر ۔۔۵۷۸۔۔
 */
const toShahmukhi = ( text ) => finalReplacements
  .reduce( ( text, [ exp, sub ] ) => text.replace( exp, sub ), text )

module.exports = toShahmukhi
