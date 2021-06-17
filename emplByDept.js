
engEmployees = () => {
    connection.query(
        `SELECT e.id "ID", e.first_name "First Name", e.last_name "Last Name"
        FROM employee e
        JOIN role r
        ON r.id = e.role_id AND r.department_id = 1;`,
        (err, res) => {
            if (err) throw err;
            console.table(res)
        })
}

