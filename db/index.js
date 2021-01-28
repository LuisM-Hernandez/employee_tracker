const mysql = require("mysql");
const inquirer = require("inquirer");

var connection = mysql.createConnection({
    host     : 'localhost',
    port     :  3306,
    user     : 'root',
    password : 'rootroot',
    database : 'employees_db'
  });
   
  connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    // start();
  });

  // function start() {
  //   inquirer
  //     .prompt({

  //       name: "userChoice",
  //       type: "list",
  //       message: "What would you like to do?",
  //       choices: ["View employees", "View roles", "View departments", "Update employee roles", "Add department", "Add roles", "Add employees"]
  //     })
  //     .then(function(answer) {
  //       // based on their answer, either call the bid or the post functions
  //       if (answer.userChoice === "View employees") {
  //         console.log("SIIIIIIII");
  //       }
  //       else if(answer.userChoice === "View roles") {
  //         console.log("NOSIENSOME");

  //       } else{
  //         connection.end();
  //       }
  //     });
  // }
  
