const mysql = require('mysql');
const { throwError } = require('rxjs');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'EmployeeTracker',
    multipleStatements: true,
});

connection.connect((err) => {
    if (!err) {
        
    } else {
        console.log("Connection Failed");
    }
});

module.exports = connection;