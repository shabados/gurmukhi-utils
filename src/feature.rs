use crate::helpers::regex;
use crate::unicode::normalize::decompose_vowels;

// Vishram characters (pause markers)
const VISHRAM_HEAVY: char = ';';
const VISHRAM_MEDIUM: char = ',';
const VISHRAM_LIGHT: char = '.';

// Vowel signs (matras)
const VOWEL_SIGNS: &[char] = &['ਾ', 'ਿ', 'ੀ', 'ੁ', 'ੂ', 'ੇ', 'ੈ', 'ੋ', 'ੌ'];

// Vowel carriers and their precomposed independent vowels
const VOWEL_CARRIERS: &[char] = &['ੲ', 'ੳ', 'ਅ'];
const INDEPENDENT_VOWELS: &[char] = &['ਆ', 'ਇ', 'ਈ', 'ਉ', 'ਊ', 'ਏ', 'ਐ', 'ਓ', 'ਔ'];

// Modifier characters
const NUKTA: char = '਼';
const ADHAK: char = 'ੱ';
const NASALS: &[char] = &['ੰ', 'ਂ', 'ਁ'];
const ACCENTS: &[char] = &['ੑ', 'ੵ'];
const VISARGA: char = 'ਃ';

/// A semantic feature that can be detected in or removed from Gurmukhi text.
///
/// Features are composable — pass any combination to [`detect`] or [`remove`].
/// Grouping helpers like [`vishraams`], [`vowels`], and [`modifiers`] return
/// common subsets.
#[derive(uniffi::Enum, Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub enum Feature {
    /// Heavy pause marker (`;`). Indicates a major breath or stop.
    VishramHeavy,
    /// Medium pause marker (`,`). Indicates a moderate pause.
    VishramMedium,
    /// Light pause marker (`.`). Indicates a brief pause.
    VishramLight,

    /// Rahao line ending (e.g. `॥ ਰਹਾਉ ॥`). Marks the refrain/pause verse.
    RahaoEnding,
    /// Numbered line ending (e.g. `॥੧॥`). Marks a numbered verse boundary.
    NumberedEnding,
    /// Bare line ending (`।`, `॥`, `|`). A line boundary without numbering.
    BareEnding,

    /// Dependent vowel sign / matra (ਾ ਿ ੀ ੁ ੂ ੇ ੈ ੋ ੌ).
    VowelSign,
    /// Independent vowel carrier (ੲ ੳ ਅ) and precomposed vowel letters (ਆ ਇ ਈ etc.).
    VowelCarrier,

    /// Nukta (਼). Sub-dot modifying a consonant for borrowed sounds.
    Nukta,
    /// Adhak (ੱ). Gemination marker — doubles the following consonant.
    Adhak,
    /// Nasal markers (ੰ tippi, ਂ bindi, ਁ adak bindi).
    Nasal,
    /// Accent markers (ੑ udaat, ੵ yakash).
    Accent,
    /// Visarga (ਃ). Aspiration marker borrowed from Sanskrit.
    Visarga,
}

/// A detected feature occurrence with its position in the input string.
///
/// `start` and `end` are character indices (not byte offsets), so they work
/// directly with `string.slice(start, end)` in JavaScript, `string[start:end]`
/// in Python, and equivalent string slicing in other languages.
#[derive(uniffi::Record, Clone, Debug, PartialEq, Eq)]
pub struct FeatureMatch {
    pub feature: Feature,
    pub start: u64,
    pub end: u64,
}

// -- grouping functions --

const LINE_ENDING_CHARS: &[char] = &['।', '॥', '|'];

/// Returns the characters associated with a feature.
#[uniffi::export]
pub fn feature_chars(feature: Feature) -> Vec<String> {
    match feature {
        Feature::VishramHeavy => vec![VISHRAM_HEAVY.to_string()],
        Feature::VishramMedium => vec![VISHRAM_MEDIUM.to_string()],
        Feature::VishramLight => vec![VISHRAM_LIGHT.to_string()],
        Feature::RahaoEnding | Feature::NumberedEnding | Feature::BareEnding => {
            LINE_ENDING_CHARS.iter().map(|c| c.to_string()).collect()
        }
        Feature::VowelSign => VOWEL_SIGNS.iter().map(|c| c.to_string()).collect(),
        Feature::VowelCarrier => VOWEL_CARRIERS
            .iter()
            .chain(INDEPENDENT_VOWELS.iter())
            .map(|c| c.to_string())
            .collect(),
        Feature::Nukta => vec![NUKTA.to_string()],
        Feature::Adhak => vec![ADHAK.to_string()],
        Feature::Nasal => NASALS.iter().map(|c| c.to_string()).collect(),
        Feature::Accent => ACCENTS.iter().map(|c| c.to_string()).collect(),
        Feature::Visarga => vec![VISARGA.to_string()],
    }
}

/// Returns all vishram features.
#[uniffi::export]
pub fn vishraams() -> Vec<Feature> {
    vec![
        Feature::VishramLight,
        Feature::VishramMedium,
        Feature::VishramHeavy,
    ]
}

/// Returns all line ending features.
#[uniffi::export]
pub fn line_endings() -> Vec<Feature> {
    vec![
        Feature::RahaoEnding,
        Feature::NumberedEnding,
        Feature::BareEnding,
    ]
}

/// Returns all vowel features.
#[uniffi::export]
pub fn vowels() -> Vec<Feature> {
    vec![Feature::VowelSign, Feature::VowelCarrier]
}

/// Returns all modifier features.
#[uniffi::export]
pub fn modifiers() -> Vec<Feature> {
    vec![
        Feature::Nukta,
        Feature::Adhak,
        Feature::Nasal,
        Feature::Accent,
        Feature::Visarga,
    ]
}

/// Returns all features.
#[uniffi::export]
pub fn all_features() -> Vec<Feature> {
    vec![
        Feature::VishramHeavy,
        Feature::VishramMedium,
        Feature::VishramLight,
        Feature::RahaoEnding,
        Feature::NumberedEnding,
        Feature::BareEnding,
        Feature::VowelSign,
        Feature::VowelCarrier,
        Feature::Nukta,
        Feature::Adhak,
        Feature::Nasal,
        Feature::Accent,
        Feature::Visarga,
    ]
}

// -- line ending regexes (ordered most-specific → least-specific) --

struct LineEndingPattern {
    feature: Feature,
    regex: &'static regex::Regex,
}

fn line_ending_patterns() -> &'static [LineEndingPattern] {
    static PATTERNS: once_cell::sync::OnceCell<Vec<LineEndingPattern>> =
        once_cell::sync::OnceCell::new();
    PATTERNS.get_or_init(|| {
        vec![
            LineEndingPattern {
                feature: Feature::RahaoEnding,
                regex: regex!(r"[।॥\|] *(ਰਹਾਉ|रहाउ|rahaau|rahau|rahao|Pause).*"),
            },
            LineEndingPattern {
                feature: Feature::NumberedEnding,
                regex: regex!(r"[।॥\|][੦-੯].*"),
            },
            LineEndingPattern {
                feature: Feature::NumberedEnding,
                regex: regex!(r"[।॥\|]\d.*"),
            },
            LineEndingPattern {
                feature: Feature::BareEnding,
                regex: regex!(r"[।॥\|]"),
            },
        ]
    })
}

// -- remove internals --

fn remove_chars(input: &str, chars: &[char]) -> String {
    input.chars().filter(|c| !chars.contains(c)).collect()
}

fn remove_one(input: String, feature: &Feature) -> String {
    match feature {
        Feature::VishramHeavy => input.replace(VISHRAM_HEAVY, ""),
        Feature::VishramMedium => input.replace(VISHRAM_MEDIUM, ""),
        Feature::VishramLight => input.replace(VISHRAM_LIGHT, ""),
        Feature::RahaoEnding | Feature::NumberedEnding | Feature::BareEnding => {
            line_ending_patterns()
                .iter()
                .filter(|p| p.feature == *feature)
                .fold(input, |acc, p| p.regex.replace_all(&acc, "").to_string())
        }
        Feature::VowelSign => remove_chars(&decompose_vowels(input), VOWEL_SIGNS),
        Feature::VowelCarrier => {
            let without_independent = remove_chars(&input, INDEPENDENT_VOWELS);
            remove_chars(&without_independent, VOWEL_CARRIERS)
        }
        Feature::Nukta => input.replace(NUKTA, ""),
        Feature::Adhak => input.replace(ADHAK, ""),
        Feature::Nasal => remove_chars(&input, NASALS),
        Feature::Accent => remove_chars(&input, ACCENTS),
        Feature::Visarga => input.replace(VISARGA, ""),
    }
}

/// Removes the specified features from the input string.
#[uniffi::export]
pub fn remove(input: String, features: Vec<Feature>) -> String {
    let result = features.iter().fold(input, remove_one);
    let result = regex!(r" {2,}").replace_all(&result, " ");
    result.trim().to_string()
}

// -- detect internals --

fn detect_chars(input: &str, feature: Feature, chars: &[char]) -> Vec<FeatureMatch> {
    input
        .chars()
        .enumerate()
        .filter(|(_, c)| chars.contains(c))
        .map(|(cp_idx, _)| FeatureMatch {
            feature,
            start: cp_idx as u64,
            end: (cp_idx + 1) as u64,
        })
        .collect()
}

fn detect_single_char(input: &str, feature: Feature, c: char) -> Vec<FeatureMatch> {
    input
        .chars()
        .enumerate()
        .filter(|(_, ch)| *ch == c)
        .map(|(cp_idx, _)| FeatureMatch {
            feature,
            start: cp_idx as u64,
            end: (cp_idx + 1) as u64,
        })
        .collect()
}

const LINE_ENDING_FEATURES: &[Feature] = &[
    Feature::RahaoEnding,
    Feature::NumberedEnding,
    Feature::BareEnding,
];

fn byte_to_codepoint(input: &str, byte_offset: usize) -> u64 {
    input[..byte_offset].chars().count() as u64
}

fn detect_line_endings(input: &str, features: &[Feature]) -> Vec<FeatureMatch> {
    let mut covered: Vec<(usize, usize)> = Vec::new();
    let mut matches = Vec::new();

    // Run ALL patterns (most-specific first) for correct overlap detection.
    // Always extend coverage even for overlapping matches, so lower-priority
    // patterns can't claim territory that belongs to higher-priority ones.
    // Overlap tracking uses byte offsets (from regex), output uses character indices.
    for p in line_ending_patterns() {
        for m in p.regex.find_iter(input) {
            let (start, end) = (m.start(), m.end());
            if covered.iter().any(|&(cs, ce)| start < ce && end > cs) {
                covered.push((start, end));
                continue;
            }
            covered.push((start, end));
            if features.contains(&p.feature) {
                matches.push(FeatureMatch {
                    feature: p.feature,
                    start: byte_to_codepoint(input, start),
                    end: byte_to_codepoint(input, end),
                });
            }
        }
    }

    matches
}

fn detect_one(input: &str, feature: &Feature) -> Vec<FeatureMatch> {
    match feature {
        Feature::VishramHeavy => detect_single_char(input, *feature, VISHRAM_HEAVY),
        Feature::VishramMedium => detect_single_char(input, *feature, VISHRAM_MEDIUM),
        Feature::VishramLight => detect_single_char(input, *feature, VISHRAM_LIGHT),
        Feature::RahaoEnding | Feature::NumberedEnding | Feature::BareEnding => {
            detect_line_endings(input, &[*feature])
        }
        Feature::VowelSign => detect_chars(input, *feature, VOWEL_SIGNS),
        Feature::VowelCarrier => {
            let mut matches = detect_chars(input, *feature, VOWEL_CARRIERS);
            matches.extend(detect_chars(input, *feature, INDEPENDENT_VOWELS));
            matches.sort_by_key(|m| m.start);
            matches
        }
        Feature::Nukta => detect_single_char(input, *feature, NUKTA),
        Feature::Adhak => detect_single_char(input, *feature, ADHAK),
        Feature::Nasal => detect_chars(input, *feature, NASALS),
        Feature::Accent => detect_chars(input, *feature, ACCENTS),
        Feature::Visarga => detect_single_char(input, *feature, VISARGA),
    }
}

/// Detects the specified features in the input string, returning match positions.
///
/// Returns full pattern spans — e.g. a line ending like `॥੧॥ ਰਹਾਉ ॥` is one match.
/// Results are sorted by start position.
#[uniffi::export]
pub fn detect(input: String, features: Vec<Feature>) -> Vec<FeatureMatch> {
    let le_features: Vec<Feature> = features
        .iter()
        .filter(|f| LINE_ENDING_FEATURES.contains(f))
        .copied()
        .collect();

    let mut matches: Vec<FeatureMatch> = features
        .iter()
        .filter(|f| !LINE_ENDING_FEATURES.contains(f))
        .flat_map(|f| detect_one(&input, f))
        .collect();

    if !le_features.is_empty() {
        matches.extend(detect_line_endings(&input, &le_features));
    }

    matches.sort_by_key(|m| m.start);
    matches
}
