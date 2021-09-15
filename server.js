const express = require('express');
const mysql = require('mysql2');
const cTable = require('console.table');
const chalk = require("chalk");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// Connect to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    // MySQL username,
    user: 'root',
    // MySQL password
    password: 'password',
    database: 'staff_db'
  },
  console.log(`Connected to the staff_db database.`)
);

// Default response for any other request (Not Found)
app.use((req, res) => {
    res.status(404).end();
  });
  
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

// The users input must be a string
const validateName = answer => {
    const pass = answer.match(
      /^[a-z A-Z]+$/
    );
    if (pass) {
      return true;
    }
    return (chalk.red("Please enter a valid name."));
  };
// validate a numerical value
const validateNumber = answer => {
    const pass = answer.match(
      '^[0-9]+$'
    );
    if (pass) {
      return true;
    }
    return (chalk.red("Please enter a numeric value."));
  };

  // prompt questions
const mainLobby = () => {
    inquirer.prompt (
    {
        type: 'list',
        name: 'mainListOfActions',
        message: (chalk.yellow(`What would you like to do?`)),
        choices: ['View All Employees', 'Add Employee', 'Update Employee Role', 'View All Roles', 'Add a Role', 'View All Departments', 'Add a Department', 'Quit']
    }).then((choice) => {
        switch (choice.action) {
            case 'View All Employees':
                viewEmployees();
                break;
            case 'Add Employee':
                addEmployee();
                break;
            case 'Update Employee Role':
                updateRole();
                break;
            case 'View All Roles':
                viewRoles();
                break;
            case 'Add a Role':
                addRole();
                break;
            case 'View All Departments':
                viewDep();
                break;
            case 'Add a Department':
                addDep();
                break;
            case 'Quit':
                quit();
                break;
            default:
                //

        }
    })
};

