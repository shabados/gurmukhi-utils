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
  'ੰਨ': 'न्न',
  'ੰਬ': 'म्ब',
  'ੰ': 'ं',
  ਹਿ: 'ह',
  'ਿਹ': 'ेह',
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
  'ਃ': 'ः',
  'ੱਖ': 'क्ख',
  'ੱਛ': 'च्छ',
  'ੱਧ': 'द्ध',
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
const preReplacements = [
  [ /ੑ/ug, '' ],
  [ /ਅ(ਰ)(\s|$)/ug, 'य$1$2' ], // If last 2 chars are 'ਅਰ', then replace ਅ with य
  [ /ਆ(ਂ)(\s|$)/ug, 'यਾ$1$2' ], // If last char is 'ਆਂ', then replace ਅ with य
  [ /ਅ(\s|$)/ug, 'य$1' ], // If last char is 'ਅ', then replace ਅ with य
  [ /ਈ(\s|$)/ug, 'यी$1' ], // If last char is 'ਈ', then replace ਈ with यी
  [ /ਓ(.)(\s|$)/ug, 'यो$1$2' ], // If 2nd to last char is 'ਓ', then replace ਓ with यो
  [ /ਓ(.)(ਾ|(ਾਂ)|ੀ|ੋ|ੌ|ੇ|ੈ|(੍ਰ)|(੍ਹ)|ੵ|(੍ਵ)|(੍ਚ)|(੍ਤ)|(੍ਨ)|(੍ਟ)|ੁ|ੂ)(\s|$)/ug, 'यो$1$2$3' ], // Ditto, but with vowels
  [ /ਓ(\s|$)/ug, 'यो$1' ], // If last char is 'ਓ', then replace ਓ with यो
  [ /ਣ(\s|$)/ug, 'न$1' ], // If last char is 'ਣ', then replace ਣ with न
]

// Replacement rules after conversion
const postReplacements = [
  [ /िउ/ug, '्यु' ],
  [ /िऊ/ug, '्यू' ],
  [ /िओ/ug, '्यो' ],
  [ /ीआ/ug, 'िया' ],
  [ /ीअ/ug, 'िय' ],
  [ /इण/ug, 'यण' ],
  [ /ीयो/ug, '्यो' ],
  [ /िआ/ug, '्या' ],
]

// Precompute the replacements and mappings
const finalReplacements = [
  ...preReplacements,
  ...mappings,
  ...postReplacements,
]

/**
 * Transliterates Unicode Gurmukhi text to Hindi (Devanagari script).
 * @param {String} text The Unicode Gurmukhi text to convert.
 * @return {String} A Hindi transliteration of the provided Unicode Gurmukhi string.
 * @example
 * toHindi('ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥') // => هما ساِال لُتف هک پرورش ۔۔
 * toHindi('ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥') // => سُ بَےٹھ ِاکںتر ۔۔۵۷۸۔۔
 */
const toHindi = text => finalReplacements
  .reduce( ( text, [ exp, sub ] ) => text.replace( exp, sub ), text )

module.exports = toHindi
