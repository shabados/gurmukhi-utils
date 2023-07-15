import re
import warnings

from gurmukhiutils.unicode import unicode_normalize


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

    ASCII_TRANSLATION = {
        ord("ੳ"): "a",
        ord("ਅ"): "A",
        ord("ੲ"): "e",
        ord("ਸ"): "s",
        ord("ਹ"): "h",
        ord("ਕ"): "k",
        ord("ਖ"): "K",
        ord("ਗ"): "g",
        ord("ਘ"): "G",
        ord("ਙ"): "|",
        ord("ਚ"): "c",
        ord("ਛ"): "C",
        ord("ਜ"): "j",
        ord("ਝ"): "J",
        ord("ਞ"): "\\",
        ord("ਟ"): "t",
        ord("ਠ"): "T",
        ord("ਡ"): "f",
        ord("ਢ"): "F",
        ord("ਣ"): "x",
        ord("ਤ"): "q",
        ord("ਥ"): "Q",
        ord("ਦ"): "d",
        ord("ਧ"): "D",
        ord("ਨ"): "n",
        ord("ਪ"): "p",
        ord("ਫ"): "P",
        ord("ਬ"): "b",
        ord("ਭ"): "B",
        ord("ਮ"): "m",
        ord("ਯ"): "X",
        ord("ਰ"): "r",
        ord("ਲ"): "l",
        ord("ਵ"): "v",
        ord("ੜ"): "V",
        ord("ਸ਼"): "S",
        ord("ਜ਼"): "z",
        ord("ਖ਼"): "^",
        ord("ਫ਼"): "&",
        ord("ਗ਼"): "Z",
        ord("ਲ਼"): "L",
        ord("਼"): "æ",
        ord("ੑ"): "@",
        ord("ੵ"): "\u00b4",  # acute accent (´)
        ord("ਃ"): "Ú",  # capital u-acute letter
        ord("\u0a13"): "E",  # ਓ
        ord("\u0a06"): "Aw",  # ਆ
        ord("\u0a07"): "ei",  # ਇ
        ord("\u0a08"): "eI",  # ਈ
        ord("\u0a09"): "au",  # ਉ
        ord("\u0a0a"): "aU",  # ਊ
        ord("\u0a0f"): "ey",  # ਏ
        ord("\u0a10"): "AY",  # ਐ
        ord("\u0a14"): "AO",  # ਔ
        ord("ਾ"): "w",
        ord("ਿ"): "i",
        ord("ੀ"): "I",
        ord("ੁ"): "u",
        ord("ੂ"): "U",
        ord("ੇ"): "y",
        ord("ੈ"): "Y",
        ord("ੋ"): "o",
        ord("ੌ"): "O",
        ord("ੰ"): "M",
        ord("ਂ"): "N",
        ord("ੱ"): "~",
        ord("।"): "[",
        ord("॥"): "]",
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
        ord("ੴ"): "<>",
        ord("☬"): "Ç",
    }

    ASCII_REPLACEMENTS = {
        "੍ਯ": "Î",  # half-yayya
        "꠳ਯ": "Î",  # sant lipi variation
        "꠴ਯ": "ï",  # open-top yayya
        "꠵ਯ": "î",  # open-top half-yayya
        "੍ਰ": "R",
        "੍ਵ": "Í",  # capital i-acute letter
        "੍ਹ": "H",
        "੍ਚ": "ç",  # c-cedilla letter
        "੍ਟ": "†",  # dagger symbol
        "੍ਤ": "œ",
        "੍ਨ": "\u02dc",  # small tilde (˜)
    }

    string = unicode_normalize(string)

    # Warnings
    ABOVE_VOWEL_MARKS = "".join(
        [
            "ੇ",
            "ੈ",
            "ੋ",
            "ੌ",
        ]
    )
    BELOW_VOWEL_MARKS = "".join(
        [
            "ੁ",
            "ੂ",
        ]
    )
    CHECKS = {
        rf"[ਾ{ABOVE_VOWEL_MARKS}][ਾ{ABOVE_VOWEL_MARKS}]": "Incorrect vowel syntax (above vowel)",
        rf"[ਾ{BELOW_VOWEL_MARKS}][ਾ{BELOW_VOWEL_MARKS}]": "Incorrect vowel syntax (below vowel)",
    }
    for _regex, warning in CHECKS.items():
        if re.search(_regex, string):
            warnings.warn(f"{warning}", UserWarning)

    for key, value in ASCII_REPLACEMENTS.items():
        string = string.replace(key, value)

    string = string.translate(ASCII_TRANSLATION)

    # Re-arrange sihari
    ASCII_BASE_LETTERS = r"AeshkKgG\|cCjJ\\tTfFxqQdDnpPbBmXrlvVSz^&ZLÎïî"
    ASCII_MODIFIERS = "æ@\u00b4ÚwIuUyYoO`MNRÍHç†œ\u02dcü\u00a8®µ\u02c6W~¤Ï"
    _regex = rf"([{ASCII_BASE_LETTERS}][{ASCII_MODIFIERS}]*)i([{ASCII_MODIFIERS}]*)"
    string = re.sub(_regex, r"i\1\2", string)

    # Fix below-base-letter + u vowel positioning
    ASCII_BELOW_BASE_LETTERS = "RÍHç†œ\u02dc\u00b4@"
    BELOW_VOWEL_MAPPINGS = {
        "u": "ü",
        "U": "¨",
    }
    for key, value in BELOW_VOWEL_MAPPINGS.items():
        _regex = rf"([{ASCII_BELOW_BASE_LETTERS}][{ASCII_MODIFIERS}]*){key}([{ASCII_MODIFIERS}]*)"
        string = re.sub(_regex, rf"\1{value}\2", string)

    # Fix center-stroke + tippi positioning
    CENTER_STROKE_LETTERS = "nT"
    _regex = rf"([{CENTER_STROKE_LETTERS}][{ASCII_MODIFIERS}]*)M([{ASCII_MODIFIERS}]*)"
    string = re.sub(_regex, r"\1µ\2", string)

    # Fix positioning of bindi/tippi when it is the only above-base-form
    ASCII_NON_ABOVE_MODIFIERS = "æ@\u00b4ÚwuURÍHç†œ\u02dcü\u00a8®Ï"
    NASALIZATION_MAPPINGS = {
        "N": "ˆ",
        "~": "`",
    }
    for key, value in NASALIZATION_MAPPINGS.items():
        _regex = rf"([{ASCII_BASE_LETTERS}][{ASCII_NON_ABOVE_MODIFIERS}]*){key}([{ASCII_NON_ABOVE_MODIFIERS}]*)"
        string = re.sub(_regex, rf"\1{value}\2", string)

    # Make rendering changes for combos
    ASCII_COMBO_REPLACEMENTS = {
        "I\u0a01": "ˆØI",  # bindi + bihari ligature
        "IM": "µØI",  # tippi + bihari ligature
        "Iµ": "µØI",  # tippi + bihari ligature
        "kR": "k®",  # kakka + pair-rara ligature
        "H¨": "§",
        "wN": "W",  # addhak positioning
        "wˆ": "W",  # addhak positioning
        "nUµ": "ƒ",
    }
    for key, value in ASCII_COMBO_REPLACEMENTS.items():
        string = string.replace(key, value)

    return string
