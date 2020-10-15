const escapeStringRegexp = require( 'escape-string-regexp' )

// Mappings
const devanagariMappings = {
  ਇ: 'इ',
  ਉ: 'उ',
  ਊ: 'ऊ',
  ਈ: 'ई',
  ਏ: 'ए',
  ਆ: 'आ',
  ਐ: 'ऐ',
  ਔ: 'औ',
  ੜ੍ਹ: 'ढ़',
  '੍': '्',
  'ੰ': 'ं',
  'ਿ': 'ि',
  'ੀ': 'ी',
  'ੁ': 'ु',
  'ੂ': 'ू',
  'ੇ': 'े',
  'ੈ': 'ै',
  'ਂ': 'ं',
  'ੋ': 'ो',
  'ੌ': 'ौ',
  'ਾ': 'ा',
  'ੵ': '्य',
  'ੑ': '',
  'ਃ': 'ः',
  'ੱਖ': 'क्ख',
  'ੱਛ': 'च्छ',
  'ੱਧ': 'द्ध',
  'ੱ': '',
  ਨ਼: 'ऩ',
  ਰ਼: 'ऱ',
  ਕ਼: 'क़',
  ਯ਼: 'य़',
  ਙ: 'ङ',
  ੳ: 'उ',
  ਅ: 'अ',
  ਬ: 'ब',
  ਭ: 'भ',
  ਚ: 'च',
  ਛ: 'छ',
  ਦ: 'द',
  ਧ: 'ध',
  ੲ: 'इ',
  ਓ: 'ओ',
  ਡ: 'ड',
  ਢ: 'ढ',
  ਗ: 'ग',
  ਘ: 'घ',
  ਹ: 'ह',
  ਜ: 'ज',
  ਝ: 'झ',
  ਕ: 'क',
  ਖ: 'ख',
  ਲ: 'ल',
  ਲ਼: 'ळ',
  ਮ: 'म',
  ਨ: 'न',
  ਪ: 'प',
  ਫ: 'फ',
  ਤ: 'त',
  ਥ: 'थ',
  ਰ: 'र',
  ਸ: 'स',
  ਸ਼: 'श',
  ਟ: 'ट',
  ਠ: 'ठ',
  ਵ: 'व',
  ੜ: 'ड़',
  ਣ: 'ण',
  ਯ: 'य',
  ਜ਼: 'ज़',
  ਗ਼: 'ग़',
  ਖ਼: 'क़',
  ਫ਼: 'फ़',
  ਞ: 'ञ',
  '੧': '१',
  '੨': '२',
  '੩': '३',
  '੪': '४',
  '੫': '५',
  '੬': '६',
  '੭': '७',
  '੮': '८',
  '੯': '९',
  '੦': '०',
  '਼': '़',
}

// Make each mapping an escaped global regex
const mappings = Object
  .entries( devanagariMappings )
  .map( ( [ exp, sub ] ) => [ new RegExp( escapeStringRegexp( exp ), 'g' ), sub ] )

// Replacement rules for initial input
const replacements = [
  [ /(ੰ|ਂ)(ੀ)/ug, '$2$1' ], // Move Tippi and Bindi after Bihari
]

// Precompute the replacements and mappings
const finalReplacements = [
  ...replacements,
  ...mappings,
]

/**
 * Transliterates Unicode Gurmukhi text to Hindi (Devanagari script).
 * @param {String} text The Unicode Gurmukhi text to convert.
 * @return {String} A Hindi transliteration of the provided Unicode Gurmukhi string.
 * @example
 * toHindi('ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥') // => कुल जन मधे मिल्यो सारग पान रे ॥
 * toHindi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => सु बैठ इकंत्र ॥५७८॥
 */
const toHindi = ( text ) => finalReplacements
  .reduce( ( text, [ exp, sub ] ) => text.replace( exp, sub ), text )

module.exports = toHindi
