DROP DATABASE IF EXISTS EmployeeTracker;

CREATE DATABASE EmployeeTracker;

USE EmployeeTracker;

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
    CONSTRAINT FK_employee FOREIGN KEY(manager_id) REFERENCES employee(id) ON DELETE SET NULL,
    PRIMARY KEY (id)
);

CREATE TABLE role (
    id int NOT NULL AUTO_INCREMENT,
    title varchar(30) NOT NULL,
    salary decimal(10,2) NOT NULL,
    department_id int,
    PRIMARY KEY (id)
);

