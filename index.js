var mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employeeTrackerDB"
});

connection.connect(function(err) {
    if (err) throw err
    beginPrompt();
});

function beginPrompt() {
    inquirer.prompt([
        {
            type: "list",
            message: "Choose One",
            name: "choice",
            choices: [
                "View all employees",
                "View all employees by role",
                "View all employees by department",
                "Update employee",
                "Add employee",
                "Add role",
                "Add department"
            ]
        }
    ]).then(function(val) {
        switch (val.choice) {
            case "View all employees":
                viewAllEmployees();
                break;

            case "View all employees by role":
                viewAllRoles();
                break;

            case "View all employees by department":
                viewAllDepartments();
                break;

            case "Add employee":
                addEmployee();
                break;

            case "Update employee":
                updateEmployee();
                break;

            case "Add role":
                addRole();
                break;

            case "Add department":
                addDepartment();
                break;
            }
    })
}

function