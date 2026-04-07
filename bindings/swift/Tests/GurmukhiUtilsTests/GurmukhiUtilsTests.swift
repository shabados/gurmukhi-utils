import XCTest
import GurmukhiUtils

final class ToAsciiTests: XCTestCase {
    func testToAscii() {
        guut("toAscii", functions: [
            "ascii": { toAscii(input: $0) },
        ])
    }
}

final class ToUnicodeAsciiTests: XCTestCase {
    func testRoundtrip() {
        guut("toUnicodeAscii", functions: [
            "a2a": { toAscii(input: toUnicode(input: $0, standard: .santLipi)) },
        ])
    }
}
