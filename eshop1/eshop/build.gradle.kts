import org.jetbrains.kotlin.gradle.tasks.KotlinCompile

plugins {
	id("org.springframework.boot") version "3.1.5"
	id("io.spring.dependency-management") version "1.1.3"
	kotlin("jvm") version "1.8.22"
	kotlin("plugin.spring") version "1.8.22"
}

group = "com.example"
version = "0.0.1-SNAPSHOT"

java {
	sourceCompatibility = JavaVersion.VERSION_17
}

repositories {
	mavenCentral()
}

dependencies {
	implementation("org.springframework.boot:spring-boot-starter-web")
	implementation("com.fasterxml.jackson.module:jackson-module-kotlin")
	implementation("org.jetbrains.kotlin:kotlin-reflect")
	testImplementation("org.springframework.boot:spring-boot-starter-test")
	implementation("io.ktor:ktor-server-netty:1.6.10")
	implementation("io.ktor:ktor-server-core:1.6.10")
	implementation("io.ktor:ktor-server-host-common:1.6.10")
	implementation("io.ktor:ktor-server-test-host:1.6.10")

	implementation("io.ktor:ktor-serialization:1.6.10")

	implementation("org.jetbrains.exposed:exposed:0.38.2")

	implementation("org.postgresql:postgresql:42.2.5")

	implementation("io.ktor:ktor-client-core:1.6.10")
	implementation("io.ktor:ktor-client-cio:1.6.10")
	implementation("io.ktor:ktor-client-json:1.6.10")
	implementation("io.ktor:ktor-client-serialization:1.6.10")
}

tasks.withType<KotlinCompile> {
	kotlinOptions {
		freeCompilerArgs += "-Xjsr305=strict"
		jvmTarget = "17"
	}
}

tasks.withType<Test> {
	useJUnitPlatform()
}

tasks.bootBuildImage {
	builder.set("paketobuildpacks/builder-jammy-base:latest")
}

kotlin {
	sourceSets {
		val commonMain by getting {
			dependencies {
				implementation("org.jetbrains.kotlinx:kotlinx-serialization-json:1.3.0")
			}
		}
	}
}