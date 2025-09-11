use crate::helpers::{pipe, regex, replace_regex, replace_str, translate_str, translation_map};

pub mod normalize;

#[derive(uniffi::Enum)]

///
pub enum UnicodeStandard {
    UnicodeConsortium,
    SantLipi,
}

const ASCII_TO_SANT_LIPI_REPLACEMENTS: &[(&str, &str)] = &[
    ("ˆØI", "ਂ‍ੀ"),
    ("<>", "ੴ"),
    ("<", "ੴ"),
    (">", "☬"),
    ("Åå", "ੴ"),
    ("Å", "ੴ"),
    ("å", "ੴ"),
];

const UNICODE_CONSORTIUM_TO_SANT_LIPI_REPLACEMENTS: &[(&str, &str)] = &[("੍ਯ", "︀ਯ")];

const SANT_LIPI_TO_UNICODE_CONSORTIUM_REPLACEMENTS: &[(&str, &str)] =
    &[("︀︁ਯ", "੍ਯ"), ("︀ਯ", "੍ਯ"), ("︁ਯ", "ਯ"), ("ਂ‍ੀ", "ੀਂ")];

const ASCII_TO_SANT_LIPI_MAP: fn(char) -> String = translation_map!(
        'a' => 'ੳ',
        'b' => 'ਬ',
        'c' => 'ਚ',
        'd' => 'ਦ',
        'e' => 'ੲ',
        'f' => 'ਡ',
        'g' => 'ਗ',
        'h' => 'ਹ',
        'i' => 'ਿ',
        'j' => 'ਜ',
        'k' => 'ਕ',
        'l' => 'ਲ',
        'm' => 'ਮ',
        'n' => 'ਨ',
        'o' => 'ੋ',
        'p' => 'ਪ',
        'q' => 'ਤ',
        'r' => 'ਰ',
        's' => 'ਸ',
        't' => 'ਟ',
        'u' => 'ੁ',
        'v' => 'ਵ',
        'w' => 'ਾ',
        'x' => 'ਣ',
        'y' => 'ੇ',
        'z' => 'ਜ਼',
        'A' => 'ਅ',
        'B' => 'ਭ',
        'C' => 'ਛ',
        'D' => 'ਧ',
        'E' => 'ਓ',
        'F' => 'ਢ',
        'G' => 'ਘ',
        'H' => "੍ਹ",
        'I' => 'ੀ',
        'J' => 'ਝ',
        'K' => 'ਖ',
        'L' => 'ਲ਼',
        'M' => 'ੰ',
        'N' => 'ਂ',
        'O' => 'ੌ',
        'P' => 'ਫ',
        'Q' => 'ਥ',
        'R' => "੍ਰ",
        'S' => 'ਸ਼',
        'T' => 'ਠ',
        'U' => 'ੂ',
        'V' => 'ੜ',
        'W' => "ਾਂ",
        'X' => 'ਯ',
        'Y' => 'ੈ',
        'Z' => 'ਗ਼',
        '0' => '੦',
        '1' => '੧',
        '2' => '੨',
        '3' => '੩',
        '4' => '੪',
        '5' => '੫',
        '6' => '੬',
        '7' => '੭',
        '8' => '੮',
        '9' => '੯',
        '[' => '।',
        ']' => '॥',
        '\\' => 'ਞ',
        '|' => 'ਙ',
        '`' => 'ੱ',
        '~' => 'ੱ',
        '@' => 'ੑ',
        '^' => 'ਖ਼',
        '&' => 'ਫ਼',
        '†' => "੍ਟ", // dagger symbol
        'ü' => 'ੁ', // u-diaeresis letter
        '®' => "੍ਰ", // registered symbol
        '´' => 'ੵ', // acute accent (´)
        '¨' => 'ੂ', // diaeresis accent (¨)
        'µ' => 'ੰ', // mu letter
        'æ' => '਼',
        '¡' => 'ੴ', // inverted exclamation (¡)
        'ƒ' => "ਨੂੰ", // florin symbol
        'œ' => "੍ਤ",
        'Í' => "੍ਵ", // capital i-acute letter
        'Ï' => 'ੵ', // capital i-diaeresis letter
        'Ò' => '॥', // capital o-grave letter
        'Ú' => 'ਃ', // capital u-acute letter
        'ˆ' => 'ਂ', // circumflex accent (ˆ)
        '˜' => "੍ਨ", // small tilde (˜)
        /*** AnmolLipi/GurbaniAkhar mappings: ***/
        '§'=> "੍ਹੂ", // section symbol
        '¤'=> 'ੱ', // currency symbol
        /*** GurbaniLipi mappings: ***/
        'ç'=> "੍ਚ", // c-cedilla letter
        /*** AnmolLipi/GurbaniAkhar overriding GurbaniLipi mapping: ***/
        'Ç'=> '☬', // khanda instead of california state symbol
        /*** Miscellaneous: ***/
        '‚'=> '❁', // single low-9 quotation (‚) mark
        /*** Nullify ***/
        /*** Either the 2nd portion of ੴ or a symbol of USA: ***/
        'Æ'=> "",
        'Ø'=> "", // This is a topline / shirorekha (शिरोरेखा) extender
        'ÿ'=> "", // This is the author Kulbir S Thind's stamp
        'Œ'=> "", // Box drawing left flower
        '‰'=> "", // Box drawing right flower
        'Ó'=> "", // Box drawing top flower
        'Ô'=> "", // Box drawing bottom flower
        /*** Open Gurbani Akhar ***/
        'Î'=> "\u{fe00}ਯ", // capital i-circumflex to half-yayya
        'ï'=> "\u{fe01}ਯ", // i-diaeresis to open-top yayya
        'î'=> "\u{fe00}\u{fe01}ਯ" // i-circumflex to open-top half-yayya
);

// #[uniffi::export(default())]
/// Converts any ascii (or unicode) gurmukhi characters to normalized unicode gurmukhi of a given standard
///
/// Note:
/// Converting yayya (ਯ) variants with an open top using the Unicode Consortium standard is considered destructive. This function will substitute the original with it's shirorekha/top-line equivalent.
/// Many fonts and text shaping engines fail to render half-yayya (੍ਯ) correctly. Regardless of the standard used, it is recommended to use the Sant Lipi standard.
pub fn to_unicode(input: String, standard: UnicodeStandard) -> String {
    pipe!(
        input,
        // Convert any existing Unicode Gurmukhi to Sant Lipi standard
        replace_str(UNICODE_CONSORTIUM_TO_SANT_LIPI_REPLACEMENTS),
        // Move ASCII sihari before mapping
        replace_regex!(r"(i)([\a-zA-Z|^&Îîï])", "${2}${1}"),
        // Map any ASCII to Sant Lipi standard
        replace_str(ASCII_TO_SANT_LIPI_REPLACEMENTS),
        translate_str(ASCII_TO_SANT_LIPI_MAP),
        normalize::normalize_unicode,
        |s| {
            match standard {
                UnicodeStandard::UnicodeConsortium => {
                    replace_str(SANT_LIPI_TO_UNICODE_CONSORTIUM_REPLACEMENTS)(s)
                }
                _ => s,
            }
        }
    )
}
