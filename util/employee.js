const db = require("../db/connect");
const inquirer = require("inquirer");
const cTable = require("console.table");
const roles = require("./roles");
let role;
let managers;
let rowOfRoles;
let existingEmployess;
let employeeQuery = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, department.names AS department, roles.salary, 
CONCAT(manager.first_name, " ", manager.last_name) AS manager FROM employees 
LEFT JOIN roles ON employees.role_id = roles.id 
LEFT JOIN department ON roles.department_id = department.id 
LEFT JOIN employees manager ON employees.manager_id = manager.id`;

const grabEmployees = () => {
  return db.promise().query(`SELECT * FROM employees`);
};

const viewEmployees = (init) => {
  db.query(employeeQuery,
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log("\n");
        console.table(result);
      }
    }
  );
  init();
};

const existingRoles = (init) => {
  roles.grabRoles().then(([rows]) => {
    role = rows.map(({ id, title }) => {
      return {
        value: id,
        name: title,
      };
    });
    getManagers(init);
  });
};

const getManagers = (init) => {
  db.promise()
    .query(`SELECT * FROM employees WHERE manager_id IS NULL`)
    .then(([rows]) => {
      managers = rows.map(({ id, first_name, last_name }) => {
        return {
          name: first_name + " " + last_name,
          value: id,
        };
      });
      addEmployee(init);
    });
};

const addEmployee = (init) => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the new employee's first name?",
        name: "empFirst",
      },
      {
        type: "input",
        message: "What is the new employee's last name?",
        name: "empLast",
      },
      {
        type: "list",
        message: "What is this new employee's role?",
        name: "empRole",
        choices: role,
      },
      {
        type: "confirm",
        message: "Does this new employee have a manager?",
        name: "confirmManager",
        default: false,
      },
      {
        type: "list",
        name: "empManager",
        message: "Who is this new employee's manager?",
        choices: managers,
        when: (answer) => answer.confirmManager == true,
      },
    ])
    .then((input) => {
      db.query(
        `INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES(?,?,?,?)`,
        [input.empFirst, input.empLast, input.empRole, input.empManager],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            db.query(`SELECT * FROM employees`, (err, result) => {
              err ? console.error(err) : console.table(result);
              init();
            });
          }
        }
      );
    });
};

const updateEmployee = (init) => {
  roles.grabRoles().then(([rows]) => {
    rowOfRoles = rows.map(({ id, title }) => {
      return {
        value: id,
        name: title,
      };
    });
    employeesList(init);
  });
};

const employeesList = (init) => {
  grabEmployees().then(([rows]) => {
    existingEmployess = rows.map(({ id, first_name, last_name }) => {
      return {
        value: id,
        name: first_name + " " + last_name,
      };
    });
    updateEmployeeInquiry(init);
  });
};
const updateEmployeeInquiry = (init) => {
  inquirer
    .prompt([
      {
        type: "list",
        name: "updateEmployee",
        message: "Which employee would you like to update?",
        choices: existingEmployess,
      },
      {
        type: "list",
        name: "updateRole",
        message: "What is this employee's new role?",
        choices: rowOfRoles,
      },
    ])
    .then((input) => {
      db.query(
        `UPDATE employees SET role_id = (?) WHERE employees.id = (?)`,
        [input.updateRole, input.updateEmployee],
        (err, result) => {
          if (err) {
            console.log(err);
          } else {
            db.query(employeeQuery, (err, result) => {
              err ? console.error(err) : console.table(result);
              init();
            });
          }
        }
      );
    });
};

module.exports = {
  grabEmployees,
  viewEmployees,
  addEmployee,
  existingRoles,
  getManagers,
  updateEmployee,
  employeesList,
  updateEmployeeInquiry,
};
