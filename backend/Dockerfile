# Multi-Stage Dockerfile for Spring Boot 3 Backend (Java 21)
# Stage 1: Build JAR using Maven (JDK 21)
FROM maven:3.9.9-eclipse-temurin-21-jammy AS builder
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline -B || true
COPY src ./src
RUN mvn clean package -DskipTests -B

# Stage 2: Minimal JRE 21 Runtime
FROM eclipse-temurin:21-jre-jammy
WORKDIR /app
COPY --from=builder /app/target/codepath-academy-backend-1.0.0.jar app.jar
EXPOSE 8080
ENV SERVER_PORT=8080
ENTRYPOINT ["java", "-XX:+UseContainerSupport", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
