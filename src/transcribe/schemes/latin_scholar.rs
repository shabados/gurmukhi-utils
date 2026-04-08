use const_format::formatcp;

use crate::helpers::{pipe, replace_regex, replace_str, translate_str, translation_map};
use crate::unicode::normalize::normalize_unicode;

use super::super::constants::*;

const PHRASE_REPLACEMENTS: &[(&str, &str)] = &[("\u{0a74}", "ਇੱਕ ਓਅੰਕਾਰ")]; // ੴ

const ROMAN_REPLACEMENTS: &[(&str, &str)] = &[
    // Longer matches first to avoid partial matching
    ("\u{fe00}\u{fe01}\u{0a2f}", "\u{01b4}\u{0336}"), // ︀︁ਯ → ƴ̶ (open-top half-yayya)
    ("\u{0a15}\u{0a3c}", "q"),                          // ਕ਼ → q
    ("\u{0a4d}\u{0a2f}", "y\u{0336}"),                  // ੍ਯ → y̶
    ("\u{fe00}\u{0a2f}", "y\u{0336}"),                  // ︀ਯ → y̶
    ("\u{fe01}\u{0a2f}", "\u{01b4}"),                   // ︁ਯ → ƴ
    ("\u{0a75}", "\u{02b8}"),                           // ੵ → ʸ
    ("\u{0a4d}\u{0a39}", "\u{02b0}"),                   // ੍ਹ → ʰ
    ("\u{0a4d}\u{0a30}", "\u{02b3}"),                   // ੍ਰ → ʳ
    ("\u{0a4d}\u{0a35}", "\u{1d5b}"),                   // ੍ਵ → ᵛ
    ("\u{0a4d}\u{0a1f}", "\u{1d57}\u{0323}"),           // ੍ਟ → ᵗ̣
    ("\u{0a4d}\u{0a24}", "\u{1d57}"),                   // ੍ਤ → ᵗ
    ("\u{0a4d}\u{0a28}", "\u{207f}"),                   // ੍ਨ → ⁿ
    ("\u{0a4d}\u{0a1a}", "\u{1d9c}"),                   // ੍ਚ → ᶜ
];

const ROMAN_TRANSLATION_MAP: fn(char) -> String = translation_map!(
    // Vowel signs
    '\u{0a3e}' => "\u{0101}",   // ਾ → ā
    '\u{0a47}' => 'e',          // ੇ → e
    '\u{0a48}' => "\u{0113}",   // ੈ → ē
    '\u{0a3f}' => 'i',          // ਿ → i
    '\u{0a40}' => "\u{012b}",   // ੀ → ī
    '\u{0a4b}' => 'o',          // ੋ → o
    '\u{0a4c}' => "\u{014d}",   // ੌ → ō
    '\u{0a41}' => 'u',          // ੁ → u
    '\u{0a42}' => "\u{016b}",   // ੂ → ū
    // Independent vowels
    '\u{0a05}' => 'a',          // ਅ → a
    '\u{0a06}' => "\u{0101}",   // ਆ → ā
    '\u{0a0f}' => 'e',          // ਏ → e
    '\u{0a10}' => "\u{0113}",   // ਐ → ē
    '\u{0a07}' => 'i',          // ਇ → i
    '\u{0a08}' => "\u{012b}",   // ਈ → ī
    '\u{0a13}' => 'o',          // ਓ → o
    '\u{0a14}' => "\u{014d}",   // ਔ → ō
    '\u{0a09}' => 'u',          // ਉ → u
    '\u{0a0a}' => "\u{016b}",   // ਊ → ū
    // Base consonants
    '\u{0a38}' => 's',          // ਸ → s
    '\u{0a39}' => 'h',          // ਹ → h
    '\u{0a15}' => 'k',          // ਕ → k
    '\u{0a16}' => "kh",         // ਖ → kh
    '\u{0a17}' => 'g',          // ਗ → g
    '\u{0a18}' => "gh",         // ਘ → gh
    '\u{0a19}' => "\u{1e45}",   // ਙ → ṅ
    '\u{0a1a}' => 'c',          // ਚ → c
    '\u{0a1b}' => "ch",         // ਛ → ch
    '\u{0a1c}' => 'j',          // ਜ → j
    '\u{0a1d}' => "jh",         // ਝ → jh
    '\u{0a1e}' => "\u{00f1}",   // ਞ → ñ
    '\u{0a1f}' => "\u{1e6d}",   // ਟ → ṭ
    '\u{0a20}' => "\u{1e6d}h",  // ਠ → ṭh
    '\u{0a21}' => "\u{1e0d}",   // ਡ → ḍ
    '\u{0a22}' => "\u{1e0d}h",  // ਢ → ḍh
    '\u{0a23}' => "\u{1e47}",   // ਣ → ṇ
    '\u{0a24}' => 't',          // ਤ → t
    '\u{0a25}' => "th",         // ਥ → th
    '\u{0a26}' => 'd',          // ਦ → d
    '\u{0a27}' => "dh",         // ਧ → dh
    '\u{0a28}' => 'n',          // ਨ → n
    '\u{0a2a}' => 'p',          // ਪ → p
    '\u{0a2b}' => "ph",         // ਫ → ph
    '\u{0a2c}' => 'b',          // ਬ → b
    '\u{0a2d}' => "bh",         // ਭ → bh
    '\u{0a2e}' => 'm',          // ਮ → m
    '\u{0a2f}' => 'y',          // ਯ → y
    '\u{0a30}' => 'r',          // ਰ → r
    '\u{0a32}' => 'l',          // ਲ → l
    '\u{0a35}' => 'v',          // ਵ → v
    '\u{0a5c}' => "\u{1e5b}",   // ੜ → ṛ
    // Precomposed nukta consonants
    '\u{0a36}' => "sh",         // ਸ਼ → sh
    '\u{0a59}' => 'x',          // ਖ਼ → x
    '\u{0a5a}' => "\u{0121}",   // ਗ਼ → ġ
    '\u{0a5b}' => 'z',          // ਜ਼ → z
    '\u{0a5e}' => 'f',          // ਫ਼ → f
    '\u{0a33}' => "\u{1e37}",   // ਲ਼ → ḷ
    // Modifiers and diacritics
    '\u{0a3c}' => "\u{00b0}",   // ਼ → °
    '\u{0a51}' => "\u{0327}",   // ੑ → ̧ (combining cedilla)
    '\u{0a71}' => "\u{02d8}",   // ੱ → ˘
    '\u{0a70}' => "\u{2e1b}",   // ੰ → ⸛
    '\u{0a02}' => "\u{2e1e}",   // ਂ → ⸞
    '\u{0a03}' => "\u{1e96}",   // ਃ → ẖ
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
    // Punctuation
    '\u{0964}' => '|',          // । → |
    '\u{0965}' => "\u{2016}",   // ॥ → ‖
);

fn is_base_letter(c: char) -> bool {
    BASE_LETTERS.contains(c)
}

fn is_base_letter_modifier(c: char) -> bool {
    BASE_LETTER_MODIFIERS.contains(c)
}

fn is_inherent_vowel_trigger(c: char) -> bool {
    PRE_BASE_LIGATURE.contains(c)
        || BASE_LETTERS.contains(c)
        || POST_LETTERS.contains(c)
        || PRE_POST_MODIFIERS.contains(c)
}

fn is_below_letter(c: char) -> bool {
    BELOW_LETTERS.contains(c)
}

/// Insert inherent vowel (mukta / ਅ) between consonants and before triggers.
/// Equivalent to Python's lookahead regex but implemented as a single-pass scan.
fn add_inherent_vowel(input: String) -> String {
    let chars: Vec<char> = input.chars().collect();
    let len = chars.len();
    let mut result = String::with_capacity(len + len / 2);
    let mut i = 0;

    while i < len {
        let c = chars[i];
        result.push(c);

        if is_base_letter(c) {
            // Consume optional modifier
            if i + 1 < len && is_base_letter_modifier(chars[i + 1]) {
                i += 1;
                result.push(chars[i]);
            }

            // If next char triggers inherent vowel, insert ਅ
            if i + 1 < len && is_inherent_vowel_trigger(chars[i + 1]) {
                result.push('\u{0a05}');
            }
        }

        i += 1;
    }

    result
}

/// Add inherent vowel to single-letter words (base letter alone between word boundaries).
fn add_single_letter_vowel(input: String) -> String {
    replace_regex!(
        formatcp!(
            r"(^|\s)([{BASE_LETTERS}][{BASE_LETTER_MODIFIERS}]?)([{VIRAMA}][{BELOW_LETTERS}]|{YAKASH})?(\s|$)"
        ),
        "${1}${2}${3}\u{0a05}${4}"
    )(input)
}

pub(in crate::transcribe) fn guru_latn(input: String) -> String {
    pipe!(
        input,
        normalize_unicode,
        replace_str(PHRASE_REPLACEMENTS),
        add_inherent_vowel,
        add_single_letter_vowel,
        replace_str(ROMAN_REPLACEMENTS),
        translate_str(ROMAN_TRANSLATION_MAP)
    )
}
