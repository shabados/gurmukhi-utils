//! Shared Gurmukhi character class constants for transcription schemes.
//!
//! These are used in regex patterns via `formatcp!`. They intentionally
//! duplicate what `unicode/normalize.rs` defines privately — coupling
//! transcription to normalization internals would be worse than the duplication.

/// Base consonants (includes precomposed nukta forms after normalization)
pub(super) const BASE_LETTERS: &str = concat!(
    "ਸਹਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵੜ",
    "\u{0a36}", // ਸ਼
    "\u{0a59}", // ਖ਼
    "\u{0a5a}", // ਗ਼
    "\u{0a5b}", // ਜ਼
    "\u{0a5e}", // ਫ਼
    "\u{0a33}", // ਲ਼
);

/// Independent vowel letters
pub(super) const VOWEL_LETTERS: &str = "ਅਆਏਐਇਈਓਔਉਊ";

/// Consonants that can appear below a base letter (via virama)
pub(super) const BELOW_LETTERS: &str = "ਹਰਵਟਤਨਚ";

/// Virama / halant — suppresses the inherent vowel
pub(super) const VIRAMA: &str = "\u{0a4d}";

/// Yakash
pub(super) const YAKASH: &str = "\u{0a75}";

/// Modifiers that attach to a base letter (nukta, udaat, yakash)
pub(super) const BASE_LETTER_MODIFIERS: &str = "\u{0a3c}\u{0a51}\u{0a75}";

/// Vowel signs in canonical order (left, top, bottom, right)
pub(super) const ORDERED_VOWELS: &str = "ਿੇੈੋੌੁੂਾੀ";

/// Variation selectors that precede yayya variants
pub(super) const PRE_BASE_LIGATURE: &str = "\u{fe00}\u{fe01}";

/// Independent vowel letters that follow a base letter (POST_LETTERS in Python)
pub(super) const POST_LETTERS: &str = "ਆਏਐਇਈਓਔਉਊ";

/// Modifiers that can appear before or after other modifiers
pub(super) const PRE_POST_MODIFIERS: &str = "ੱਂੰ";

/// Hora + onkar vowel combination (ੋ + ੁ)
pub(super) const HORA_ONKAR: &str = "ੋੁ";

/// Dulavan + onkar vowel combination (ੈ + ੁ)
pub(super) const DULAVAN_ONKAR: &str = "ੈੁ";
