use gurmukhi_utils::markup::{detect, remove, Markup, VISHRAMS};
use pretty_assertions::assert_eq;
use rstest::*;

// -- remove vishram (rv) --

#[rstest]
#[case("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥", "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥")]
#[case("sbd, sbd sbd; sbd ]", "sbd sbd sbd sbd ]")]
#[case("sbd sbd sbd ]", "sbd sbd sbd ]")]
fn remove_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, VISHRAMS.to_vec()), expected);
}

// -- remove heavy vishram (rvh) --

#[rstest]
#[case("sbd, sbd sbd; sbd ]", "sbd, sbd sbd sbd ]")]
#[case("ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥", "ਸਬਦ. ਸਬਦ ਸਬਦ ਸਬਦ ॥")]
fn remove_heavy_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Markup::VishramHeavy]), expected);
}

// -- remove medium vishram (rvm) --

#[rstest]
#[case("sbd, sbd sbd; sbd ]", "sbd sbd sbd; sbd ]")]
#[case("ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥", "ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥")]
fn remove_medium_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Markup::VishramMedium]), expected);
}

// -- remove light vishram (rvl) --

#[rstest]
#[case("sbd, sbd sbd; sbd ]", "sbd, sbd sbd; sbd ]")]
#[case("ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥", "ਸਬਦ ਸਬਦ; ਸਬਦ ਸਬਦ ॥")]
fn remove_light_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(remove(input, vec![Markup::VishramLight]), expected);
}

// -- remove heavy and medium vishram (rvhm) --

#[rstest]
#[case("sbd, sbd sbd; sbd ]", "sbd sbd sbd sbd ]")]
#[case("ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥", "ਸਬਦ. ਸਬਦ ਸਬਦ ਸਬਦ ॥")]
fn remove_heavy_medium_vishram(#[case] input: String, #[case] expected: String) {
    assert_eq!(
        remove(input, vec![Markup::VishramHeavy, Markup::VishramMedium]),
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
    assert_eq!(remove(input, vec![Markup::LineEnding]), expected);
}

// -- remove line endings - negative (input should be unchanged) --

#[rstest]
#[case("ਮਹਲਾ ੧")]
#[case("ਮਹਲਾ ੫")]
#[case("mahalaa 1")]
#[case("महला ५")]
fn remove_line_endings_negative(#[case] input: String) {
    assert_eq!(remove(input.clone(), vec![Markup::LineEnding]), input);
}

// -- detect vishrams --

#[rstest]
fn detect_vishram_positions() {
    let result = detect(
        "ਸਬਦ. ਸਬਦ; ਸਬਦ".to_string(),
        vec![Markup::VishramLight, Markup::VishramHeavy],
    );
    assert_eq!(result.len(), 2);
    assert_eq!(result[0].markup, Markup::VishramLight);
    assert_eq!(result[1].markup, Markup::VishramHeavy);
    // The '.' after ਸਬਦ and ';' after second ਸਬਦ
    assert!(result[0].start < result[1].start);
}

#[rstest]
fn detect_no_matches() {
    let result = detect("ਸਬਦ ਸਬਦ ਸਬਦ".to_string(), vec![Markup::VishramHeavy]);
    assert!(result.is_empty());
}

// -- detect line endings --

#[rstest]
fn detect_line_ending_full_span() {
    let input = "ਸਬਦ ॥੧॥ ਰਹਾਉ ॥".to_string();
    let result = detect(input.clone(), vec![Markup::LineEnding]);
    // The entire " ॥੧॥ ਰਹਾਉ ॥" portion should be matched (starting from first ॥)
    assert!(!result.is_empty());
    assert_eq!(result[0].markup, Markup::LineEnding);
}

#[rstest]
fn detect_bare_line_ending() {
    let input = "ਸਬਦ ॥ ਸਬਦ ॥".to_string();
    let result = detect(input, vec![Markup::LineEnding]);
    assert_eq!(result.len(), 2);
}

#[rstest]
fn detect_line_endings_negative() {
    let result = detect("ਮਹਲਾ ੧".to_string(), vec![Markup::LineEnding]);
    assert!(result.is_empty());
}

// -- detect mixed --

#[rstest]
fn detect_mixed_markup() {
    let input = "ਸਬਦ. ਸਬਦ ॥੧॥".to_string();
    let result = detect(
        input,
        vec![Markup::VishramLight, Markup::LineEnding],
    );
    // Should find the '.' vishram and the '॥੧॥' line ending
    assert_eq!(result.len(), 2);
    assert_eq!(result[0].markup, Markup::VishramLight);
    assert_eq!(result[1].markup, Markup::LineEnding);
}
