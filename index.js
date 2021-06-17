const connection = require('./connection');
const inquirer = require('inquirer');
const art = require('ascii-art');
const cTable = require('console.table');
const { area } = require('d3-shape');

const showAll = () => {
    connection.query(
        `SELECT e.id "ID", e.first_name "FirstName", e.last_name "LastName", r.title "Title", d.name "Department", r.salary "Salary", 
    CONCAT (m.first_name, " ", m.last_name) "Manager" 
    FROM employee e
    JOIN role r, department d, employee m
    WHERE m.id = e.manager_id AND e.role_id = r.id AND d.id = r.department_id
    ORDER BY id`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
        })
        runProgram()
}

const titleScreen = () => {
    art.font("Employee Manager", 'doom')
        .then((rendered) => {
            console.log(art.style(rendered, 'black_bg+blue+blink+inverse'))
        }).catch((err) => {
        })
}

const firstQuestion = () => {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'Add Employee',
            'Remove Emloyee',
            'Update Employee Role',
            'View All Roles',
            'Add Role',
            'End Program'
        ]
    })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    showAll();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Emloyee':
                    removeEmployee();
                    break;

                case 'Update Employee Role':
                    updateRole();
                    break;

                case 'View All Roles':
                    viewRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'End Program':
                    connection.end();
            }
        })
}

const runProgram = async () => {
    titleScreen();
    setTimeout(firstQuestion, 10);
}

const addEmployee = () => {
    console.log('Add Employee Function');
    firstQuestion();
};

const removeEmployee = () => {
    console.log('Remove Employee Function');
    firstQuestion();
};

const updateRole = () => {
    console.log('Update Role Function');
    firstQuestion();
};

const viewRoles = () => {
    console.log('View Roles Function');
    firstQuestion();
}

const addRole = () => {
    console.log('Add Role Function');
    firstQuestion();
}
runProgram();
