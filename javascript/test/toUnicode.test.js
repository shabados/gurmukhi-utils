import { suite } from 'uvu'
import * as assert from 'uvu/assert'
import toUnicode, { UnicodeStandard } from '../build/toUnicode.js'

const toUnicodeAgainAndAgain = (str) => toUnicode(toUnicode(toUnicode(str)))
const toSantLipi = (str) => toUnicode(str, UnicodeStandard['Sant Lipi'])
const toSantLipiAgainAndAgain = (str) => toSantLipi(toSantLipi(toSantLipi(str)))

const test = suite('toUnicode')

for (const [key, value] of Object.entries({
  123: '੧੨੩',
  '<> > <': 'ੴ ☬ ੴ',
  gurU: 'ਗੁਰੂ',
})) {
  test(`toUnicode(${key}) is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`toUnicodeAgainAndAgain(${key}) is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
}

for (const [key, value] of Object.entries({
  kRwN: 'ਕ੍ਰਾਂ',
  sÍwNiq: 'ਸ੍ਵਾਂਤਿ',
  iBRMg: 'ਭ੍ਰਿੰਗ',
  'inR`qy': 'ਨ੍ਰਿੱਤੇ',
  'ik®`sM': 'ਕ੍ਰਿੱਸੰ',
  'AMimR`q': 'ਅੰਮ੍ਰਿੱਤ',
  'Qwin´M': 'ਥਾਨੵਿੰ',
  kRwNq: 'ਕ੍ਰਾਂਤ',
  'k®ü`D': 'ਕ੍ਰੁੱਧ',
  ijnHYN: 'ਜਿਨ੍ਹੈਂ',
  hÍüYbo: 'ਹ੍ਵੈੁਬੋ',
  nUµ: 'ਨੂੰ',
  '^u`d': 'ਖ਼ੁੱਦ',
  PzUM: 'ਫਜ਼ੂੰ',
  'kwrmu`l-k`rwm': 'ਕਾਰਮੁੱਲ-ਕੱਰਾਮ',
  '&ru¤^y': 'ਫ਼ਰੁੱਖ਼ੇ',
  '^u¤ro': 'ਖ਼ੁੱਰੋ',
  duoAwlY: 'ਦੋੁਆਲੈ',
  'idRV@IAw': 'ਦ੍ਰਿੜੑੀਆ',
  'kwn@ü': 'ਕਾਨੑੁ',
  'ijMn@I': 'ਜਿੰਨੑੀ',
  'El@w': 'ਓਲੑਾ',
  'swm@Y': 'ਸਾਮੑੈ',
  kqybhuˆ: 'ਕਤੇਬਹੁਂ',
})) {
  test(`diacritics ${key} is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`triple diacritics ${key} is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
}

for (const [key, value] of Object.entries({
  'BuiKAw.': 'ਭੁਖਿਆ.',
  'ਭੁਖiਆ.': 'ਭੁਖਿਆ.',
  ਮi: 'ਮਿ',
  ਮiਲ: 'ਮਿਲ',
  ਮil: 'ਮਲਿ',
  'suMi\\Aw': 'ਸੁੰਞਿਆ',
  '|i||': 'ਙਙਿਙ',
  'di&': 'ਦਫ਼ਿ',
})) {
  test(`sihari ${key} is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`triple sihari ${key} is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
}

for (const [key, value] of Object.entries({
  iQqMØI: 'ਥਿਤੀੰ', // some fonts render as ੀੰ, Sant Lipi should render  ੰ + ੀ
  kMØI: 'ਕੀੰ',
  nµØIbu: 'ਨੀੰਬੁ',
  nµØIbw: 'ਨੀੰਬਾ',
  dyNih: 'ਦੇਂਹਿ',
})) {
  test(`nasalization ${key} is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`triple nasalization ${key} is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
}

for (const [key, value] of Object.entries({
  guxˆØI: 'ਗੁਣੀਁ',
  sKˆØI: 'ਸਖੀਁ',
})) {
  test(`bindi before bihari ${key} is ${value}`, () => {
    assert.is(toSantLipi(key), value)
  })
  test(`triple bindi before bihari ${key} is ${value}`, () => {
    assert.is(toSantLipiAgainAndAgain(key), value)
  })
  test(`sant lipi to unicode should fail`, () => {
    assert.is.not(toUnicode(toSantLipi(key)), value)
  })
}

for (const [key, value] of Object.entries({
  'DR¨A': 'ਧ੍ਰੂਅ',
  AwilsÎ: 'ਆਲਿਸ੍ਯ',
  dwin: 'ਦਾਨਿ',
  BIqir: 'ਭੀਤਰਿ',
  jIau: 'ਜੀਉ',
  '[1[2[3[4[5[': '।੧।੨।੩।੪।੫।',
  ']1]2]3]4]5]': '॥੧॥੨॥੩॥੪॥੫॥',
  sauifsies: 'ਸਉਡਿਸਇਸ',
  'z`rrw': 'ਜ਼ੱਰਰਾ',
  '^urSYd': 'ਖ਼ੁਰਸ਼ੈਦ',
  'luqi&': 'ਲੁਤਫ਼ਿ',
  iekMqR: 'ਇਕੰਤ੍ਰ',
  pRBU: 'ਪ੍ਰਭੂ',
})) {
  test(`ascii conversions ${key} is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`triple ascii conversions ${key} is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
}

for (const [key, value] of Object.entries({
  'isRis†': 'ਸ੍ਰਿਸ੍ਟਿ',
  'ik®s˜M': 'ਕ੍ਰਿਸ੍ਨੰ',
  dsœgIrI: 'ਦਸ੍ਤਗੀਰੀ',
  insçl: 'ਨਿਸ੍ਚਲ',
  sÍwd: 'ਸ੍ਵਾਦ',
  'suDwK´r': 'ਸੁਧਾਖੵਰ',
  'cVH¨': 'ਚੜ੍ਹੂ',
  'cV§': 'ਚੜ੍ਹੂ',
  'im´wny': 'ਮੵਿਾਨੇ',
  'iD´wvY': 'ਧੵਿਾਵੈ',
  idÍj: 'ਦ੍ਵਿਜ',
  iBKÏw: 'ਭਿਖੵਾ',
  imQÏMq: 'ਮਿਥੵੰਤ',
  'imQ´Mq': 'ਮਿਥੵੰਤ',
  rKÏw: 'ਰਖੵਾ',
  sMswrsÏ: 'ਸੰਸਾਰਸੵ',
})) {
  test(`ascii subscripts ${key} is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`triple ascii subscripts ${key} is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
}

for (const [key, value] of Object.entries({
  // Yayya with or without diacritics renders correctly.
  XkIN: 'ਯਕੀਂ',
  ipRX: 'ਪ੍ਰਿਯ',
  'hX¤wiq': 'ਹਯਾੱਤਿ',
  'hXw¤iq': 'ਹਯਾੱਤਿ',
  hmwXUM: 'ਹਮਾਯੂੰ',
  BXuo: 'ਭਯੋੁ',
  XkIn: 'ਯਕੀਨ',
  // Half-Y (open-left) with no diacritics renders correctly.
  mDÎ: 'ਮਧ੍ਯ',
  ilKÎqy: 'ਲਿਖ੍ਯਤੇ',
  // Half-Y with any diacritics may render incorrectly with sub-par fonts / shaping engines
  mwnÎo: 'ਮਾਨ੍ਯੋ',
  iBÎo: 'ਭਿ੍ਯੋ',
  kIÎo: 'ਕੀ੍ਯੋ',
  sÎwm: 'ਸ੍ਯਾਮ',
  qÎwgÎo: 'ਤ੍ਯਾਗ੍ਯੋ',
  jÎoN: 'ਜ੍ਯੋਂ',
  // Open-top Yayya doesn't exist in Unicode 14.0, converts base-letter to Yayya.
  nwmï: 'ਨਾਮਯ',
  sunIïhu: 'ਸੁਨੀਯਹੁ',
  AdyïM: 'ਅਦੇਯੰ',
  kFïo: 'ਕਢਯੋ',
  sïwm: 'ਸਯਾਮ',
  // Open-top Half-Y doesn't exist in Unicode 14.0.
  // Converts to Half-Y (may render incorrectly with sub-par fonts / shaping engines)
  idqïwidqî: 'ਦਿਤਯਾਦਿਤ੍ਯ',
  qRsîo: 'ਤ੍ਰਸ੍ਯੋ',
})) {
  test(`yayya ${key} is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`triple yayya ${key} is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
  test(`SL to UC to SL to UC`, () => {
    assert.is(toUnicode(toSantLipi(toUnicode(toSantLipi(key)))), value)
  })
}

for (const [key, value] of Object.entries({
  // Yayya
  XkIN: 'ਯਕੀਂ',
  ipRX: 'ਪ੍ਰਿਯ',
  'hX¤wiq': 'ਹਯਾੱਤਿ',
  'hXw¤iq': 'ਹਯਾੱਤਿ',
  hmwXUM: 'ਹਮਾਯੂੰ',
  BXuo: 'ਭਯੋੁ',
  XkIn: 'ਯਕੀਨ',
  // Half-Y (open-left)
  mDÎ: 'ਮਧ꠳ਯ',
  ilKÎqy: 'ਲਿਖ꠳ਯਤੇ',
  mwnÎo: 'ਮਾਨ꠳ਯੋ',
  iBÎo: 'ਭਿ꠳ਯੋ',
  kIÎo: 'ਕੀ꠳ਯੋ',
  sÎwm: 'ਸ꠳ਯਾਮ',
  qÎwgÎo: 'ਤ꠳ਯਾਗ꠳ਯੋ',
  jÎoN: 'ਜ꠳ਯੋਂ',
  // Open-top Yayya
  nwmï: 'ਨਾਮ꠴ਯ',
  sunIïhu: 'ਸੁਨੀ꠴ਯਹੁ',
  AdyïM: 'ਅਦੇ꠴ਯੰ',
  kFïo: 'ਕਢ꠴ਯੋ',
  sïwm: 'ਸ꠴ਯਾਮ',
  // Open-top Half-Y
  idqïwidqî: 'ਦਿਤ꠴ਯਾਦਿਤ꠵ਯ',
  qRsîo: 'ਤ੍ਰਸ꠵ਯੋ',
})) {
  test(`yayya SL ${key} is ${value}`, () => {
    assert.is(toSantLipi(key), value)
  })
  test(`triple yayya SL ${key} is ${value}`, () => {
    assert.is(toSantLipiAgainAndAgain(key), value)
  })
}

const ਗੋੁਬਿੰਦ = '\u0a17\u0a4b\u0a41\u0a2c\u0a3f\u0a70\u0a26'
const ਮਿਲੵਿੋ = '\u0a2e\u0a3f\u0a32\u0a75\u0a3f\u0a4b'
const ਗ੍ਹਿਾਨ = '\u0a17\u0a4d\u0a39\u0a3f\u0a3e\u0a28'
const ਸ਼੍ਰੇਣੀ = '\u0a36\u0a4d\u0a30\u0a47\u0a23\u0a40'
const ਜੋਤੵਿੰ = '\u0a1c\u0a4b\u0a24\u0a75\u0a3f\u0a70'
const ਬਸੵਿੰਤ = '\u0a2c\u0a38\u0a75\u0a3f\u0a70\u0a24'

for (const [key, value] of Object.entries({
  guoibMd: ਗੋੁਬਿੰਦ,
  gouibMd: ਗੋੁਬਿੰਦ,
  guoibµd: ਗੋੁਬਿੰਦ,
  gouibµd: ਗੋੁਬਿੰਦ,
  'imil´o': ਮਿਲੵਿੋ,
  'imilo´': ਮਿਲੵਿੋ,
  imiloÏ: ਮਿਲੵਿੋ,
  imilÏo: ਮਿਲੵਿੋ,
  '\u0a2e\u0a3f\u0a32\u0a4b\u0a3f\u0a75': ਮਿਲੵਿੋ,
  igHwn: ਗ੍ਹਿਾਨ,
  igwHn: ਗ੍ਹਿਾਨ,
  '\u0a17\u0a3f\u0a4d\u0a39\u0a3e\u0a28': ਗ੍ਹਿਾਨ,
  '\u0a17\u0a3f\u0a3e\u0a4d\u0a39\u0a28': ਗ੍ਹਿਾਨ,
  '\u0a17\u0a3e\u0a3f\u0a4d\u0a39\u0a28': ਗ੍ਹਿਾਨ,
  's®æyxI': ਸ਼੍ਰੇਣੀ,
  'S®yxI': ਸ਼੍ਰੇਣੀ,
  SRyxI: ਸ਼੍ਰੇਣੀ,
  SyRxI: ਸ਼੍ਰੇਣੀ,
  sæRyxI: ਸ਼੍ਰੇਣੀ,
  sRæyxI: ਸ਼੍ਰੇਣੀ,
  syRæxI: ਸ਼੍ਰੇਣੀ,
  joiqÏM: ਜੋਤੵਿੰ,
  joiqMÏ: ਜੋਤੵਿੰ,
  bisÏMq: ਬਸੵਿੰਤ,
  bisMÏq: ਬਸੵਿੰਤ,
})) {
  test(`diacritic ordering ${key} is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`triple diacritic ordering ${key} is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
}

const ਓੁ = '\u0a13\u0a41'
const ਓੂ = '\u0a13\u0a42'
const ਆਂ = '\u0a06\u0a02'

for (const [key, value] of Object.entries({
  aou: ਓੁ,
  auo: ਓੁ,
  aoU: ਓੂ,
  aUo: ਓੂ,
  AW: ਆਂ,
  ANw: ਆਂ,
  AwN: ਆਂ,
})) {
  test(`sanitization ${key} is ${value}`, () => {
    assert.is(toUnicode(key), value)
  })
  test(`triple sanitization ${key} is ${value}`, () => {
    assert.is(toUnicodeAgainAndAgain(key), value)
  })
}

test.run()
