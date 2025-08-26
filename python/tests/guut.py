import json
from pathlib import Path
from typing import Any, Dict, List, Union


def guut_is(f, a, b):
    assert f(a) == b, (
        f"\nf = {f.__name__}\na = '{a}'\nb = '{b}'\nf(a) = '{f(a)}'\n\na = {[{item: format(ord(item), '04x')} for item in a]}\nb = {[{item: format(ord(item), '04x')} for item in b]}\nf = {[{item: format(ord(item), '04x')} for item in f(a)]}"
    )


def guut_is_not(f, a, b):
    assert f(a) != b, (
        f"\nf = {f.__name__}\na = '{a}'\nb = '{b}'\nf(a) = '{f(a)}'\n\na = {[{item: format(ord(item), '04x')} for item in a]}\nb = {[{item: format(ord(item), '04x')} for item in b]}\nf = {[{item: format(ord(item), '04x')} for item in f(a)]}"
    )


TestParameters = Union[
    Dict[str, Union[str, Dict[str, str]]],  # type: 'is' | 'is not', assertions: Record<string, string>
    Dict[str, Union[str, List[str]]],  # type: 'is-input', assertions: string[]
]

TestUnit = Dict[str, Any]  # name, functions, type, assertions


def assert_test(unit: TestParameters, fn: Any) -> None:
    if unit["type"] in ["is", "is not"]:
        assertions = unit["assertions"]
        for input_val, expected in assertions.items():
            if unit["type"] == "is":
                guut_is(fn, input_val, expected)
            elif unit["type"] == "is not":
                guut_is_not(fn, input_val, expected)

    elif unit["type"] == "is-self":
        assertions = unit["assertions"]
        for input_val in assertions:
            guut_is(fn, input_val, input_val)


def run(units: List[TestUnit], fns: Dict[str, Any]) -> None:
    for unit in units:
        functions = unit["functions"]

        for func in functions:
            test_params = {
                k: v for k, v in unit.items() if k not in ["name", "functions"]
            }
            assert_test(test_params, fns[func])


def guut(fn, functions):
    fp = Path(__file__).parent.parent.parent.joinpath("test/" + fn + ".json")

    with open(fp, "r") as file:
        data = json.load(file)

    run(data, functions)
