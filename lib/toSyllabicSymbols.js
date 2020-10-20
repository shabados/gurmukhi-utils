const toUnicode = require( './toUnicode' )
const { getRegexGroup } = require( './regex-utils' )

// These have no impact on weight, therfore remove before processing
const zeroWeightSigns = [
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
// Base characters counts as one syllable (light)
// Base characters with any number of long (deeragh) sounds counts as two syllables (heavy)
const syllableSymbols = {
  light: '1',
  deeragh: 's',
  heavySequence: '1s',
  heavy: '2',
}

// The list of base characters for analysis
const baseCharacters = [
  'ਇ',
  'ਉ',
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

// Some symbols represent multiple characters in a single unicode entity.
// These should be considered unsplittable and unmodifiable by other vowels/signs.
// The following represent a base character and deeragh in one unicode entity point.
// Since author is unaware of whether these can be further modified with deeragh
// they'll be processed as a heavy sequence (base char + deeragh) in the mapping.
// If that is not the case and these characters cannot have further deeragh modifiers,
// then they can be safely mapped directly to syllableSymbol.heavy
const twoUnitSyllables = [ 'ਊ', 'ਓ', 'ਈ', 'ਏ', 'ਐ', 'ਆ', 'ਔ' ]

// Create a map for each character to a syllableSymbol, for further processing/analysis
const syllabicMapping = Object.entries( {
  [ syllableSymbols.light ]: baseCharacters,
  [ syllableSymbols.deeragh ]: deeraghModifiers,
  [ syllableSymbols.heavySequence ]: twoUnitSyllables,
} ).reduce( ( allCharToAllSymbols, [ symbol, groupedCharacters ] ) => ( {
  ...allCharToAllSymbols,
  ...groupedCharacters.reduce( ( characterToSymbol, [ character ] ) => ( {
    ...characterToSymbol,
    [ character ]: symbol,
  } ), {} ),
} ), {
  // Add any missing mappings which do not fit in the above patterns
  // These rules are "as is", and are not modified in the reducer above
  ੴ: '21 2221', // Ik Oankaar / ਇੱਕ ਓਅੰਕਾਰ
  ' ': ' ', // Preserve spacing between words
} )

// Create Regex rules for replacements
const zeroWeightSignsRegex = new RegExp( getRegexGroup( zeroWeightSigns ), 'g' )
const multipleSpaceCharsRegex = new RegExp( / +/, 'g' )
const multipleDeeraghSymbolsRegex = new RegExp( /s+/, 'g' )
const heavySequenceRegex = new RegExp( /1s/, 'g' )

/**
 * Represents text in syllables according to Sanskrit prosody, Pingala, Matra/Meter/Morae
 * @param {String} text The string to convert
 * @return {String} A syllabic representation of 1's (laghu/light/short) and 2's (guru/heavy/long).
 * @example
 * toSyllabicSymbols( 'ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ' )
 * // expected output: '12 22 11 11 21'
 */
const toSyllabicSymbols = ( text ) => toUnicode( text ) // Sanitize input
  .replace( zeroWeightSignsRegex, '' ) // Remove zero weight characters
  .split( '' ) // Break apart all characters for mapping
  .map( ( value ) => syllabicMapping[ value ] ) // Map (to light, heavy, or deeragh) per rules above
  .join( '' ) // Combine to check sequences
  .replace( multipleSpaceCharsRegex, ' ' ) // e.g. 'ਹਫ਼ਤੇ ਵਿਚ 7 ਦਿਨ' last 2 words will have 2 spc
  .replace( multipleDeeraghSymbolsRegex, syllableSymbols.deeragh ) // Only one long sound is enough
  .replace( heavySequenceRegex, syllableSymbols.heavy ) // Combine base char + long sound => heavy

module.exports = toSyllabicSymbols
