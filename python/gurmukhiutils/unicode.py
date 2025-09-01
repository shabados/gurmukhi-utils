import re
from typing import Literal, Match

from gurmukhiutils.constants.unicode import (
    UNICODE_TO_SANT_LIPI_REPLACEMENTS,
    SANT_LIPI_TO_UNICODE_REPLACEMENTS,
    ASCII_TO_SANT_LIPI_REPLACEMENTS,
    ASCII_TO_SANT_LIPI_TRANSLATION_MAP,
    ASCII_BASE_LETTERS,
    BASE_LETTER_MODIFIERS,
    ORDERED_VOWELS,
    ORDERED_MODIFIERS,
    ZERO_WIDTH_CHARS,
    VIRAMA,
    BELOW_LETTERS,
    VARIATION_SELECTORS,
    UNICODE_SANITIZATION_MAP,
    BINDI_BEFORE_BIHARI,
)

ASCII_TO_SANT_LIPI_TRANSLATION_MAP_ORD = {
    ord(key): value for key, value in ASCII_TO_SANT_LIPI_TRANSLATION_MAP.items()
}
VARIATION_SELECTORS_STR = "".join(VARIATION_SELECTORS)

UNICODE_STANDARDS = Literal["Unicode Consortium", "Sant Lipi"]


def unicode(
    string: str,
    unicode_standard: UNICODE_STANDARDS = "Unicode Consortium",
) -> str:
    """
    Converts any ascii gurmukhi characters and sanitizes to unicode gurmukhi.

    Note:
        Converting yayya (ਯ) variants with an open top using the Unicode Consortium standard is considered destructive. This function will substitute the original with it's shirorekha/top-line equivalent.

        Many fonts and text shaping engines fail to render half-yayya (੍ਯ) correctly. Regardless of the standard used, it is recommended to use the Sant Lipi font mentioned below.

    Args:
        string: The string to affect.

        unicode_standard: The mapping system to use. The default is unicode compliant and can render 99% of the Shabad OS Database. The other option "Sant Lipi" is intended for a custom unicode font bearing the same name (see: https://github.com/shabados/SantLipi). Defaults to "Unicode Consortium".

    Returns:
        A string whose Gurmukhi is normalized to a Unicode standard.

    Examples:
        >>> unicode("123")
        '੧੨੩'

        >>> unicode("<> > <")
        'ੴ ☬ ੴ'

        >>> unicode("gurU")
        'ਗੁਰੂ'
    """

    # Convert any existing Unicode Gurmukhi to Sant Lipi standard
    for key, value in UNICODE_TO_SANT_LIPI_REPLACEMENTS.items():
        string = string.replace(key, value)

    # Move ASCII sihari before mapping
    ASCII_SIHARI_PATTERN = rf"(i)([{ASCII_BASE_LETTERS}])"
    string = re.sub(ASCII_SIHARI_PATTERN, r"\2\1", string)

    # Map any ASCII to Sant Lipi format
    for key, value in ASCII_TO_SANT_LIPI_REPLACEMENTS.items():
        string = string.replace(key, value)

    string = string.translate(ASCII_TO_SANT_LIPI_TRANSLATION_MAP_ORD)

    # Normalize Unicode
    string = unicode_normalize(string)

    if unicode_standard == "Unicode Consortium":
        for key, value in SANT_LIPI_TO_UNICODE_REPLACEMENTS.items():
            string = string.replace(key, value)

    return string


def unicode_normalize(string: str) -> str:
    """
    Normalizes Gurmukhi according to Unicode Standards.

    Arg:
        string: The string to affect.

    Returns:
        Returns a string containing normalized gurmukhi.

    Example:
        >>> unicode_normalize("Hello ਜੀ")
        'Hello ਜੀ'
    """

    string = sort_diacritics(string)

    string = sort_variation_selectors(string)

    string = sanitize_unicode(string)

    return string


def sort_diacritics(string: str) -> str:
    """
    Orders the gurmukhi diacritics in a string according to Unicode standards.

    Note:
        Not intended for base letters with multiple subjoined letters.

    Arg:
        string: The string to affect.

    Returns:
        The same string with gurmukhi diacritics arranged in a sorted manner.

    Example:
        >>> sort_diacritics("\u0a41\u0a4b") == "\u0a4b\u0a41"  # order of ੋ and  ੁ
        True
    """

    """
    If subjoined were single code points, we could have done a simple regex match:
    ([  list_of_diacritics  ]+)

    Since otherwise, surrounds each lookup of a subjoined letter with lookups of the rest of the diacritics (which are single char).

    The patterns for the single-chars and the subjoined letters:
    """

    GENERATED_MARKS = "".join(
        BASE_LETTER_MODIFIERS + ORDERED_VOWELS + ORDERED_MODIFIERS + ZERO_WIDTH_CHARS
    )
    MARK_PATTERN = f"([{GENERATED_MARKS}]*)?"

    BELOW_BASE_PATTERN = f"({VIRAMA}[{BELOW_LETTERS}])?"

    """
    The following regex will capture all sequential diacritics containing at most one subjoined letter.
        >>> print(REGEX_MATCH_PATTERN)
        '([ੑੵ਼]*)?(੍[ਹਰਵਟਤਨਚ])?([਼ੵਿੇੈੋੌੁੂਾੀਁੱਂੰਃ]*)?'
    """

    REGEX_MATCH_PATTERN = f"{MARK_PATTERN}{BELOW_BASE_PATTERN}{MARK_PATTERN}"

    """
    This generates a string of the order in which all diacritics should appear.
        >>> print(GENERATED_MATCH_ORDER)
        '਼ਹਰਵਟਤਨਚਿੇੈੋੌੁੂਾੀਁੱਂੰਃ'
   """

    GENERATED_MATCH_ORDER = "".join(
        BASE_LETTER_MODIFIERS
        + [VIRAMA]
        + [BELOW_LETTERS]
        + ORDERED_VOWELS
        + ORDERED_MODIFIERS
    )

    def regex_sort_func(match: Match[str]) -> str:
        """
        This re-arranges characters in "match" according to a custom sort order "GENERATED_MATCH_ORDER"
        """

        if len(_match := match.group()) > 1:
            bindi_before_bihari = False
            # respect ordering of ਂ (bindi) before/after ੀ (bihari)
            if BINDI_BEFORE_BIHARI in _match:
                _match = _match.strip(BINDI_BEFORE_BIHARI)
                bindi_before_bihari = True
            _match = sorted(_match, key=lambda e: GENERATED_MATCH_ORDER.index(e))  # type: ignore
            _match = "".join(_match)
            if bindi_before_bihari:
                _match = _match + BINDI_BEFORE_BIHARI

        return _match

    string = re.sub(
        REGEX_MATCH_PATTERN,
        regex_sort_func,
        string,
    )

    return string


def sort_variation_selectors(string: str) -> str:
    """
    Orders the variation selectors preceding gurmukhi characters.

    Arg:
        string: The string to affect.

    Returns:
        The same string with VS arranged in ascending order.

    Example:
        >>> sort_variation_selectors("\ufe01\ufe00ਯ") == "\ufe00\ufe01ਯ"
        True
    """

    # The following regex will capture all sequential VS preceding any code assignments in the gurmukhi unicode block.
    REGEX_MATCH_PATTERN = f"([{VARIATION_SELECTORS_STR}]*)[\u0a00-\u0a7f]"

    GENERATED_MATCH_ORDER = VARIATION_SELECTORS_STR

    def regex_sort_func(match: Match[str]) -> str:
        """
        This re-arranges characters in "match" according to a custom sort order "GENERATED_MATCH_ORDER"
        """
        _match = match.group(0)
        vs_string = match.group(1)
        return _match.replace(
            vs_string,
            "".join(sorted(vs_string, key=lambda e: GENERATED_MATCH_ORDER.index(e))),
        )

    string = re.sub(
        REGEX_MATCH_PATTERN,
        regex_sort_func,
        string,
    )

    return string


def sanitize_unicode(string: str) -> str:
    """
    Use single char representations of constructed characters.
    """
    for key, value in UNICODE_SANITIZATION_MAP.items():
        string = string.replace(key, value)

    return string


def decode_unicode(string: str) -> list[dict[str, str]]:
    """
    Takes a string and returns a list of keys and values of each character and its corresponding code point.

    Arg:
        string: The string to affect.

    Returns:
        A list of each character and its corresponding code point.

    Example:
        >>> decode_unicode("To ਜੀ")
        [{'T': '0054'}, {'o': '006f'}, {' ': '0020'}, {'ਜ': '0a1c'}, {'ੀ': '0a40'}]
    """

    return [{item: format(ord(item), "04x")} for item in string]


def encode_unicode(strings: list[str]) -> list[str]:
    """
    Takes a string and returns its corresponding unicode character.

    Arg:
        strings: The list containing any strings to encode.

    Returns:
        A list of any corresponding unicode characters.

    Examples:
        >>> encode_unicode(["0054"])
        'T'

        >>> encode_unicode(["0a1c", "0A40"])
        '['ਜ', 'ੀ']'
    """

    return [chr(int(string, 16)) for string in strings]
