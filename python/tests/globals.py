import json
from pathlib import Path


def guut_is(f, a, b):
    assert f(a) == b


def guut_is_not(f, a, b):
    assert f(a) != b


def guut_throws(f, a):
    try:
        assert f(a)
    except Exception:
        assert True
    else:
        assert False, f"{f}({a}) should have raised an exception."


def guut_match(t, f, a, b=None):
    match t:
        case "is":
            guut_is(f, a, b)

        case "is not":
            guut_is_not(f, a, b)

        case "throws":
            guut_throws(f, a)


def guut_run(functions, tests):
    for test in tests:
        for function in test["functions"]:
            assertions = test["assertions"]
            if isinstance(assertions, list):
                for ele in assertions:
                    guut_match(test["type"], functions[function], ele)
            else:
                for key, value in assertions.items():
                    guut_match(test["type"], functions[function], key, value)


def guut(functions, fn):
    fp = Path(__file__).parent.parent.parent.joinpath("test/" + fn + ".json")

    with open(fp, "r") as file:
        data = json.load(file)

    guut_run(functions, data["tests"])
