const toAscii = require( './toAscii' )
// The mappings from the letter-variations to simple Gurmukhi letters
const unicodeBaseLetterMap = require( './accents.json' )

// Generate both unicode and ASCII mappings
const baseLetterMap = {
  ...unicodeBaseLetterMap,
  ...Object.entries( unicodeBaseLetterMap ).reduce(
    ( letters, [ from, to ] ) => ( {
      ...letters,
      [ toAscii( from ) ]: toAscii( to ),
    } ),
    {},
  ),
}

/**
 * Removes accents from ASCII/Unicode Gumrukhi letters with their base letter.
 * Useful for generalising search queries.
 * @param {String} text The text to convert.
 * @return {String} A simplified version of the provided Gurmukhi string.
 * @example
 * stripAccents('ਜ਼ਫ਼ੈਸ਼ਸਓ') // => ਜਫੈਸਸੳ
 * stripAccents('Z^Svb') // => gKsvb
 */
const stripAccents = ( text ) => text
  .split( '' )
  .map( ( char ) => baseLetterMap[ char ] || char )
  .join( '' )

module.exports = stripAccents
