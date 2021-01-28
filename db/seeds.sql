USE employees_db;

INSERT INTO department (name)
VALUES
("Accounting"),
("Engineering"),
("Legal"),
("Sales"),
("Assembly Line");


INSERT INTO role (title, salary, department_id)
VALUES
('Accountant Manager', 75000, 1),
('Accountant', 70000, 1),
('Lead Engineer', 130000, 2),
('Software Engineer', 100000, 2),
('Legal Team Lead', 150000, 3),
('Lawyer', 90000, 3),
('Sales Lead', 45000, 4),
('Salesperson', 35000, 4),
('Assembly Lead', 50000, 5),
('Assembler I', 28000, 5),
('Assembler II', 34000, 5);


INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Sara", "Martinez", 1, NULL),
("Adalberto", "Vargas", 2, NULL),
("Kendrick", "Lamar", 3, NULL ),
("Xavier", "Torres", 4, NULL),
("Issac", "Clark", 5, NULL),
("Emanuel", "Acevedo", 6, NULL),
("Anakin", "Skywalker", 7, NULL),
("Angel", "Hernandez", 8, NULL),
("Sergei", "Dragunov", 9, NULL),
("Reiner", "Braun", 10, NULL),
("Jonathan", "Cruz", 11, NULL);