To run this app, clone it and open it from your prefered editor, eg Visual Studio

Note: this code base includes the web api, front end react app, nginx setup.


To run the app, ensure you have docker desktop running in your computer. 

Then open the project from your editor and run it by selecting and clicking the docker compose button - this works in visual studio, rider

The application will create the following docker containers: web api, react app, seq, sql server, nginx

nginx serves as a reverse proxy for the frontend and api.

#### To access the home page, type localhost in your browser and click on enter. It will prompt you to enter a user name and password (nginx basic authentication)

#### Enter the following: 

#### username: admin   

#### password: password123@

Once logged in, it will bring you to the home page of the application. 

To access the string processing feature, you need to login to the application itself. For that I have seeded the following user credentials


#### User 1: email: victorblaze@gmail.com  password: 123Pa$$word!

#### User 2: email: victorblaze2010@gmail.com  password: 123Pa$$word!


Note: The application uses Seq for logging and monitoring - use the following credentials to access the seq dashboard: 

url: http://localhost:8081/#/login 
username: admin   password: Passw@rd123


#### The frontend was built with React, Typescript and Bootstrap

#### The Architecture/Setup for the WEB API includes

-.NET 8

-Clean Architecture

-CQRS

-Hangfire 

-SignalR - used strongly typed hubs, JWT Authentication to make sure messages are sent to specific users

-Caching using Memory Cache

-Idempotency

-Seq/Serilog for logging

-Fluent Validation

-Entity Framework Core

-MSSQL

-Docker 

-Unit Tests

-Architecture Tests

-Rate Limiting

-JWT Authentication/Authorization

-CORS

-Global error handling + Problem Details

happy testing.
With love from Chibuzor
