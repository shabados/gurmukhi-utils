import Gurmukhi

@main
struct SmokeTest {
    static func main() {
        let result = toUnicode(input: "gurU", standard: .santLipi)
        guard result == "ਗੁਰੂ" else {
            fatalError("FAIL: expected ਗੁਰੂ, got \(result)")
        }
        print("PASS: Swift")
    }
}
