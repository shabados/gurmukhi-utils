const toSyllabicSymbols = require( './toSyllabicSymbols' )

/**
 * Calculates the number of syllables according to Sanskrit prosody, Pingala, Matra/Meter/Morae
 * @param {String} text The string to analyze
 * @return {number} An integer adding up all the 1's (laghu/light/short) and 2's (guru/heavy/long).
 * @example
 * countSyllables( 'ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ' )
 * // expected output: 14
 */
const countSyllables = ( text ) => toSyllabicSymbols( text )
  .split( '' )
  .reduce( ( a, b ) => +b + a, 0 )

module.exports = countSyllables
