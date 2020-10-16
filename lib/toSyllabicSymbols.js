const toUnicode = require( './toUnicode' )
const { getRegexGroup } = require( './regex-utils' )

// Remove 0 weight syllables from the input string before counting
const syllabicStripping = [
  '੍ਰ',
  'ੵ',
  'ੑ',
  '੍ਵ',
  '੍ਹ',
  '੍ਟ',
  '੍ਨ',
  '੍ਯ',
  '੍ਚ',
  '੍ਤ',
  '੍',
  'ਿ',
  'ੁ',
  'ਂ',
  'ਃ',
  '।',
  '॥',
  '☬',
  '਼',
  '❁',
]

const syllabicMapping = {
  ਇ: 1,
  ਉ: 1,
  ਊ: 2,
  ਈ: 2,
  ਏ: 2,
  ਆ: 2,
  ਐ: 1,
  ਔ: 2,
  ਆਂ: 2,
  ੴ: 1,
  ਨੂੰ: 2,
  'ੰ': 'a',
  '੍ਹ': 'a',
  '੍ਹੂ': 'a',
  'ੀ': 'a',
  'ੂ': 'a',
  'ੇ': 'a',
  'ੈ': 'a',
  'ੋ': 'a',
  'ੌ': 'a',
  'ਾਂ': 'a',
  'ਾ': 'a',
  'ੱ': 'a',
  ਙ: 'b',
  ੳ: 'b',
  ਅ: 'b',
  ਬ: 'b',
  ਭ: 'b',
  ਚ: 'b',
  ਛ: 'b',
  ਦ: 'b',
  ਧ: 'b',
  ੲ: 'b',
  ਓ: 'b',
  ਡ: 'b',
  ਢ: 'b',
  ਗ: 'b',
  ਘ: 'b',
  ਹ: 'b',
  ਜ: 'b',
  ਝ: 'b',
  ਕ: 'b',
  ਖ: 'b',
  ਲ: 'b',
  ਲ਼: 'b',
  ਮ: 'b',
  ਨ: 'b',
  ਪ: 'b',
  ਫ: 'b',
  ਤ: 'b',
  ਥ: 'b',
  ਰ: 'b',
  ਸ: 'b',
  ਸ਼: 'b',
  ਟ: 'b',
  ਠ: 'b',
  ਵ: 'b',
  ੜ: 'b',
  ਣ: 'b',
  ਯ: 'b',
  ਜ਼: 'b',
  ਗ਼: 'b',
  ਖ਼: 'b',
  ਫ਼: 'b',
  // Not sure how to handle numbers as pronunciation is contextual
  // '੧': '?',
  // '੨': '?',
  // '੩': '?',
  // '੪': '?',
  // '੫': '?',
  // '੬': '?',
  // '੭': '?',
  // '੮': '?',
  // '੯': '?',
  // '੦': '?',
  ਞ: 'b',
  ' ': ' ',
}

const regex = new RegExp( getRegexGroup( syllabicStripping ), 'g' )

/**
 * Represents text in syllables according to Sanskrit prosody, Pingala, Matra/Meter/Morae
 * @param {String} text The string to convert
 * @return {String} A syllabic representation of 1's (laghu/light/short) and 2's (guru/heavy/long).
 * @example
 * toSyllabicSymbols( 'ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ' )
 * // expected output: '12 22 11 11 21'
 */
const toSyllabicSymbols = ( text ) => toUnicode( text )
  .replace( regex, '' )
  .split( '' )
  .map( ( value ) => syllabicMapping[ value ] )
  .join( '' )
  .replace( /[a]+/g, ( v ) => v.slice( 0, 1 ) )
  .replace( /ba/g, 2 )
  .replace( /b/g, 1 )

module.exports = toSyllabicSymbols
