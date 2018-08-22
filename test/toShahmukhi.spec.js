const { expect } = require( 'chai' )

const { toShahmukhi } = require( '../index' )

// Test words
const words = [
  [ 'ਖੋਜ', 'کھوج' ],
  [ 'ਤੂ ਪ੍ਰਭ ਦਾਤਾ ਦਾਨਿ ਮਤਿ ਪੂਰਾ ਹਮ ਥਾਰੇ ਭੇਖਾਰੀ ਜੀਉ ॥', 'تُو پربھ داتا دان مت پُورا هم تھارے بھےکھاری جیاُ ۔۔' ],
  [ 'ਸੋ ਬ੍ਰਹਮੁ ਅਜੋਨੀ ਹੈ ਭੀ ਹੋਨੀ ਘਟ ਭੀਤਰਿ ਦੇਖੁ ਮੁਰਾਰੀ ਜੀਉ ॥੨॥', 'سو برهم اجونی هَے بھی هونی گھٹ بھیتر دےکھ مُراری جیاُ ۔۔۲۔۔' ],
  [ 'ਜ਼ਨੇ ਪੇਚ ਦਸਤਾਰ ਰਾ ਤਾਬਦਾਦ ॥', 'زنے پےچ دستار را تابداد ۔۔' ],
  [ 'ਸਉਡਿਸਇਸ ਇਸ ਇਸਣੀ ਆਦਿ ਬਖਾਨਿ ਕੈ ॥', 'ساُڈِسِاس ِاس ِاسنی آد بکھان کَے ۔۔' ],
  [ 'ਅਜ਼ੋ ਗਸ਼ਤਾ ਹਰ ਜ਼ੱਰਰਾ ਖ਼ੁਰਸ਼ੈਦ ਤਾਬ ॥੯੬॥', 'ازو گشتا هر زّررا خُرشَےد تاب ۔۔۹۶۔۔' ],
  [ 'ਹਮਾ ਸਾਇਲਿ ਲੁਤਫ਼ਿ ਹਕ ਪਰਵਰਸ਼ ॥', 'هما ساِال لُتف هک پرورش ۔۔' ],
  [ 'ਸੁ ਬੈਠਿ ਇਕੰਤ੍ਰ ॥੫੭੮॥', 'سُ بَےٹھ ِاکںتر ۔۔۵۷۸۔۔' ],
  [ 'ਇਤਿ ਸ੍ਰੀ ਬਚਿਤ੍ਰ ਨਾਟਕੇ ਮਨੁ ਰਾਜਾ ਕੋ ਰਾਜ ਸਮਾਪਤੰ ॥੧॥੫॥', 'ِات سری بچِتر ناٹکے من راجا کو راج سماپتں ۔۔۱۔۔۵۔۔' ],
  [ 'ਤਿਸੁ ਵਿਣੁ ਸਭੁ ਅਪਵਿਤ੍ਰੁ ਹੈ ਜੇਤਾ ਪੈਨਣੁ ਖਾਣੁ ॥', 'تِس وِن سبھ اپوِتر هَے جےتا پَےنن کھان ۔۔' ],
  [ 'ਸੋਢੀ ਸ੍ਰਿਸ੍ਟਿ ਸਕਲ ਤਾਰਣ ਕਉ ਅਬ ਗੁਰ ਰਾਮਦਾਸ ਕਉ ਮਿਲੀ ਬਡਾਈ ॥੩॥', 'سوڈھی سرِسٹ سکل تارن کاُ اب گُر رامداس کاُ مِلی بڈاای ۔۔۳۔۔' ],
  [ 'ਰਾਗੁ ਗਉੜੀ ਥਿਤੰੀ ਕਬੀਰ ਜੀ ਕੰੀ ॥', 'راگ گاُڑی تھِتںی کبیر جی کںی ۔۔' ],
]

describe( 'toShahmukhi()', () => {
  words.map( ( [ unicode, shahmukhi ] ) => it( `should convert '${unicode}' to '${shahmukhi}'`, () => {
    expect( toShahmukhi( unicode ) ).to.equal( shahmukhi )
  } ) )
} )