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
} = require( 'gurmukhi-utils' )

console.log(toUnicode( 'Koj' ))
console.log(toAscii('ਖੋਜ'))
console.log(firstLetters( 'hir hir hir gun gwvhu ]' ))
console.log(firstLetters( 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ' ))
console.log(toEnglish( 'ਹੁਕਮੀ ਹੁਕਮੁ ਚਲਾਏ ਰਾਹੁ ॥' ))
console.log(toShahmukhi( 'ਹਰਿ ਹਰਿ ਹਰਿ ਗੁਨੀ' ))
console.log(toHindi( 'ਕੁਲ ਜਨ ਮਧੇ ਮਿਲੵੋਿ ਸਾਰਗ ਪਾਨ ਰੇ ॥' ))
console.log(stripAccents('ਜ਼ਫ਼ੈਸ਼ਸ'))
console.log(stripVishraams('sbid mrY. so mir rhY; iPir.'))
console.log(stripEndings('ਸੋ ਘਰੁ ਰਾਖੁ; ਵਡਾਈ ਤੋਇ ॥੧॥ ਰਹਾਉ ॥'))
console.log(isGurmukhi('ਗੁਰਮੁਖੀ'))
