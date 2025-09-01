import re

from gurmukhiutils.unicode import unicode_normalize
from gurmukhiutils.constants.ascii import (
    TRANSLATION_MAP,
    ABOVE_VOWEL_MARKS,
    BELOW_VOWEL_MARKS,
    REPLACEMENTS,
    BASE_LETTERS,
    MODIFIERS,
    BELOW_BASE_LETTERS,
    BELOW_VOWEL_MAPPINGS,
    CENTER_STROKE_LETTERS,
    NASALIZATION_MAPPINGS,
    NON_ABOVE_MODIFIERS,
    COMBO_REPLACEMENTS,
)

TRANSLATION_MAP_ORD = {ord(key): value for key, value in TRANSLATION_MAP.items()}
ABOVE_VOWEL_MARKS_STR = "".join(ABOVE_VOWEL_MARKS)
BELOW_VOWEL_MARKS_STR = "".join(BELOW_VOWEL_MARKS)


def ascii(
    string: str,
) -> str:
    """
    Converts Gurmukhi to ASCII for Open Gurbani Akhar font.

    Note:
        Open Gurbani Akhar is the only font that can fully render the Shabad OS Database. Historically, every other ASCII font has been insufficiently capable.

    Args:
        string: The string to affect.

    Returns:
        A string whose Gurmukhi is converted to an ascii font format.

    Examples:
        >>> ascii("੧੨੩")
        '123'

        >>> ascii("ਗੁਰੂ")
        'gurU'
    """

    string = unicode_normalize(string)

    CHECKS = {
        rf"[ਾ{ABOVE_VOWEL_MARKS}][ਾ{ABOVE_VOWEL_MARKS}]": "Incorrect vowel syntax (above vowel)",
        rf"[ਾ{BELOW_VOWEL_MARKS}][ਾ{BELOW_VOWEL_MARKS}]": "Incorrect vowel syntax (below vowel)",
    }
    for _regex, warning in CHECKS.items():
        if re.search(_regex, string):
            raise UserWarning(f"{warning}")

    for key, value in REPLACEMENTS.items():
        string = string.replace(key, value)

    string = string.translate(TRANSLATION_MAP_ORD)

    # Re-arrange sihari
    _regex = rf"([{BASE_LETTERS}][{MODIFIERS}]*)i([{MODIFIERS}]*)"
    string = re.sub(_regex, r"i\1\2", string)

    # Fix below-base-letter + u vowel positioning
    for key, value in BELOW_VOWEL_MAPPINGS.items():
        _regex = rf"([{BELOW_BASE_LETTERS}][{MODIFIERS}]*){key}([{MODIFIERS}]*)"
        string = re.sub(_regex, rf"\1{value}\2", string)

    # Fix center-stroke + tippi positioning
    _regex = rf"([{CENTER_STROKE_LETTERS}][{MODIFIERS}]*)M([{MODIFIERS}]*)"
    string = re.sub(_regex, r"\1µ\2", string)

    # Fix positioning of bindi/tippi when it is the only above-base-form
    for key, value in NASALIZATION_MAPPINGS.items():
        _regex = rf"([{BASE_LETTERS}][{NON_ABOVE_MODIFIERS}]*){key}([{NON_ABOVE_MODIFIERS}]*)"
        string = re.sub(_regex, rf"\1{value}\2", string)

    for key, value in COMBO_REPLACEMENTS.items():
        string = string.replace(key, value)

    return string
