package gurmukhi_utils.test

import uniffi.gurmukhi_utils.toAscii
import uniffi.gurmukhi_utils.toUnicode
import uniffi.gurmukhi_utils.normalizeUnicode
import uniffi.gurmukhi_utils.UnicodeStandard
import kotlin.test.Test

class ToAsciiTest {
    @Test
    fun testToAscii() {
        guut("toAscii", mapOf("ascii" to ::toAscii))
    }
}

class ToUnicodeAsciiTest {
    @Test
    fun testRoundtrip() {
        guut("toUnicodeAscii", mapOf(
            "a2a" to { s: String -> toAscii(toUnicode(s, UnicodeStandard.SANT_LIPI)) },
        ))
    }
}
