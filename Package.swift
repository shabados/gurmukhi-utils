// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Gurmukhi",
    platforms: [.macOS(.v13), .iOS(.v16)],
    products: [
        .library(name: "Gurmukhi", targets: ["Gurmukhi"]),
    ],
    targets: [
        .systemLibrary(
            name: "gurmukhiFFI",
            path: "bindings/swift/Sources/gurmukhiFFI"
        ),
        .target(
            name: "Gurmukhi",
            dependencies: ["gurmukhiFFI"],
            path: "bindings/swift/Sources/Gurmukhi"
        ),
        .executableTarget(
            name: "SmokeTest",
            dependencies: ["Gurmukhi"],
            path: "bindings/swift/smoke"
        ),
    ]
)
