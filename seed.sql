USE EmployeeTracker;

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Candy", "Burnham", 1, NULL),
("Jani", "Crawley", 2, 1),
("Zena", "Dennis", 2, 1),
("Sherrie", "Peguero", 4, NULL),
("Kera", "Olivero", 3, 4),
("Kattie", "Hollis", 5, NULL),
("Echo", "Germano", 6, 6),
("Lillian", "Poch", 6, 6),
("Melanie", "Shingleton", 7, NULL);

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
("Lawyer", 190000, 3),
("Legal Team Lead", 250000, 3),
("Lead Engineer", 150000, 1),
("Software Engineer", 120000, 1),
("Accountant", 125000, 2);

SELECT * FROM role;
