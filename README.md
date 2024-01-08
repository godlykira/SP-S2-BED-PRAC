# Authentication with JWT Token and Password Hashing

This repository contains test cases for an application using Node.js, Express, MySQL, JSON Web Token and Bcrypt.

## Prerequisites

Before running the tests, ensure that the following dependencies are installed:

- Node.js
- npm (Node Package Manager)

## Clone the Repository

1. Open Visual Studio Code (VSCode) on your local machine.

2. Click on the "Source Control" icon in the left sidebar (the icon looks like a branch).

3. Click on the "Clone Repository" button.

4. In the repository URL input field, enter `https://github.com/ST0503-BED/your-repository-name.git`.

5. Choose a local directory where you want to clone the repository.

6. Click on the "Clone" button to start the cloning process.

## Setting Up Environment Variables

This repository provides instructions for setting up environment variables using a `.env` file in an Express.js application. The environment variables will be used in the `db.js` file located in the `src/services` directory.

### Setup

To set up environment variables for your Express.js application, follow these steps:

1. Create a file named `.env` in the root directory of your project.
2. Open the `.env` file and add the following lines:

   ```
   DB_HOST=<your_database_host>
   DB_USER=<your_database_user>
   DB_PASSWORD=<your_database_password>
   DB_DATABASE=<your_database_name>
   JWT_SECRET_KEY=<your_secret_key>
   JWT_EXPIRES_IN=<duration>
   JWT_ALGORITHM=<selected_algorithm>
   ```

   Replace `<your_database_host>`, `<your_database_user>`, `<your_database_password>`, and `<your_database_name>` with the appropriate values for your database connection.

   Replace `<your_secret_key>`, `<duration>`, and `<selected_algorithm>` with the appropriate values for your JSON web token usage.

   For example:

   ```
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=1234
   DB_DATABASE=pokemon
   JWT_SECRET_KEY=your-secret-key
   JWT_EXPIRES_IN=15m
   JWT_ALGORITHM=HS256
   ```

   Note: Make sure there are no spaces around the equal sign (=) in each line.

3. Save the `.env` file.

### Usage

The `db.js` file in the `src/services` directory uses the `dotenv` package to read the `.env` file and set the environment variables. Here's an example of how the `db.js` file should look:

```javascript
require('dotenv').config(); // Read .env file and set environment variables

const mysql = require('mysql2');

const setting = {
    connectionLimit: 10, // Set limit to 10 connections
    host: process.env.DB_HOST, // Get host from environment variable
    user: process.env.DB_USER, // Get user from environment variable
    password: process.env.DB_PASSWORD, // Get password from environment variable
    database: process.env.DB_DATABASE, // Get database from environment variable
    multipleStatements: true, // Allow multiple SQL statements
    dateStrings: true // Return date as string instead of Date object
}

const pool = mysql.createPool(setting);

module.exports = pool;
```

The `dotenv` package is used to load the environment variables from the `.env` file, and `process.env` is used to access these variables in your code.

Make sure to include the `require('dotenv').config();` line at the beginning of your file to load the environment variables from the `.env` file.

## Important Note

Ensure that the `.env` file is included in your `.gitignore` file to prevent sensitive information (such as database credentials) from being exposed in your version control system.

That's it! You have successfully set up environment variables using a `.env` file in your Express.js application. These variables can now be accessed in the `db.js` file or any other part of your application where needed.

Now you can move on to next part below.

## Install Dependencies

1. Open the terminal in VSCode by going to `View` > `Terminal` or using the shortcut `Ctrl + ``.

2. Navigate to the project root directory.

3. Install the required dependencies using npm:

   ```
   npm install
   ```

## Database Initialization

1. Make sure you have a MySQL database available for the mock test. Update the database configuration details in the `.env` file.

2. To initialize the database tables and populate them with sample data, open the terminal in VSCode and run the following command:

   ```
   npm run init_tables
   ```

## Commit and Sync Changes

1. Open the Source Control view in VSCode by clicking on the "Source Control" icon in the left sidebar.

2. Review the changes you made to the files.

3. Enter a commit message summarizing your changes in the input field at the top of the Source Control view.

4. Click on "Commit" to commit the changes.

5. Click on "Sync" to push your changes to the remote repository.

   Note: Make sure you have the necessary permissions to push changes to the repository.

## Submission

Once you have completed the practical and synchronized your changes, check the autograde of your submission.

**You may read the Test Cases below**

## Test Cases

### Registration

- `POST /register` should create a new user.
- `POST /register` should return an error if the username or email already exists.
- `POST /login` should return a JWT token.
- `POST /login` should return an error if the username or password is incorrect.

### Authentication

- `POST /login` should return a JWT token.
- `GET /jwt/verify` should return 'Success' when a valid JWT is provided.
- `GET /jwt/verify` should return 'No token provided' when no JWT is provided.
- `GET /jwt/verify` should return 'Invalid token' when an invalid JWT is provided.

### Bcrypt Hash Password

- `POST /bcrypt/hash` should hash the provided password.

### Bcrypt Compare Password

- `POST /bcrypt/compare` should return a success message when the correct password is provided.
- `POST /bcrypt/compare` should return an error message when an incorrect password is provided.

### JWT Generate Token and Verify (Randomized)

For each iteration:
- `POST /jwt/generate` should generate a JWT token.
- `GET /jwt/verify` should verify the generated JWT token.

## Additional Information

Please note that the test cases make use of randomized usernames, passwords, and user IDs. This ensures that the tests are not dependent on specific user information and can be run multiple times.

## Additional Information

- The tests assume the presence of a MySQL database and use the `mysql2` package for database interactions. Make sure to configure the database connection details in your Express.js application.
- The tests also assume the usage of the `pool` object from `src/services/db.js` for database operations.

## Test Execution

When you commit and push your changes, the GitHub Actions workflow will automatically run the unit tests. The test results will be displayed in the issues section of your GitHub repository.

The workflow includes a step that creates a new issue with the test results. The issue will include the following metrics:

| Metric           | Value        |
| ---------------- | ------------ |
| Total Pass       | \<pass count\>    |
| Total Failed     | \<fail count\>    |
| Total Tests      | \<total count\>   |
| Pass Percentage  | \<pass percentage\>% |

This allows you to easily track the test results and investigate any failures.

Please note that the result is generated based on the structure and format of your unit tests. Make sure your tests produce the necessary output for the issue creation step to work correctly.