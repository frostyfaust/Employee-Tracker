const db = require("../db/connect");
const inquirer = require("inquirer");
const cTable = require("console.table");
const department = require('./department')
let dept;

const grabRoles = () => {
    return db.promise().query(`SELECT * FROM roles`)
}

const viewRoles = (init) =>{
    db.query(`SELECT * FROM roles`, (err,result)=>{
        if (err){
            console.log(err)
        }else{
            console.log('\n');
            console.table(result);
        }
    })
    init();
}

const deptNames = (init)=>{
department.grabDept().then(([rows])=>{
    dept = rows.map(({id, names})=>{
       console.log(id, names);
       return{
           value: id,
           name: names
       }
   })
   addRole(init)
})}

const addRole = (init) =>{
    inquirer.prompt([
        {
            type: "input",
            message: "What is the name of this new role?",
            name:"roleName"
        },
        {
            type: "input",
            message: "What is the salary of this new role?",
            name:"roleSalary"
        },
        {
            type: "list",
            message: "Which department is this new role under?",
            name:"roleDept",
            choices: dept

        },

        ]).then((input) => {
            db.query(`INSERT INTO roles (title, salary, department_id) VALUES(?,?,?)`, [input.roleName, input.roleSalary, input.roleDept], (err,result)=>{
                if (err){
                    console.log(err)
                }else{
                    db.query(`SELECT * FROM roles`, (err,result)=>{
                        err?console.error(err):console.table(result);
                        init();
                    })
                }
            })
            
        })
    }

module.exports = { viewRoles, addRole, deptNames, grabRoles };