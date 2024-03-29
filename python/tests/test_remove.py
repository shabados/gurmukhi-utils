from gurmukhiutils.constants import VISHRAM_HEAVY, VISHRAM_LIGHT, VISHRAM_MEDIUM
from gurmukhiutils.remove import remove, remove_line_endings, remove_vishrams
from tests.globals import guut


def rv(str):
    return remove_vishrams(str)


def rvh(str):
    return remove(str, [VISHRAM_HEAVY])


def rvm(str):
    return remove(str, [VISHRAM_MEDIUM])


def rvl(str):
    return remove(str, [VISHRAM_LIGHT])


def rvhm(str):
    return remove(str, [VISHRAM_HEAVY, VISHRAM_MEDIUM])


def rle(str):
    return remove_line_endings(str)


def test():
    fnames = ["rv", "rvh", "rvm", "rvl", "rvhm", "rle"]
    functions = {key: globals()[key] for key in fnames}
    guut(functions, "remove")
