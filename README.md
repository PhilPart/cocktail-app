# spring-boot-react-cocktail-app
Cocktail application built using Spring Boot and ReactJS.
 
**FEATURES**

- Regular Username/Password authentication.
- Search bar to find cocktails quickly.
- Stores user information in the PostgresSQL database.
- Select filters to display cocktails based on the selections.
- Pagination to display max cocktails on a single page.
- Responsiveness support for all devices.

**TOOLS USED**

- **ReactJS:** Front-end Javascript framework.
- **Spring Boot 3.0:** Back-end JAVA framework to build microservices using Spring
 Rest Controller and Spring JPA.
- **Material-UI:** Used Google's material design based on the CSS Framework for a responsive website.
- **PostgresSQL:** Stores product and user information.
- **Docker-Compose:** Easy way to bring up the application using containerization and behaves similarly in the production environment.
 
**MICROSERVICES**

**Steps for executing the application using docker-compose:**

1. Clone/Download the repository.

2. Set the environmental variables which will be impacted on docker-compose.yml.
   
3. Build and run the app using docker-compose. This is done using ./start-all.sh script which creates the network and set the container dependencies based on the config mention in the docker-compose.yml. 
   This will build all the jar files and run all the services.
   ```
      ./start-all.sh
   ```

4. If you are making any change in the code then you need to you ./stop-all.sh to clean up the jars created by ./start-all.sh script.