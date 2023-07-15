import re
from typing import Literal, Match

UNICODE_STANDARDS = Literal["Unicode Consortium", "Sant Lipi"]


def unicode(
    string: str,
    unicode_standard: Literal[UNICODE_STANDARDS] = "Unicode Consortium",
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

    # Font mapping
    # AnmolLipi/GurbaniAkhar & GurbaniLipi by Kulbir S. Thind, MD
    # OpenGurbaniAkhar by Sarabveer Singh (GurbaniNow)
    ASCII_TO_SL_TRANSLATION = {
        ord("a"): "ੳ",
        ord("b"): "ਬ",
        ord("c"): "ਚ",
        ord("d"): "ਦ",
        ord("e"): "ੲ",
        ord("f"): "ਡ",
        ord("g"): "ਗ",
        ord("h"): "ਹ",
        ord("i"): "ਿ",
        ord("j"): "ਜ",
        ord("k"): "ਕ",
        ord("l"): "ਲ",
        ord("m"): "ਮ",
        ord("n"): "ਨ",
        ord("o"): "ੋ",
        ord("p"): "ਪ",
        ord("q"): "ਤ",
        ord("r"): "ਰ",
        ord("s"): "ਸ",
        ord("t"): "ਟ",
        ord("u"): "ੁ",
        ord("v"): "ਵ",
        ord("w"): "ਾ",
        ord("x"): "ਣ",
        ord("y"): "ੇ",
        ord("z"): "ਜ਼",
        ord("A"): "ਅ",
        ord("B"): "ਭ",
        ord("C"): "ਛ",
        ord("D"): "ਧ",
        ord("E"): "ਓ",
        ord("F"): "ਢ",
        ord("G"): "ਘ",
        ord("H"): "੍ਹ",
        ord("I"): "ੀ",
        ord("J"): "ਝ",
        ord("K"): "ਖ",
        ord("L"): "ਲ਼",
        ord("M"): "ੰ",
        ord("N"): "ਂ",
        ord("O"): "ੌ",
        ord("P"): "ਫ",
        ord("Q"): "ਥ",
        ord("R"): "੍ਰ",
        ord("S"): "ਸ਼",
        ord("T"): "ਠ",
        ord("U"): "ੂ",
        ord("V"): "ੜ",
        ord("W"): "ਾਂ",
        ord("X"): "ਯ",
        ord("Y"): "ੈ",
        ord("Z"): "ਗ਼",
        ord("0"): "੦",
        ord("1"): "੧",
        ord("2"): "੨",
        ord("3"): "੩",
        ord("4"): "੪",
        ord("5"): "੫",
        ord("6"): "੬",
        ord("7"): "੭",
        ord("8"): "੮",
        ord("9"): "੯",
        ord("["): "।",
        ord("]"): "॥",
        ord("\\"): "ਞ",
        ord("|"): "ਙ",
        ord("`"): "ੱ",
        ord("~"): "ੱ",
        ord("@"): "ੑ",
        ord("^"): "ਖ਼",
        ord("&"): "ਫ਼",
        ord("†"): "੍ਟ",  # dagger symbol
        ord("ü"): "ੁ",  # u-diaeresis letter
        ord("®"): "੍ਰ",  # registered symbol
        ord("\u00b4"): "ੵ",  # acute accent (´)
        ord("\u00a8"): "ੂ",  # diaeresis accent (¨)
        ord("µ"): "ੰ",  # mu letter
        ord("æ"): "਼",
        ord("\u00a1"): "ੴ",  # inverted exclamation (¡)
        ord("ƒ"): "ਨੂੰ",  # florin symbol
        ord("œ"): "੍ਤ",
        ord("Í"): "੍ਵ",  # capital i-acute letter
        ord("Î"): "੍ਯ",  # capital i-circumflex letter
        ord("Ï"): "ੵ",  # capital i-diaeresis letter
        ord("Ò"): "॥",  # capital o-grave letter
        ord("Ú"): "ਃ",  # capital u-acute letter
        ord("\u02c6"): "ਂ",  # circumflex accent (ˆ)
        ord("\u02dc"): "੍ਨ",  # small tilde (˜)
        #
        #
        # AnmolLipi/GurbaniAkhar mappings:
        ord("§"): "੍ਹੂ",  # section symbol
        ord("¤"): "ੱ",  # currency symbol
        #
        #
        # GurbaniLipi mappings:
        ord("ç"): "੍ਚ",  # c-cedilla letter
        #
        #
        # AnmolLipi/GurbaniAkhar overriding GurbaniLipi mapping:
        ord("Ç"): "☬",  # khanda instead of california state symbol
        #
        #
        # Miscellaneous:
        ord("\u201a"): "❁",  # single low-9 quotation (‚) mark
        #
        #
        # Nullify
        # Either the 2nd portion of ੴ or a symbol of USA:
        ord("Æ"): None,
        ord("Ø"): None,  # This is a topline / shirorekha (शिरोरेखा) extender
        ord("ÿ"): None,  # This is the author Kulbir S Thind's stamp
        ord("Œ"): None,  # Box drawing left flower
        ord("‰"): None,  # Box drawing right flower
        ord("Ó"): None,  # Box drawing top flower
        ord("Ô"): None,  # Box drawing bottom flower
        #
        #
        # Open Gurbani Akhar
        # translate capital i-circumflex letter to indic one-sixteenth + yayya:
        ord("Î"): "꠳ਯ",  # half-yayya
        # translate i-diaeresis letter to indic one-eight + yayya:
        ord("ï"): "꠴ਯ",  # open-top yayya
        # translate i-circumflex letter to indic three-sixtenths + yayya:
        ord("î"): "꠵ਯ",  # open-top half-yayya
    }

    # Ordered as such to supporth both font input methods
    ASCII_TO_SL_REPLACEMENTS = {
        "ˆØI": "ੀਁ",  # Handle pre-bihari-bindi with unused adakbindi
        #
        "<>": "ੴ",  # AnmolLipi/GurbaniAkhar variant
        "<": "ੴ",  # GurbaniLipi variant
        ">": "☬",  # GurbaniLipi variant
        #
        "Åå": "ੴ",  # AnmolLipi/GurbaniAkhar variant
        "Å": "ੴ",  # GurbaniLipi variant
        "å": "ੴ",  # GurbaniLipi variant
    }

    UNICODE_TO_SL_REPLACEMENTS = {
        "੍ਯ": "꠳ਯ",  # replace unicode half-yayya with Sant Lipi ligature (north indic one-sixteenth fraction + yayya)
    }

    # Sant Lipi to Unicode Consortium
    # Avoiding a translation, in case these north indic fraction chars are used for what they're actually meant for
    SL_TO_UNICODE_REPLACEMENTS = {
        "꠳ਯ": "੍ਯ",
        "꠴ਯ": "ਯ",
        "꠵ਯ": "੍ਯ",
        "ਁ": "ਂ",  # pre-bihari-bindi
    }

    # Move ASCII sihari before mapping to unicode
    ASCII_BASE_LETTERS = "\\a-zA-Z|^&Îîï"
    ASCII_SIHARI_PATTERN = rf"(i)([{ASCII_BASE_LETTERS}])"
    string = re.sub(ASCII_SIHARI_PATTERN, r"\2\1", string)

    # Map any ASCII / Unicode Gurmukhi to Sant Lipi format
    for key, value in ASCII_TO_SL_REPLACEMENTS.items():
        string = string.replace(key, value)

    for key, value in UNICODE_TO_SL_REPLACEMENTS.items():
        string = string.replace(key, value)

    string = string.translate(ASCII_TO_SL_TRANSLATION)

    # Normalize Unicode
    string = unicode_normalize(string)

    if unicode_standard == "Unicode Consortium":
        for key, value in SL_TO_UNICODE_REPLACEMENTS.items():
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
        >>> sort_diacritics("\u0a41\u0a4b") == "\u0a4b\u0a41"  # ੁੋ vs  ੋੁ
        True
    """

    """
    Nukta is essential to form a new base letter and must be ordered first.

    Udaat, Yakash, and subjoined letters should follow.

    Subjoined letters are constructed (they are not single char), so they cannot be used in the same regex group pattern. See further below for subjoined letters.
    """

    BASE_LETTER_MODIFIERS = [
        "਼",
        "ੑ",
        "ੵ",
    ]

    """
    More generally, when a consonant or independent vowel is modified by multiple vowel signs, the sequence of the vowel signs in the underlying representation of the text should be: left, top, bottom, right.

    p. 491 of The Unicode® Standard Version 14.0 – Core Specification

    https://www.unicode.org/versions/Unicode14.0.0/ch12.pdf
    """

    VOWEL_ORDER = [
        "ਿ",
        "ੇ",
        "ੈ",
        "ੋ",
        "ੌ",
        "ੁ",
        "ੂ",
        "ਾ",
        "ੀ",
    ]

    """
    The remaining diacritics are to be sorted at the end according to the following order
    """

    REMAINING_MODIFIER_ORDER = [
        "ਁ",
        "ੱ",
        "ਂ",
        "ੰ",
        "ਃ",
    ]

    """
    If subjoined were single code points, we could have done a simple regex match:
    ([  list_of_diacritics  ]+)

    Since otherwise, surrounds each lookup of a subjoined letter with lookups of the rest of the diacritics (which are single char).

    The patterns for the single-chars and the subjoined letters:
    """

    GENERATED_MARKS = "".join(
        BASE_LETTER_MODIFIERS + VOWEL_ORDER + REMAINING_MODIFIER_ORDER
    )
    MARK_PATTERN = f"([{GENERATED_MARKS}]*)"

    VIRAMA = "੍"
    BELOW_BASE_LETTERS = "ਹਰਵਟਤਨਚ"
    BELOW_BASE_PATTERN = f"({VIRAMA}[{BELOW_BASE_LETTERS}])?"

    """
    The following regex will capture all sequential diacritics containing at most one subjoined letter.
        >>> print(REGEX_MATCH_PATTERN)
        '([਼ੵਿੇੈੋੌੁੂਾੀਁੱਂੰਃ]*)(੍[ਹਰਵਟਤਨਚ])?([਼ੵਿੇੈੋੌੁੂਾੀਁੱਂੰਃ]*)'
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
        + [BELOW_BASE_LETTERS]
        + VOWEL_ORDER
        + REMAINING_MODIFIER_ORDER
    )

    def regex_sort_func(match: Match[str]) -> str:
        """
        This re-arranges characters in "match" according to a custom sort order "GENERATED_MATCH_ORDER"
        """

        if len(_match := match.group()) > 1:
            _match = sorted(_match, key=lambda e: GENERATED_MATCH_ORDER.index(e))  # type: ignore
            _match = "".join(_match)

        return _match

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

    UNICODE_SANITIZATION_MAP = {
        "\u0a73\u0a4b": "\u0a13",  # ਓ
        "\u0a05\u0a3e": "\u0a06",  # ਅ + ਾ = ਆ
        "\u0a72\u0a3f": "\u0a07",  # ਇ
        "\u0a72\u0a40": "\u0a08",  # ਈ
        "\u0a73\u0a41": "\u0a09",  # ਉ
        "\u0a73\u0a42": "\u0a0a",  # ਊ
        "\u0a72\u0a47": "\u0a0f",  # ਏ
        "\u0a05\u0a48": "\u0a10",  # ਐ
        "\u0a05\u0a4c": "\u0a14",  # ਔ
        "\u0a32\u0a3c": "\u0a33",  # ਲ਼
        "\u0a38\u0a3c": "\u0a36",  # ਸ਼
        "\u0a16\u0a3c": "\u0a59",  # ਖ਼
        "\u0a17\u0a3c": "\u0a5a",  # ਗ਼
        "\u0a1c\u0a3c": "\u0a5b",  # ਜ਼
        "\u0a2b\u0a3c": "\u0a5e",  # ਫ਼
        "\u0a71\u0a02": "\u0a01",  # ਁ adak bindi (quite literally never used today or in the Shabad OS Database, only included for parity with the Unicode block)
    }

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
