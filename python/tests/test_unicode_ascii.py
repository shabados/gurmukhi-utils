from gurmukhiutils.ascii import ascii  # noqa: F401
from gurmukhiutils.unicode import unicode
from tests.globals import guut


def a2a(str: str) -> str:
    return ascii(unicode(str, "Sant Lipi"))


def test():
    fnames = ["a2a"]
    functions = {key: globals()[key] for key in fnames}
    guut(functions, "toUnicodeAscii")
