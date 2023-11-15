FROM openjdk:21-oracle
EXPOSE 8080
ADD target/backend-0.0.1-SNAPSHOT.jar backend-0.0.1-SNAPSHOT.jar
#RUN ./mvnw package
ENTRYPOINT ["java", "-jar", "backend-0.0.1-SNAPSHOT.jar"]