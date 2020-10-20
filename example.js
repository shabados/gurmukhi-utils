const {
  toHindi,
  toShahmukhi,
  toAscii,
  toUnicode,
  firstLetters,
  toEnglish,
  stripAccents,
  stripVishraams,
  stripEndings,
  isGurmukhi,
  toSyllabicSymbols,
  countSyllables,
} = require( 'gurmukhi-utils' )

// Encoding conversions
console.log(toUnicode( 'Koj' ))
console.log(toAscii('ਖੋਜ'))

// Gurmukhi line utilities
console.log(firstLetters( 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ' ))
console.log(stripAccents('ਜ਼ਫ਼ੈਸ਼ਸ'))
console.log(stripVishraams('sbid mrY. so mir rhY; iPir.'))
console.log(stripEndings('ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥'))

// Language utlities
console.log(toEnglish( 'ਹੁਕਮੀ ਹੁਕਮੁ ਚਲਾਏ ਰਾਹੁ ॥' ))
console.log(toShahmukhi( 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ' ))
console.log(toHindi( 'ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥' ))
console.log(isGurmukhi('ਗੁਰਮੁਖੀ'))

// Analysis utlities
console.log(toSyllabicSymbols( 'ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ' ))
console.log(countSyllables('ਪ੍ਰਭੂ ਪ੍ਰੇਮੀ ਪੜ੍ਹ ਚੜ੍ਹ ਦ੍ਵੈਤ'))
