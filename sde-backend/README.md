# Employee Management Back-end Application Developed using Node.js

## Overview

A backend Application which allows employees to:

1. Signup to a employee management system
2. Login
3. View all employees details
4. Find a particular employee by id.

## Tech Stack:

1. Node.js
2. Express.js
3. MongoDB (Atlas)

## APIs

\*\*\*running on localhost: 3000

1. **/auth/signup**: Sign up as an employee by passing name, email and password as json object.
2. **/auth/login**: Login if already registered by passing email and password as json object. A user specific token is generated which is used for verification in other API calls.
3. **/getEmployees**: Fetch all employees and their details from the database
4. **/getEmployee/employeeID**: Fetch the details of the employee with the user specified ID.

## Pipeline for checking:

Follow the steps in order below:

1. Sign up as an employee by making a POST request to **/auth/signup** with a json object containing name, email and password.
2. Login to your accounnt by making a POST request to **/auth/login** with a json object containing email and password. A token is generated. Copy the token.
3. To make a GET call to **/getEmployees**, first paste the token in Authorization Header in the format "Bearer " followed by the token. Then make the API call to get employees. Without authorisation, it will show 'Auth Failed' and not return the details.
4. Follow the same process as in step 3 to make a GET call to **/getEmployee** followed the ID of the employee whoose details need to be retrived.

## Set-up

1. Clone the repository to your local system
2. run 'npm install'
3. Go the 'Backend' directory using 'cd backend'
4. run 'nodemon server.js'

## Packages used

1. **bcrypt**: Hash the employee password before storing to database
2. **body-parser**: Parse incoming urls and json objects
3. **express**: Framework to help in creating APIs,
4. **jsonwebtoken**: Create and verify token during login,
5. **mongoose**: Communicate with MongoDB database,
6. **morgan**: Logger to log to the command line,
7. **nodemon**: Auto refresh node server
