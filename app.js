const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const connection = require("./db/connection");
const { allEmployees } = require("./db");
// require("console.table");

init();
//Function to start the program
function init() {
  const logoText = logo({ name: "Professional Employee Manager" }).render();
  console.log(logoText);
  loadMainMenu();
}

//This function prompt all the choices to the user
function loadMainMenu() {
  inquirer.prompt([
    {
      type: "list",
      name: "choice",
      message: "What would you like to do??",
      choices: [
        {
          name: "Exit",
          value: "EXIT",
        },
        {
          name: "View all employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View all deparments",
          value: "VIEW_DEPARTMENT"
        },
        {
          name: "View all roles",
          value: "VIEW_ROLES"
        },
        {
          name: "Add a department",
          value: "ADD_DEPARTMENT"
        },
        {
          name: "Add a new role",
          value: "ADD_ROLE"
        },
        {
          name: "Add a new employee",
          value: "ADD_EMPLOYEE"
        },
        {
          name: "Update an employee's role",
          value: "UPDATE_EMPLOYEE"
        }
      ]
    }

  ])
    .then(function (answer) {
      // console.log(answer);
      handleChoices(answer);
    })
}

//This function execute a switch and case that will run the user selected choice
function handleChoices(answer) {
  switch (answer.choice) {

    case "EXIT":
      return connection.end()

    case "VIEW_EMPLOYEES":
      return viewEmployees();

    case "VIEW_DEPARTMENT":
      return viewDepartments();

    case "VIEW_ROLES":
      return viewRoles();

    case "ADD_DEPARTMENT":
      return addDepartment();

    case "ADD_ROLE":
      return addRole();

    case "ADD_EMPLOYEE":
      return addEmployee();

      case "UPDATE_EMPLOYEE":
        return updateEmployeeRoles();
    }
}

//Display all the employees
async function viewEmployees() {
  const employees = await db.allEmployees();
  console.log("\n");
  console.table(employees);
  loadMainMenu();

}

//Display all the departments
async function viewDepartments() {
  const departments = await db.allDepartments();
  console.log("\n");
  console.table(departments);
  loadMainMenu();
}

//Display all the job roles
async function viewRoles() {
  const departments = await db.allRoles();
  console.log("\n");
  console.table(departments);
  loadMainMenu();
}

//Add a department
async function addDepartment() {

  inquirer.prompt([
    {
      type: "input",
      name: "newDepartment",
      message: "What's the name of the new department",
    }
    //Async runs the functions orderly.
  ]).then(async function (answer) {
    const addDep = await db.createDepartment(answer.newDepartment);

    console.log("\n");
    console.table(addDep);
    loadMainMenu();

  });
}

//Add more roles
async function addRole() {

  inquirer.prompt([
    {
      type: "input",
      name: "roleTitle",
      message: "What is the new role title?",
    },
    {
      type: "input",
      name: "addSalary",
      message: "How much is the salary? ",
    },
    {
      type: "input",
      name: "roleDep",
      message: "What is the number of the department? ",
    }
    //Async runs the functions orderly.
  ]).then(async function (answer) {
    const addRole = await db.createRole(answer.roleTitle, answer.addSalary, answer.roleDep);
    console.log("\n");
    console.table(addRole);
    loadMainMenu();

  });
}

//Add employees
async function addEmployee() {

  inquirer.prompt([
    {
      type: "input",
      name: "firstName",
      message: "What is the new employee's first name",
    },
    {
      type: "input",
      name: "secondName",
      message: "How much is the second name? ",
    },
    {
      type: "input",
      name: "roleId",
      message: "What role id number for the employee? ",
    },
    {
      type: "input",
      name: "managerId",
      message: "What is the manager's id number? ",
    }
    //Async runs the functions orderly.
  ]).then(async function (answer) {
    const addEmployee = await db.createEmployee(answer.firstName, answer.secondName, answer.roleId, answer.managerId);
    console.log("\n");
    console.table(addEmployee);
    loadMainMenu();

  });
}

//Update employee

async function updateEmployeeRoles() {

  //I need to ask the user what employee it wants to update

  const employeeArr = await db.allEmployees();
  //Calling the view all roles function
  const roleArr = await db.allRoles();

  inquirer
  .prompt([
    {
      //Prompt the user the employee list to choose
      name: "employee",
      type: "rawlist",
      choices: function() {
        var employeeList = [];
        for (var i = 0; i < employeeArr.length; i++) {
          employeeList.push(employeeArr[i].first_name + " " + employeeArr[i].last_name);
        }
        return employeeList;
      },
      message: "Which employee would you need?"
    },
    {
      //Need to populate the role list so the user can choose and then make it change to that role
      name: "role",
      type: "rawlist",
      choices: function() {
        var roleList = [];
        for (var i = 0; i < roleArr.length; i++) {
          roleList.push(roleArr[i].title);
        }
        return roleList;
      },
      message: "Which role would you like to assign?"
    }
    //Async runs the functions orderly.
  ]).then(async function (answer) {

    var newRole;
    for (var i = 0; i < roleArr.length; i++) {
      if (roleArr[i].title === answer.role) {
        newRole = roleArr[i].id;
      }
    }

    var chosenEmployee;
    for (var i = 0; i < employeeArr.length; i++) {
      if (employeeArr[i].first_name + " " + employeeArr[i].last_name === answer.employee) {
        chosenEmployee = employeeArr[i].id;
      }
    }
    const addRole = await db.editEmployeeRoles(chosenEmployee, newRole);
    console.log("\n");
    console.table(addRole);
    loadMainMenu();

  });
}