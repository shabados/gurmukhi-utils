from gurmukhiutils.ascii import ascii  # noqa: F401
from tests.globals import guut


def test():
    fnames = ["ascii"]
    functions = {key: globals()[key] for key in fnames}
    guut(functions, "toAscii")
