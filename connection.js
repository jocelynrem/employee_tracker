const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'password',
    database: 'EmployeeTracker',
});



post = () => {
    connection.query('SELECT text FROM sample', (err, results) => {
        if (err) throw err;
        console.log(results);
        connection.end();
    })
}

connection.connect((err) => {
    if (err) throw err;
});