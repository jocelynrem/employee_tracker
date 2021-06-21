DROP DATABASE IF EXISTS EmployeeTracker;

CREATE DATABASE EmployeeTracker;

USE EmployeeTracker;

SET foreign_key_checks = 0;

CREATE TABLE department (
    id int NOT NULL AUTO_INCREMENT,
    name varchar(30) NOT NULL,
    PRIMARY KEY (id)
);

CREATE TABLE employee (
    id int NOT NULL AUTO_INCREMENT,
    first_name varchar(30) NOT NULL,
    last_name varchar(30) NOT NULL,
    role_id int,
    manager_id int,
    FOREIGN KEY (role_id) REFERENCES Role (id),
    CONSTRAINT FK_employee FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary decimal(10,2) NOT NULL,
    department_id int,
    FOREIGN KEY (department_id) REFERENCES department (id),
    PRIMARY KEY (id)
);

