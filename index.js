const toUnicode = require( './lib/toUnicode' )
const toAscii = require( './lib/toAscii' )
const firstLetters = require( './lib/firstLetters' )
const toEnglish = require( './lib/toEnglish' )
const toShahmukhi = require( './lib/toShahmukhi' )
const toHindi = require( './lib/toHindi' )
const stripAccents = require( './lib/stripAccents' )
const stripVishraams = require( './lib/stripVishraams' )

module.exports = {
  toAscii,
  toUnicode,
  firstLetters,
  toEnglish,
  toShahmukhi,
  toHindi,
  stripAccents,
  stripVishraams,
}
