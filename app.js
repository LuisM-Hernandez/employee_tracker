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
        }
      ]
    }

  ]).then(function (answer) {
    // console.log(answer);
    handleChoices(answer);
  })
}

function handleChoices(answer) {
  switch (answer.choice) {


    case "VIEW_EMPLOYEES":
      return viewEmployees();
  
    case "VIEW_DEPARTMENT":
      return viewDepartments();

    case "VIEW_ROLES":
      return viewRoles();

    case "ADD_DEPARTMENT":
      return addDepartment();
  

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

async function addDepartment(){
  
  inquirer.prompt ([
    {
      type: "input",
      name: "addDepartment",
      message: "What's the name of the new department",
    }
    //Async runs the functions orderly.
  ]).then(async function (answer) {
    const addDep = await db.createDepartment(answer.addDepartment);
    
  console.log("\n");
  console.table(addDep);
  loadMainMenu();

});
}


