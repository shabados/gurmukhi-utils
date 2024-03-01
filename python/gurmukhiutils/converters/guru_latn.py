import re

from gurmukhiutils.constants import BASE_LETTERS, BELOW_LETTERS, VIRAMA, YAKASH
from gurmukhiutils.unicode import unicode_normalize

ROMAN_REPLACEMENTS = {
    "ਕ਼": "q",
    "੍ਯ": "y̶",  # half-yayya uses strikethrough U+0336
    "\ufe00ਯ": "y̶",
    "\ufe01ਯ": "ƴ",  # open-top yayya uses latin y with hook U+01B4
    "\ufe00\ufe01ਯ": "ƴ̶",  # open-top half-yayya is a combination of U+01B4 and U+0336
    "ੵ": "ʸ",
    "੍ਹ": "ʰ",
    "੍ਰ": "ʳ",
    "੍ਵ": "ᵛ",
    "੍ਟ": "ᵗ̣",
    "੍ਤ": "ᵗ",
    "੍ਨ": "ⁿ",
    "੍ਚ": "ᶜ",
}

ROMAN_TRANSLATIONS = {
    ord("ਾ"): "ā",
    ord("ੇ"): "e",
    ord("ੈ"): "ē",
    ord("ਿ"): "i",
    ord("ੀ"): "ī",
    ord("ੋ"): "o",
    ord("ੌ"): "ō",
    ord("ੁ"): "u",
    ord("ੂ"): "ū",
    ord("ਅ"): "a",
    ord("\u0a06"): "ā",  # ਆ
    ord("\u0a0f"): "e",  # ਏ
    ord("\u0a10"): "ē",  # ਐ
    ord("\u0a07"): "i",  # ਇ
    ord("\u0a08"): "ī",  # ਈ
    ord("\u0a13"): "o",  # ਓ
    ord("\u0a14"): "ō",  # ਔ
    ord("\u0a09"): "u",  # ਉ
    ord("\u0a0a"): "ū",  # ਊ
    ord("ਸ"): "s",
    ord("ਹ"): "h",
    ord("ਕ"): "k",
    ord("ਖ"): "kh",
    ord("ਗ"): "g",
    ord("ਘ"): "gh",
    ord("ਙ"): "ṅ",
    ord("ਚ"): "c",
    ord("ਛ"): "ch",
    ord("ਜ"): "j",
    ord("ਝ"): "jh",
    ord("ਞ"): "ñ",
    ord("ਟ"): "ṭ",
    ord("ਠ"): "ṭh",
    ord("ਡ"): "ḍ",
    ord("ਢ"): "ḍh",
    ord("ਣ"): "ṇ",
    ord("ਤ"): "t",
    ord("ਥ"): "th",
    ord("ਦ"): "d",
    ord("ਧ"): "dh",
    ord("ਨ"): "n",
    ord("ਪ"): "p",
    ord("ਫ"): "ph",
    ord("ਬ"): "b",
    ord("ਭ"): "bh",
    ord("ਮ"): "m",
    ord("ਯ"): "y",
    ord("ਰ"): "r",
    ord("ਲ"): "l",
    ord("ਵ"): "v",
    ord("ੜ"): "ṛ",
    ord("ਸ਼"): "sh",
    ord("ਖ਼"): "x",
    ord("ਗ਼"): "ġ",
    ord("ਜ਼"): "z",
    ord("ਫ਼"): "f",
    ord("ਲ਼"): "ḷ",
    ord("਼"): "°",
    ord("੦"): "0",
    ord("੧"): "1",
    ord("੨"): "2",
    ord("੩"): "3",
    ord("੪"): "4",
    ord("੫"): "5",
    ord("੬"): "6",
    ord("੭"): "7",
    ord("੮"): "8",
    ord("੯"): "9",
    ord("ੑ"): "̧",  # U+0327 Combining Cedilla
    ord("ੱ"): "˘",
    ord("ੰ"): "⸛",
    ord("ਂ"): "⸞",
    ord("ਃ"): "ẖ",
    ord("।"): "|",
    ord("॥"): "‖",  # U+2016 Double Vertical Line
}


def guru_latn(
    string: str,
) -> str:
    """
    Converts text from gurmukhi script to roman in a lossless fashion.

    Args:
        string: The string to affect.

    Returns:
        A string where the gurmukhi script is converted to roman script.

    Examples:
        >>> guru_latn("੧੨੩")
        '123'

        >>> guru_latn("ਗੁਰੂ")
        'gurū'
    """

    # confirm normalized gurmukhi
    string = unicode_normalize(string)

    # Ik Oankar
    string = string.replace("ੴ", "ਇੱਕ ਓਅੰਕਾਰ")

    # Add inherent vowel / Mukta (ਮੁਕਤਾ = ਅ)

    # Between words
    NON_VOWEL_MODIFIERS = "਼ੑੵ਼"
    PRE_BASE_LIGATURE = "\ufe00\ufe01"
    POST_LETTERS = "ਆਏਐਇਈਓਔਉਊ"
    PRE_POST_MODIFIERS = "ੱਂੰ"

    REGEX_PATTERN = rf"([{BASE_LETTERS}][{NON_VOWEL_MODIFIERS}]?)(?=[{PRE_BASE_LIGATURE}{BASE_LETTERS}{POST_LETTERS}{PRE_POST_MODIFIERS}])"

    string = re.sub(REGEX_PATTERN, r"\1ਅ", string)

    # Single letter
    SINGLE_CHAR_PATTERN = rf"(^|\s|$)([{BASE_LETTERS}][{NON_VOWEL_MODIFIERS}]?)([{VIRAMA}][{BELOW_LETTERS}]|{YAKASH})?(^|\s|$)"

    string = re.sub(SINGLE_CHAR_PATTERN, r"\1\2\3ਅ\4", string)

    for key, value in ROMAN_REPLACEMENTS.items():
        string = string.replace(key, value)

    string = string.translate(ROMAN_TRANSLATIONS)

    return string
