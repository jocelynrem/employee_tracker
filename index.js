const connection = require('./connection');
const inquirer = require('inquirer');
const art = require('ascii-art');
const cTable = require('console.table');
const { restoreDefaultPrompts } = require('inquirer');
require('events').EventEmitter.defaultMaxListeners = 15;

const titleScreen = () => {
    art.font("Employee Manager", 'doom')
        .then((rendered) => {
            console.log(art.style(rendered, 'black_bg+blue+blink+inverse\n'))
        }).catch((err) => {
        })
}

const addLine = () => {
    console.log(` \n`)
}

const runProgram = async () => {
    titleScreen();
    setTimeout(showAll, 10);
}

const firstQuestion = () => {
    inquirer.prompt({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?\n',
        choices: [
            'View All Employees',
            'Add Employee',
            'Remove Employee',
            'Update Employee',
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

                case 'Show All Info':
                    showAll()
                    break;

                case 'View All Employees':
                    showEmployees();
                    break;

                case 'Add Employee':
                    addEmployee();
                    break;

                case 'Remove Employee':
                    removeEmployee();
                    break;

                case 'Update Employee':
                    updateEmployee();
                    break;

                case 'View All Roles':
                    showRoles();
                    break;

                case 'Add Role':
                    addRole();
                    break;

                case 'Remove Role':
                    removeRole();
                    break;

                case 'View All Departments':
                    showDepartments();
                    break;

                case 'Add Department':
                    addDepartment();
                    break;

                case 'Remove Department':
                    removeDepartment();
                    break;

                case 'End Program':
                    connection.end();
                    break;
            }
        })
}

const showAll = () => {
    addLine()
    connection.query(
        `SELECT e.id "ID", e.first_name "FirstName", e.last_name "LastName", r.title "Title", d.name "Department", r.salary "Salary", 
    CONCAT (m.first_name, " ", m.last_name) "Manager" 
    FROM employee e
    JOIN role r, department d, employee m
    WHERE m.id = e.manager_id AND e.role_id = r.id AND d.id = r.department_id
    ORDER BY id\n`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
        })
    setTimeout(firstQuestion, 30);
}

const showEmployees = () => {
    addLine()
    connection.query(
        `SELECT e.id "ID", e.first_name "First Name", e.last_name "Last Name" FROM employee e;`,
        (err, res) => {
            if (err) throw err;
            console.table(res)

        }).then
    setTimeout(addLine, 10)
    setTimeout(firstQuestion, 100)
};

const addEmployee = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `first_name`,
                type: `input`,
                message: `Enter Employee First Name:`,
            },
            {
                name: `last_name`,
                type: `input`,
                message: `Enter Employee Last Name:`,
            },
            {
                name: `role`,
                type: `input`,
                message() {
                    const newEmployeeArray = [];
                    res.forEach(({ title, id }) => {
                        newEmployeeArray.push(id + ' = ' + title);
                    });
                    console.log(`What is the emplyee's role ID?\n`)
                    return newEmployeeArray.join(`\n`)
                },
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Please enter the ID number";
                    }
                    return true;
                },
            }
        ])
            .then((answer) => {
                connection.query(
                    `INSERT INTO employee SET ?`,
                    [
                        {
                            first_name: answer.first_name,
                            last_name: answer.last_name,
                            role_id: answer.role
                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} employee added. \n`)
                        showEmployees();
                    })
            })
    })
}

const updateEmployee = () => {
    console.log('Add Update Employee Function');
    firstQuestion();
};

const removeEmployee = () => {
    connection.query(`SELECT * FROM employee;`, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `employees`,
                type: `rawlist`,
                message: `Which employee would you like to remove?\n`,
                choices() {
                    const employeesArray = [];
                    res.forEach(({ last_name }) => {
                        employeesArray.push(last_name);
                    });
                    return employeesArray;
                },

            },
        ])
            .then((answer) => {
                connection.query(`DELETE FROM employee WHERE ?`,
                    {
                        last_name: (answer.employees)
                    },
                    (err, res) => {
                        if (err) throw err
                        console.log(`${res.affectedRows} Deleted\n`)
                        showEmployees();
                    })
            })
    })
};

const showRoles = () => {
    addLine()
    connection.query(
        `SELECT r.id "ID", r.title "title" FROM role r;`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
        })
    setTimeout(addLine, 10)
    setTimeout(firstQuestion, 100)
};

const addRole = () => {
    connection.query(`SELECT * FROM department`, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `title`,
                type: `input`,
                message: `Enter New Role:`,
            },
            {
                name: `salary`,
                type: `input`,
                message: `Enter Salary:`,
            },
            {
                name: `department`,
                type: `input`,
                message() {
                    const departmentArray = [];
                    res.forEach(({ name, id }) => {
                        departmentArray.push(id + ' = ' + name);
                    });
                    console.log(`What is the Department ID?\n`)
                    return departmentArray.join(`\n`)
                },
                validate: (answer) => {
                    if (isNaN(answer)) {
                        return "Please enter the ID number";
                    }
                    return true;
                },
            }
        ])
            .then((answer) => {
                connection.query(
                    `INSERT INTO role SET ?`,
                    [
                        {
                            title: answer.title,
                            salary: answer.salary,
                            department_id: answer.department
                        },
                    ],
                    (err, res) => {
                        if (err) throw err;
                        console.log(`${res.affectedRows} new role added. \n`)
                        showRoles();
                    })
            })
    })
};

const removeRole = () => {
    connection.query(`SELECT * FROM role;`, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `roles`,
                type: `rawlist`,
                message: `Which role would you like to remove?"\n`,
                choices() {
                    const rolesArray = [];
                    res.forEach(({ title }) => {
                        rolesArray.push(title);
                    });
                    return rolesArray;
                },

            },
        ])
            .then((answer) => {
                connection.query(`DELETE FROM role WHERE ?`,
                    {
                        title: (answer.roles)
                    },
                    (err, res) => {
                        if (err) throw err
                        console.log(`${res.affectedRows} Deleted\n`)
                        showRoles();
                    })
            })
    })
};

const showDepartments = () => {
    connection.query(
        `SELECT * FROM department;`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
        })
    setTimeout(addLine, 10)
    setTimeout(firstQuestion, 100)
};

const addDepartment = () => {
    inquirer.prompt([
        {
            name: `name`,
            type: `input`,
            message: `Enter New Department:`,
        }
    ])
        .then((answer) => {
            connection.query(
                `INSERT INTO department SET ?`,
                [
                    {
                        name: answer.name,
                    },
                ],
                (err, res) => {
                    if (err) throw err;
                    console.log(`${res.affectedRows} new department added. \n`)
                    showDepartments();
                })
        })
};

const removeDepartment = () => {
    connection.query(`SELECT * FROM department;`, (err, res) => {
        if (err) throw err;
        inquirer.prompt([
            {
                name: `departments`,
                type: `rawlist`,
                message: `Which department would you like to remove?"\n`,
                choices() {
                    const departmentsArray = [];
                    res.forEach(({ name }) => {
                        departmentsArray.push(name);
                    });
                    return departmentsArray;
                },

            },
        ])
            .then((answer) => {
                connection.query(`DELETE FROM department WHERE ?`,
                    {
                        name: (answer.departments)
                    },
                    (err, res) => {
                        if (err) throw err
                        console.log(`${res.affectedRows} Deleted\n`)
                        showDepartments();
                    })
            })
    })
};

runProgram();
