DROP DATABASE IF EXISTS employeeTrackerDB;
CREATE DATABASE employeeTrackerDB
USE employeeTrackerDB

CREATE TABLE department (
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(30)
);

CREATE TABLE role (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

CREATE TABLE employee (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30),
    last_name VARCHAR(30),
    manager_id INT,
    role_id INT,
    FOREIGN KEY (role_id) REFERENCES role(id),
    FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department (name)
VALUE ("Sales");
INSERT INTO department (name)
VALUE ("Engineering");
INSERT INTO  department (name)
VALUE ("Finance");
INSERT INTO department (name)
VALUE ("Legal");

INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Salesperson", 80000, 1);
INSERT INTO role (title, salary, department_id)
VALUE ("Lead Engineer", 150000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Software Engineer", 120000, 2);
INSERT INTO role (title, salary, department_id)
VALUE ("Account Manager", 160000, 3)
INSERT INTO role (title, salary, department_id)
VALUE ("Accountant", 125000, 3);
INSERT INTO role (title, salary, department_id)
VALUE ("Legal Team Lead", 250000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Lawyer", 190000, 4);
INSERT INTO role (title, salary, department_id)
VALUE ("Sales Lead", 100000, 1);

INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("John", "Doe", null, 1);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Mike", "Chan", 1, 2);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Ashley", "Rodriguez", null, 3);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kevin", "Tupik", 3, 4);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Kunal", "Singh", null, 5);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Malia", "Brown", 5, 6);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sarah", "Lourd", null, 7);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Tom", "Allen", 7, 8);
INSERT INTO employee (first_name, last_name, manager_id, role_id)
VALUE ("Sam", "Kash", 3, 9);

SELECT * FROM department;
SELECT * FROM role;
SELECT * FROM employee;