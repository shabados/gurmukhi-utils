const { expect } = require( 'chai' )

const { transliterate } = require( '../index' )

// Test lines
const transliterations = [
  [ 'ikv sicAwrw hoeIAY ikv kUVY qutY pwil ]', "kiv sachiaaraa hoe'eeaai kiv kooRai tuTai paal ||" ],
  [ 'knkM duiq aujl AMg sny ]', 'kanakan dhut aujal ang sane ||' ],
  [ 'gun imRghw ko icq bIc lIAw ]385]', 'gun mrigahaa ko chit beech leeaa ||385||' ],
  [ 'gx gMDRb BUq ipswc qbY ]388]', 'gaN gandhrab bhoot pisaach tabai ||388||' ],
  [ 'AbRXkq AMg ]', 'abrayakat ang ||' ],
  [ 'jgMnwQ jgdIsur krqy sB vsgiq hY hir kyrI ]', 'jagannaath jagadheesur karate sabh vasagat hai har keree ||' ],
  [ 'Awid scu jugwid scu ]', 'aadh sach jugaadh sach ||' ],
  [ 'shs isAwxpw lK hoih q iek n clY nwil ]', 'sahas siaaNapaa lakh hohi ta eik na chalai naal ||' ],
  [ '<> siq nwmu krqw purKu inrBau inrvYru Akwl mUriq AjUnI sYBM gurpRswid ]', 'IkOankaar sat naam karataa purakh nirabhau niravair akaal moorat ajoonee saibhan guraprasaadh ||' ],
  [ 'hukmI hukmu clwey rwhu ]', 'hukamee hukam chalaae raahu ||' ],
  [ 'iqn ky nwm Anyk Anµq ]', 'tin ke naam anek anant ||' ],
  [ 'BWfw Bwau AMimRqu iqqu Fwil ]', 'bhaa(n)ddaa bhaau anmrit tit ddaal ||' ],
  [ 'ikRpw', 'kripaa' ],
  [ 'ik®pw', 'kripaa' ],
  [ 'mÚ', 'mahalaa' ],
  [ 'ijs no ik®pw krih iqin nwmu rqnu pwieAw ]', 'jis no kripaa kareh tin naam ratan paaeiaa ||' ],
  [ 'Awvxu vM\\xu fwKVo CofI kMiq ivswir ]4]', 'aavaN vann(y)N ddaakhaRo chhoddee kant visaar ||4||' ],
  [ 'GVI mUrq ismrq pl vM\\ih jIvxu sPlu iqQweI jIau ]1]', "ghaRee moorat simarat pal vann(y)hi jeevaN safal tithaae'ee jeeau ||1||" ],
  [ 'hir hir hir gun gwvhu ]', 'har har har gun gaavahu ||' ],
  [ 'khu nwnk pRwxI cauQY phrY sPilEu rYix Bgqw dI ]4]1]3]', 'kahu naanak praaNee chauthai paharai safalio raiN bhagataa dhee ||4||1||3||' ],
]

describe( 'transliterate()', () => {
  transliterations.map( ( [ gurmukhi, transliteration ] ) => it( `should transliterate '${gurmukhi}' to '${transliteration}'`, () => {
    expect( transliterate( gurmukhi ) ).to.equal( transliteration )
  } ) )
} )
