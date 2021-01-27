-- This line will delete all files associated to the employees database
DROP DATABASE employees;
-- This line will create the database of employees
CREATE DATABASE  employees;

CREATE TABLE department (
    
    id INT auto_increment UNSIGNED PRIMARY KEY,
    name VARCHAR(25) UNIQUE NOT NULL,
)