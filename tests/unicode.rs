use gurmukhi::{helpers, pipe, unicode};
use pretty_assertions::{assert_eq, assert_ne};
use rstest::*;

pub fn to_unicode_consortium(s: String) -> String {
    unicode::to_unicode(s, unicode::UnicodeStandard::UnicodeConsortium)
}

pub fn to_unicode_sant_lipi(s: String) -> String {
    unicode::to_unicode(s, unicode::UnicodeStandard::SantLipi)
}

pub fn to_unicode_consortium_3(s: String) -> String {
    pipe!(
        s,
        to_unicode_consortium,
        to_unicode_consortium,
        to_unicode_consortium
    )
}

pub fn to_unicode_sant_lipi_3(s: String) -> String {
    pipe!(
        s,
        to_unicode_sant_lipi,
        to_unicode_sant_lipi,
        to_unicode_sant_lipi
    )
}

pub fn sant_lipi_to_unicode_consortium(s: String) -> String {
    pipe!(s, to_unicode_sant_lipi, to_unicode_consortium)
}

pub fn sant_lipi_to_unicode_consortium_2(s: String) -> String {
    pipe!(
        s,
        sant_lipi_to_unicode_consortium,
        sant_lipi_to_unicode_consortium
    )
}

#[rstest]
#[case("123", "੧੨੩")]
#[case("<> > <", "ੴ ☬ ੴ")]
#[case("gurU", "ਗੁਰੂ")]
#[case("DR¨A", "ਧ੍ਰੂਅ")]
#[case("AwilsÎ", "ਆਲਿਸ੍ਯ")]
#[case("dwin", "ਦਾਨਿ")]
#[case("BIqir", "ਭੀਤਰਿ")]
#[case("jIau", "ਜੀਉ")]
#[case("[1[2[3[4[5[", "।੧।੨।੩।੪।੫।")]
#[case("]1]2]3]4]5]", "॥੧॥੨॥੩॥੪॥੫॥")]
#[case("sauifsies", "ਸਉਡਿਸਇਸ")]
#[case("z`rrw", "ਜ਼ੱਰਰਾ")]
#[case("^urSYd", "ਖ਼ੁਰਸ਼ੈਦ")]
#[case("luqi&", "ਲੁਤਫ਼ਿ")]
#[case("iekMqR", "ਇਕੰਤ੍ਰ")]
#[case("pRBU", "ਪ੍ਰਭੂ")]
#[trace]
fn to_unicode_basic_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_consortium, to_unicode_consortium_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("kRwN", "ਕ੍ਰਾਂ")]
#[case("sÍwNiq", "ਸ੍ਵਾਂਤਿ")]
#[case("iBRMg", "ਭ੍ਰਿੰਗ")]
#[case("inR`qy", "ਨ੍ਰਿੱਤੇ")]
#[case("ik®`sM", "ਕ੍ਰਿੱਸੰ")]
#[case("AMimR`q", "ਅੰਮ੍ਰਿੱਤ")]
#[case("Qwin´M", "ਥਾਨੵਿੰ")]
#[case("kRwNq", "ਕ੍ਰਾਂਤ")]
#[case("k®ü`D", "ਕ੍ਰੁੱਧ")]
#[case("ijnHYN", "ਜਿਨ੍ਹੈਂ")]
#[case("hÍüYbo", "ਹ੍ਵੈੁਬੋ")]
#[case("nUµ", "ਨੂੰ")]
#[case("^u`d", "ਖ਼ੁੱਦ")]
#[case("PzUM", "ਫਜ਼ੂੰ")]
#[case("kwrmu`l-k`rwm", "ਕਾਰਮੁੱਲ-ਕੱਰਾਮ")]
#[case("&ru¤^y", "ਫ਼ਰੁੱਖ਼ੇ")]
#[case("^u¤ro", "ਖ਼ੁੱਰੋ")]
#[case("duoAwlY", "ਦੋੁਆਲੈ")]
#[case("idRV@IAw", "ਦ੍ਰਿੜੑੀਆ")]
#[case("kwn@ü", "ਕਾਨੑੁ")]
#[case("ijMn@I", "ਜਿੰਨੑੀ")]
#[case("El@w", "ਓਲੑਾ")]
#[case("swm@Y", "ਸਾਮੑੈ")]
#[case("kqybhuˆ", "ਕਤੇਬਹੁਂ")]
#[trace]
fn to_unicode_diacritics_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_consortium, to_unicode_consortium_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("BuiKAw.", "ਭੁਖਿਆ.")]
#[case("ਭੁਖiਆ.", "ਭੁਖਿਆ.")]
#[case("ਮi", "ਮਿ")]
#[case("ਮiਲ", "ਮਿਲ")]
#[case("ਮil", "ਮਲਿ")]
#[case("suMi\\Aw", "ਸੁੰਞਿਆ")]
#[case("|i||", "ਙਙਿਙ")]
#[case("di&", "ਦਫ਼ਿ")]
#[trace]
fn to_unicode_sihari_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_consortium, to_unicode_consortium_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("iQqMØI", "ਥਿਤੀੰ")]
#[case("kMØI", "ਕੀੰ")]
#[case("nµØIbu", "ਨੀੰਬੁ")]
#[case("nµØIbw", "ਨੀੰਬਾ")]
#[case("dyNih", "ਦੇਂਹਿ")]
#[trace]
fn to_unicode_nasalization_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_consortium, to_unicode_consortium_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("isRis†", "ਸ੍ਰਿਸ੍ਟਿ")]
#[case("ik®s˜M", "ਕ੍ਰਿਸ੍ਨੰ")]
#[case("dsœgIrI", "ਦਸ੍ਤਗੀਰੀ")]
#[case("insçl", "ਨਿਸ੍ਚਲ")]
#[case("sÍwd", "ਸ੍ਵਾਦ")]
#[case("suDwK´r", "ਸੁਧਾਖੵਰ")]
#[case("cVH¨", "ਚੜ੍ਹੂ")]
#[case("cV§", "ਚੜ੍ਹੂ")]
#[case("im´wny", "ਮੵਿਾਨੇ")]
#[case("iD´wvY", "ਧੵਿਾਵੈ")]
#[case("idÍj", "ਦ੍ਵਿਜ")]
#[case("iBKÏw", "ਭਿਖੵਾ")]
#[case("imQÏMq", "ਮਿਥੵੰਤ")]
#[case("imQ´Mq", "ਮਿਥੵੰਤ")]
#[case("rKÏw", "ਰਖੵਾ")]
#[case("sMswrsÏ", "ਸੰਸਾਰਸੵ")]
#[trace]
fn to_unicode_subscripts_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_consortium, to_unicode_consortium_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("guoibMd", "\u{0a17}\u{0a4b}\u{0a41}\u{0a2c}\u{0a3f}\u{0a70}\u{0a26}")]
#[case("gouibMd", "\u{0a17}\u{0a4b}\u{0a41}\u{0a2c}\u{0a3f}\u{0a70}\u{0a26}")]
#[case("guoibµd", "\u{0a17}\u{0a4b}\u{0a41}\u{0a2c}\u{0a3f}\u{0a70}\u{0a26}")]
#[case("gouibµd", "\u{0a17}\u{0a4b}\u{0a41}\u{0a2c}\u{0a3f}\u{0a70}\u{0a26}")]
#[case("imil´o", "\u{0a2e}\u{0a3f}\u{0a32}\u{0a75}\u{0a3f}\u{0a4b}")]
#[case("imilo´", "\u{0a2e}\u{0a3f}\u{0a32}\u{0a75}\u{0a3f}\u{0a4b}")]
#[case("imiloÏ", "\u{0a2e}\u{0a3f}\u{0a32}\u{0a75}\u{0a3f}\u{0a4b}")]
#[case("imilÏo", "\u{0a2e}\u{0a3f}\u{0a32}\u{0a75}\u{0a3f}\u{0a4b}")]
#[case(
    "\u{0a2e}\u{0a3f}\u{0a32}\u{0a4b}\u{0a3f}\u{0a75}",
    "\u{0a2e}\u{0a3f}\u{0a32}\u{0a75}\u{0a3f}\u{0a4b}"
)]
#[case("igHwn", "\u{0a17}\u{0a4d}\u{0a39}\u{0a3f}\u{0a3e}\u{0a28}")]
#[case("igwHn", "\u{0a17}\u{0a4d}\u{0a39}\u{0a3f}\u{0a3e}\u{0a28}")]
#[case(
    "\u{0a17}\u{0a3f}\u{0a4d}\u{0a39}\u{0a3e}\u{0a28}",
    "\u{0a17}\u{0a4d}\u{0a39}\u{0a3f}\u{0a3e}\u{0a28}"
)]
#[case(
    "\u{0a17}\u{0a3f}\u{0a3e}\u{0a4d}\u{0a39}\u{0a28}",
    "\u{0a17}\u{0a4d}\u{0a39}\u{0a3f}\u{0a3e}\u{0a28}"
)]
#[case(
    "\u{0a17}\u{0a3e}\u{0a3f}\u{0a4d}\u{0a39}\u{0a28}",
    "\u{0a17}\u{0a4d}\u{0a39}\u{0a3f}\u{0a3e}\u{0a28}"
)]
#[case("s®æyxI", "\u{0a36}\u{0a4d}\u{0a30}\u{0a47}\u{0a23}\u{0a40}")]
#[case("S®yxI", "\u{0a36}\u{0a4d}\u{0a30}\u{0a47}\u{0a23}\u{0a40}")]
#[case("SRyxI", "\u{0a36}\u{0a4d}\u{0a30}\u{0a47}\u{0a23}\u{0a40}")]
#[case("SyRxI", "\u{0a36}\u{0a4d}\u{0a30}\u{0a47}\u{0a23}\u{0a40}")]
#[case("sæRyxI", "\u{0a36}\u{0a4d}\u{0a30}\u{0a47}\u{0a23}\u{0a40}")]
#[case("sRæyxI", "\u{0a36}\u{0a4d}\u{0a30}\u{0a47}\u{0a23}\u{0a40}")]
#[case("syRæxI", "\u{0a36}\u{0a4d}\u{0a30}\u{0a47}\u{0a23}\u{0a40}")]
#[case("joiqÏM", "\u{0a1c}\u{0a4b}\u{0a24}\u{0a75}\u{0a3f}\u{0a70}")]
#[case("joiqMÏ", "\u{0a1c}\u{0a4b}\u{0a24}\u{0a75}\u{0a3f}\u{0a70}")]
#[case("bisÏMq", "\u{0a2c}\u{0a38}\u{0a75}\u{0a3f}\u{0a70}\u{0a24}")]
#[case("bisMÏq", "\u{0a2c}\u{0a38}\u{0a75}\u{0a3f}\u{0a70}\u{0a24}")]
#[trace]
fn to_unicode_diacritic_ordering_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_consortium, to_unicode_consortium_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("aou", "\u{0a13}\u{0a41}")]
#[case("auo", "\u{0a13}\u{0a41}")]
#[case("aoU", "\u{0a13}\u{0a42}")]
#[case("aUo", "\u{0a13}\u{0a42}")]
#[case("AW", "\u{0a06}\u{0a02}")]
#[case("ANw", "\u{0a06}\u{0a02}")]
#[case("AwN", "\u{0a06}\u{0a02}")]
#[trace]
fn to_unicode_sanitization_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_consortium, to_unicode_consortium_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("guxˆØI", "ਗੁਣਂ‍ੀ")]
#[case("sKˆØI", "ਸਖਂ‍ੀ")]
#[trace]
fn bindi_before_bihari_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_sant_lipi, to_unicode_sant_lipi_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("guxˆØI", "ਗੁਣੀਁ")]
#[case("sKˆØI", "ਸਖੀਁ")]
#[trace]
fn bindi_before_bihari_error_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_sant_lipi, to_unicode_sant_lipi_3];

    fns.iter()
        .for_each(|f| assert_ne!(f(input.clone()), expected));
}

#[rstest]
#[case("XkIN", "ਯਕੀਂ")]
#[case("ipRX", "ਪ੍ਰਿਯ")]
#[case("hX¤wiq", "ਹਯਾੱਤਿ")]
#[case("hXw¤iq", "ਹਯਾੱਤਿ")]
#[case("hmwXUM", "ਹਮਾਯੂੰ")]
#[case("BXuo", "ਭਯੋੁ")]
#[case("XkIn", "ਯਕੀਨ")]
#[trace]
fn unicode_consortium_yaya_test(#[case] input: String, #[case] expected: String) {
    let fns = [
        to_unicode_consortium,
        to_unicode_consortium_3,
        sant_lipi_to_unicode_consortium,
        sant_lipi_to_unicode_consortium_2,
    ];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("mDÎ", "ਮਧ੍ਯ")]
#[case("ilKÎqy", "ਲਿਖ੍ਯਤੇ")]
#[case("mwnÎo", "ਮਾਨ੍ਯੋ")]
#[case("iBÎo", "ਭਿ੍ਯੋ")]
#[case("kIÎo", "ਕੀ੍ਯੋ")]
#[case("sÎwm", "ਸ੍ਯਾਮ")]
#[case("qÎwgÎo", "ਤ੍ਯਾਗ੍ਯੋ")]
#[case("jÎoN", "ਜ੍ਯੋਂ")]
#[trace]
fn unicode_consortium_half_yaya_test(#[case] input: String, #[case] expected: String) {
    let fns = [
        to_unicode_consortium,
        to_unicode_consortium_3,
        sant_lipi_to_unicode_consortium,
        sant_lipi_to_unicode_consortium_2,
    ];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("nwmï", "ਨਾਮਯ")]
#[case("sunIïhu", "ਸੁਨੀਯਹੁ")]
#[case("AdyïM", "ਅਦੇਯੰ")]
#[case("kFïo", "ਕਢਯੋ")]
#[case("sïwm", "ਸਯਾਮ")]
#[case("idqïwidqî", "ਦਿਤਯਾਦਿਤ੍ਯ")]
#[case("qRsîo", "ਤ੍ਰਸ੍ਯੋ")]
#[trace]
fn unicode_consortium_open_top_yaya_test(#[case] input: String, #[case] expected: String) {
    let fns = [
        to_unicode_consortium,
        to_unicode_consortium_3,
        sant_lipi_to_unicode_consortium,
        sant_lipi_to_unicode_consortium_2,
    ];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("XkIN", "ਯਕੀਂ")]
#[case("ipRX", "ਪ੍ਰਿਯ")]
#[case("hX¤wiq", "ਹਯਾੱਤਿ")]
#[case("hXw¤iq", "ਹਯਾੱਤਿ")]
#[case("hmwXUM", "ਹਮਾਯੂੰ")]
#[case("BXuo", "ਭਯੋੁ")]
#[case("XkIn", "ਯਕੀਨ")]
#[trace]
fn sant_lipi_yaya_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_sant_lipi, to_unicode_sant_lipi_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("mDÎ", "ਮਧ︀ਯ")]
#[case("ilKÎqy", "ਲਿਖ︀ਯਤੇ")]
#[case("mwnÎo", "ਮਾਨ︀ਯੋ")]
#[case("iBÎo", "ਭਿ︀ਯੋ")]
#[case("kIÎo", "ਕੀ︀ਯੋ")]
#[case("sÎwm", "ਸ︀ਯਾਮ")]
#[case("qÎwgÎo", "ਤ︀ਯਾਗ︀ਯੋ")]
#[case("jÎoN", "ਜ︀ਯੋਂ")]
#[trace]
fn sant_lipi_half_yaya_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_sant_lipi, to_unicode_sant_lipi_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}

#[rstest]
#[case("nwmï", "ਨਾਮ︁ਯ")]
#[case("sunIïhu", "ਸੁਨੀ︁ਯਹੁ")]
#[case("AdyïM", "ਅਦੇ︁ਯੰ")]
#[case("kFïo", "ਕਢ︁ਯੋ")]
#[case("sïwm", "ਸ︁ਯਾਮ")]
#[case("idqïwidqî", "ਦਿਤ︁ਯਾਦਿਤ︀︁ਯ")]
#[case("qRsîo", "ਤ੍ਰਸ︀︁ਯੋ")]
#[trace]
fn sant_lipi_open_top_yaya_test(#[case] input: String, #[case] expected: String) {
    let fns = [to_unicode_sant_lipi, to_unicode_sant_lipi_3];

    fns.iter()
        .for_each(|f| assert_eq!(f(input.clone()), expected));
}
