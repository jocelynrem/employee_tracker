USE EmployeeTracker;

INSERT INTO employee (first_name, last_name, role_id, is_manager, manager_id)
VALUES ("Candy", "Burnham", 1, 1, 10),
("Jani", "Crawley", 2, 0, 1),
("Zena", "Dennis", 2, 0, 1),
("Sherrie", "Peguero", 3, 1, 10),
("Kera", "Olivero", 4, 0, 4),
("Kattie", "Hollis", 5, 1, 10),
("Echo", "Germano", 6, 0, 6),
("Lillian", "Poch", 6, 0, 6),
("Melanie", "Shingleton", 7, 1, 10),
("Sarah", "Kennedy", 8, 1, null);

SELECT * FROM employee;

INSERT INTO department (name)
VALUES ("Engineering"), 
("Finance"),
("Legal"),
("Sales");

SELECT * FROM department;

INSERT INTO role (title, salary, department_id)
VALUES ("Sales Lead", 100000, 4), 
("Salesperson", 80000, 4),
("Legal Team Lead", 250000, 3),
("Lawyer", 190000, 3),
("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Accountant", 125000, 2),
("Project Manager", 250000, 1);

SELECT * FROM role;


--show all data in one table
SELECT e.id "ID", e.first_name "First Name", e.last_name "Last Name", r.title "Title", d.name "Department", r.salary "Salary", 
CONCAT (m.first_name, " ", m.last_name) "Manager" 
FROM employee e
LEFT JOIN role r
ON r.id = e.role_id
LEFT JOIN department d
ON d.id = r.department_id
LEFT JOIN employee m
ON m.id = e.manager_id
ORDER BY id;

--Show employees
SELECT e.id "ID", e.first_name "First Name", e.last_name "Last Name" FROM employee e