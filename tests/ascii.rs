use gurmukhi::{ascii, unicode};
use pretty_assertions::assert_eq;
use rstest::*;

pub fn to_ascii(s: String) -> String {
    ascii::to_ascii(s)
}

pub fn a2a(s: String) -> String {
    to_ascii(unicode::to_unicode(s, unicode::UnicodeStandard::SantLipi))
}

#[rstest]
#[case("੧੨੩", "123")]
#[case("ੴ ☬ ੴ", "<> Ç <>")]
#[case("ਗੁਰੂ", "gurU")]
#[case("ਧ੍ਰੂਅ", "DR¨A")]
#[case("ਆਲਿਸ੍ਯ", "AwilsÎ")]
#[case("ਦਾਨਿ", "dwin")]
#[case("ਭੀਤਰਿ", "BIqir")]
#[case("ਜੀਉ", "jIau")]
#[case("।੧।੨।੩।੪।੫।", "[1[2[3[4[5[")]
#[case("॥੧॥੨॥੩॥੪॥੫॥", "]1]2]3]4]5]")]
#[case("ਸਉਡਿਸਇਸ", "sauifsies")]
#[case("ਜ਼ੱਰਰਾ", "z`rrw")]
#[case("ਖ਼ੁਰਸ਼ੈਦ", "^urSYd")]
#[case("ਲੁਤਫ਼ਿ", "luqi&")]
#[case("ਇਕੰਤ੍ਰ", "iekMqR")]
#[case("ਪ੍ਰਭੂ", "pRBU")]
#[trace]
fn to_ascii_basic_test(#[case] input: String, #[case] expected: String) {
    assert_eq!(to_ascii(input), expected);
}

#[rstest]
#[case("ਕ੍ਰਾਂ", "k®W")]
#[case("ਸ੍ਵਾਂਤਿ", "sÍWiq")]
#[case("ਭ੍ਰਿੰਗ", "iBRMg")]
#[case("ਨ੍ਰਿੱਤੇ", "inR`qy")]
#[case("ਕ੍ਰਿੱਸੰ", "ik®`sM")]
#[case("ਅੰਮ੍ਰਿੱਤ", "AMimR`q")]
#[case("ਥਾਨੵਿੰ", "Qwin´µ")]
#[case("ਕ੍ਰਾਂਤ", "k®Wq")]
#[case("ਕ੍ਰੁੱਧ", "k®ü`D")]
#[case("ਜਿਨ੍ਹੈਂ", "ijnHYN")]
#[case("ਹ੍ਵੈੁਬੋ", "hÍYübo")]
#[case("ਨੂੰ", "ƒ")]
#[case("ਖ਼ੁੱਦ", "^u`d")]
#[case("ਫਜ਼ੂੰ", "PzUM")]
#[case("ਕਾਰਮੁੱਲ-ਕੱਰਾਮ", "kwrmu`l-k`rwm")]
#[case("ਫ਼ਰੁੱਖ਼ੇ", "&ru`^y")]
#[case("ਖ਼ੁੱਰੋ", "^u`ro")]
#[case("ਦੋੁਆਲੈ", "douAwlY")]
#[case("ਦ੍ਰਿੜੑੀਆ", "idRV@IAw")]
#[case("ਕਾਨੑੁ", "kwn@ü")]
#[case("ਜਿੰਨੑੀ", "ijMn@I")]
#[case("ਓਲੑਾ", "El@w")]
#[case("ਸਾਮੑੈ", "swm@Y")]
#[case("ਕਤੇਬਹੁਂ", "kqybhuˆ")]
#[trace]
fn to_ascii_diacritics_test(#[case] input: String, #[case] expected: String) {
    assert_eq!(to_ascii(input), expected);
}

#[rstest]
#[case("ਭੁਖਿਆ.", "BuiKAw.")]
#[case("ਸੁੰਞਿਆ", "suMi\\Aw")]
#[trace]
fn to_ascii_sihari_test(#[case] input: String, #[case] expected: String) {
    assert_eq!(to_ascii(input), expected);
}

#[rstest]
#[case("ਥਿਤੀੰ", "iQqµØI")]
#[case("ਕੀੰ", "kµØI")]
#[case("ਨੀੰਬੁ", "nµØIbu")]
#[case("ਨੀੰਬਾ", "nµØIbw")]
#[case("ਦੇਂਹਿ", "dyNih")]
#[case("ਗੁਣਂ‍ੀ", "guxˆØI")]
#[case("ਸਖਂ‍ੀ", "sKˆØI")]
#[trace]
fn to_ascii_nasalization_test(#[case] input: String, #[case] expected: String) {
    assert_eq!(to_ascii(input), expected);
}

#[rstest]
#[case("ਸ੍ਰਿਸ੍ਟਿ", "isRis†")]
#[case("ਕ੍ਰਿਸ੍ਨੰ", "ik®s˜M")]
#[case("ਦਸ੍ਤਗੀਰੀ", "dsœgIrI")]
#[case("ਨਿਸ੍ਚਲ", "insçl")]
#[case("ਸ੍ਵਾਦ", "sÍwd")]
#[case("ਸੁਧਾਖੵਰ", "suDwK´r")]
#[case("ਚੜ੍ਹੂ", "cV§")]
#[case("ਮੵਿਾਨੇ", "im´wny")]
#[case("ਧੵਿਾਵੈ", "iD´wvY")]
#[case("ਦ੍ਵਿਜ", "idÍj")]
#[case("ਭਿਖੵਾ", "iBK´w")]
#[case("ਮਿਥੵੰਤ", "imQ´Mq")]
#[case("ਰਖੵਾ", "rK´w")]
#[case("ਸੰਸਾਰਸੵ", "sMswrs´")]
#[trace]
fn to_ascii_subscripts_test(#[case] input: String, #[case] expected: String) {
    assert_eq!(to_ascii(input), expected);
}

#[rstest]
#[case("ਯਕੀਂ", "XkIN")]
#[case("ਪ੍ਰਿਯ", "ipRX")]
#[case("ਹਯਾੱਤਿ", "hXw`iq")]
#[case("ਹਮਾਯੂੰ", "hmwXUM")]
#[case("ਭਯੋੁ", "BXou")]
#[case("ਯਕੀਨ", "XkIn")]
#[case("ਮਧ︀ਯ", "mDÎ")]
#[case("ਲਿਖ︀ਯਤੇ", "ilKÎqy")]
#[case("ਮਾਨ︀ਯੋ", "mwnÎo")]
#[case("ਭਿ︀ਯੋ", "iBÎo")]
#[case("ਕੀ︀ਯੋ", "kIÎo")]
#[case("ਸ︀ਯਾਮ", "sÎwm")]
#[case("ਤ︀ਯਾਗ︀ਯੋ", "qÎwgÎo")]
#[case("ਜ︀ਯੋਂ", "jÎoN")]
#[case("ਨਾਮ︁ਯ", "nwmï")]
#[case("ਸੁਨੀ︁ਯਹੁ", "sunIïhu")]
#[case("ਅਦੇ︁ਯੰ", "AdyïM")]
#[case("ਕਢ︁ਯੋ", "kFïo")]
#[case("ਸ︁ਯਾਮ", "sïwm")]
#[case("ਦਿਤ︁ਯਾਦਿਤ︀︁ਯ", "idqïwidqî")]
#[case("ਤ੍ਰਸ︀︁ਯੋ", "qRsîo")]
#[trace]
fn to_ascii_yayya_test(#[case] input: String, #[case] expected: String) {
    assert_eq!(to_ascii(input), expected);
}

#[rstest]
#[case("123")]
#[case("<>")]
#[case("gurU")]
#[trace]
fn roundtrip_basic_test(#[case] input: String) {
    assert_eq!(a2a(input.clone()), input);
}

#[rstest]
#[case("k®W")]
#[case("sÍWiq")]
#[case("iBRMg")]
#[case("inR`qy")]
#[case("ik®`sM")]
#[case("AMimR`q")]
#[case("Qwin´µ")]
#[case("k®Wq")]
#[case("k®ü`D")]
#[case("ijnHYN")]
#[case("hÍYübo")]
#[case("ƒ")]
#[case("^u`d")]
#[case("PzUM")]
#[case("kwrmu`l-k`rwm")]
#[case("&ru`^y")]
#[case("^u`ro")]
#[case("douAwlY")]
#[case("idRV@IAw")]
#[case("kwn@ü")]
#[case("ijMn@I")]
#[case("El@w")]
#[case("swm@Y")]
#[case("kqybhuˆ")]
#[trace]
fn roundtrip_diacritics_test(#[case] input: String) {
    assert_eq!(a2a(input.clone()), input);
}

#[rstest]
#[case("BuiKAw.")]
#[trace]
fn roundtrip_sihari_test(#[case] input: String) {
    assert_eq!(a2a(input.clone()), input);
}

#[rstest]
#[case("iQqµØI")]
#[case("kµØI")]
#[case("nµØIbu")]
#[case("nµØIbw")]
#[case("dyNih")]
#[case("guxˆØI")]
#[case("sKˆØI")]
#[trace]
fn roundtrip_nasalization_test(#[case] input: String) {
    assert_eq!(a2a(input.clone()), input);
}

#[rstest]
#[case("DR¨A")]
#[case("AwilsÎ")]
#[case("dwin")]
#[case("BIqir")]
#[case("jIau")]
#[case("[1[2[3[4[5[")]
#[case("]1]2]3]4]5]")]
#[case("sauifsies")]
#[case("z`rrw")]
#[case("^urSYd")]
#[case("luqi&")]
#[case("iekMqR")]
#[case("pRBU")]
#[trace]
fn roundtrip_conversions_test(#[case] input: String) {
    assert_eq!(a2a(input.clone()), input);
}

#[rstest]
#[case("isRis†")]
#[case("ik®s˜M")]
#[case("dsœgIrI")]
#[case("insçl")]
#[case("sÍwd")]
#[case("suDwK´r")]
#[case("cV§")]
#[case("im´wny")]
#[case("iD´wvY")]
#[case("idÍj")]
#[case("imQ´Mq")]
#[case("sMswrs´")]
#[trace]
fn roundtrip_subscripts_test(#[case] input: String) {
    assert_eq!(a2a(input.clone()), input);
}

#[rstest]
#[case("XkIN")]
#[case("ipRX")]
#[case("hXw`iq")]
#[case("hmwXUM")]
#[case("BXou")]
#[case("XkIn")]
#[case("mDÎ")]
#[case("ilKÎqy")]
#[case("mwnÎo")]
#[case("iBÎo")]
#[case("kIÎo")]
#[case("sÎwm")]
#[case("qÎwgÎo")]
#[case("jÎoN")]
#[case("nwmï")]
#[case("sunIïhu")]
#[case("AdyïM")]
#[case("kFïo")]
#[case("sïwm")]
#[case("idqïwidqî")]
#[case("qRsîo")]
#[trace]
fn roundtrip_yayya_test(#[case] input: String) {
    assert_eq!(a2a(input.clone()), input);
}

#[rstest]
#[case("suMi\\Aw")]
#[case("au~cI")]
#[case("au~im")]
#[case("au~cM")]
#[case("ieauN")]
#[case("BauNh")]
#[case("gwauN")]
#[case("bqwauN")]
#[case("aUNGn")]
#[case("aUNDy")]
#[case("kmwaUN;")]
#[case("pwaUN")]
#[trace]
fn roundtrip_db4_test(#[case] input: String) {
    assert_eq!(a2a(input.clone()), input);
}

#[rstest]
#[case("im~qr", "im`qr")]
#[case("s~jn", "s`jn")]
#[case("sb¤k", "sb`k")]
#[case("h¤k", "h`k")]
#[case("nUµ", "ƒ")]
#[case("cunUµ", "cuƒ")]
#[case("swnUµ", "swƒ")]
#[case("mjnUM", "mjƒ")]
#[case("hnUMmq", "hƒmq")]
#[case("knUM", "kƒ")]
#[case("kolH¨", "kol§")]
#[case("cVH¨", "cV§")]
#[case("Ru", "Rü")]
#[case("uR", "Rü")]
#[case("uH", "Hü")]
#[case("Hu", "Hü")]
#[case("®u", "Rü")]
#[case("k®u", "k®ü")]
#[case("lµ", "lM")]
#[case("TM", "Tµ")]
#[case("TUM", "TUµ")]
#[case("n´M", "n´µ")]
#[case("cuN", "cuˆ")]
#[case("kR", "k®")]
#[trace]
fn roundtrip_normalizations_test(#[case] input: String, #[case] expected: String) {
    assert_eq!(a2a(input), expected);
}
