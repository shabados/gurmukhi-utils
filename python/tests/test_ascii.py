from gurmukhiutils.ascii import ascii


def test_ascii() -> None:
    assertions = {
        "੧੨੩": "123",
        "ੴ ☬ ੴ": "<> Ç <>",
        "ਗੁਰੂ": "gurU",
    }

    for key, value in assertions.items():
        assert ascii(key) == value


def test_ascii_diacritics() -> None:
    assertions = {
        "ਕ੍ਰਾਂ": "k®W",
        "ਸ੍ਵਾਂਤਿ": "sÍWiq",
        "ਭ੍ਰਿੰਗ": "iBRMg",
        "ਨ੍ਰਿੱਤੇ": "inR`qy",
        "ਕ੍ਰਿੱਸੰ": "ik®`sM",
        "ਅੰਮ੍ਰਿੱਤ": "AMimR`q",
        "ਥਾਨੵਿੰ": "Qwin´µ",
        "ਕ੍ਰਾਂਤ": "k®Wq",
        "ਕ੍ਰੁੱਧ": "k®ü`D",
        "ਜਿਨ੍ਹੈਂ": "ijnHYN",
        "ਹ੍ਵੈੁਬੋ": "hÍYübo",
        "ਨੂੰ": "ƒ",
        "ਖ਼ੁੱਦ": "^u`d",
        "ਫਜ਼ੂੰ": "PzUM",
        "ਕਾਰਮੁੱਲ-ਕੱਰਾਮ": "kwrmu`l-k`rwm",
        "ਫ਼ਰੁੱਖ਼ੇ": "&ru`^y",
        "ਖ਼ੁੱਰੋ": "^u`ro",
        "ਦੋੁਆਲੈ": "douAwlY",
        "ਦ੍ਰਿੜੑੀਆ": "idRV@IAw",
        "ਕਾਨੑੁ": "kwn@ü",
        "ਜਿੰਨੑੀ": "ijMn@I",
        "ਓਲੑਾ": "El@w",
        "ਸਾਮੑੈ": "swm@Y",
        "ਕਤੇਬਹੁਂ": "kqybhuˆ",
    }

    for key, value in assertions.items():
        assert ascii(key) == value


def test_ascii_sihari() -> None:
    assertions = {
        "ਭੁਖਿਆ.": "BuiKAw.",
    }

    for key, value in assertions.items():
        assert ascii(key) == value


def test_ascii_nasalization() -> None:
    assertions = {
        "ਥਿਤੀੰ": "iQqµØI",
        "ਕੀੰ": "kµØI",
        "ਨੀੰਬੁ": "nµØIbu",
        "ਨੀੰਬਾ": "nµØIbw",
        "ਦੇਂਹਿ": "dyNih",
        "ਗੁਣੀਁ": "guxˆØI",
        "ਸਖੀਁ": "sKˆØI",
    }

    for key, value in assertions.items():
        assert ascii(key) == value


def test_ascii_ascii_conversions() -> None:
    assertions = {
        "ਧ੍ਰੂਅ": "DR¨A",
        "ਆਲਿਸ੍ਯ": "AwilsÎ",
        "ਦਾਨਿ": "dwin",
        "ਭੀਤਰਿ": "BIqir",
        "ਜੀਉ": "jIau",
        "।੧।੨।੩।੪।੫।": "[1[2[3[4[5[",
        "॥੧॥੨॥੩॥੪॥੫॥": "]1]2]3]4]5]",
        "ਸਉਡਿਸਇਸ": "sauifsies",
        "ਜ਼ੱਰਰਾ": "z`rrw",
        "ਖ਼ੁਰਸ਼ੈਦ": "^urSYd",
        "ਲੁਤਫ਼ਿ": "luqi&",
        "ਇਕੰਤ੍ਰ": "iekMqR",
        "ਪ੍ਰਭੂ": "pRBU",
    }

    for key, value in assertions.items():
        assert ascii(key) == value


def test_ascii_ascii_conversions_subscripts() -> None:
    assertions = {
        "ਸ੍ਰਿਸ੍ਟਿ": "isRis†",
        "ਕ੍ਰਿਸ੍ਨੰ": "ik®s˜M",
        "ਦਸ੍ਤਗੀਰੀ": "dsœgIrI",
        "ਨਿਸ੍ਚਲ": "insçl",
        "ਸ੍ਵਾਦ": "sÍwd",
        "ਸੁਧਾਖੵਰ": "suDwK´r",
        "ਚੜ੍ਹੂ": "cV§",
        "ਮੵਿਾਨੇ": "im´wny",
        "ਧੵਿਾਵੈ": "iD´wvY",
        "ਦ੍ਵਿਜ": "idÍj",
        "ਭਿਖੵਾ": "iBK´w",
        "ਮਿਥੵੰਤ": "imQ´Mq",
        "ਰਖੵਾ": "rK´w",
        "ਸੰਸਾਰਸੵ": "sMswrs´",
    }

    for key, value in assertions.items():
        assert ascii(key) == value


def test_ascii_yayya() -> None:
    assertions = {
        # Yayya
        "ਯਕੀਂ": "XkIN",
        "ਪ੍ਰਿਯ": "ipRX",
        "ਹਯਾੱਤਿ": "hXw`iq",
        "ਹਮਾਯੂੰ": "hmwXUM",
        "ਭਯੋੁ": "BXou",
        "ਯਕੀਨ": "XkIn",
        # Half-Y (open-left)
        "ਮਧ꠳ਯ": "mDÎ",
        "ਲਿਖ꠳ਯਤੇ": "ilKÎqy",
        "ਮਾਨ꠳ਯੋ": "mwnÎo",
        "ਭਿ꠳ਯੋ": "iBÎo",
        "ਕੀ꠳ਯੋ": "kIÎo",
        "ਸ꠳ਯਾਮ": "sÎwm",
        "ਤ꠳ਯਾਗ꠳ਯੋ": "qÎwgÎo",
        "ਜ꠳ਯੋਂ": "jÎoN",
        # Open-top Yayya
        "ਨਾਮ꠴ਯ": "nwmï",
        "ਸੁਨੀ꠴ਯਹੁ": "sunIïhu",
        "ਅਦੇ꠴ਯੰ": "AdyïM",
        "ਕਢ꠴ਯੋ": "kFïo",
        "ਸ꠴ਯਾਮ": "sïwm",
        # Open-top Half-Y
        "ਦਿਤ꠴ਯਾਦਿਤ꠵ਯ": "idqïwidqî",
        "ਤ੍ਰਸ꠵ਯੋ": "qRsîo",
    }

    for key, value in assertions.items():
        assert ascii(key) == value
