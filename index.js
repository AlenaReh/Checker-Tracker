const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");
const chalk = require("chalk");
var figlet = require("figlet");

console.log(
  chalk.green(figlet.textSync("Hello There!", { horizontalLayout: "full" }))
);
// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // MySQL username,
    user: "root",
    // MySQL password
    password: "password",
    database: "staff_db",
  },
  console.log(`Connected to the staff_db database.`)
);

// Validation for a string
const validateName = (answer) => {
  const pass = answer.match(/^[a-z A-Z]+$/);
  if (pass) {
    return true;
  }
  return chalk.red("Please enter a valid name.");
};

// Validation for a numerical value
const validateNumber = (answer) => {
  const pass = answer.match("^[0-9]+$");
  if (pass) {
    return true;
  }
  return chalk.red("Please enter a numeric value.");
};

// Main prompt questions
const mainLobby = () => {
  inquirer
    .prompt({
      type: "list",
      name: "mainListOfActions",
      message: chalk.yellow(`What would you like to do?`),
      choices: [
        "View All Employees",
        "Add Employee",
        "Update Employee Role",
        "View All Roles",
        "Add a Role",
        // "Delete a Role",
        "View All Departments",
        "Add a Department",
        "Quit",
      ],
    })
    .then((choice) => {
      switch (choice.mainListOfActions) {
        case "View All Employees":
          viewEmployees();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateRole();
          break;
        case "View All Roles":
          viewRoles();
          break;
        case "Add a Role":
          addRole();
          break;
        // case "Delete a Role":
        //   deleteRole();
        //   break;
        case "View All Departments":
          viewDep();
          break;
        case "Add a Department":
          addDep();
          break;
        case "Quit":
          quit();
          break;
        default:
          console.log("Ooops! There is an error");
      }
    });
};

// Function for viewing all of the emplioyees
const viewEmployees = () => {
  db.query(
    `SELECT employees.id, first_name, last_name, roles.title, roles.salary, departments.dep_name AS department, manager_id AS manager FROM employees 
    JOIN roles ON roles.id = employees.role_id
    JOIN departments ON departments.id = roles.dep_id;`,
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(data);
      mainLobby();
    }
  );
};

//Adding a new Employee to the database;
const addEmployee = () => {
  db.query(`SELECT * FROM roles
  JOIN employees ON employees.id = roles.id`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const roleData = data.map((role) => ({
      name: role.title,
      value: role.id,
    }));
    const managers = data.map((myManager) => ({
      name: myManager.last_name,
      value: myManager.manager_id,
    }))

    inquirer
      .prompt([
        {
          type: "input",
          name: "firstName",
          message: chalk.yellow(`What is the employee's name?`),
          validate: validateName,
        },
        {
          type: "input",
          name: "lastName",
          message: chalk.yellow(`What is the employee's last name?`),
          validate: validateName,
        },
        {
          type: "list",
          name: "title",
          message: chalk.yellow(`What is the employee's title?`),
          choices: roleData,
        },
        {
          type: "list",
          name: "manager",
          message: chalk.yellow(`Who is the employee's manager?`),
          choices: managers,
        },
      ])
      .then((data) => {
        db.query(
          "INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)",
          [data.firstName, data.lastName, data.title, data.manager],
          (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(chalk.red("A new employee was added to the database"));
            mainLobby();
          }
        );
      });
  });
};

//Function for updating roles
const updateRole = () => {
  db.query(`SELECT * FROM employees;`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    db.query(`SELECT * FROM roles;`, (err, roles) => {
      if (err) {
        console.log(err);
        return;
      }

      const listOfNames = data.map(
        (staffNames) =>
          `${staffNames.id}: ${staffNames.first_name} ${staffNames.last_name} `
      );
      const rolesData = roles.map((listOfRoles) => ({
        name: listOfRoles.title,
        value: listOfRoles.id,
      }));
      inquirer
        .prompt([
          {
            type: "list",
            name: "updatedEmployee",
            message: chalk.yellow(
              `Which employee's role would you like to update?`
            ),
            choices: listOfNames,
          },
          {
            type: "list",
            name: "updatedRole",
            message: chalk.yellow(
              `Which role do you wish to assign to the selected employee?`
            ),
            choices: rolesData,
          },
        ])

        .then((udateEmployeeResponse) => {
          console.log(udateEmployeeResponse);
          db.query(
            `UPDATE employees SET role_id = ? WHERE id = ?`,
            [
              udateEmployeeResponse.updatedRole,
              udateEmployeeResponse.updatedEmployee.split(": ")[0],
            ],
            (err, roles) => {
              if (err) {
                console.log(err);
              }
              console.log(
                chalk.red(
                  `An employee role has been successfully updated in the database!`
                )
              );
              mainLobby();
            }
          );
        });
    });
  });
};

//function hat allows you to view rolls
const viewRoles = () => {
  db.query(
    `SELECT roles.id, title, salary, departments.dep_name AS department FROM roles 
    JOIN departments on departments.id = roles.dep_id;`,
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      }
      console.table(data);
      mainLobby();
    }
  );
};

//Adds a new role into the database
const addRole = () => {
  db.query(`SELECT * FROM departments`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    const depData = data.map((department) => ({
      name: department.dep_name,
      value: department.id,
    }));
    // console.table("department data \n", depData);
    inquirer
      .prompt([
        {
          type: "input",
          name: "title",
          message: chalk.yellow(`What is the name of the role you wish to add?`),
          validate: validateName,
        },
        {
          type: "input",
          name: "salary",
          message: chalk.yellow(`What is the salary going to be for this role?`),
          validate: validateNumber,
        },
        {
          type: "list",
          name: "role",
          message: chalk.yellow(`What department does the role belong to?`),
          choices: depData,
        },
      ])
      .then((data) => {
        db.query(
          `INSERT INTO roles (title, salary, dep_id) VALUES (?, ?, ?)`,
          [data.title, data.salary, data.role],
          (err, data) => {
            if (err) {
              console.log(err);
            }
            console.log(chalk.red(`A new role is added to the database`));
            mainLobby();
          }
        );
      });
  });
};

//function to delete a role
// const deleteRole = () => {
//   db.query(`SELECT * FROM roles`, (err, data) => {
//     if (err) {
//       console.log(err);
//       return;
//     }
//     const deleteData = data.map(listOfRoles => ({
//       name: listOfRoles.title,
//       value: listOfRoles.id
//     }));
//     console.table("deleting \n", deleteData);
//   inquirer
//       .prompt([
//         {
//           type: "list",
//           name: "deletedRole",
//           message: chalk.yellow(`What role would you like to delete?`),
//           choices: deleteData,
//         },
//       ])
//       .then((deletedRole) => {
//         db.query(
//           `DELETE FROM roles WHERE id = ?`,
//           [deletedRole.deleteData],
//           (err, data) => {
//             if (err) {
//               console.log(err);
//             }
//             console.log(`A role has been deleted from the database`);
//             mainLobby();
//           }
//         );
//       });
//   });

// }

//Function for viewing all of the departments
const viewDep = () => {
  db.query(`SELECT * FROM departments;`, (err, data) => {
    if (err) {
      console.log(err);
      return;
    }
    console.table(data);
    mainLobby();
  });
};

//Adds a new department to the database;
const addDep = () => {
  inquirer
    .prompt([
      {
        type: "input",
        name: "department",
        message: chalk.yellow(
          `What is the name of the department you wish to add?`
        ),
        validate: validateName,
      },
    ])
    .then((data) => {
      db.query(
        `INSERT INTO departments (dep_name) VALUES (?)`,
        data.department,
        (err, data) => {
          if (err) {
            console.log(err);
          }
          console.log(
            chalk.red(
              `A new department ${data.department} is added to the database`
            )
          );
          mainLobby();
        }
      );
    });
};

//Quit function
const quit = () => {
  console.log(
    chalk.green(figlet.textSync("Goodbye!", { horizontalLayout: "full" }))
  );
  process.exit();
};

mainLobby();
