const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'EmployeeTracker',
});


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

connection.connect((err) => {
    if (err) throw err;
    readEmployee()
});