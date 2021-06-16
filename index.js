const mysql = require('mysql');
const inquirer = require('inquirer');
const art = require('ascii-art');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'EmployeeTracker',
});

connection.connect((err) => {
    if (err) throw err;
    start()
});

const start = () => {
    art.font("Employee Manager", 'doom')
    .then((rendered)=>{
        console.log(art.style(rendered, 'black_bg+blue+blink+inverse'));
    }).catch((err)=>{
        //err is an error
    })
    connection.end();
}

const runProgram = () => {
    inquirer.prompt ({
        name: 'action',
        type: 'rawlist',
        message: 'What would you like to do?',
        choices: [
            'Add Employee',
            'Remove Emloyee',
            'Update Employee Role',
            'View All Roles',
            'Add Role'
        ]
    })
}

// const addEmployee = () => {
//     console.log('Inserting a new product...\n');
//     const query = connection.query(
//         'INSERT INTO products SET ?',
//         {
//             flavor: 'Rocky Road',
//             price: 3.0,
//             quantity: 50,
//         },
//         (err, res) => {
//             if (err) throw err;
//             console.log(`${res.affectedRows} product inserted!\n`);
//             // Call updateProduct AFTER the INSERT completes
//             updateProduct();
//         }
//     );

//     // logs the actual query being run
//     console.log(query.sql);
// };

const readEmployee = () => {
    console.log('Finding all employees...\n');
    connection.query('SELECT * FROM employee', (err, res) => {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.log(res);
        connection.end();
    });
};
