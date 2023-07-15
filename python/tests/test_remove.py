from gurmukhiutils.constants import VISHRAM_HEAVY, VISHRAM_LIGHT, VISHRAM_MEDIUM
from gurmukhiutils.remove import remove, remove_line_endings, remove_vishrams


def test_remove_vishrams() -> None:
    assertions = {
        "ਸਬਦ. ਸਬਦ, ਸਬਦ; ਸਬਦ ॥": "ਸਬਦ ਸਬਦ ਸਬਦ ਸਬਦ ॥",
        "sbd, sbd sbd; sbd ]": "sbd sbd sbd sbd ]",
        "sbd sbd sbd ]": "sbd sbd sbd ]",
    }

    for key, value in assertions.items():
        assert remove_vishrams(key) == value


def test_remove_vishram() -> None:
    heavy_assertions = {
        "sbd, sbd sbd; sbd ]": "sbd, sbd sbd sbd ]",
        "ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥": "ਸਬਦ. ਸਬਦ ਸਬਦ ਸਬਦ ॥",
    }

    medium_assertions = {
        "sbd, sbd sbd; sbd ]": "sbd sbd sbd; sbd ]",
        "ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥": "ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥",
    }

    light_assertions = {
        "sbd, sbd sbd; sbd ]": "sbd, sbd sbd; sbd ]",
        "ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥": "ਸਬਦ ਸਬਦ; ਸਬਦ ਸਬਦ ॥",
    }

    medium_and_heavy_assertions = {
        "sbd, sbd sbd; sbd ]": "sbd sbd sbd sbd ]",
        "ਸਬਦ. ਸਬਦ; ਸਬਦ ਸਬਦ ॥": "ਸਬਦ. ਸਬਦ ਸਬਦ ਸਬਦ ॥",
    }

    for key, value in heavy_assertions.items():
        assert remove(key, [VISHRAM_HEAVY]) == value

    for key, value in medium_assertions.items():
        assert remove(key, [VISHRAM_MEDIUM]) == value

    for key, value in light_assertions.items():
        assert remove(key, [VISHRAM_LIGHT]) == value

    for key, value in medium_and_heavy_assertions.items():
        assert remove(key, [VISHRAM_MEDIUM, VISHRAM_HEAVY]) == value


def test_remove_line_endings() -> None:
    assertions = {
        # ignore:
        "ਮਹਲਾ ੧": "ਮਹਲਾ ੧",
        "ਮਹਲਾ ੫": "ਮਹਲਾ ੫",
        "mahalaa 1": "mahalaa 1",
        "महला ५": "महला ५",
        # affect:
        "ਸਬਦ ॥ ਰਹਾਉ ॥": "ਸਬਦ",
        "सबद ॥ रहाउ ॥": "सबद",
        "ਸਬਦ ॥੧॥ ਰਹਾਉ ॥": "ਸਬਦ",
        "सबद ॥१॥ रहाउ ॥": "सबद",
        "ਸਬਦ ॥੧॥ ਰਹਾਉ ਦੂਜਾ ॥": "ਸਬਦ",
        "ਸਬਦ ॥੪॥੬॥ ਛਕਾ ੧ ॥": "ਸਬਦ",
        "ਸਬਦ ॥੨॥੧੨॥ ਛਕੇ ੨ ॥": "ਸਬਦ",
        "ਸਬਦ ।੪੯।੧। ਇਕੁ ।": "ਸਬਦ",
        "ਸਬਦ ॥੪॥੯॥ ਦੁਤੁਕੇ": "ਸਬਦ",
        "ਸਬਦ ॥੨੧॥੧॥ ਸੁਧੁ ਕੀਚੇ": "ਸਬਦ",
        "ਸਬਦ ॥੫੧੭॥ ਪੜ੍ਹੋ ਵੀਚਾਰ ਕਬਿੱਤ ੫੦੬": "ਸਬਦ",
        "ਸਬਦ ॥੧॥": "ਸਬਦ",
        "ਸਬਦ  ॥੧॥": "ਸਬਦ",
        "ਸਬਦ॥੨੦": "ਸਬਦ",
        "ਸਬਦ ॥੨॥੨॥": "ਸਬਦ",
        "ਸਬਦ ॥ ਰਹਾਉ ਦੂਜਾ ॥੧॥੩॥": "ਸਬਦ",
        "ਸਬਦ ।੧੪੮।": "ਸਬਦ",
        "ਸਬਦ ॥ ਸਬਦ ॥": "ਸਬਦ ਸਬਦ",
        "॥ ਸਬਦ ॥": "ਸਬਦ",
        "ਸਬਦ ॥ ਸਬਦ ॥੨॥੨॥": "ਸਬਦ ਸਬਦ",
        "Example test. ||1||": "Example test.",
        "Example test. ||1||Pause||": "Example test.",
        "Example test. ||Pause||": "Example test.",
        "sabad |4|6| chhakaa 1 |": "sabad",
        "sabad | rahaau doojaa |1|3| sabad": "sabad",
        "sabad | rahau doojaa |1|3| sabad": "sabad",
        "sabad | rahao doojaa |1|3| sabad": "sabad",
        "sabad | sabad |": "sabad sabad",
        "| sabad |": "sabad",
    }

    for key, value in assertions.items():
        assert remove_line_endings(key) == value
