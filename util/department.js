const db = require("../db/connect");
const inquirer = require("inquirer");
const cTable = require("console.table");

const grabDept =()=>{
    return db.promise().query(`SELECT * FROM department`)
}

const viewDepartment = (init) =>{
    db.query(`SELECT * FROM department`, (err,result)=>{
        if (err){
            console.log(err)
        }else{
            console.log('\n');
            console.table(result);
        }
    })
    
    init();
}

const addDepartment = (init) =>{
    inquirer.prompt([
        {
            type: "input",
            message: "what is the name of the new department you would like to add?",
            name:"addDept"
        }
        ]).then((input) => {
            db.query(`INSERT INTO department (names) VALUES(?)`, input.addDept, (err,result)=>{
                if (err){
                    console.log(err)
                }else{
                    db.query(`SELECT * FROM department`, (err,result)=>{
                        err?console.error(err):console.table(result);
                        init();
                    })
                }
            })
            
        })
    }

module.exports ={ viewDepartment, addDepartment, grabDept };