var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
   host: "127.0.0.1",
   port: 3306,
   user: "root", //Your username
   password: "", //Your password
   database: "bamazondb"
})

connection.connect(function(err) {
   if (err) throw err;
   // console.log("connected as id " + connection.threadId);
   // start();
})

var start = function() {
  connection.query('SELECT * FROM products', function(err, res) {
       for (var i=0; i<res.length; i++){
          console.log(res[i].id + " | " + res[i].ItemName + " | " + res[i].DepartmentName + " | $" + res[i].Price + " | Quantity: " + res[i].Stock);
          console.log("-------------------------------------------------");
       }
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
          var cusAmount = parseInt(answer.stock);
          var cusChoice = answer.choice;
          var cost = ((res[cusChoice - 1].Price) * cusAmount);
          var currentStock = res[cusChoice - 1].Stock;
          var cusRequest = res[cusChoice - 1].id;
          var updateStock = (currentStock - cusRequest);
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