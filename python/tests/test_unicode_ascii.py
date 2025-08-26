from gurmukhiutils.ascii import ascii  # noqa: F401
from gurmukhiutils.unicode import unicode
from .guut import guut


def a2a(str: str) -> str:
    return ascii(unicode(str, "Sant Lipi"))


def test():
    guut("toUnicodeAscii", globals())
