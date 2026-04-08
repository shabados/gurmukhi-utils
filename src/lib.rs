//! Convert, transcribe, normalize, and analyze Gurmukhi text.
//!
//! Gurmukhi is a Rust library with auto-generated bindings for JavaScript,
//! Python, Ruby, Kotlin, and Swift via [UniFFI](https://mozilla.github.io/uniffi-rs/).
//!
//! # Modules
//!
//! - [`ascii`] — convert between Gurmukhi Unicode and the legacy ASCII encoding
//! - [`unicode`] — convert to normalized Unicode Gurmukhi, with two standard options
//! - [`transcribe`] — render Gurmukhi in Devanagari, Latin, or Latin Scholar script
//! - [`feature`] — detect and remove semantic features (vishrams, line endings, vowels, modifiers)

uniffi::setup_scaffolding!();

pub mod ascii;
pub mod feature;
pub mod helpers;
pub mod transcribe;
pub mod unicode;
