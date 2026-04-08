use crate::helpers::regex;

// Vishram characters (pause markers)
const VISHRAM_HEAVY: char = ';';
const VISHRAM_MEDIUM: char = ',';
const VISHRAM_LIGHT: char = '.';

// Line ending characters (used in regex patterns below as character classes)

/// Convenience group: all vishram types.
pub const VISHRAMS: &[Markup] = &[
    Markup::VishramLight,
    Markup::VishramMedium,
    Markup::VishramHeavy,
];

#[derive(uniffi::Enum, Clone, Copy, Debug, PartialEq, Eq, Hash)]
pub enum Markup {
    VishramHeavy,
    VishramMedium,
    VishramLight,
    LineEnding,
}

#[derive(uniffi::Record, Clone, Debug, PartialEq, Eq)]
pub struct MarkupMatch {
    pub markup: Markup,
    pub start: u64,
    pub end: u64,
}

fn strip_line_endings(input: String) -> String {
    // Apply patterns in order: most specific → least specific
    [
        regex!(r"[।॥\|] *(ਰਹਾਉ|रहाउ|rahaau|rahau|rahao|Pause).*"),
        regex!(r"[।॥\|][੦-੯].*"),
        regex!(r"[।॥\|]\d.*"),
        regex!(r"[।॥\|]"),
    ]
    .iter()
    .fold(input, |acc, re| re.replace_all(&acc, "").to_string())
}

fn strip_one(input: String, markup: &Markup) -> String {
    match markup {
        Markup::VishramHeavy => input.replace(VISHRAM_HEAVY, ""),
        Markup::VishramMedium => input.replace(VISHRAM_MEDIUM, ""),
        Markup::VishramLight => input.replace(VISHRAM_LIGHT, ""),
        Markup::LineEnding => strip_line_endings(input),
    }
}

/// Removes the specified markup from the input string.
#[uniffi::export]
pub fn remove(input: String, markup: Vec<Markup>) -> String {
    let result = markup.iter().fold(input, |acc, m| strip_one(acc, m));
    let result = regex!(r" {2,}").replace_all(&result, " ");
    result.trim().to_string()
}

fn detect_vishram(input: &str, markup: Markup, c: char) -> Vec<MarkupMatch> {
    input
        .match_indices(c)
        .map(|(idx, _)| MarkupMatch {
            markup,
            start: idx as u64,
            end: (idx + c.len_utf8()) as u64,
        })
        .collect()
}

fn detect_line_endings(input: &str) -> Vec<MarkupMatch> {
    let mut covered: Vec<(usize, usize)> = Vec::new();
    let mut matches = Vec::new();

    for re in [
        regex!(r"[।॥\|] *(ਰਹਾਉ|रहाउ|rahaau|rahau|rahao|Pause).*"),
        regex!(r"[।॥\|][੦-੯].*"),
        regex!(r"[।॥\|]\d.*"),
        regex!(r"[।॥\|]"),
    ] {
        for m in re.find_iter(input) {
            let (start, end) = (m.start(), m.end());
            if covered.iter().any(|&(cs, ce)| start < ce && end > cs) {
                continue;
            }
            covered.push((start, end));
            matches.push(MarkupMatch {
                markup: Markup::LineEnding,
                start: start as u64,
                end: end as u64,
            });
        }
    }

    matches
}

fn detect_one(input: &str, markup: &Markup) -> Vec<MarkupMatch> {
    match markup {
        Markup::VishramHeavy => detect_vishram(input, *markup, VISHRAM_HEAVY),
        Markup::VishramMedium => detect_vishram(input, *markup, VISHRAM_MEDIUM),
        Markup::VishramLight => detect_vishram(input, *markup, VISHRAM_LIGHT),
        Markup::LineEnding => detect_line_endings(input),
    }
}

/// Detects the specified markup in the input string, returning match positions.
///
/// Returns full pattern spans — e.g. a line ending like `॥੧॥ ਰਹਾਉ ॥` is one match.
/// Results are sorted by start position.
#[uniffi::export]
pub fn detect(input: String, markup: Vec<Markup>) -> Vec<MarkupMatch> {
    let mut matches: Vec<MarkupMatch> =
        markup.iter().flat_map(|m| detect_one(&input, m)).collect();
    matches.sort_by_key(|m| m.start);
    matches
}
