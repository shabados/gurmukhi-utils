import sys
import os

sys.path.insert(0, os.path.dirname(__file__))

from gurmukhi.gurmukhi import to_unicode, UnicodeStandard

result = to_unicode("gurU", UnicodeStandard.SANT_LIPI)
assert result == "ਗੁਰੂ", f'FAIL: expected "ਗੁਰੂ", got "{result}"'
print("PASS: Python")
