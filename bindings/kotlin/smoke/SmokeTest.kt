import uniffi.gurmukhi.toUnicode
import uniffi.gurmukhi.UnicodeStandard

fun main() {
    val result = toUnicode("gurU", UnicodeStandard.SANT_LIPI)
    check(result == "ਗੁਰੂ") { """FAIL: expected "ਗੁਰੂ", got "$result"""" }
    println("PASS: Kotlin")
}
