/**
 * Checks if first char in string is part of the Gurmukhi Unicode block.
 * @param {String} text The text to check.
 * @return {boolean} True if Unicode Gurmukhi, false if other.
 * @example
 * isGurmukhi('ਗੁਰਮੁਖੀ') // => true
 * isGurmukhi('gurmuKI') // => false
 */
const isGurmukhi = text => ( text.charCodeAt( 0 ) >= 2560 && text.charCodeAt( 0 ) <= 2687 )

module.exports = isGurmukhi
