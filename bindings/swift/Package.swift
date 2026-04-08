// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "Gurmukhi",
    products: [
        .library(name: "Gurmukhi", targets: ["Gurmukhi"]),
    ],
    targets: [
        .systemLibrary(
            name: "gurmukhiFFI",
            path: "Sources/gurmukhiFFI"
        ),
        .target(
            name: "Gurmukhi",
            dependencies: ["gurmukhiFFI"],
            path: "Sources/Gurmukhi"
        ),
        .executableTarget(
            name: "SmokeTest",
            dependencies: ["Gurmukhi"],
            path: "smoke"
        ),
    ]
)
