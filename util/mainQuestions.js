const inquirer = require("inquirer")

const initQuestions = () => {
    const question = [
        {
            type: 'list',
            name: 'mainList',
            message: 'What would you like to do?',
            choices: [
                'View All Departments',
                'View All Roles',
                'View All Employees',
                'Add a Department',
                'Add a Role',
                'Add an Employee',
                'Update an Employee Role',
                'Quit'
            ]
        }
    ]
    return inquirer.prompt(question);
}

module.exports = {initQuestions };