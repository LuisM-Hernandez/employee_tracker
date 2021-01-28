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
    start();
  });

  function start() {
    inquirer
      .prompt({

        name: "userChoice",
        type: "list",
        message: "What would you like to do?",
        choices: ["Exit","View employees", "View roles", "View departments",
         "Update employee roles", "Add department", "Add roles", "Add employees"]
      })
      .then(function(answer) {
        // based on their answer, either call the bid or the post functions
        if (answer.userChoice === "Exit"){
          connection.end();
        }
        
        else if (answer.userChoice === "View employees") {
          viewEmployees();
        }
        else if(answer.userChoice === "View roles") {
          console.log("NOSIENSOME");

        }
        else if(answer.userChoice === "View departments") {
          console.log("NOSIENSOME");

        }
        else if(answer.userChoice === "Update employee roles") {
          console.log("NOSIENSOME");

        }
        else if(answer.userChoice === "Add employee") {
          console.log("NOSIENSOME");

        }
        else if(answer.userChoice === "Delete employee") {
          console.log("NOSIENSOME");

        }
         else{
          connection.end();
        }
      });
  }
  
  //This function will display all the employees
  function viewEmployees (){
    //Need better definition but connection.query is targeting whatever you put inside the developer encase in sql syntax and it looks on the db
    connection.query("SELECT * FROM employee", function (err, res) {
      if (err) throw err;
        console.table(res)  
        start();     
    });

  }
