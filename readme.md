# Practice - Autograding Instructions

This repository contains a practice for the models of an Express.js application. The practice is designed to evaluate the implementation of the model functions that interact with the database. The following instructions outline the expected behavior that will be tested.

## Instructions

1. **Clone the repository**: Clone this repository to your local machine.

   ```shell
   git clone https://github.com/your-username/your-repository-name.git
   ```

2. **Navigate to the repository**: Change to the repository's directory.

   ```shell
   cd your-repository-name
   ```

3. **Install dependencies**: Install the necessary dependencies by running the following command.

   ```shell
   npm install
   ```

4. **Implement your model functions**: Create your model functions for interacting with the database based on the following specifications.

   - **selectById**: This function should retrieve player data from the database based on the provided `id`. The test will check if the function returns an object and does not return an error.

   - **selectAll**: This function should retrieve all player data from the database. The test will check if the function returns an array of player objects and does not return an error.

   - **insertSingle**: This function should insert a new player into the database with the provided `name` and `level`. The test will check if the function returns an object with the `affectedRows` property set to 1 and does not return an error.

   - **updateById**: This function should update the player in the database with the provided `id`, `name`, and `level`. The test will check if the function does not return an error.

   - **deleteById**: This function should delete the player from the database with the provided `id`. The test will check if the function does not return an error.

5. **Run the tests**: Execute the test suite to run the automated tests.

   ```shell
   npm test
   ```

6. **Review the test results**: After running the tests, the test suite will display the results in the console. It will indicate which tests passed and which tests failed. Pay attention to the failure messages to identify any errors in your model functions.

7. **Debug and iterate**: If any tests fail, review the failure messages and debug your model functions accordingly. Make the necessary modifications to fix the issues and rerun the tests to verify your changes.

8. **Repeat steps 5 and 6**: Continue iterating on your model functions, fixing any failing tests until all the tests pass successfully.

9. **Submit your solution**: Once all the tests pass, you can submit your solution for grading or further evaluation.

Note: Make sure your model functions follow the specified method names and interact correctly with the database according to the given instructions.



# Package.json Script Explanation

The `package.json` file contains a set of scripts that can be executed using the `npm run` command. These scripts automate various tasks and provide shortcuts for common operations. Here is an explanation of the scripts defined in the provided `package.json` file:

- **test**: This script is used for running the test suite. It first executes the `init_tables` script to initialize the necessary database tables, and then runs the `jest` test runner with the `--forceExit` flag to ensure the test process terminates after completing the tests.

- **init_tables**: This script executes the `initTables.js` file located in the `src/configs` directory. It is responsible for initializing the database tables before running the tests.

- **create**: This script executes the `create.js` file located in the `examples/crud` directory. It is used to demonstrate the create operation for the CRUD (Create, Read, Update, Delete) functionality.

- **read**: This script executes the `read.js` file located in the `examples/crud` directory. It is used to demonstrate the read operation for the CRUD functionality.

- **update**: This script executes the `update.js` file located in the `examples/crud` directory. It is used to demonstrate the update operation for the CRUD functionality.

- **delete**: This script executes the `delete.js` file located in the `examples/crud` directory. It is used to demonstrate the delete operation for the CRUD functionality.

- **start**: This script is a combination of multiple scripts executed sequentially to simulate a full application workflow. It first executes the `init_tables` script to initialize the database tables. Then it performs a series of operations: read, create, read, update, read, delete, and read. This script is useful for quickly running a sequence of operations to test the application's functionality.

You can run these scripts using the `npm run` command followed by the script name. For example, to run the test script, you would execute `npm run test`. Similarly, you can run other scripts like `npm run create`, `npm run read`, etc.

Make sure to review and understand each script's purpose before running them to ensure they align with your requirements and environment.