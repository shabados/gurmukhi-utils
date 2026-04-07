import re

from gurmukhiutils.constants.unicode import (
    BASE_LETTERS,
    BELOW_LETTERS,
    VIRAMA,
    YAKASH,
    BASE_LETTER_MODIFIERS,
)
from gurmukhiutils.constants.converters_guru_latn import (
    ROMAN_TRANSLATION_MAP,
    ROMAN_REPLACEMENTS,
    PHRASE_REPLACEMENTS,
    PRE_BASE_LIGATURE,
    POST_LETTERS,
    PRE_POST_MODIFIERS,
)
from gurmukhiutils.unicode import unicode_normalize

ROMAN_TRANSLATIONS_MAP_ORD = {ord(k): v for k, v in ROMAN_TRANSLATION_MAP.items()}
BASE_LETTER_MODIFIERS_STR = "".join(BASE_LETTER_MODIFIERS)


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

    for key, value in PHRASE_REPLACEMENTS.items():
        string = string.replace(key, value)

    # Add inherent vowel / Mukta (ਮੁਕਤਾ = ਅ)
    # Between words
    REGEX_PATTERN = rf"([{BASE_LETTERS}][{BASE_LETTER_MODIFIERS_STR}]?)(?=[{PRE_BASE_LIGATURE}{BASE_LETTERS}{POST_LETTERS}{PRE_POST_MODIFIERS}])"

    string = re.sub(REGEX_PATTERN, r"\1ਅ", string)

    # Single letter
    SINGLE_CHAR_PATTERN = rf"(^|\s|$)([{BASE_LETTERS}][{BASE_LETTER_MODIFIERS_STR}]?)([{VIRAMA}][{BELOW_LETTERS}]|{YAKASH})?(^|\s|$)"

    string = re.sub(SINGLE_CHAR_PATTERN, r"\1\2\3ਅ\4", string)

    for key, value in ROMAN_REPLACEMENTS.items():
        string = string.replace(key, value)

    string = string.translate(ROMAN_TRANSLATIONS_MAP_ORD)

    return string
