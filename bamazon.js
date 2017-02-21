// Required Packages
var mysql = require('mysql');
var inquirer = require('inquirer');

// Connection
var connection = mysql.createConnection({
   host: "127.0.0.1",
   port: 3306,
   user: "root", 
   password: "", 
   database: "bamazondb"
})

// Connection Error Default Message
connection.connect(function(err) {
   if (err) throw err;
})

var start = function() {
  // Connects to DB and displays everything in table
  connection.query('SELECT * FROM products', function(err, res) {
       for (var i=0; i<res.length; i++){
          console.log(res[i].id + " | " + res[i].ItemName + " | " + res[i].DepartmentName + " | $" + res[i].Price + " | Quantity: " + res[i].Stock);
          console.log("-------------------------------------------------");
       }
  // Prompts for input from the table by ID
  inquirer.prompt([
        {
        name: "choice",
        type: "input",
        message: "Please type the ID number of the item you would like to purchase.",
        validate: function(value){
              if(isNaN(value) == false && parseInt(value) > 0){
                  return true;
                }else{
                  return false;}
          }
        }, 
        // Compares amount inputted to existing amount
        {
        name: "stock",
        type: "input",
        message: "How many would you like to buy?",
        validate: function(value){
              if(isNaN(value) == false && parseInt(value) > 0){
                  return true;
                }else{
                  return false;}
          }
        }
      ]).then(function(answer){
          // Runs query from command line to compare with table info
          var cusAmount = parseInt(answer.stock);
          var cusChoice = answer.choice;
          var cost = ((res[cusChoice - 1].Price) * cusAmount);
          var currentStock = res[cusChoice - 1].Stock;
          var cusRequest = res[cusChoice - 1].id;
          var updateStock = (currentStock - cusRequest);
          // If/Else statement runs based on whether there is stock for the item or not, and updates accordingly
          if (currentStock > cusRequest){
            connection.query('UPDATE products SET ? WHERE ?', [
          {Stock: updateStock},
          {id: cusChoice}
          ], function(err, res){
            if(err) throw err;
                console.log("Thanks for shopping with us. You spent $" + cost + ". Enjoy your purchase!");
                console.log("_________________________________________________");
                start();
                }
              );
            }
        else{
          console.log("Sorry, we only have so much in stock. Please try a different amount.");
          console.log("_________________________________________________");

          start();
          }
        })
})
}

start();