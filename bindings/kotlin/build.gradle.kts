plugins {
    kotlin("jvm") version "2.1.20"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("net.java.dev.jna:jna:5.17.0")
    testImplementation(kotlin("test"))
    testImplementation("com.google.code.gson:gson:2.12.1")
}

sourceSets {
    main {
        kotlin.srcDirs("lib")
    }
}

tasks.test {
    useJUnitPlatform()
    systemProperty("java.library.path", System.getenv("LD_LIBRARY_PATH") ?: "")
}
