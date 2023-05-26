const inquirer = require("inquirer");
const db = require("./db/connect.js");
const department = require("./util/department");
const employee = require("./util/employee");
const roles = require("./util/roles");
const mainQuestions = require("./util/mainQuestions.js")
db.connect(err => {
    if (err) throw err;
});

function init() {
    mainQuestions.initQuestions()
        .then((selected) => {
            switch (selected.mainList) {
                case "View All Departments":
                    console.log("View All Departments")
                    department.viewDepartment(init);
                    break;
                case "View All Roles":
                    console.log("View All Roles")
                    roles.viewRoles(init);
                    break;
                case "View All Employees":
                    console.log("View All Employees")
                    employee.viewEmployees(init);
                    break;
                case "Add a Department":
                    console.log("Add a Department")
                    department.addDepartment(init);
                    break;
                case "Add a Role":
                    console.log("Add a Role")
                    roles.deptNames(init);
                    break;
                case "Add an Employee":
                    console.log("Add an Employee")
                    employee.existingRoles(init);
                    break;
                case "Update an Employee Role":
                    console.log("Update an Employee Role")
                    employee.updateEmployee(init);
                    break;
                case "Quit":
                    console.log(`Thanks for using Employee Tracker! Come again soon!`);
                    process.exit();
            }
        })
        .catch((err) => {
            console.log(err);
        });
};
init();