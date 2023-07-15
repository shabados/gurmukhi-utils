# pause chars / ਵਿਸ਼ਰਾਮ symbols
VISHRAM_LIGHT = "."
VISHRAM_MEDIUM = ","
VISHRAM_HEAVY = ";"
VISHRAMS = [VISHRAM_LIGHT, VISHRAM_MEDIUM, VISHRAM_HEAVY]

BASE_LETTERS = "ਸਹਕਖਗਘਙਚਛਜਝਞਟਠਡਢਣਤਥਦਧਨਪਫਬਭਮਯਰਲਵੜਸ਼ਖ਼ਗ਼ਜ਼ਫ਼ਲ਼"
VOWEL_LETTERS = (
    # ਅ ਆ ਏ ਐ ਇ ਈ ਓ ਔ ਉ ਊ
    "ਅ\u0a06\u0a0f\u0a10\u0a07\u0a08\u0a13\u0a14\u0a09\u0a0a"
)

ORDERED_VOWELS = [
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

VIRAMA = "੍"
BELOW_LETTERS = "ਹਰਵਟਤਨਚ"
YAKASH = "ੵ"

VOWEL_DIACRITICS = "".join(ORDERED_VOWELS)
