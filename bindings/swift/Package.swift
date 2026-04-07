// swift-tools-version: 5.9
import PackageDescription

let package = Package(
    name: "GurmukhiUtils",
    products: [
        .library(name: "GurmukhiUtils", targets: ["GurmukhiUtils"]),
    ],
    targets: [
        .systemLibrary(
            name: "gurmukhi_utilsFFI",
            path: "Sources/gurmukhi_utilsFFI"
        ),
        .target(
            name: "GurmukhiUtils",
            dependencies: ["gurmukhi_utilsFFI"],
            path: "Sources/GurmukhiUtils"
        ),
        .testTarget(
            name: "GurmukhiUtilsTests",
            dependencies: ["GurmukhiUtils"],
            path: "Tests/GurmukhiUtilsTests"
        ),
    ]
)
