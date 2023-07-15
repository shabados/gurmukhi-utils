from gurmukhiutils.convert import convert

"""

#TODO

Implement function to automatically add hyphenation () with confidence scores. End use would be to ignore words with deliberate hyphenation and potentially interpret hyphenation of other words. Or to improve the hyphenation function to handle all examples below, such that deliberate hyphenation be not required.

Implement "stress" function to indicate with an apostrophe where lexical stress is. Example: ਅ'ਕਾਲੀ vs ਅਕਾ'ਲੀ, correct stress would be the former (on ਕਾ). See work / papers by Rajdip Dhillon.

Fix the commented out tests.

Questions:

Handling of persian ghayn (ਗ਼) as ġ or gh

Always adding nukta to ਫ (ph = f)

u+a as w (ੁ + ਅ = ਵ)

i+a as y (ਿ + ਅ = ਯ)

Better handling of nasalizations (Distinguish n and m sounds? Meaning: nasalizations preceding ਪ ਫ ਬ ਭ ਮ be switched from generic ñ to m). E.g. ਚੰਪਾ = campā,  ਸੌਂਫ = sōmph, ਅੰਬ = amb, ਆਰੰਭ = ārambh, ਅੰਮ੍ਰਿਤ = ammrit. These are all according to the more popular spellings excepting ਫ. Maybe ignore ਫ if we are switching them all to "f" according to above point e.g. ਸੌਂਫ = sōnf (iso standard "saunf" which is the popular spelling).

"""


def test_guru_latn_pa_assertions() -> None:
    assertions = {
        "ੴ": "ik oañkār",
        "ਸਬਦ": "sabad",
        "Example ਸਬਦ": "Example sabad",
        "ਜਨਨੀ": "jananī",
        "ਜਾਨ": "jān",
        "ਸੁਤੁ": "sut",
        "ਕੁ": "ku",
        "ਅਧਿਕ": "adhik",
        "ਧਰਿ": "dhar",
        "ਰਾਉ": "rāu",
        # "ਸੁਤੁ ਕੁ ਰਾਉ": "sut ku rāu",
        "ਆਕਾਸ": "ākās",
        "ਪੰਚ": "pañc",
        "ਬਤਊਆ": "bataūā",
        "ਰਾਖੀਅਲੇ": "rākhīale",
        "ਕਾਂਢੀਐ": "kāñḍhīē",
        "ਸਮਾਇ": "samāi",
        "ਤਊ": "taū",
        "ਗਾਇਓ": "gāio",
        "ਪੁਰਖਮਨੋਪਿਮੰ": "purakhamanopimañ",
        "ਆਦਿ": "ād",
        "ਪਰਕ੍ਰਿਤਿ": "parakrit",
        "ਪਰ‧ਕ੍ਰਿਤਿ": "parkrit",
        "ਜਦਿਚਿੰਤਿ": "jadiciñt",
        "ਜਦਿ‧ਚਿੰਤਿ": "jadciñt",
        "ਨ": "na",
        "ਤ੍ਵ": "tva",
        "ਸੰ": "sañ",
        "ਭਇਅੰ": "bhaiañ",
        "ਪਰਾਭਯੰ": "parābhayañ",
        "ਸ੍ਵਸਤਿ": "svasat",
        "ਸਮਬੵਿਅੰ": "samabyiañ",
        "ਪ੍ਰਸੰਨਮਿਦੰ": "prasañnamidañ",
        "ਕਿੰ": "kiñ",
        "ਯਕ": "yak",
        "ਬੇਐਬ": "beēb",
        "ਮਮ": "mam",
        "ਬਿਰਾਦਰਾਂ": "birādarāñ",
        "ਬਿਅਫਤਮ": "biaphatam",
        "ਈਂ": "īñ",
        "ਵਰ੍ਹਿਆ": "varhiā",
        "ਸੰਖੰ": "sañkhañ",
        "ਅਸ੍ਚਰਜ": "ascaraj",
        "ਬਿਸ੍ਟਾ": "bisṭā",
        "ਸਮਝ੍ਯੋ": "samajhyo",
        "ਸਮ‧ਝ੍ਯੋ": "samjhyo",
        "ਪੀਯ": "pīy",
        "ਪ੍ਰਯਾਯੋ": "prayāyo",
        "ਅਸ੍ਵਨ": "asvan",
        "ਦਸ੍ਤਗੀਰੀ": "dastagīrī",
        "॥੧॥ ਰਹਾਉ ॥": "‖1‖ rahāu ‖",
        "॥੨॥੫॥": "‖2‖5‖",
        "ਸਤੵਿੰ": "satyañ",
        "ਦੁਖੵੰ": "dukhyañ",
        "ਹਤੵੰ": "hatyañ",
        "ਬਿਖੵਾਦੰ": "bikhyādañ",
        "ਆਇਆ": "āiā",
        "ਹੇ": "he",
        "ਧਰਮ ਦ੍ਰਿੜੰਤਣਃ ॥": "dharam driṛañtaṇẖ ‖",
        "ਮਸਤਕਿ ਲਿਖੵਣਃ ॥੨੨॥": "masatak likhyaṇẖ ‖22‖",
        "ਯਯਾ": "yayā",
        "ਸ਼ੇਰ": "sher",
        "ਖ਼ਾਲਸਾ": "ḳhālasā",
        "ਖ਼ਾਲ‧ਸਾ": "ḳhālsā",
        "ਗ਼ਰੀਬ": "ġarīb",
        "ਲੋੁਭਾਨ": "lobhān",  # o+u
        "ਲੁੋਭਾਨ": "lobhān",  # u+o
        "ਜੀਅ": "jīa",
        "ਲੋਅ": "loa",
        "ਜੱਥਾ": "jatthā",
        "ਵੱਡਾ": "vaḍḍā",
        "ਮਿੱਟੀ": "miṭṭī",
        "ਜਿਨੑਾ": "jinā",
        "ਬੰਨੑਿ": "bañn",
        "ਕਾਨੑੁ": "kān",
        "ਜਿੰਨੑੀ": "jiñnī",
        "ਓਲੑਾ": "olā",
        "ਸਾਮੑੈ": "sāmē",
        "ਨ੍ਰਿੱਤੇ": "nritte",
        "ਕ੍ਰੁੱਧ": "kruddh",
        "ਜਿਨ੍ਹੈਂ": "jinhēñ",
        "ਹ੍ਵੈੁਬੋ": "hvēbo",
        "ਫ਼ਰੁੱਖ਼ੇ": "faruḳḳhe",
        "ਥਿਤੀੰ": "thitīñ",
        "ਨੀੰਬਾ": "nīñbā",
        "ਧ੍ਰੂਅ": "dhrūa",
        "ਆਲਿਸ੍ਯ": "ālisya",
        "ਜ਼ੱਰਰਾ": "zarrarā",
        "ਚੜ੍ਹੂ": "caṛhū",
        "ਮੵਿਾਨੇ": "myiāne",
        "ਧੵਿਾਵੈ": "dhyiāvē",
        "ਦ੍ਵਿਜ": "dvij",
        "ਮਿਥੵੰਤ": "mithyañt",
        "ਸੰਸਾਰਸੵ": "sañsārasy",
        "ਪ੍ਰਿਯ": "priy",
        "ਹਯਾੱਤਿ": "hayātt",
        "ਹਮਾਯੂੰ": "hamāyūñ",
        "ਭਯੋੁ": "bhayo",
        "ਮਧ੍ਯ": "madhya",
        "ਮਾਨ੍ਯੋ": "mānyo",
        "ਭਿ੍ਯੋ": "bhiyo",
        "ਕੀ੍ਯੋ": "kīyo",
        "ਸ੍ਯਾਮ": "syām",
        "ਸ꠴ਯਾਮ": "sayām",
        "ਜ੍ਯੋਂ": "jyoñ",
        "ਨਾਮ꠴ਯ": "nāmay",
        "ਦਿਤ꠴ਯਾਦਿਤ꠵ਯ": "ditayāditya",
        "ਤ੍ਰਸ꠵ਯੋ": "trasyo",
        "ਸ੍ਨੇਹੰ": "snehañ",
        "ਖਿਨੁ": "khin",
        "ਮੂਲਿ": "mūl",
    }

    for key, value in assertions.items():
        assert convert(key, "guru_latn_pa") == value


def test_guru_latn_pa_common() -> None:
    common_phrases = {
        "ਅੰਮ੍ਰਿਤਸਰ": "añmritasar",
        "ਅੰਮ੍ਰਿਤ‧ਸਰ": "añmritsar",
        "ਪੰਜਾਬੀ": "pañjābī",
        "ਗੋਬਿੰਦ": "gobiñd",
        "ਗੋੁਬਿੰਦ": "gobiñd",
        "ਸੰਤ": "sañt",
        "ਨਾਨਕ": "nānak",
        "ਵਾਹਿਗੁਰੂ": "vāhigurū",
        "ਵਾਹਿ‧ਗੁਰੂ": "vāhgurū",
        "ਗੁਰਦੁਆਰਾ": "guraduārā",
        "ਗੁਰ‧ਦੁਆਰਾ": "gurduārā",
        "ਵਾਹਿਗੁਰੂ ਜੀ ਕਾ ਖਾਲ‧ਸਾ ਵਾਹਿਗੁਰੂ ਜੀ ਕੀ ਫ਼ਤਿਹ": "vāhigurū jī kā khālsā vāhigurū jī kī fateh",
        "ਸਤਿ ਸ੍ਰੀ ਅਕਾਲ": "sat srī akāl",
        "ਬੋਲੇ ਸੋ ਨਿਹਾਲ": "bole so nihāl",
        "ਚੜ੍ਹਦੀ ਕਲਾ": "caṛhadī kalā",
        "ਚੜ੍ਹ‧ਦੀ ਕਲਾ": "caṛhdī kalā",
        "ਵੰਡ ਛਕੋ": "vañḍ chako",
        "ਗੁਰਮਤਿ": "guramat",
        "ਗੁਰ‧ਮਤਿ": "gurmat",
        "ਪੰਜ ਪਿਆਰੇ": "pañj piāre",
        "ਅਖੰਡ ਪਾਠ": "akhañḍ pāṭh",
        "ਗੁਰੂ ਨਾਨਕ": "gurū nānak",
        "ਗੁਰੂ ਅੰਗਦ": "gurū añgad",
        "ਗੁਰੂ ਅਮਰ ਦਾਸ": "gurū amar dās",
        "ਗੁਰੂ ਰਾਮ ਦਾਸ": "gurū rām dās",
        "ਗੁਰੂ ਅਰ‧ਜਨ": "gurū arjan",
        "ਗੁਰੂ ਹਰਿ‧ਗੋਬਿੰਦ": "gurū hargobiñd",
        "ਗੁਰੂ ਹਰਿ ਗੋਬਿੰਦ": "gurū har gobiñd",
        "ਗੁਰੂ ਹਰਿ ਰਾਇ": "gurū har rāi",
        "ਗੁਰੂ ਹਰਿ ਕ੍ਰਿਸ਼ਨ": "gurū har krishan",
        "ਗੁਰੂ ਤੇਗ਼ ਬਹਾਦਰ": "gurū teġ bahādar",
        "ਗੁਰੂ ਗੋਬਿੰਦ ਸਿੰਘ": "gurū gobiñd siñgh",
        "ਗੁਰੂ ਗ੍ਰੰਥ ਸਾਹਿਬ": "gurū grañth sāhib",
        "ਭਗਤ ਬੈਣੀ": "bhagat bēṇī",
        "ਭਾਈ ਮਰ‧ਦਾਨਾ": "bhāī mardānā",
        "ਬਾਬਾ ਬੁੱਢਾ": "bābā buḍḍhā",
        "ਬੇਨ‧ਤੀ": "bentī",
        "ਅਰ‧ਦਾਸ": "ardās",
        "ਤ੍ਵ ਪ੍ਰਸਾਦਿ ਸਵੱਯੇ": "tva prasād savayye",
        "ਤ੍ਵ ਪ੍ਰਸਾਦਿ ਸ੍ਵਯੇ": "tva prasād svaye",
    }

    for key, value in common_phrases.items():
        assert convert(key, "guru_latn_pa") == value


def test_guru_latn_pa_dictionary() -> None:
    dictionary_words = {
        "ਭਰਾ": "bharā",
        "ਭਾਈ": "bhāī",
        "ਮੋਤੀ": "motī",
        "ਅਕਾਲੀ": "akālī",
        "ਅਚਾਰ": "acār",
        "ਅਜ਼ਾਦ": "azād",
        "ਅਨਾਰ": "anār",
        "ਰੱਬ": "rabb",
        "ਅੱਖਰ": "akkhar",
        "ਆਕਾਸ਼": "ākāsh",
        "ਇਨਸਾਨ": "inasān",
        "ਇਨ‧ਸਾਨ": "insān",
        "ਇਸ਼ਕ": "ishak",
        "ਇਸ਼ਕ਼": "ishaq",
        # "ਇਸ਼‧ਕ਼": "ishqa",
        # "?": "ishq",
        "ਪਿਆਰ": "piār",
        "ਉਸਤਤ": "usatat",
        "ਉਸ‧ਤਤ": "ustat",
        "ਉਸ‧ਤਾਦ": "ustād",
        "ਕਣਕ": "kaṇak",
        "ਕਮਲ": "kamal",
        "ਪਦਮ": "padam",
        "ਕੰਵਲ": "kañval",
    }
    for key, value in dictionary_words.items():
        assert convert(key, "guru_latn_pa") == value


def test_guru_latn_pa_haha() -> None:
    haha_words = {
        # In comments below, the C = consonant, V = vowel
        #
        # medial/final ਹ preceded by C = C ੈ ਹ
        "ਰਹ‧ਰਾਸਿ ਸਾਹਿਬ": "rēhrās sāhib",
        "ਸਹਜ": "sēhaj",
        "ਮਹਲਾ ੫ ॥": "mēhalā 5 ‖",
        "ਜਗਦੀਸ੍ਵਰਹ": "jagadīsvarēh",
        "ਜਗ‧ਦੀਸ੍ਵਰਹ": "jagdīsvarēh",
        "ਤਹ": "tēh",
        #
        # mid ਹਾ preceded by C should stay the same
        "ਬਹਾਦਰ": "bahādar",  # not bēhādar
        "ਰਹਾਉ": "rahāu",  # not rēhāu
        #
        # mid ਹਿ preceded by CV should stay the same
        "ਸਾਹਿਬ": "sāhib",
        #
        # end ਹ preceded by CV should stay the same
        "ਅੱਲਾਹ": "allāh",  # not allā, the h should be included here
        #
        #
        "ਫ਼ਤਿਹ": "fateh",
        # haha in middle, then include the letter, but don't add mukta if vowel-less
        # include mukta if attached with addak, nasalization
        # plain letter + plain haha = ē instead of mukta
        "ਧਰਹੁ": "dharōh",
        "ਆਵਹੁ": "āvōh",
        "ਓਹੁ": "oh",
        "ਮੁਹਿ": "muh",
        "ਜਾਣਾਇਹਿ": "jāṇāih",
        "ਵਾਹਿ": "vāh",
        "ਕਿਹੜਾ": "kehṛā",
        "ਕਹਿਣਾ": "kēhṇā",
        "ਸ਼ਹਿਰ": "shēhr",
        "ਮਹਿੰਗਾ": "mēhñgā",
        "ਵੀਸਰਹਿ": "vīsarēh",
        "ਵੀਸ‧ਰਹਿ": "vīsrēh",
        "ਆਵਹਿ": "āvēh",
        "ਬੋਲਹਿ": "bolēh",
        "ਦੁਹਰਾ": "dohrā",
        "ਕੁਹੜਾ": "kohṛā",
        "ਮੁਹੱਬਤ": "mohbbat",
        "ਵਹੁਟੀ": "vōhṭī",
        "ਮਨਹੁ": "manōh",
        #
        "ਇਹੁ": "ih",
        "ਪਾਇਹੁ": "pāih",
        "ਕਰਿਹੁ": "karih",
        #
        "ਸਦਿਹੁ": "sadih",
        #
        "ਸੁਣਿਅਹੁ": "suṇiōh",
        #
        "ਸੁਨੀ꠴ਯਹੁ": "sunīyōh",
        #
        "ਸੁਆਲਿਹੁ": "suālih",
        "ਸਿਵਰਿਹੁ": "sivarih",
        "ਸਾਲਾਹਿਹੁ": "sālāhih",
        "ਭੋਗਿਹੁ": "bhogih",
        "ਮੇਲਿਹੁ": "melih",
        "ਭਗਤਹੁ": "bhagatōh",
        #
        "ਨਿਹੰਗ": "nehñg",
        # "ਨਿ‧ਹੰਗ": "nihañg",
    }
    for key, value in haha_words.items():
        assert convert(key, "guru_latn_pa") == value


def test_guru_latn_pa_vava_wawa() -> None:
    vava_wawa_words = {
        #
        #
        # vava
        #
        # ਵੀ
        "ਵੀਰ": "vīr",
        "ਵੀਸ‧ਰਹਿ": "vīsrēh",
        "ਅੱਚ‧ਵੀ": "accvī",
        #
        # ਵਿ
        "ਵਿਆਹ": "viāh",
        "ਵਿਚਾਰ": "vicār",
        "ਵਿੱਚ": "vicc",
        "ਵਿਛੋੜਾ": "vichoṛā",
        "ਵਿਚੋਲਾ": "vicolā",
        "ਵਿਦ‧ਯਾ": "vidyā",
        "ਵਿਰ‧ਸਾ": "virsā",
        "ਵਿਸਾਖੀ": "visākhī",
        "ਵਿਸ‧ਰਨ": "visran",
        "ਵਿਸ‧ਰਾਮ": "visrām",
        #
        # ਵੇ
        "ਵੇਚ‧ਣਾ": "vecṇā",
        "ਵੇਦ": "ved",
        "ਵੇਕਾਰ": "vekār",
        "ਵੇਲਾ": "velā",
        "ਵੇਸਾਖੀ": "vesākhī",
        "ਅਭੇਵ": "abhev",
        "ਐਵੇਂ": "ēveñ",
        #
        # ਵੈ
        "ਵੈਦ": "vēd",
        "ਵੈਪਾਰੀ": "vēpārī",
        "ਵੈਸਾਖੀ": "vēsākhī",
        "ਵੈਸ਼‧ਨੋ": "vēshno",
        "ਆਵਹਿ": "āvēh",
        #
        #
        # wawa on unstressed initial syllable?
        # can explore later
        #
        # ਵ
        "ਵਛਾਈ": "vachāī",
        "ਵਚੋਲਾ": "vacolā",
        "ਵਦ": "vad",
        "ਵੱਡਾ": "vaḍḍā",
        "ਵਡਿਆਈ": "vaḍiāī",
        "ਵਗ‧ਣਾ": "vagṇā",
        "ਵਜਾਉਣਾ": "vajāuṇā",
        "ਵਖ‧ਰਾ": "vakhrā",
        "ਵਕੀਲ": "vakīl",
        "ਵੰਡਨ": "vañḍan",
        "ਵਨਜ": "vanaj",
        "ਵਰ‧ਤਾਉਣਾ": "vartāuṇā",
        "ਦੀਸ੍ਵਰ": "dīsvar",
        #
        # ਵਾ
        "ਵਾਚਕ": "vācak",
        "ਵਾਧੂ": "vādhū",
        "ਵਾਹ": "vāh",
        "ਵਾਕ": "vāk",
        "ਵਾਲਾ": "vālā",
        "ਵਾਰ": "vār",
        "ਵਾਰਸ": "vāras",
        "ਵਾਸ‧ਤੇ": "vāste",
        "ਅਗ‧ਵਾਨ": "agvān",
        #
        # ਵੁ
        "ਵੁਜੂ": "vujū",
        #
        # ਵੂ
        "ਵੂਕ‧ਣੀ": "vūkṇī",
        #
        # ਵੋ
        "ਵੋੜ੍ਹ": "voṛh",
        "ਦਵੋਲੀਆ": "davolīā",
        #
        # ਵੌ
        "ਵੌਕਾ": "vōkā",
        "ਵਹੁਟੀ": "vōhṭī",
        "ਪੀਵਹੁ": "pīvōh",
    }
    for key, value in vava_wawa_words.items():
        assert convert(key, "guru_latn_pa") == value
