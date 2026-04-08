//! Transcribe Gurmukhi into other scripts.
//!
//! "Transcribe" means "write across" — taking Gurbani written in Gurmukhi and
//! rendering it in a script the reader already knows.
//!
//! # Design decisions
//!
//! ## Why one function, not two
//!
//! We considered splitting into `transliterate` (mechanical character mapping)
//! and `transcribe` (pronunciation-aware conversion). We rejected this because
//! the distinction is an implementation detail, not a user-facing concept.
//! Each [`Script`] target is an opinionated conversion for a specific audience —
//! some apply pronunciation rules internally, some don't. The caller doesn't
//! need to know or care which.
//!
//! ## Why not `pronounce` or `convert`
//!
//! `pronounce` implies audio or spoken output, but the output is text.
//! It also doesn't fit the scholarly target, which deliberately preserves
//! spelling over pronunciation. `convert` is too vague — it could mean anything.
//! `transcribe` captures the intent: writing something across into another form.
//!
//! ## Mission
//!
//! There is no single perfect pronunciation of Gurbani. The goal is to
//! approximate what the majority of speakers say, giving non-readers enough
//! confidence to follow along in sangat and ultimately learn to read Gurmukhi
//! themselves.

mod constants;
mod schemes;

use crate::helpers::replace_str;
use crate::unicode::UNICODE_CONSORTIUM_TO_SANT_LIPI_REPLACEMENTS;
use crate::unicode::normalize::normalize_unicode;

/// Target script for transcription.
///
/// Each variant bundles the appropriate conversion behavior for its audience.
/// Some are pure character mappings, some apply pronunciation rules, some
/// require hardcoded exceptions for words where rules break down.
#[derive(uniffi::Enum)]
pub enum Script {
    /// Pure script mapping for Hindi/Devanagari readers.
    /// No pronunciation rules applied — Devanagari readers already share
    /// similar conventions (e.g. haha rules) with Gurmukhi.
    Devanagari,

    /// Pronunciation-aware conversion for English-speaking audiences.
    /// Applies haha rules, drops grammatical vowels, handles hardcoded
    /// exceptions — optimized for someone following along in sangat.
    Latin,

    /// Academic transliteration to Latin script (ISO/IAST-like).
    /// Mechanical character mapping with no pronunciation interpretation.
    /// Every orthographic distinction is preserved. For scholars.
    LatinScholar,
    // Future: Arabic (requires expert input for Persian-based script conventions)
}

/// Transcribes Gurmukhi text into the given [`Script`].
#[uniffi::export]
pub fn transcribe(input: String, script: Script) -> String {
    let input = replace_str(UNICODE_CONSORTIUM_TO_SANT_LIPI_REPLACEMENTS)(input);
    let input = normalize_unicode(input);

    match script {
        Script::Devanagari => schemes::devanagari::guru_deva(input),
        Script::Latin => schemes::latin::guru_latn_pa(input),
        Script::LatinScholar => schemes::latin_scholar::guru_latn(input),
    }
}
