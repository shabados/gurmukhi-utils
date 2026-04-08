use crate::unicode::normalize::normalize_unicode;

/// Maps a single Gurmukhi character to its Devanagari equivalent.
///
/// Most of the Gurmukhi block (U+0A00–U+0A6F) maps to Devanagari (U+0900–U+096F)
/// by subtracting 0x100. Special cases exist for U+0A70–U+0A75 where the offset
/// produces wrong results.
fn gurmukhi_to_devanagari(c: char) -> String {
    match c {
        // Special cases where offset gives wrong Devanagari character
        '\u{0a70}' => "\u{0902}".into(),  // ੰ (tippi) → ं (anusvara)
        '\u{0a71}' => String::new(),       // ੱ (adhak) → drop (no Devanagari equivalent)
        '\u{0a72}' => "\u{0907}".into(),   // ੲ (iri) → इ
        '\u{0a73}' => "\u{0909}".into(),   // ੳ (ura) → उ
        '\u{0a74}' => "\u{0a74}".into(),   // ੴ (ik onkar) → keep as-is
        '\u{0a75}' => "\u{094d}\u{092f}".into(), // ੵ (yakash) → ्य (halant + ya)
        // Standard offset for the rest of the Gurmukhi block
        c if ('\u{0a00}'..='\u{0a6f}').contains(&c) => {
            char::from_u32(c as u32 - 0x100)
                .map(|d| d.to_string())
                .unwrap_or_else(|| c.to_string())
        }
        // Non-Gurmukhi characters pass through unchanged
        _ => c.to_string(),
    }
}

pub(in crate::transcribe) fn guru_deva(input: String) -> String {
    let input = normalize_unicode(input);
    input.chars().map(gurmukhi_to_devanagari).collect()
}
