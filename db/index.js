const connection = require("./connection");

class DB {
  constructor(connection) {
    this.connection = connection;
  }

  allEmployees() {
    return this.connection.query(
      "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
    );
  }

  allDepartments(){
    return this.connection.query("SELECT * FROM department");
  }

  allRoles(){
    return this.connection.query("SELECT * FROM role");
  }

  createDepartment(name){
    return this.connection.query("INSERT INTO department (name) VALUES (?)", [name],)
    
  }

  createRole(title,salary,department_id){
    return this.connection.query("INSERT INTO role (title, salary, department_id) VALUES (?,?,?)", [title,salary,department_id],)
  }

  createEmployee(first_name, last_name, role_id, manager_id){
    return this.connection.query("INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES (?,?,?,?)", [first_name, last_name, role_id, manager_id],)
  }

  editEmployeeRoles(employee_name, new_role){
    return this.connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [new_role, employee_name])
  }

}
  module.exports = new DB(connection);
