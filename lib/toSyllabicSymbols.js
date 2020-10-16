const toUnicode = require( './toUnicode' )
const { getRegexGroup } = require( './regex-utils' )

// Some symbols represent multiple characters in a single unicode entity
// These should be considered unsplittable and unmodifiable by other vowels/signs
// Therefore can calculate their syllabic weight as is
const oneUnitSyllables = [ 'ਇ', 'ਉ' ]
const twoUnitSyllables = [ 'ਊ', 'ਓ', 'ਈ', 'ਏ', 'ਐ', 'ਆ', 'ਔ', 'ਆਂ', 'ਨੂੰ' ]

// Other symbols/signs have no weight, therfore remove before processing
const zeroUnitCharacters = [
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

// For the rest, need to analyze the string
// Any base character on it's own counts as one syllable
// Adding any number of long/deeragh sounds will count as two syllables
const syllableIdentifier = {
  baseCharacter: 'b',
  deeraghModifier: 'a',
}

// The list of base characters for analysis
const baseCharacters = [
  'ਙ',
  'ੳ',
  'ਅ',
  'ਬ',
  'ਭ',
  'ਚ',
  'ਛ',
  'ਦ',
  'ਧ',
  'ੲ',
  'ਡ',
  'ਢ',
  'ਗ',
  'ਘ',
  'ਹ',
  'ਜ',
  'ਝ',
  'ਕ',
  'ਖ',
  'ਲ',
  'ਲ਼',
  'ਮ',
  'ਨ',
  'ਪ',
  'ਫ',
  'ਤ',
  'ਥ',
  'ਰ',
  'ਸ',
  'ਸ਼',
  'ਟ',
  'ਠ',
  'ਵ',
  'ੜ',
  'ਣ',
  'ਯ',
  'ਜ਼',
  'ਗ਼',
  'ਖ਼',
  'ਫ਼',
  'ਞ',
]

// The list of long sound characters for analysis
const deeraghModifiers = [
  'ੰ',
  '੍ਹੂ',
  'ੀ',
  'ੂ',
  'ੇ',
  'ੈ',
  'ੋ',
  'ੌ',
  'ਾਂ',
  'ਾ',
  'ੱ',
]

// Map one-unit syllables to the string '1' and two-unit syllables to the string '2'
// Otherwise map each character to a syllableIdentifier, for further processing/analysis
const syllabicMapping = Object.entries( {
  1: [ ...oneUnitSyllables ],
  2: [ ...twoUnitSyllables ],
  [ syllableIdentifier.baseCharacter ]: [ ...baseCharacters ],
  [ syllableIdentifier.deeraghModifier ]: [ ...deeraghModifiers ],
} ).reduce( ( newObject, [ weight, characters ] ) => {
  const characterMap = characters.reduce( ( characterMapObject, [ character ] ) => ( {
    ...characterMapObject,
    [ character ]: weight,
  } ), {} )
  return ( {
    ...newObject,
    ...characterMap,
  } )
}, {} )

// Add any missing rules which do not fit in the above patterns
syllabicMapping[ 'ੴ' ] = '21 2221' // Ik Oankaar / ਇੱਕ ਓਅੰਕਾਰ
syllabicMapping[ ' ' ] = ' ' // Preserve spacing between words

// Create the Regex rule that will be used to strip characters irrelevant to syllable weighting
const regexToStrip = new RegExp( getRegexGroup( zeroUnitCharacters ), 'g' )

/**
 * Represents text in syllables according to Sanskrit prosody, Pingala, Matra/Meter/Morae
 * @param {String} text The string to convert
 * @return {String} A syllabic representation of 1's (laghu/light/short) and 2's (guru/heavy/long).
 * @example
 * toSyllabicSymbols( 'ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ' )
 * // expected output: '12 22 11 11 21'
 */
const toSyllabicSymbols = ( text ) => toUnicode( text ) // Sanitize input
  .replace( regexToStrip, '' ) // Remove zero weight characters
  .split( '' ) // Break apart all characters for mapping
  .map( ( value ) => syllabicMapping[ value ] ) // Map according to rules above ('1, 2, b, a')
  .join( '' ) // Combine to check sequences
  .replace( /[a]+/g, ( v ) => v.slice( 0, 1 ) ) // Only one long sound is enough to modify base char
  .replace( /ba/g, 2 ) // Combine a base char and long sound into a 2 unit syllable
  .replace( /b/g, 1 ) // Convert any remaining base chars to a 1 unit syllable

module.exports = toSyllabicSymbols
