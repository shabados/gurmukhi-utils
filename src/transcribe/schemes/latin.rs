use const_format::{concatcp, formatcp};

use crate::helpers::{pipe, regex, replace_regex, replace_str, translate_str, translation_map};
use crate::unicode::normalize::normalize_unicode;

use super::super::constants::*;
use super::latin_scholar;

const FORBIDDEN_AFTER_HAHA: &str = concatcp!(VIRAMA, YAKASH, ORDERED_VOWELS);

const PA_TRANSLIT_ALTERATIONS: fn(char) -> String = translation_map!(
    '\u{0a59}' => "\u{1e33}h", // ਖ਼ → ḳh
);

const PA_ROMAN_LIT2SCRIPT_TRANSLATIONS: fn(char) -> String = translation_map!(
    '\u{01b4}' => 'y',        // ƴ → y
    '\u{02b8}' => 'y',        // ʸ → y
    '\u{02b0}' => 'h',        // ʰ → h
    '\u{02b3}' => 'r',        // ʳ → r
    '\u{1d5b}' => 'v',        // ᵛ → v
    '\u{207f}' => 'n',        // ⁿ → n
    '\u{1d9c}' => 'c',        // ᶜ → c
    '\u{2e1b}' => "\u{00f1}", // ⸛ → ñ
    '\u{2e1e}' => "\u{00f1}", // ⸞ → ñ
    '\u{0327}' => "",         // combining cedilla → empty
);

const PA_ROMAN_LIT2SCRIPT_REPLACEMENTS: &[(&str, &str)] = &[
    ("y\u{0336}", "y"),               // y̶ → y
    ("\u{01b4}\u{0336}", "y"),        // ƴ̶ → y
    ("\u{1d57}\u{0323}", "\u{1e6d}"), // ᵗ̣ → ṭ
    ("\u{1d57}", "t"),                // ᵗ → t
];

// ─── Haha rules ───
// Rewritten without lookaheads: match the character after ਹ and include it back.

/// Letter + ਿ + (nasal?) + ਹ + (not forbidden) → Letter + ੇ + nasal + ਹ‧ + next
fn haha_sihari(input: String) -> String {
    replace_regex!(
        formatcp!("([{BASE_LETTERS}])(ਿ)([ੰਂ]?)(ਹ)([^{FORBIDDEN_AFTER_HAHA}]|$)"),
        "${1}ੇ${3}${4}‧${5}"
    )(input)
}

/// ਇ + (nasal?) + ਹ + (not forbidden) → ਏ + nasal + ਹ‧ + next
fn haha_ihri(input: String) -> String {
    replace_regex!(
        formatcp!("(ਇ)([ੰਂ]?)(ਹ)([^{FORBIDDEN_AFTER_HAHA}]|$)"),
        "ਏ${2}${3}‧${4}"
    )(input)
}

/// Letter + ੁ + (nasal?) + ਹ + (not forbidden) → Letter + ੋ + nasal + ਹ‧ + next
fn haha_onkar(input: String) -> String {
    replace_regex!(
        formatcp!("([{BASE_LETTERS}])(ੁ)([ੰਂ]?)(ਹ)([^{FORBIDDEN_AFTER_HAHA}]|$)"),
        "${1}ੋ${3}${4}‧${5}"
    )(input)
}

/// ਉ + (nasal?) + ਹ + (not forbidden) → ਓ + nasal + ਹ‧ + next
fn haha_uhri(input: String) -> String {
    replace_regex!(
        formatcp!("(ਉ)([ੰਂ]?)(ਹ)([^{FORBIDDEN_AFTER_HAHA}]|$)"),
        "ਓ${2}${3}‧${4}"
    )(input)
}

/// Letter + (nasal?) + ਹਿ → Letter + ੈ + nasal + ਹ‧
fn haha_dulavan(input: String) -> String {
    replace_regex!(formatcp!("([ਅ{BASE_LETTERS}])([ੰਂ]?)(ਹਿ)"), "${1}ੈ${2}ਹ‧")(
        input,
    )
}

/// Letter + (nasal?) + ਹੁ → Letter + ੌ + nasal + ਹ‧
fn haha_kanora(input: String) -> String {
    replace_regex!(formatcp!("([ਅ{BASE_LETTERS}])([ੰਂ]?)(ਹੁ)"), "${1}ੌ${2}ਹ‧")(
        input,
    )
}

/// Letter + (nasal?) + ਹ + (not forbidden) → Letter + ੈ + nasal + ਹ
fn haha_default(input: String) -> String {
    replace_regex!(
        formatcp!("([ਅ{BASE_LETTERS}])([ੰਂ]?)(ਹ)([^{FORBIDDEN_AFTER_HAHA}]|$)"),
        "${1}ੈ${2}${3}${4}"
    )(input)
}

fn apply_haha_rules(input: String) -> String {
    pipe!(
        input,
        haha_sihari,
        haha_ihri,
        haha_onkar,
        haha_uhri,
        haha_dulavan,
        haha_kanora,
        haha_default
    )
}

/// Remove grammatical vowels (ਿ and ੁ) from end of words.
/// Only applies if the string has more than 1 vowel/base letter.
fn remove_grammatical_vowels(input: String) -> String {
    let vowel_base_count = input
        .chars()
        .filter(|c| VOWEL_LETTERS.contains(*c) || BASE_LETTERS.contains(*c))
        .count();

    if vowel_base_count <= 1 {
        return input;
    }

    replace_regex!("(ਿ?)(ੇ?ੈ?ੋ?ੌ?)(ੁ?)(ੂ?ਾ?ੀ?)(ਁ?ੱ?ਂ?ੰ?ਃ?)(‧|\\s|$)", "${2}${4}${5}${6}")(
        input,
    )
}

/// Shorten doubled HORA_ONKAR (ੋੁ) at word start.
fn shorten_hora(input: String) -> String {
    replace_regex!(
        formatcp!(
            "(^|\\s|‧)([{BASE_LETTERS}])([{VIRAMA}][{BELOW_LETTERS}]|{YAKASH})?[{HORA_ONKAR}][{HORA_ONKAR}]"
        ),
        "${1}${2}${3}ੋ"
    )(input)
}

/// Shorten doubled DULAVAN_ONKAR (ੈੁ) at word start.
fn shorten_dulavan_onkar(input: String) -> String {
    replace_regex!(
        formatcp!(
            "(^|\\s|‧)([{BASE_LETTERS}])([{VIRAMA}][{BELOW_LETTERS}]|{YAKASH})?[{DULAVAN_ONKAR}][{DULAVAN_ONKAR}]"
        ),
        "${1}${2}${3}ੈ"
    )(input)
}

/// Add mukta after ending half-y.
fn half_y_mukta_add(input: String) -> String {
    replace_regex!("a([y\u{01b4}]\u{0336})(\\s|$)", "${1}a${2}")(input)
}

/// Nullify mukta before half-y.
fn half_y_mukta_nullify(input: String) -> String {
    replace_regex!("a([y\u{01b4}]\u{0336})", "${1}")(input)
}

/// Geminate/double consonant following adhak (˘).
fn geminate_adhak(input: String) -> String {
    replace_regex!(
        "\u{02d8}([a-z\u{0121}\u{1e45}\u{00f1}\u{1e47}\u{1e0d}\u{1e6d}\u{1e5b}\u{1e37}\u{1e33}])",
        "${1}${1}"
    )(input)
}

pub(in crate::transcribe) fn guru_latn_pa(input: String) -> String {
    let input = normalize_unicode(input);
    let input = apply_haha_rules(input);
    let input = remove_grammatical_vowels(input);
    let input = shorten_hora(input);
    let input = shorten_dulavan_onkar(input);
    let input = translate_str(PA_TRANSLIT_ALTERATIONS)(input);
    let input = latin_scholar::guru_latn(input);

    input
        .split('\u{2027}') // ‧ hyphenation point
        .map(|part| {
            let s = translate_str(PA_ROMAN_LIT2SCRIPT_TRANSLATIONS)(part.to_string());
            let s = half_y_mukta_add(s);
            let s = half_y_mukta_nullify(s);
            let s = replace_str(PA_ROMAN_LIT2SCRIPT_REPLACEMENTS)(s);
            geminate_adhak(s)
        })
        .collect::<Vec<_>>()
        .join("")
}
