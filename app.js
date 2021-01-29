const inquirer = require("inquirer");
const logo = require("asciiart-logo");
const db = require("./db");
const connection = require("./db/connection");
// require("console.table");

init();
function init() {
  const logoText = logo({ name: "Professional Employee Manager" }).render();
  console.log(logoText);
  loadMainMenu();
}

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
        }
      ]
    }

  ])
    .then(function (answer) {
      // console.log(answer);
      handleChoices(answer);
    })
}

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
  }
}

async function viewEmployees() {
  const employees = await db.allEmployees();
  console.log("\n");
  console.table(employees);
  loadMainMenu();

}

async function viewDepartments() {
  const departments = await db.allDepartments();
  console.log("\n");
  console.table(departments);
  loadMainMenu();
}

async function viewRoles() {
  const departments = await db.allRoles();
  console.log("\n");
  console.table(departments);
  loadMainMenu();
}

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

//Employee
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