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
          name: "View all employees",
          value: "VIEW_EMPLOYEES",
        },
        {
          name: "View all deparments",
          value: "VIEW_DEPARTMENT"
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
  

  }
}

async function viewEmployees() {
  const employees = await db.findAllEmployees();
  console.log("\n");
  console.table(employees);
  loadMainMenu();

}

async function viewDepartments() {
  const departments = await db.viewAllDepartments();
  console.log("\n");
  console.table(departments);
  loadMainMenu();
  
}
