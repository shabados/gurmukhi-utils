use once_cell::sync::OnceCell;
use std::collections::HashMap;

#[macro_export]
macro_rules! pipe {
    ($input:expr, $func:expr) => {
        $func($input)
    };
    ($input:expr, $func:expr, $($rest:expr),+) => {
        crate::helpers::pipe!($func($input), $($rest),+)
    };
}
pub use pipe;

macro_rules! translation_map {
  ($($from:literal => $to:literal),* $(,)?) => {
      |c| match c {
          $($from => $to.to_string(),)*
          _ => c.to_string(),
      }
  };
}

pub(crate) use translation_map;

pub(crate) fn translate_str<F>(map: F) -> impl Fn(String) -> String
where
    F: Fn(char) -> String + Copy,
{
    move |input| input.chars().map(map).collect()
}

pub(crate) fn replace_str(replacements: &[(&str, &str)]) -> impl Fn(String) -> String {
    move |input| {
        replacements
            .iter()
            .fold(input.to_string(), |acc, (search, replacement)| {
                acc.replace(search, replacement)
            })
    }
}

macro_rules! regex {
    ($re:literal $(,)?) => {{
        static RE: once_cell::sync::OnceCell<regex::Regex> = once_cell::sync::OnceCell::new();
        RE.get_or_init(|| regex::Regex::new($re).unwrap())
    }};
}

pub(crate) use regex;

macro_rules! replace_regex {
    ($pattern:literal, $replacement:literal) => {
        move |input: String| {
            let re = regex!($pattern);
            re.replace_all(&input, $replacement).to_string()
        }
    };
    ($pattern:literal, |$caps:ident: &regex::Captures| $body:expr) => {
        move |input: String| {
            let re = regex!($pattern);
            re.replace_all(&input, |$caps: &regex::Captures| $body)
                .to_string()
        }
    };
    ($pattern:expr, $replacement:literal) => {
        move |input: String| {
            let re = regex::Regex::new($pattern).unwrap();
            re.replace_all(&input, $replacement).to_string()
        }
    };
    ($pattern:expr, |$caps:ident: &regex::Captures| $body:expr) => {
        move |input: String| {
            let re = regex::Regex::new($pattern).unwrap();
            re.replace_all(&input, |$caps: &regex::Captures| $body)
                .to_string()
        }
    };
}

pub(crate) use replace_regex;

pub(crate) fn build_order_map(string: &str) -> &'static HashMap<char, usize> {
    static ORDER_MAP: once_cell::sync::OnceCell<HashMap<char, usize>> = OnceCell::new();

    ORDER_MAP.get_or_init(|| {
        string
            .chars()
            .enumerate()
            .map(|(idx, ch)| (ch, idx))
            .collect()
    })
}

pub(crate) fn sort_by_order_map(string: &str, map: &'static HashMap<char, usize>) -> String {
    let mut chars: Vec<char> = string.chars().collect();

    chars.sort_by_key(|c| map.get(c).copied().unwrap_or(usize::MAX));

    chars.into_iter().collect()
}
