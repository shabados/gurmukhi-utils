const toAscii = require( './toAscii' )

// The mappings from the letter-variations to simple Gurmukhi letters
const unicodeBaseLetterMap = require( './akhars.json' )

// Generate both unicode and ASCII mappings
const baseLetterMap = {
  ...unicodeBaseLetterMap,
  ...Object.entries( unicodeBaseLetterMap ).reduce( ( letters, [ from, to ] ) => ( {
    ...letters,
    [ toAscii( from ) ]: toAscii( to ),
  } ), {} ),
}

/**
 * Replaces complex/variation ASCII/Unicode Gumrukhi letters with their base letter/akhar.
 * @param {String} text The text to convert.
 * @return {String} A simplified version of the provided Gurmukhi string.
 * @example
 * toAkhar('ਜ਼ਫ਼ੈਸ਼ਸ') // => ਜਫੈਸਸ
 * toAkhar('Z^Svb') // => gKsvb
 */
const toAkhar = text => text.split( '' ).map( char => baseLetterMap[ char ] || char ).join( '' )

module.exports = toAkhar
