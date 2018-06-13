// The list of exclusions from the first letter generation
const exclusions = [
  [ /] ([0-9]*) ]/, ']$1]' ],
  [ /] rhwau( dUjw)? ]/, '] ]' ],
  [ /] suDu/, ']' ],
  [ /] jumlw/, ']' ],
  [ /] bweIs caupdy qQw pMcpdy/, ']' ],
  [ /] Ckw [1-3]/, ']' ],
  [ /] joVu/, ']' ],
  [ /^Awsw ] iqpdw ] iekqukw ]$/, '' ],
  [ /^kbIru ] mwrU ]$/, '' ],
  [ /^muK Bwg$/, '' ],
  [ /.*m \d.*|.*mhlw \d.*|.*hlI bwc.*|.*kbIr jI.*|.*bwc ].*/, '' ],
  [ /.*CMd ].*/, '' ],
]

// The mappings from the letter-variations to simple gurmukhi letters.
const baseLetterMap = {
  E: 'a', // Open oora -> oora
  S: 's', // Shasha -> sasa
  z: 'j', // zaza -> jaja
  Z: 'g', // gaga pair bindi -> gaga
  L: 'l', // lala pair bindi -> lala
  '^': 'K', // Khakha pair bindi -> khakha
  '&': 'P', // Fafa pair bindi -> Fafa
}

/**
 * Generates the first letters for a given ASCII gurmukhi string.
 * @param {String} line The line to generate the first letters for.
 * @param {Boolean} [baseLetters=true] Enables mapping to the equivalent base letters.
 */
const firstLetters = ( line, baseLetters = true ) => exclusions
  // Filter the exclusions from the line
  .reduce( ( result, [ exp, sub ] ) => result.replace( exp, sub ), line )
  // Split into words
  .split( ' ' )
  // Grab correct letter of each word
  .map( ( [ firstLetter, secondLetter ] ) => {
    // Do not include || in the first letters
    if ( firstLetter === ']' ) { return '' }

    // Capture letter after sihari, if present
    const letter = firstLetter === 'i' ? secondLetter || '' : firstLetter

    // Return base letter if enabled and a base letter exists
    return baseLetters ? baseLetterMap[ letter ] || letter : letter
  } )
  // Join into continuous string
  .join( '' )
  // Remove first letters with only 1 character
  .replace( /^.$/, '' )

module.exports = firstLetters
