// The list of exclusions from the first letter generation in ascii.
const asciiExclusions = [
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

// The list of exclusions from the first letter generation in unicode.
const unicodeExclusions = [
  [ /] ([੦੧੨੩੪੫੬੭੮੯]*) ॥/, '॥$1॥' ],
  [ /॥ ਰਹਾੳੁ( ਦੂਜਾ)? ॥/, '॥ ॥' ],
  [ /॥ ਸੁਧੁ/, '॥' ],
  [ /॥ ਜੁਮਲਾ/, '॥' ],
  [ /॥ ਬਾੲੀਸ ਚੳੁਪਦੇ ਤਥਾ ਪੰਚਪਦੇ/, '॥' ],
  [ /॥ ਛਕਾ [੧੨੩]/, '॥' ],
  [ /॥ ਜੋੜੁ/, '॥' ],
  [ /^ਅਾਸਾ ॥ ਤਿਪਦਾ ॥ ੲਿਕਤੁਕਾ ॥$/, '' ],
  [ /^ਕਬੀਰੁ ॥ ਮਾਰੂ ॥$/, '' ],
  [ /^ਮੁਖ ਭਾਗ$/, '' ],
  [ /.*ਮ [੦੧੨੩੪੫੬੭੮੯].*|.*ਮਹਲਾ [੦੧੨੩੪੫੬੭੮੯].*|.*ਹਲੀ ਬਾਚ.*|.*ਕਬੀਰ ਜੀ.*|.*ਬਾਚ ॥.*/, '' ],
  [ /.*ਛੰਦ ॥.*/, '' ],
]

// The mappings from the letter-variations to simple gurmukhi letters in ascii.
const asciiBaseLetterMap = {
  E: 'a', // Open oora -> oora
  S: 's', // Shasha -> sasa
  z: 'j', // zaza -> jaja
  Z: 'g', // gaga pair bindi -> gaga
  L: 'l', // lala pair bindi -> lala
  '^': 'K', // Khakha pair bindi -> khakha
  '&': 'P', // Fafa pair bindi -> Fafa
}

const unicodeBaseLetterMap = {
  ਓ: 'ੳ', // Open oora -> oora
  ਸ਼: 'ਸ', // Shasha -> sasa
  ਜ਼: 'ਜ', // zaza -> jaja
  ਗ਼: 'ਗ', // gaga pair bindi -> gaga
  ਲ਼: 'ਲ', // lala pair bindi -> lala
  ਖ਼: 'ਖ', // Khakha pair bindi -> khakha
  ਫ਼: 'ਫ', // Fafa pair bindi -> Fafa
}

// Specifies the line terminator characters for both ascii and unicode gurmukhi
const lineTerminators = new Set( [ '।', '॥', ']' ] )

// Combine the exclusions and base letter maps
const combinedExclusions = [ ...asciiExclusions, unicodeExclusions ]
const combinedBaseLetterMap = { ...asciiBaseLetterMap, ...unicodeBaseLetterMap }

/**
 * Generates the first letters for a given ASCII or unicode gurmukhi string.
 * By default, the function will transform letters with bindi to their simple equivalent,
 * for example, zaza to jaja (ਜ਼ => ਜ).
 * @param {String} line The line to generate the first letters for.
 * @param {Boolean} [baseLetters=true] Enables mapping to the equivalent base letters.
 * @example <caption>ASCII</caption>
 * firstLetters('ijs no ik®pw krih iqin nwmu rqnu pwieAw ]') // => jnkkqnrp
 * firstLetters('iZir&qym sMdUk drIXw AmIk ]') // => gsdA
 * @example <caption>ASCII with no base letter mappings:</caption>
 * firstLetters('iZir&qym sMdUk* drIXw AmIk* ]', false) // => Zsda
 * @example <caption>Unicode:</caption>
 * firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ') // => ਗਹਹਨਬਜਹਗ
 * @example <caption>Unicode with no base letter mappings:</caption>
 * firstLetters('ਗ਼ੈਰਿ ਹਮਦਿ ਹੱਕ ਨਿਆਇਦ ਬਰ ਜ਼ਬਾਨਮ ਹੀਚ ਗਾਹ') // => ਗ਼ਹਹਨਬਜ਼ਹਗ
 */
const firstLetters = ( line, baseLetters = true ) => combinedExclusions
  // Filter the exclusions from the line
  .reduce( ( result, [ exp, sub ] ) => result.replace( exp, sub ), line )
  // Split into words
  .split( ' ' )
  // Grab correct letter of each word
  .map( ( [ firstLetter, secondLetter ] ) => {
    //* Do not include any line terminators in first letters
    if ( lineTerminators.has( firstLetter ) ) { return '' }

    // Capture letter after ascii sihari, if present
    const letter = firstLetter === 'i' ? secondLetter || '' : firstLetter

    // Return base letter if enabled and a base letter exists
    return baseLetters ? combinedBaseLetterMap[ letter ] || letter : letter
  } )
  // Join into continuous string
  .join( '' )
  // Remove first letters with only 1 character
  .replace( /^.$/, '' )

module.exports = firstLetters
