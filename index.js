const inquirer = require("inquirer");
const mysql = require("mysql2");

const db = require("./db/connect");
// const department = require("./util/department");
// const employee = require("./util/employee");
// const roles = require("./util/roles");

db.connect(err => {
  if (err) throw err;
});

const initQuestions = () => {
  inquirer
    .prompt([
      {
        name: "mainList",
        type: "list",
        message: "What would you like to do?",
        choices: [
          {
            name: "justen",
            value: "awesome",
          },
          {
            name: "dex",
            value: "lame",
          },
        ],
      },
    ])
    .then((selected) => {
      switch (selected.mainList) {
        case "View all departments":
          department.viewDepartment();
          break;
        case "View all roles":
          roles.viewRoles();
          break;
        case "View all employees":
          employee.viewEmployees();
          break;
        case "Add a department":
          department.addDepartment();
          break;
        case "Add a role":
          roles.addRole();
          break;
        case "Add an employee":
          employee.addEmployee();
          break;
        case "Update an employee role":
          employee.updateEmpRole();
          break;
        case "Quit":
          console.log(`Thanks for using Employee Tracker! Come again soon!`);
          process.exit();
      }
      console.log(selected);
    })
    .catch((err) => {
      console.log(err);
    });
};
initQuestions();
