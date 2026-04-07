import re

from gurmukhiutils.constants.vishraams import (
    VISHRAM_LIGHT,
    VISHRAM_MEDIUM,
    VISHRAM_HEAVY,
)
from gurmukhiutils.constants.lines import LINE_ENDINGS, RAHAO, GURMUKHI_NUMBER_RANGE

VISHRAMS = [VISHRAM_LIGHT, VISHRAM_MEDIUM, VISHRAM_HEAVY]
LINE_ENDINGS_STR = "".join(LINE_ENDINGS)


def remove(string: str, removals: list[str]) -> str:
    """
    Removes substrings from string.

    Args:
        string: The string to affect.
        removals: Any substring to remove.

    Returns:
        The string without any substrings.

    Examples:
        >>> remove("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ", [".", ","])
        'ਸਬਦ ਸਬਦ ਸਬਦ; ਸਬਦ'

        >>> remove("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ", gurmukhiutils.constants.VISHRAMS)
        'ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ'
    """

    for removal in removals:
        string = string.replace(removal, "")

    return string


def remove_regex(string: str, patterns: list[str]) -> str:
    """
    Removes regex patterns from string.

    Note:
        Also removes duplicate space characters from string.

    Args:
        string: The string to affect.
        patterns: Any pattern to remove.

    Returns:
        The string without any matching patterns, duplicate spaces, or leading/trailing spaces.

    Example:
        >>> remove_regex("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ", [".+\\s"])
        'ਸਬਦ'
    """

    for pattern in patterns:
        string = re.sub(pattern, "", string)

    while "  " in string:
        string = string.replace("  ", " ")

    return string.strip()


def remove_line_endings(string: str) -> str:
    """
    Attempts to remove line endings as best as possible.

    Arg:
        string: The unicode gurmukhi, hindi, or english translation/transliteration to affect.

    Returns:
        The string without line endings.

    Example:
        >>> remove_line_endings("ਸਬਦ ॥ ਸਬਦ ॥੧॥ ਰਹਾਉ ॥")
        'ਸਬਦ ਸਬਦ'
    """

    line_ending_patterns = [
        rf"[{LINE_ENDINGS_STR}] *({'|'.join(RAHAO)}).*",
        rf"[{LINE_ENDINGS_STR}][{GURMUKHI_NUMBER_RANGE}].*",
        rf"[{LINE_ENDINGS_STR}]\d.*",
        rf"[{LINE_ENDINGS_STR}]",
    ]
    return remove_regex(string, line_ending_patterns)


def remove_vishrams(string: str) -> str:
    """
    Removes all vishram characters.

    Arg:
        string: The string to affect.

    Returns:
        The string without vishrams.

    Example:
        >>> remove_vishrams("ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥")
        'ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥'
    """

    return remove(string, VISHRAMS)
