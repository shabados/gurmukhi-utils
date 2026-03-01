use const_format::formatcp;

use crate::helpers::{pipe, replace_regex, replace_str, translate_str, translation_map};
use crate::unicode::normalize::normalize_unicode;

const UNICODE_TO_ASCII_REPLACEMENTS: &[(&str, &str)] = &[
    // Yayya variants (must come before virama+yayya)
    ("\u{fe00}\u{fe01}\u{0a2f}", "î"), // open-top half-yayya
    ("\u{fe00}\u{0a2f}", "Î"),         // sant lipi half-yayya
    ("\u{fe01}\u{0a2f}", "ï"),         // open-top yayya
    ("\u{0a4d}\u{0a2f}", "Î"),         // half-yayya (virama + yayya)
    // Bindi + bihari ligature
    ("\u{0a02}\u{200d}\u{0a40}", "ˆØI"),
    // Subjoined letters (virama + consonant)
    ("\u{0a4d}\u{0a30}", "R"),        // pair rara
    ("\u{0a4d}\u{0a35}", "Í"),        // pair vava
    ("\u{0a4d}\u{0a39}", "H"),        // pair haha
    ("\u{0a4d}\u{0a1a}", "ç"),        // pair chacha
    ("\u{0a4d}\u{0a1f}", "†"),        // pair tanka
    ("\u{0a4d}\u{0a24}", "œ"),        // pair tatta
    ("\u{0a4d}\u{0a28}", "\u{02dc}"), // pair nanna
];

const UNICODE_TO_ASCII_MAP: fn(char) -> String = translation_map!(
    // Base consonants
    '\u{0a73}' => 'a', // ੳ
    '\u{0a05}' => 'A', // ਅ
    '\u{0a72}' => 'e', // ੲ
    '\u{0a38}' => 's', // ਸ
    '\u{0a39}' => 'h', // ਹ
    '\u{0a15}' => 'k', // ਕ
    '\u{0a16}' => 'K', // ਖ
    '\u{0a17}' => 'g', // ਗ
    '\u{0a18}' => 'G', // ਘ
    '\u{0a19}' => '|', // ਙ
    '\u{0a1a}' => 'c', // ਚ
    '\u{0a1b}' => 'C', // ਛ
    '\u{0a1c}' => 'j', // ਜ
    '\u{0a1d}' => 'J', // ਝ
    '\u{0a1e}' => '\\', // ਞ
    '\u{0a1f}' => 't', // ਟ
    '\u{0a20}' => 'T', // ਠ
    '\u{0a21}' => 'f', // ਡ
    '\u{0a22}' => 'F', // ਢ
    '\u{0a23}' => 'x', // ਣ
    '\u{0a24}' => 'q', // ਤ
    '\u{0a25}' => 'Q', // ਥ
    '\u{0a26}' => 'd', // ਦ
    '\u{0a27}' => 'D', // ਧ
    '\u{0a28}' => 'n', // ਨ
    '\u{0a2a}' => 'p', // ਪ
    '\u{0a2b}' => 'P', // ਫ
    '\u{0a2c}' => 'b', // ਬ
    '\u{0a2d}' => 'B', // ਭ
    '\u{0a2e}' => 'm', // ਮ
    '\u{0a2f}' => 'X', // ਯ
    '\u{0a30}' => 'r', // ਰ
    '\u{0a32}' => 'l', // ਲ
    '\u{0a35}' => 'v', // ਵ
    '\u{0a5c}' => 'V', // ੜ
    // Precomposed nukta forms (single codepoints after normalize)
    '\u{0a36}' => 'S', // ਸ਼ (sha)
    '\u{0a5b}' => 'z', // ਜ਼ (za)
    '\u{0a59}' => '^', // ਖ਼ (khha)
    '\u{0a5e}' => '&', // ਫ਼ (fa)
    '\u{0a5a}' => 'Z', // ਗ਼ (ghha)
    '\u{0a33}' => 'L', // ਲ਼ (lla)
    // Modifiers
    '\u{0a3c}' => 'æ', // nukta ਼
    '\u{0a51}' => '@', // udaat ੑ
    '\u{0a75}' => '´', // yakash ੵ
    '\u{0a03}' => 'Ú', // visarga ਃ
    // Standalone vowels
    '\u{0a13}' => 'E',    // ਓ
    '\u{0a06}' => "Aw",   // ਆ
    '\u{0a07}' => "ei",   // ਇ
    '\u{0a08}' => "eI",   // ਈ
    '\u{0a09}' => "au",   // ਉ
    '\u{0a0a}' => "aU",   // ਊ
    '\u{0a0f}' => "ey",   // ਏ
    '\u{0a10}' => "AY",   // ਐ
    '\u{0a14}' => "AO",   // ਔ
    // Vowel signs
    '\u{0a3e}' => 'w', // ਾ
    '\u{0a3f}' => 'i', // ਿ (sihari)
    '\u{0a40}' => 'I', // ੀ
    '\u{0a41}' => 'u', // ੁ
    '\u{0a42}' => 'U', // ੂ
    '\u{0a47}' => 'y', // ੇ
    '\u{0a48}' => 'Y', // ੈ
    '\u{0a4b}' => 'o', // ੋ
    '\u{0a4c}' => 'O', // ੌ
    // Nasalization / gemination
    '\u{0a70}' => 'M', // ੰ tippi
    '\u{0a02}' => 'N', // ਂ bindi
    '\u{0a71}' => '~', // ੱ adhak
    // Punctuation
    '\u{0964}' => '[', // ।
    '\u{0965}' => ']', // ॥
    // Digits
    '\u{0a66}' => '0',
    '\u{0a67}' => '1',
    '\u{0a68}' => '2',
    '\u{0a69}' => '3',
    '\u{0a6a}' => '4',
    '\u{0a6b}' => '5',
    '\u{0a6c}' => '6',
    '\u{0a6d}' => '7',
    '\u{0a6e}' => '8',
    '\u{0a6f}' => '9',
    // Symbols
    '\u{0a74}' => "<>", // ੴ
    '☬' => 'Ç',
);

// Character classes for regex steps (ASCII domain, after translation)
const ASCII_BASE_LETTERS: &str = r"AeshkKgG\|cCjJ\\tTfFxqQdDnpPbBmXrlvVSz\^&ZLÎïî";
const ASCII_MODIFIERS: &str = "æ@\u{00b4}ÚwIuUyYoO`MNRÍHç†œ\u{02dc}ü\u{00a8}®µ\u{02c6}W~¤Ï";
const ASCII_BELOW_BASE_LETTERS: &str = "RÍHç†œ\u{02dc}\u{00b4}@";
const ASCII_NON_ABOVE_MODIFIERS: &str = "æ@\u{00b4}ÚwuURÍHç†œ\u{02dc}ü\u{00a8}®Ï";
const ASCII_CENTER_STROKE_LETTERS: &str = "nT";

const ASCII_COMBO_REPLACEMENTS: &[(&str, &str)] = &[
    ("IM", "µØI"), // tippi + bihari ligature
    ("Iµ", "µØI"), // tippi + bihari ligature
    ("kR", "k®"),  // kakka + pair-rara ligature
    ("H¨", "§"),   // pair-haha + uu
    ("wN", "W"),   // addhak positioning
    ("wˆ", "W"),   // addhak positioning
    ("nUµ", "ƒ"),  // nun + uu + tippi
];

fn rearrange_sihari(input: String) -> String {
    replace_regex!(
        formatcp!("([{ASCII_BASE_LETTERS}][{ASCII_MODIFIERS}]*)i([{ASCII_MODIFIERS}]*)"),
        "i${1}${2}"
    )(input)
}

fn fix_below_base_vowels(input: String) -> String {
    let input = replace_regex!(
        formatcp!("([{ASCII_BELOW_BASE_LETTERS}][{ASCII_MODIFIERS}]*)u([{ASCII_MODIFIERS}]*)"),
        "${1}ü${2}"
    )(input);
    replace_regex!(
        formatcp!("([{ASCII_BELOW_BASE_LETTERS}][{ASCII_MODIFIERS}]*)U([{ASCII_MODIFIERS}]*)"),
        "${1}¨${2}"
    )(input)
}

fn fix_center_stroke_tippi(input: String) -> String {
    replace_regex!(
        formatcp!("([{ASCII_CENTER_STROKE_LETTERS}][{ASCII_MODIFIERS}]*)M([{ASCII_MODIFIERS}]*)"),
        "${1}µ${2}"
    )(input)
}

fn fix_nasalization(input: String) -> String {
    let input = replace_regex!(
        formatcp!(
            "([{ASCII_BASE_LETTERS}][{ASCII_NON_ABOVE_MODIFIERS}]*)N([{ASCII_NON_ABOVE_MODIFIERS}]*)"
        ),
        "${1}ˆ${2}"
    )(input);
    replace_regex!(
        formatcp!(
            "([{ASCII_BASE_LETTERS}][{ASCII_NON_ABOVE_MODIFIERS}]*)~([{ASCII_NON_ABOVE_MODIFIERS}]*)"
        ),
        "${1}`${2}"
    )(input)
}

#[uniffi::export]
pub fn to_ascii(input: String) -> String {
    pipe!(
        input,
        normalize_unicode,
        replace_str(UNICODE_TO_ASCII_REPLACEMENTS),
        translate_str(UNICODE_TO_ASCII_MAP),
        rearrange_sihari,
        fix_below_base_vowels,
        fix_center_stroke_tippi,
        fix_nasalization,
        replace_str(ASCII_COMBO_REPLACEMENTS)
    )
}
