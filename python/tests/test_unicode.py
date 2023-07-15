from gurmukhiutils.unicode import unicode


def triple_unicode(string: str) -> str:
    return unicode(unicode(unicode(string)))


def test_unicode() -> None:
    assertions = {
        "123": "੧੨੩",
        "<> > <": "ੴ ☬ ੴ",
        "gurU": "ਗੁਰੂ",
    }

    for key, value in assertions.items():
        assert triple_unicode(key) == value


def test_unicode_diacritics() -> None:
    assertions = {
        "kRwN": "ਕ੍ਰਾਂ",
        "sÍwNiq": "ਸ੍ਵਾਂਤਿ",
        "iBRMg": "ਭ੍ਰਿੰਗ",
        "inR`qy": "ਨ੍ਰਿੱਤੇ",
        "ik®`sM": "ਕ੍ਰਿੱਸੰ",
        "AMimR`q": "ਅੰਮ੍ਰਿੱਤ",
        "Qwin´M": "ਥਾਨੵਿੰ",
        "kRwNq": "ਕ੍ਰਾਂਤ",
        "k®ü`D": "ਕ੍ਰੁੱਧ",
        "ijnHYN": "ਜਿਨ੍ਹੈਂ",
        "hÍüYbo": "ਹ੍ਵੈੁਬੋ",
        "nUµ": "ਨੂੰ",
        "^u`d": "ਖ਼ੁੱਦ",
        "PzUM": "ਫਜ਼ੂੰ",
        "kwrmu`l-k`rwm": "ਕਾਰਮੁੱਲ-ਕੱਰਾਮ",
        "&ru¤^y": "ਫ਼ਰੁੱਖ਼ੇ",
        "^u¤ro": "ਖ਼ੁੱਰੋ",
        "duoAwlY": "ਦੋੁਆਲੈ",
        "idRV@IAw": "ਦ੍ਰਿੜੑੀਆ",
        "kwn@ü": "ਕਾਨੑੁ",
        "ijMn@I": "ਜਿੰਨੑੀ",
        "El@w": "ਓਲੑਾ",
        "swm@Y": "ਸਾਮੑੈ",
        "kqybhuˆ": "ਕਤੇਬਹੁਂ",
    }

    for key, value in assertions.items():
        assert triple_unicode(key) == value


def test_unicode_sihari() -> None:
    assertions = {
        "BuiKAw.": "ਭੁਖਿਆ.",
        "ਭੁਖiਆ.": "ਭੁਖਿਆ.",
        "ਮi": "ਮਿ",
        "ਮiਲ": "ਮਿਲ",
        "ਮil": "ਮਲਿ",
        "suMi\\Aw": "ਸੁੰਞਿਆ",
        "|i||": "ਙਙਿਙ",
        "di&": "ਦਫ਼ਿ",
    }

    for key, value in assertions.items():
        assert triple_unicode(key) == value


def test_unicode_nasalization() -> None:
    assertions = {
        "iQqMØI": "ਥਿਤੀੰ",  # some fonts render as ੀੰ, Sant Lipi should render  ੰ + ੀ
        "kMØI": "ਕੀੰ",
        "nµØIbu": "ਨੀੰਬੁ",
        "nµØIbw": "ਨੀੰਬਾ",
        "dyNih": "ਦੇਂਹਿ",
    }

    for key, value in assertions.items():
        assert triple_unicode(key) == value


def test_unicode_bindi_before_bihari() -> None:
    assertions = {
        "guxˆØI": "ਗੁਣੀਁ",
        "sKˆØI": "ਸਖੀਁ",
    }

    for key, value in assertions.items():
        assert (
            unicode(unicode(unicode(key, "Sant Lipi"), "Sant Lipi"), "Sant Lipi")
            == value
        )


def test_unicode_ascii_conversions() -> None:
    assertions = {
        "DR¨A": "ਧ੍ਰੂਅ",
        "AwilsÎ": "ਆਲਿਸ੍ਯ",
        "dwin": "ਦਾਨਿ",
        "BIqir": "ਭੀਤਰਿ",
        "jIau": "ਜੀਉ",
        "[1[2[3[4[5[": "।੧।੨।੩।੪।੫।",
        "]1]2]3]4]5]": "॥੧॥੨॥੩॥੪॥੫॥",
        "sauifsies": "ਸਉਡਿਸਇਸ",
        "z`rrw": "ਜ਼ੱਰਰਾ",
        "^urSYd": "ਖ਼ੁਰਸ਼ੈਦ",
        "luqi&": "ਲੁਤਫ਼ਿ",
        "iekMqR": "ਇਕੰਤ੍ਰ",
        "pRBU": "ਪ੍ਰਭੂ",
    }

    for key, value in assertions.items():
        assert triple_unicode(key) == value


def test_unicode_ascii_conversions_subscripts() -> None:
    assertions = {
        "isRis†": "ਸ੍ਰਿਸ੍ਟਿ",
        "ik®s˜M": "ਕ੍ਰਿਸ੍ਨੰ",
        "dsœgIrI": "ਦਸ੍ਤਗੀਰੀ",
        "insçl": "ਨਿਸ੍ਚਲ",
        "sÍwd": "ਸ੍ਵਾਦ",
        "suDwK´r": "ਸੁਧਾਖੵਰ",
        "cVH¨": "ਚੜ੍ਹੂ",
        "cV§": "ਚੜ੍ਹੂ",
        "im´wny": "ਮੵਿਾਨੇ",
        "iD´wvY": "ਧੵਿਾਵੈ",
        "idÍj": "ਦ੍ਵਿਜ",
        "iBKÏw": "ਭਿਖੵਾ",
        "imQÏMq": "ਮਿਥੵੰਤ",
        "imQ´Mq": "ਮਿਥੵੰਤ",
        "rKÏw": "ਰਖੵਾ",
        "sMswrsÏ": "ਸੰਸਾਰਸੵ",
    }

    for key, value in assertions.items():
        assert triple_unicode(key) == value


def test_unicode_yayya() -> None:
    unicode_compliant_assertions = {
        # Yayya with or without diacritics renders correctly.
        "XkIN": "ਯਕੀਂ",
        "ipRX": "ਪ੍ਰਿਯ",
        "hX¤wiq": "ਹਯਾੱਤਿ",
        "hXw¤iq": "ਹਯਾੱਤਿ",
        "hmwXUM": "ਹਮਾਯੂੰ",
        "BXuo": "ਭਯੋੁ",
        "XkIn": "ਯਕੀਨ",
        # Half-Y (open-left) with no diacritics renders correctly.
        "mDÎ": "ਮਧ੍ਯ",
        "ilKÎqy": "ਲਿਖ੍ਯਤੇ",
        # Half-Y with any diacritics may render incorrectly with sub-par fonts / shaping engines
        "mwnÎo": "ਮਾਨ੍ਯੋ",
        "iBÎo": "ਭਿ੍ਯੋ",
        "kIÎo": "ਕੀ੍ਯੋ",
        "sÎwm": "ਸ੍ਯਾਮ",
        "qÎwgÎo": "ਤ੍ਯਾਗ੍ਯੋ",
        "jÎoN": "ਜ੍ਯੋਂ",
        # Open-top Yayya doesn't exist in Unicode 14.0, converts base-letter to Yayya.
        "nwmï": "ਨਾਮਯ",
        "sunIïhu": "ਸੁਨੀਯਹੁ",
        "AdyïM": "ਅਦੇਯੰ",
        "kFïo": "ਕਢਯੋ",
        "sïwm": "ਸਯਾਮ",
        # Open-top Half-Y doesn't exist in Unicode 14.0.
        # Converts to Half-Y (may render incorrectly with sub-par fonts / shaping engines)
        "idqïwidqî": "ਦਿਤਯਾਦਿਤ੍ਯ",
        "qRsîo": "ਤ੍ਰਸ੍ਯੋ",
    }

    sant_lipi_assertions = {
        # Yayya
        "XkIN": "ਯਕੀਂ",
        "ipRX": "ਪ੍ਰਿਯ",
        "hX¤wiq": "ਹਯਾੱਤਿ",
        "hXw¤iq": "ਹਯਾੱਤਿ",
        "hmwXUM": "ਹਮਾਯੂੰ",
        "BXuo": "ਭਯੋੁ",
        "XkIn": "ਯਕੀਨ",
        # Half-Y (open-left)
        "mDÎ": "ਮਧ꠳ਯ",
        "ilKÎqy": "ਲਿਖ꠳ਯਤੇ",
        "mwnÎo": "ਮਾਨ꠳ਯੋ",
        "iBÎo": "ਭਿ꠳ਯੋ",
        "kIÎo": "ਕੀ꠳ਯੋ",
        "sÎwm": "ਸ꠳ਯਾਮ",
        "qÎwgÎo": "ਤ꠳ਯਾਗ꠳ਯੋ",
        "jÎoN": "ਜ꠳ਯੋਂ",
        # Open-top Yayya
        "nwmï": "ਨਾਮ꠴ਯ",
        "sunIïhu": "ਸੁਨੀ꠴ਯਹੁ",
        "AdyïM": "ਅਦੇ꠴ਯੰ",
        "kFïo": "ਕਢ꠴ਯੋ",
        "sïwm": "ਸ꠴ਯਾਮ",
        # Open-top Half-Y
        "idqïwidqî": "ਦਿਤ꠴ਯਾਦਿਤ꠵ਯ",
        "qRsîo": "ਤ੍ਰਸ꠵ਯੋ",
    }

    for key, value in unicode_compliant_assertions.items():
        assert triple_unicode(key) == value

        # Sant Lipi -> Unicode Compliant -> Sant Lipi -> Unicode Compliant
        assert (
            unicode(unicode(unicode(unicode(key, "Sant Lipi")), "Sant Lipi")) == value
        )

    for key, value in sant_lipi_assertions.items():
        assert (
            unicode(unicode(unicode(key, "Sant Lipi"), "Sant Lipi"), "Sant Lipi")
            == value
        )


def test_unicode_diacritic_ordering() -> None:
    ਗੋੁਬਿੰਦ = "\u0a17\u0a4b\u0a41\u0a2c\u0a3f\u0a70\u0a26"
    ਮਿਲੵਿੋ = "\u0a2e\u0a3f\u0a32\u0a75\u0a3f\u0a4b"
    ਗ੍ਹਿਾਨ = "\u0a17\u0a4d\u0a39\u0a3f\u0a3e\u0a28"
    ਸ਼੍ਰੇਣੀ = "\u0a36\u0a4d\u0a30\u0a47\u0a23\u0a40"
    ਜੋਤੵਿੰ = "\u0a1c\u0a4b\u0a24\u0a75\u0a3f\u0a70"
    ਬਸੵਿੰਤ = "\u0a2c\u0a38\u0a75\u0a3f\u0a70\u0a24"

    assertions = {
        "guoibMd": ਗੋੁਬਿੰਦ,
        "gouibMd": ਗੋੁਬਿੰਦ,
        "guoibµd": ਗੋੁਬਿੰਦ,
        "gouibµd": ਗੋੁਬਿੰਦ,
        "imil´o": ਮਿਲੵਿੋ,
        "imilo´": ਮਿਲੵਿੋ,
        "imiloÏ": ਮਿਲੵਿੋ,
        "imilÏo": ਮਿਲੵਿੋ,
        "\u0a2e\u0a3f\u0a32\u0a4b\u0a3f\u0a75": ਮਿਲੵਿੋ,
        "igHwn": ਗ੍ਹਿਾਨ,
        "igwHn": ਗ੍ਹਿਾਨ,
        "\u0a17\u0a3f\u0a4d\u0a39\u0a3e\u0a28": ਗ੍ਹਿਾਨ,
        "\u0a17\u0a3f\u0a3e\u0a4d\u0a39\u0a28": ਗ੍ਹਿਾਨ,
        "\u0a17\u0a3e\u0a3f\u0a4d\u0a39\u0a28": ਗ੍ਹਿਾਨ,
        "s®æyxI": ਸ਼੍ਰੇਣੀ,
        "S®yxI": ਸ਼੍ਰੇਣੀ,
        "SRyxI": ਸ਼੍ਰੇਣੀ,
        "SyRxI": ਸ਼੍ਰੇਣੀ,
        "sæRyxI": ਸ਼੍ਰੇਣੀ,
        "sRæyxI": ਸ਼੍ਰੇਣੀ,
        "syRæxI": ਸ਼੍ਰੇਣੀ,
        "joiqÏM": ਜੋਤੵਿੰ,
        "joiqMÏ": ਜੋਤੵਿੰ,
        "bisÏMq": ਬਸੵਿੰਤ,
        "bisMÏq": ਬਸੵਿੰਤ,
    }

    for key, value in assertions.items():
        assert triple_unicode(key) == value


def test_unicode_sanitization() -> None:
    ਓੁ = "\u0a13\u0a41"
    ਓੂ = "\u0a13\u0a42"
    ਆਂ = "\u0a06\u0a02"

    assertions = {
        "aou": ਓੁ,
        "auo": ਓੁ,
        "aoU": ਓੂ,
        "aUo": ਓੂ,
        "AW": ਆਂ,
        "ANw": ਆਂ,
        "AwN": ਆਂ,
    }

    for key, value in assertions.items():
        assert triple_unicode(key) == value
