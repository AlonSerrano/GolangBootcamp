#  Simple Session on node with Loopback

Hi I'm Luis and this is a rest api which will provide authentication to the user generating a JWT and sending an OTP from [message bird](https://www.messagebird.com/).
The application is based on node with express and the loopback 4 framework, it currently has the database implemented in MySql but uses [typeORM](https://typeorm.io/#/)  as a database manager so you can use any of the ones it supports
## Prerequisites

To run the program we need the following

 - Node v14.8.0 ++
 - MySql 8.0.21 ++
 
## Run the scripts

Firs create a database and run the following scripts in the path:

    db/tables

In the following order:

 - Rol.sql
 - Otp.sql
 - Usuario.sql
 - RolUsuario.sql

## Create an account on MessageBird
Go to  [message bird](https://www.messagebird.com/) create an account and get your Key and the phone originator of the messages
  
## Variables

Please declare the next variables on your process.env

|Env Name                 |Value                          |
|-------------------------|-------------------------------|
|NODE_ENV		          |`DEV`            |
|MESSAGEBIRD_KEY          |`message_bird_key `            |
|MESSAGEBIRDORIGINATOR    |`message_bird_originator`|


# Run the project 
Open the project dir on terminal and run:

    npm install
    npm run clean
    npm run build
    npm run start
    
# Consume the end-points

A swagger interface is launch on the`localhost:3000/explorer` check it for more references, the happy route is: 

    http://localhost:3000/$PATH

 - /helloword - GET
 - /usuario/requireSignUp
 - /usuario/signUp
 - /usuario/signIn