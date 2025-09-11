use const_format::{concatcp, formatcp};

use crate::helpers::{build_order_map, pipe, regex, replace_regex, replace_str, sort_by_order_map};

/// Uses single char representations of constructed characters
fn sanitize_unicode(input: String) -> String {
    replace_str(&[
        ("\u{0a73}\u{0a4b}", "ਓ"), // ਓ
        ("\u{0a05}\u{0a3e}", "ਆ"), // ਅ + ਾ = ਆ
        ("\u{0a72}\u{0a3f}", "ਇ"), // ਇ
        ("\u{0a72}\u{0a40}", "ਈ"), // ਈ
        ("\u{0a73}\u{0a41}", "ਉ"), // ਉ
        ("\u{0a73}\u{0a42}", "ਊ"), // ਊ
        ("\u{0a72}\u{0a47}", "ਏ"), // ਏ
        ("\u{0a05}\u{0a48}", "ਐ"), // ਐ
        ("\u{0a05}\u{0a4c}", "ਔ"), // ਔ
        ("\u{0a32}\u{0a3c}", "ਲ਼"), // ਲ਼
        ("\u{0a38}\u{0a3c}", "ਸ਼"), // ਸ਼
        ("\u{0a16}\u{0a3c}", "ਖ਼"), // ਖ਼
        ("\u{0a17}\u{0a3c}", "ਗ਼"), // ਗ਼
        ("\u{0a1c}\u{0a3c}", "ਜ਼"), // ਜ਼
        ("\u{0a2b}\u{0a3c}", "ਫ਼"), // ਫ਼
        ("\u{0a71}\u{0a02}", "ਁ"),
    ])(input)
}

/// Orders the variation selectors preceding gurmukhi characters
fn sort_variation_selectors(input: String) -> String {
    const VARIATION_SELECTORS: &str = concat!(
        "\u{fe00}", "\u{fe01}", "\u{fe02}", "\u{fe03}", "\u{fe04}", "\u{fe05}", "\u{fe06}",
        "\u{fe07}", "\u{fe08}", "\u{fe09}", "\u{fe0a}", "\u{fe0b}", "\u{fe0c}", "\u{fe0d}",
    );

    let variation_selectors_order_map = build_order_map(VARIATION_SELECTORS);

    replace_regex!(
        // Capture all sequential VS preceding any code assignments in the gurmukhi unicode block
        formatcp!("([{VARIATION_SELECTORS}]*)[\u{0a00}-\u{0a7f}]"),
        |caps: &regex::Captures| {
            let m = &caps[0];
            let vs = &caps[1];

            m.replace(vs, &sort_by_order_map(vs, variation_selectors_order_map))
        }
    )(input)
}

/// Orders the gurmukhi diacritics in a string according to Unicode standards
fn sort_diacritics(input: String) -> String {
    /*
    Nukta is essential to form a new base letter and must be ordered first.
    Udaat, Yakash, and subjoined letters should follow.
    Subjoined letters are constructed (they are not single char), so they cannot be used in the same regex group pattern. See further below for subjoined letters.
    */
    const BASE_LETTER_MODIFIERS: &str = concat!("਼", "ੑ", "ੵ",);

    /*
    More generally, when a consonant or independent vowel is modified by multiple vowel signs, the sequence of the vowel signs in the underlying representation of the text should be: left, top, bottom, right.
    p. 491 of The Unicode® Standard Version 14.0 – Core Specification
    https://www.unicode.org/versions/Unicode14.0.0/ch12.pdf
    */
    const VOWEL_ORDER: &str = concat!("ਿ", "ੇ", "ੈ", "ੋ", "ੌ", "ੁ", "ੂ", "ਾ", "ੀ",);

    /*
    The remaining diacritics are to be sorted at the end according to the following order
    */
    const REMAINING_MODIFIER_ORDER: &str = concat!("ਁ", "ੱ", "ਂ", "ੰ", "ਃ",);

    const ZERO_WIDTH_CHARS: &str = concat!("\u{200c}", "\u{200d}");

    /*
    If subjoined were single code points, we could have done a simple regex match:
    ([  list_of_diacritics  ]+)

    Since otherwise, surrounds each lookup of a subjoined letter with lookups of the rest of the diacritics (which are single char).

    The patterns for the single-chars and the subjoined letters:
    */
    const GENERATED_MARKS: &str = concatcp!(
        BASE_LETTER_MODIFIERS,
        VOWEL_ORDER,
        REMAINING_MODIFIER_ORDER,
        ZERO_WIDTH_CHARS
    );
    const MARK_PATTERN: &str = formatcp!("([{GENERATED_MARKS}]*)?");

    const VIRAMA: &str = "੍";
    const BELOW_BASE_LETTERS: &str = concat!("ਹ", "ਰ", "ਵ", "ਟ", "ਤ", "ਨ", "ਚ");
    const BELOW_BASE_PATTERN: &str = formatcp!("({VIRAMA}[{BELOW_BASE_LETTERS}])?");

    /*
    This generates a string of the order in which all diacritics should appear.
        >>> print(GENERATED_MATCH_ORDER)
        '਼ਹਰਵਟਤਨਚਿੇੈੋੌੁੂਾੀਁੱਂੰਃ'
    */

    let diacritic_order_map = build_order_map(concatcp!(
        BASE_LETTER_MODIFIERS,
        VIRAMA,
        BELOW_BASE_LETTERS,
        VOWEL_ORDER,
        REMAINING_MODIFIER_ORDER
    ));

    const BINDI_BEFORE_BIHARI: &str = "ਂ‍ੀ";

    replace_regex!(
        // Capture all sequential diacritics containing at most one subjoined letter
        formatcp!("{MARK_PATTERN}{BELOW_BASE_PATTERN}{MARK_PATTERN}"),
        |caps: &regex::Captures| {
            let Some(m) = caps.get(0) else {
                return String::new();
            };

            let mut segment = m.as_str().to_string();

            if segment.chars().count() <= 1 {
                return segment;
            }

            let mut has_bindi_before_bihari = false;
            // Respect ordering of ਂ (bindi) before/after ੀ (bihari)
            if segment.contains(BINDI_BEFORE_BIHARI) {
                segment = segment.replace(BINDI_BEFORE_BIHARI, "");
                has_bindi_before_bihari = true;
            }

            let mut chars: Vec<char> = segment.chars().collect();
            chars.sort_by_key(|c| diacritic_order_map.get(c).copied().unwrap_or(usize::MAX));

            let mut sorted: String = chars.into_iter().collect();
            // Add back the bindi before bihari
            if has_bindi_before_bihari {
                sorted.push_str(BINDI_BEFORE_BIHARI);
            }

            sorted
        }
    )(input)
}

/// Normalizes Gurmukhi according to Unicode Standards
#[uniffi::export]
pub fn normalize_unicode(input: String) -> String {
    pipe!(
        input,
        sort_diacritics,
        sort_variation_selectors,
        sanitize_unicode
    )
}
