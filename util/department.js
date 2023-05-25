const db = require("../db/connect")
const inquirer = require('inquirer');
const cTable = require("console.table");


const viewDepartment = () =>{
    db.query(`SELECT * FROM department`, (err,result)=>{
        err?console.error(err):console.table(result)
    })
    initQuestions();
}
module.exports = viewDepartment