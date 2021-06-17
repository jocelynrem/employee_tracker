const connection = require('./connection');
const inquirer = require('inquirer');
const art = require('ascii-art');
const cTable = require('console.table');

const titleScreen = () => {
    art.font("Employee Manager", 'doom')
        .then((rendered) => {
            console.log(art.style(rendered, 'black_bg+blue+blink+inverse'))
        }).catch((err) => {
        })
}

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
}

const runProgram = async () => {
    titleScreen();
    setTimeout(showAll, 10)
    setTimeout(firstQuestion, 30);
}

const firstQuestion = () => {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'View All Employees',
            'View All Employees By Department',
            'View All Employees By Manager',
            'Add Employee',
            'Remove Emloyee',
            'Update Employee Role',
            'Update Employee Department',
            'View All Roles',
            'Add Role',
            'Remove Role',
            'View All Departments',
            'Add Department',
            'Remove Department',
            'End Program'
        ]
    })
        .then((answer) => {
            switch (answer.action) {
                case 'View All Employees':
                    showEmployees();
                    break;

                case 'View All Employees By Department':
                    showEmployeesByDept();
                    break;

                case 'View All Employees By Manager':
                    showEmployeesByMang();
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

                case 'Update Employee Department':
                    updateDept();
                    break;

                case 'View All Roles':
                    viewRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Remove Role':
                    removeRole();
                    break;

                case 'View All Departments':
                    viewDepartments();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'Remove Department':
                    removeDepartment();
                    break;

                case 'End Program':
                    connection.end();
            }
        })
}

const showEmployees = () => {
    console.log('Add Show Employee Function');
    firstQuestion();
};

const showEmployeesByDept = () => {
    console.log('Show Employees by Department Function');
    firstQuestion();
};

const showEmployeesByMang = () => {
    console.log('Show Employees by Manager Function');
    firstQuestion();
};

const addEmployee = () => {
    console.log('Add Employee Function');
    firstQuestion();
};

const removeEmployee = () => {
    console.log('Remove Employee Function');
    firstQuestion();
};

const updateRole = () => {
    console.log('Update Employee Role');
    firstQuestion();
};

const updateDept = () => {
    console.log('Update Employee Role');
    firstQuestion();
};

const viewRoles = () => {
    console.log('View Roles Function');
    firstQuestion();
};

const addRole = () => {
    console.log('Add Role Function');
    firstQuestion();
};

const removeRole = () => {
    console.log('Remove Role Function');
    firstQuestion();
};

const viewDepartments = () => {
    console.log('View all Departments');
    firstQuestion();
};

const addDepartment = () => {
    console.log('Add Department');
    firstQuestion();
};

const removeDepartment = () => {
    console.log('Remove Department');
    firstQuestion();
};

runProgram();
