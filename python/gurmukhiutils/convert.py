from typing import Literal

from gurmukhiutils.converters.guru_latn import guru_latn
from gurmukhiutils.converters.guru_latn_pa import guru_latn_pa
from gurmukhiutils.unicode import unicode_normalize

TRANSLATORS = Literal["guru_latn", "guru_latn_pa"]


def convert(
    string: str,
    scriptConverter: Literal[TRANSLATORS] = "guru_latn_pa",
) -> str:
    """
    Converts text from a script to another.

    Note:
        Some script converters are lossless and others are lossy. Transliteration attempts to be compliant with reversible mappings (i.e. to a target script and then back to unicode gurmukhi with zero data loss). Transcription attempts to be representative of the spoken word (biased by today's languages). Script converters are named with two script tags (based on ISO 15924) for transliteration, and an additional language tag (based on ISO 639-1) for transcription. Additional information may be added at the end to indicate school of thought or other methodology info.

    Args:
        string: The string to affect.

        scriptConverter: The method of converting one script to another . Defaults to "guru_latn_pa".

    Returns:
        A string where a script is converted to another script.

    Examples:
        >>> convert("੧੨੩")
        '123'

        >>> convert("ਗੁਰੂ")
        'gurū'
    """

    # Convert Unicode to Sant Lipi format
    string = string.replace("੍ਯ", "꠳ਯ")

    string = unicode_normalize(string)

    if scriptConverter == "guru_latn":
        string = guru_latn(string)

    if scriptConverter == "guru_latn_pa":
        string = guru_latn_pa(string)

    return string
