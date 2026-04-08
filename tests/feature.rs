use gurmukhi::feature::{
    Feature, all_features, detect, line_endings, modifiers, remove, vishraams, vowels,
};
use pretty_assertions::assert_eq;
use rstest::*;

// -- remove vishram (rv) --

#[rstest]
#[case("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥", "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥")]
#[case("sbd, sbd sbd; sbd ]", "sbd sbd sbd sbd ]")]
#[case("sbd sbd sbd ]", "sbd sbd sbd ]")]
fn remove_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vishraams()), expected);
}

// -- remove heavy vishram (rvh) --

#[rstest]
#[case("sbd, sbd sbd; sbd ]", "sbd, sbd sbd sbd ]")]
#[case("ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥", "ਸਬਦ. ਸਬਦ ਸਬਦ ਸਬਦ ॥")]
fn remove_heavy_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Feature::VishramHeavy]), expected);
}

// -- remove medium vishram (rvm) --

#[rstest]
#[case("sbd, sbd sbd; sbd ]", "sbd sbd sbd; sbd ]")]
#[case("ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥", "ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥")]
fn remove_medium_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Feature::VishramMedium]), expected);
}

// -- remove light vishram (rvl) --

#[rstest]
#[case("sbd, sbd sbd; sbd ]", "sbd, sbd sbd; sbd ]")]
#[case("ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥", "ਸਬਦ ਸਬਦ; ਸਬਦ ਸਬਦ ॥")]
fn remove_light_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Feature::VishramLight]), expected);
}

// -- remove heavy and medium vishram (rvhm) --

#[rstest]
#[case("sbd, sbd sbd; sbd ]", "sbd sbd sbd sbd ]")]
#[case("ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥", "ਸਬਦ. ਸਬਦ ਸਬਦ ਸਬਦ ॥")]
fn remove_heavy_medium_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(
        remove(input, vec![Feature::VishramHeavy, Feature::VishramMedium]),
        expected
    );
}

// -- remove line endings (rle) --

#[rstest]
#[case("ਸਬਦ ॥ ਰਹਾਉ ॥", "ਸਬਦ")]
#[case("सबद ॥ रहाउ ॥", "सबद")]
#[case("ਸਬਦ ॥੧॥ ਰਹਾਉ ॥", "ਸਬਦ")]
#[case("सबद ॥१॥ रहाउ ॥", "सबद")]
#[case("ਸਬਦ ॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥", "ਸਬਦ")]
#[case("ਸਬਦ ॥੪॥੬॥ ਛਕਾ ੧ ॥", "ਸਬਦ")]
#[case("ਸਬਦ ॥੨॥੧੨॥ ਛਕੇ ੨ ॥", "ਸਬਦ")]
#[case("ਸਬਦ ।੪੯।੧। ਇਕੁ ।", "ਸਬਦ")]
#[case("ਸਬਦ ॥੪॥੯॥ ਦੁਤੁਕੇ", "ਸਬਦ")]
#[case("ਸਬਦ ॥੨੧॥੧॥ ਸੁਧੁ ਕੀਚੇ", "ਸਬਦ")]
#[case("ਸਬਦ ॥੫੧੭॥ ਪੜ੍ਹੋ ਵੀਚਾਰ ਕਬਿੱਤ ੫੦੬", "ਸਬਦ")]
#[case("ਸਬਦ ॥੧॥", "ਸਬਦ")]
#[case("ਸਬਦ  ॥੧॥", "ਸਬਦ")]
#[case("ਸਬਦ॥੨੦", "ਸਬਦ")]
#[case("ਸਬਦ ॥੨॥੨॥", "ਸਬਦ")]
#[case("ਸਬਦ ॥ ਰਹਾਉ ਦੂਜਾ ॥੧॥੩॥", "ਸਬਦ")]
#[case("ਸਬਦ ।੧੪੮।", "ਸਬਦ")]
#[case("ਸਬਦ ॥ ਸਬਦ ॥", "ਸਬਦ ਸਬਦ")]
#[case("॥ ਸਬਦ ॥", "ਸਬਦ")]
#[case("ਸਬਦ ॥ ਸਬਦ ॥੨॥੨॥", "ਸਬਦ ਸਬਦ")]
#[case("Example test. ||1||", "Example test.")]
#[case("Example test. ||1||Pause||", "Example test.")]
#[case("Example test. ||Pause||", "Example test.")]
#[case("sabad |4|6| chhakaa 1 |", "sabad")]
#[case("sabad | rahaau doojaa |1|3| sabad", "sabad")]
#[case("sabad | rahau doojaa |1|3| sabad", "sabad")]
#[case("sabad | rahao doojaa |1|3| sabad", "sabad")]
#[case("sabad | sabad |", "sabad sabad")]
#[case("| sabad |", "sabad")]
fn remove_line_endings(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, line_endings()), expected);
}

// -- remove line endings - negative (input should be unchanged) --

#[rstest]
#[case("ਮਹਲਾ ੧")]
#[case("ਮਹਲਾ ੫")]
#[case("mahalaa 1")]
#[case("महला ५")]
fn remove_line_endings_negative(#[case] input: String) {
    assert_eq!(remove(input.clone(), line_endings()), input);
}

// -- remove vowel signs --

#[rstest]
#[case("ਕਾ", "ਕ")]
#[case("ਸਿ", "ਸ")]
#[case("ਕੀ", "ਕ")]
#[case("ਕੁ", "ਕ")]
#[case("ਕੂ", "ਕ")]
#[case("ਕੇ", "ਕ")]
#[case("ਕੈ", "ਕ")]
#[case("ਕੋ", "ਕ")]
#[case("ਕੌ", "ਕ")]
#[case("ਆ", "ਅ")]
#[case("ਇ", "ੲ")]
#[case("ਈ", "ੲ")]
#[case("ਉ", "ੳ")]
#[case("ਊ", "ੳ")]
#[case("ਏ", "ੲ")]
#[case("ਐ", "ਅ")]
#[case("ਓ", "ੳ")]
#[case("ਔ", "ਅ")]
#[case("ਸਬਦਿ ਮਰੈ", "ਸਬਦ ਮਰ")]
fn remove_vowel_signs(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Feature::VowelSign]), expected);
}

// -- remove vowel carriers --

#[rstest]
#[case("ਆ", "")]
#[case("ਇ", "")]
#[case("ਈ", "")]
#[case("ਉ", "")]
#[case("ਊ", "")]
#[case("ਏ", "")]
#[case("ਐ", "")]
#[case("ਓ", "")]
#[case("ਔ", "")]
#[case("ੲ", "")]
#[case("ੳ", "")]
#[case("ਅ", "")]
#[case("ਕਾ", "ਕਾ")]
fn remove_vowel_carriers(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Feature::VowelCarrier]), expected);
}

// -- remove vowel signs + carriers together --

#[rstest]
#[case("ਆ", "")]
#[case("ਕਾ", "ਕ")]
#[case("ਇਕ", "ਕ")]
fn remove_vowels(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vowels()), expected);
}

// -- remove modifiers --

#[rstest]
#[case("ਜ਼", "ਜ")]
#[case("ਫ਼", "ਫ")]
fn remove_nukta(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Feature::Nukta]), expected);
}

#[rstest]
#[case("ਪੱਕਾ", "ਪਕਾ")]
fn remove_adhak(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Feature::Adhak]), expected);
}

#[rstest]
#[case("ਅੰਗ", "ਅਗ")]
#[case("ਸਿੰਘ", "ਸਿਘ")]
#[case("ਕਂਸ", "ਕਸ")]
fn remove_nasal(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Feature::Nasal]), expected);
}

// -- detect vishrams --

#[rstest]
fn detect_vishram_positions() {
    let result = detect(
        "ਸਬਦ. ਸਬਦ; ਸਬਦ".to_string(),
        vec![Feature::VishramLight, Feature::VishramHeavy],
    );
    assert_eq!(result.len(), 2);
    assert_eq!(result[0].feature, Feature::VishramLight);
    assert_eq!(result[1].feature, Feature::VishramHeavy);
    assert!(result[0].start < result[1].start);
}

#[rstest]
fn detect_no_matches() {
    let result = detect("ਸਬਦ ਸਬਦ ਸਬਦ".to_string(), vec![Feature::VishramHeavy]);
    assert!(result.is_empty());
}

// -- detect line endings --

#[rstest]
fn detect_line_ending_full_span() {
    let input = "ਸਬਦ ॥੧॥ ਰਹਾਉ ॥".to_string();
    let result = detect(input, line_endings());
    assert!(!result.is_empty());
    assert_eq!(result[0].feature, Feature::RahaoEnding);
}

#[rstest]
fn detect_bare_line_ending() {
    let input = "ਸਬਦ ॥ ਸਬਦ ॥".to_string();
    let result = detect(input, line_endings());
    assert_eq!(result.len(), 2);
}

#[rstest]
fn detect_line_endings_negative() {
    let result = detect("ਮਹਲਾ ੧".to_string(), line_endings());
    assert!(result.is_empty());
}

// -- detect mixed --

#[rstest]
fn detect_mixed_features() {
    let input = "ਸਬਦ. ਸਬਦ ॥੧॥".to_string();
    let result = detect(input, vec![Feature::VishramLight, Feature::NumberedEnding]);
    assert_eq!(result.len(), 2);
    assert_eq!(result[0].feature, Feature::VishramLight);
    assert_eq!(result[1].feature, Feature::NumberedEnding);
}

// -- detect vowel signs --

#[rstest]
fn detect_vowel_signs() {
    let result = detect("ਕਾਸਿ".to_string(), vec![Feature::VowelSign]);
    assert_eq!(result.len(), 2);
    assert_eq!(result[0].feature, Feature::VowelSign);
}

// -- grouping functions --

#[rstest]
fn grouping_vishraams() {
    assert_eq!(vishraams().len(), 3);
}

#[rstest]
fn grouping_vowels() {
    assert_eq!(vowels().len(), 2);
}

#[rstest]
fn grouping_modifiers() {
    assert_eq!(modifiers().len(), 5);
}

#[rstest]
fn grouping_line_endings() {
    assert_eq!(line_endings().len(), 3);
}

#[rstest]
fn grouping_all_features() {
    assert_eq!(all_features().len(), 13);
}
