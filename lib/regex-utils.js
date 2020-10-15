const escapeStringRegexp = require( 'escape-string-regexp' )

const getRegexClass = ( characters ) => `[${characters.map( escapeStringRegexp ).join( '' )}]`

const getRegexGroup = ( characters ) => `(${characters.map( escapeStringRegexp ).join( '|' )})`

module.exports = { getRegexClass, getRegexGroup }
