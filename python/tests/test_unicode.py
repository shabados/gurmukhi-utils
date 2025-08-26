from gurmukhiutils.unicode import unicode
from .guut import guut


def unicode3(str: str) -> str:
    return unicode(unicode(unicode(str)))


def santlipi(str: str) -> str:
    return unicode(str, "Sant Lipi")


def santlipi3(str: str) -> str:
    return santlipi(santlipi(santlipi(str)))


def unisant(str: str) -> str:
    return unicode(santlipi(str))


def unisant2(str: str) -> str:
    return unisant(unisant(str))


def test():
    guut("toUnicode", globals())
