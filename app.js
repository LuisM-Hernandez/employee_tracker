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
            name: "View All Employees",
            value: "VIEW_EMPLOYEES"
          }
        ]
    }

  ]).then(function(choices){
    console.log(choices);
  })
}
