from pytest import warns

from gurmukhiutils.ascii import ascii
from gurmukhiutils.unicode import unicode


def from_ascii_to_ascii(string: str) -> str:
    return ascii(unicode(string, "Sant Lipi"))


def test_a2a() -> None:
    assertions = {
        "123",
        "<>",
        "gurU",
    }

    for string in assertions:
        assert from_ascii_to_ascii(string) == string


def test_a2a_diacritics() -> None:
    assertions = {
        "k®W",
        "sÍWiq",
        "iBRMg",
        "inR`qy",
        "ik®`sM",
        "AMimR`q",
        "Qwin´µ",
        "k®Wq",
        "k®ü`D",
        "ijnHYN",
        "hÍYübo",
        "ƒ",
        "^u`d",
        "PzUM",
        "kwrmu`l-k`rwm",
        "&ru`^y",
        "^u`ro",
        "douAwlY",
        "idRV@IAw",
        "kwn@ü",
        "ijMn@I",
        "El@w",
        "swm@Y",
        "kqybhuˆ",
    }

    for string in assertions:
        assert from_ascii_to_ascii(string) == string


def test_a2a_sihari() -> None:
    assertions = {
        "BuiKAw.",
    }

    for string in assertions:
        assert from_ascii_to_ascii(string) == string


def test_a2a_nasalization() -> None:
    assertions = {
        "iQqµØI",
        "kµØI",
        "nµØIbu",
        "nµØIbw",
        "dyNih",
        "guxˆØI",
        "sKˆØI",
    }

    for string in assertions:
        assert from_ascii_to_ascii(string) == string


def test_a2a_ascii_conversions() -> None:
    assertions = {
        "DR¨A",
        "AwilsÎ",
        "dwin",
        "BIqir",
        "jIau",
        "[1[2[3[4[5[",
        "]1]2]3]4]5]",
        "sauifsies",
        "z`rrw",
        "^urSYd",
        "luqi&",
        "iekMqR",
        "pRBU",
    }

    for string in assertions:
        assert from_ascii_to_ascii(string) == string


def test_a2a_ascii_conversions_subscripts() -> None:
    assertions = {
        "isRis†",
        "ik®s˜M",
        "dsœgIrI",
        "insçl",
        "sÍwd",
        "suDwK´r",
        "cV§",
        "im´wny",
        "iD´wvY",
        "idÍj",
        "imQ´Mq",
        "sMswrs´",
    }

    for string in assertions:
        assert from_ascii_to_ascii(string) == string


def test_a2a_yayya() -> None:
    assertions = {
        # Yayya
        "XkIN",
        "ipRX",
        "hXw`iq",
        "hmwXUM",
        "BXou",
        "XkIn",
        # Half-Y (open-left)
        "mDÎ",
        "ilKÎqy",
        "mwnÎo",
        "iBÎo",
        "kIÎo",
        "sÎwm",
        "qÎwgÎo",
        "jÎoN",
        # Open-top Yayya
        "nwmï",
        "sunIïhu",
        "AdyïM",
        "kFïo",
        "sïwm",
        # Open-top Half-Y
        "idqïwidqî",
        "qRsîo",
    }

    for string in assertions:
        assert from_ascii_to_ascii(string) == string


def test_a2a_db4() -> None:
    assertions = {
        # backslash
        "suMi\\Aw",
        # au~
        "au~cI",
        "au~im",
        "au~cM",
        # auN
        "ieauN",
        "BauNh",
        "gwauN",
        "bqwauN",
        # aUN
        "aUNGn",
        "aUNDy",
        "kmwaUN;",
        "pwaUN",
    }

    for string in assertions:
        assert from_ascii_to_ascii(string) == string


def test_a2a_db4_fixes() -> None:
    assertions = {
        # fix adhak positioning
        "im~qr": "im`qr",
        "s~jn": "s`jn",
        "sb¤k": "sb`k",
        "h¤k": "h`k",
        # simplify chars
        "nUµ": "ƒ",
        "cunUµ": "cuƒ",
        "swnUµ": "swƒ",
        "mjnUM": "mjƒ",
        "hnUMmq": "hƒmq",
        "knUM": "kƒ",
        "kolH¨": "kol§",
        "cVH¨": "cV§",
        "Ru": "Rü",
        "uR": "Rü",
        "uH": "Hü",
        "Hu": "Hü",
        "®u": "Rü",
        "k®u": "k®ü",
        "lµ": "lM",
        "TM": "Tµ",
        "TUM": "TUµ",
        "n´M": "n´µ",
        "cuN": "cuˆ",
        "kR": "k®",
    }

    for key, value in assertions.items():
        assert from_ascii_to_ascii(key) == value


def test_a2a_throw_errors() -> None:
    assertions = {
        "Oo",
        "oO",
        "Oy",
        "OY",
        "oy",
        "oY",
        "wY",
        "wy",
        "yw",
        "Yw",
        "WY",
        "Wy",
        "yW",
        "YW",
        "wu",
        "Wu",
        "wU",
        "WU",
        "uU",
        "Uu",
    }

    for string in assertions:
        with warns(UserWarning):
            from_ascii_to_ascii(string)
