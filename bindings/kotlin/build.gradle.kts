plugins {
    kotlin("jvm") version "2.1.20"
}

repositories {
    mavenCentral()
}

dependencies {
    implementation("net.java.dev.jna:jna:5.17.0")
}

sourceSets {
    main {
        kotlin.srcDirs("lib")
    }
}
