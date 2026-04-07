import Foundation
import XCTest

typealias Fn = (String) -> String

struct TestUnit: Decodable {
    let name: String
    let functions: [String]
    let type: String
    let assertions: Assertions

    enum Assertions: Decodable {
        case list([String])
        case map([String: String])

        init(from decoder: Decoder) throws {
            let container = try decoder.singleValueContainer()
            if let list = try? container.decode([String].self) {
                self = .list(list)
            } else if let map = try? container.decode([String: String].self) {
                self = .map(map)
            } else {
                throw DecodingError.typeMismatch(
                    Assertions.self,
                    DecodingError.Context(codingPath: decoder.codingPath, debugDescription: "Expected array or object")
                )
            }
        }
    }
}

func guut(_ testName: String, functions: [String: Fn], file: StaticString = #file, line: UInt = #line) {
    let url = URL(fileURLWithPath: #filePath)
        .deletingLastPathComponent() // Tests/GurmukhiUtilsTests
        .deletingLastPathComponent() // Tests
        .deletingLastPathComponent() // swift
        .deletingLastPathComponent() // bindings
        .deletingLastPathComponent() // root
        .appendingPathComponent("test/\(testName).json")

    guard let data = try? Data(contentsOf: url) else {
        XCTFail("Could not read \(url.path)", file: file, line: line)
        return
    }

    guard let units = try? JSONDecoder().decode([TestUnit].self, from: data) else {
        XCTFail("Could not decode \(testName).json", file: file, line: line)
        return
    }

    for unit in units {
        for funcName in unit.functions {
            guard let fn = functions[funcName] else {
                XCTFail("Unknown function: \(funcName)", file: file, line: line)
                continue
            }

            switch unit.type {
            case "is":
                if case .map(let assertions) = unit.assertions {
                    for (input, expected) in assertions {
                        XCTAssertEqual(fn(input), expected, "\(funcName)(\(input))")
                    }
                }
            case "is not":
                if case .map(let assertions) = unit.assertions {
                    for (input, expected) in assertions {
                        XCTAssertNotEqual(fn(input), expected, "\(funcName)(\(input))")
                    }
                }
            case "is-self":
                let inputs: [String]
                switch unit.assertions {
                case .list(let list): inputs = list
                case .map(let map): inputs = Array(map.keys)
                }
                for input in inputs {
                    XCTAssertEqual(fn(input), input, "\(funcName)(\(input)) should be self")
                }
            default:
                XCTFail("Unknown test type: \(unit.type)")
            }
        }
    }
}
