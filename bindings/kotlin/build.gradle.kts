plugins {
    kotlin("jvm") version "2.1.20"
    `maven-publish`
}

group = "com.shabados"
version = "1.0.0" // x-release-please-version

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

val smoke by sourceSets.creating {
    kotlin.srcDirs("smoke")
    compileClasspath += sourceSets["main"].output + sourceSets["main"].compileClasspath
    runtimeClasspath += sourceSets["main"].output + sourceSets["main"].runtimeClasspath
}

tasks.register<JavaExec>("runSmoke") {
    dependsOn(tasks.named("compileSmokeKotlin"))
    classpath = smoke.runtimeClasspath
    mainClass.set("SmokeTestKt")
    systemProperty("jna.library.path", file("../../target/release").absolutePath)
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
