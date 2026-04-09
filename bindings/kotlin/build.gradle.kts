plugins {
    kotlin("jvm") version "2.1.20"
    `maven-publish`
}

group = "com.shabados"
version = "1.0.0"

repositories {
    mavenCentral()
}

dependencies {
    implementation("net.java.dev.jna:jna:5.17.0")
}

sourceSets {
    main {
        kotlin.srcDirs("lib")
        resources.srcDirs("resources")
    }
}

publishing {
    publications {
        create<MavenPublication>("maven") {
            groupId = "com.shabados"
            artifactId = "gurmukhi"
            from(components["java"])

            pom {
                name.set("Gurmukhi")
                description.set("Kotlin library for converting, analyzing, and testing Gurmukhi strings")
                url.set("https://github.com/shabados/gurmukhi-utils")
                licenses {
                    license {
                        name.set("MIT")
                        url.set("https://opensource.org/licenses/MIT")
                    }
                }
            }
        }
    }
}
