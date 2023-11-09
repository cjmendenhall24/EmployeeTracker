var mysql = require('mysql2');
const inquirer = require('inquirer');
require('console.table');
require('dotenv').config();

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: process.env.DB_PASSWORD,
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

function viewAllEmployees() {
    connection.query("SELECT employee.first_name,employee.last_name, role.title, role.salary, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function(err, res) {
        if (err) throw err
        console.table(res)
        beginPrompt()
    })
}

function viewAllRoles() {
    connection.query("SELECT employee.first_name, employee.last_name, role.title AS Title FROM employee JOIN role ON employee.role_id = role.id;",
    function (err, res) {
        if (err) throw err
        console.table(res)
        beginPrompt()
    })
}

function viewAllDepartments() {
    connection.query("SELECT employee.first_name, employee.last_name, department.name AS Department FROM employee JOIN role ON employee.role_id = role.id JOIN department ON role.department_id = department.id ORDER BY employee.id;",
    function (err, res) {
        if (err) throw err
        console.table(res)
        beginPrompt()
    })
}

function addDepartment() {
    inquirer.prompt([
        {
            type: "input",
            name: "departmentName",
            message: "New department name?"
        },
    ])
    .then(function (answer) {
        var query = `INSERT INTO department SET ?`
        connection.query(query, {
            name: answer.departmentName
        },
        function (err, res) {
            if (err) throw err;
            console.log("Department added");
            beginPrompt();
        });
    });
}

function addEmployee() {
    connection.query("SELECT id, title FROM role", function (err, roles) {
        if (err) throw err;
        const roleChoices = roles.map((role) => role.title);

        connection.query("SELECT id, first_name, last_name FROM employee", function (err, employees) {
            if (err) throw err;
            const managerChoices = employees.map((employee) => `${employee.first_name} ${employee.last_name}`);
            managerChoices.unshift("None");
            inquirer.prompt([
                {
                    type: "input",
                    name: "first_name",
                    message: "First name of new employee?"
                },
                {
                    type: "input",
                    name: "last_name",
                    message: "Last name of new employee?"
                },
                {
                    type: "list",
                    name: "title",
                    message: "New employee title?",
                    choices: roleChoices
                },
                {
                    type: "list",
                    name: "manager",
                    message: "New employee's manager?",
                    choices: managerChoices
                }
            ])
            .then(function (answer) {
                const selectedRole = roles.find((role) => role.title === answer.title);
                let managerId = null;
                if (answer.manager !== "None") {
                    const managerName = answer.manager.split(" ");
                    const manager = employees.find((employee) => employee.first_name === managerName[0] && employee.last_name === managerName[1]);
                    managerId = manager.id;
                }
                var query = `INSERT INTO employee SET ?`
                connection.query(query, {
                    first_name: answer.first_name,
                    last_name: answer.last_name,
                    role_id: selectedRole.id,
                    manager_id: managerId
                },
                function (err, res) {
                    if(err) throw err;
                    console.log("Added employee");
                    beginPrompt();
                });
            });
        });
    });
};

