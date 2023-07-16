FROM maven:3.8.3-openjdk-17

ADD ./server/cocktail-service /cocktail-service_staging

WORKDIR /cocktail-service_staging

RUN ls -l

RUN mvn clean install -DskipTests

FROM openjdk:17.0.2-jdk

VOLUME /tmp

COPY --from=0 /cocktail-service_staging/target/cocktail-service.jar cocktail-service.jar

CMD ["sh", "-c", "java -Dserver.port=$PORT -Xmx300m -Xss512k -XX:CICompilerCount=2 -Dfile.encoding=UTF-8 -XX:+UseContainerSupport -Dspring.profiles.active=$ACTIVE_PROFILE -Djava.security.egd=file:/dev/./urandom -jar cocktail-service.jar" ]