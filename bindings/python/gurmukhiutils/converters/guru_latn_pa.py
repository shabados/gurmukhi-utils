import re

from gurmukhiutils.constants.unicode import (
    BASE_LETTERS,
    BELOW_LETTERS,
    VIRAMA,
    VOWEL_LETTERS,
    YAKASH,
    ORDERED_VOWELS,
)
from gurmukhiutils.constants.converters_guru_latn import (
    PA_TRANSLIT_ALTERATIONS,
    PA_ROMAN_LIT2SCRIPT_TRANSLATIONS,
    PA_ROMAN_LIT2SCRIPT_REPLACEMENTS,
    HORA_ONKAR,
    DULAVAN_ONKAR,
)
from gurmukhiutils.converters.guru_latn import guru_latn
from gurmukhiutils.unicode import unicode_normalize

ORDERED_VOWELS_STR = "".join(ORDERED_VOWELS)
PA_TRANSLIT_ALTERATIONS_ORD = {ord(k): v for k, v in PA_TRANSLIT_ALTERATIONS.items()}
PA_ROMAN_LIT2SCRIPT_TRANSLATIONS_ORD = {
    ord(k): v for k, v in PA_ROMAN_LIT2SCRIPT_TRANSLATIONS.items()
}


def guru_latn_pa(
    string: str,
) -> str:
    """
    Converts text from gurmukhi script to roman in a lossless fashion using modern punjabi rules.

    Args:
        string: The string to affect.

    Returns:
        A string where the gurmukhi script is converted to roman script.

    Examples:
        >>> guru_latn_pa("੧੨੩")
        '123'

        >>> guru_latn_pa("ਗੁਰੂ")
        'gurū'
    """

    # confirm normalized gurmukhi
    string = unicode_normalize(string)

    # handle ਹ rules

    # if vowel-less haha is preceded by sihari or onkar (ਿ or ੁ), represent lavan and hora respectively (ੇ and ੋ)
    # if vowel-less base letter is followed by a haha with sihari or onkar, yield dulavan and kanora respectively (ੈ and ੌ)

    # Letter + i + h = letter + e + h
    string = re.sub(
        rf"([{BASE_LETTERS}])(ਿ)([ੰਂ]?)(ਹ)(?![{VIRAMA}{YAKASH}{ORDERED_VOWELS_STR}])",
        r"\1ੇ\3\4‧",
        string,
    )
    string = re.sub(
        rf"(ਇ)([ੰਂ]?)(ਹ)(?![{VIRAMA}{YAKASH}{ORDERED_VOWELS_STR}])",
        r"ਏ\2\3‧",
        string,
    )

    # Letter + u + h = letter + o + h
    string = re.sub(
        rf"([{BASE_LETTERS}])(ੁ)([ੰਂ]?)(ਹ)(?![{VIRAMA}{YAKASH}{ORDERED_VOWELS_STR}])",
        r"\1ੋ\3\4‧",
        string,
    )
    string = re.sub(
        rf"(ਉ)([ੰਂ]?)(ਹ)(?![{VIRAMA}{YAKASH}{ORDERED_VOWELS_STR}])",
        r"ਓ\2\3‧",
        string,
    )

    # Letter + h + i = letter + ee + h
    string = re.sub(
        rf"([ਅ{BASE_LETTERS}])([ੰਂ]?)(ਹਿ)",
        r"\1ੈ\2ਹ‧",
        string,
    )

    # Letter + h + u = letter + oo + h
    string = re.sub(
        rf"([ਅ{BASE_LETTERS}])([ੰਂ]?)(ਹੁ)",
        r"\1ੌ\2ਹ‧",
        string,
    )

    # Letter + h = letter + ee + h
    string = re.sub(
        rf"([ਅ{BASE_LETTERS}])([ੰਂ]?)(ਹ)(?![{VIRAMA}{YAKASH}{ORDERED_VOWELS_STR}])",
        r"\1ੈ\2\3",
        string,
    )

    # remove grammatical vowels before converting from gurmukhi

    # remove ਿ and ੁ from end of words
    # ignore single letter words
    # type ignore comment is to stop mypy complaining about List[Any], see https://github.com/python/typeshed/issues/263
    if len(re.findall(rf"[{VOWEL_LETTERS}{BASE_LETTERS}]", string)) > 1:  # type: ignore
        string = re.sub(r"(ਿ?)(ੇ?ੈ?ੋ?ੌ?)(ੁ?)(ੂ?ਾ?ੀ?)(ਁ?ੱ?ਂ?ੰ?ਃ?)(‧|\s|$)", r"\2\4\5\6", string)

    # shorten ੋੁ from start of words
    # note: cannot use []{2} for whatever reason
    string = re.sub(
        rf"(^|\s|‧)([{BASE_LETTERS}])({VIRAMA}[{BELOW_LETTERS}]|{YAKASH})?[{HORA_ONKAR}][{HORA_ONKAR}]",
        r"\1\2\3ੋ",
        string,
    )
    string = re.sub(
        rf"(^|\s|‧)([{BASE_LETTERS}])({VIRAMA}[{BELOW_LETTERS}]|{YAKASH})?[{DULAVAN_ONKAR}][{DULAVAN_ONKAR}]",
        r"\1\2\3ੈ",
        string,
    )

    # do alternate translit before function translit
    string = string.translate(PA_TRANSLIT_ALTERATIONS_ORD)
    string = guru_latn(string)

    # separate parts and treat individually
    strings = string.split("‧")

    enumerate = ""

    for string in strings:
        string = string.translate(PA_ROMAN_LIT2SCRIPT_TRANSLATIONS_ORD)

        # add mukta after ending half-y
        string = re.sub(r"a([yƴ]̶)(\s|$)", r"\1a\2", string)

        # nullify mukta + half-y
        string = re.sub(r"a([yƴ]̶)", r"\1", string)

        for key, value in PA_ROMAN_LIT2SCRIPT_REPLACEMENTS.items():
            string = string.replace(key, value)

        # gemminate/double char following adhak
        string = re.sub(r"˘([a-zġṅñṇḍṭṛḷḳ])", r"\1\1", string)

        enumerate += string

    return enumerate
