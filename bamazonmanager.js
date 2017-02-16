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
   inquirer.prompt({
	   name: "options",
       type: "list",
	   message: "Please select the option you want.",
	   choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
   }).then(function(answer) {
       if (answer.options == "View Products for Sale"){
		sellProducts();
       } else if (answer.options == "View Low Inventory"){
			lowStock();
		} else if (answer.options == "Add to Inventory"){
			addStock();
       } else if (answer.options == "Add New Product"){
			addNew();
       } 
    })
}

// console.log("Hi");

var sellProducts = function(){
	connection.query('SELECT * FROM products', function(err, res) {
       for (var i=0; i<res.length; i++){
          console.log(res[i].id + " | " + res[i].itemname + " | " + res[i].category + " | $" + res[i].price + " | Quantity: " + res[i].stock);
          console.log("-------------------------------------------------");
}
})
}

var lowStock = function(){
	connection.query('SELECT stock FROM products', function(err, res) {
		for (var i=0; i<res.length; i++){
			if (res[i].stock < 5){
				console.log(res[i].stock);
			} else {
				console.log("All topped off!");
			}
		}
	})
}

var addStock = function(){
	connection.query('SELECT * FROM products', function(err, res) {
       for (var i=0; i<res.length; i++){
          console.log(res[i].id + " | " + res[i].itemname + " | " + res[i].category + " | $" + res[i].price + " | Quantity: " + res[i].stock);
          console.log("-------------------------------------------------");
       }
  inquirer.prompt([
        {
        name: "choice",
        type: "input",
        message: "Please type the ID number of the item you would like to update.",
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
        message: "How much would you like to add?",
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
          var cost = ((res[cusChoice - 1].price) * cusAmount);
          var currentStock = res[cusChoice - 1].stock;
          var cusRequest = res[cusChoice - 1].id;
          var updateStock = (currentStock + cusAmount);
		  for (var i=0; i<res.length; i++){
            connection.query('UPDATE products SET ? WHERE ?', [
          {stock: updateStock},
          {id: cusChoice}
          ], function(err, res){
            if(err) throw err;
                console.log("You added " + updateStock + " to the stockroom.");
                console.log("_________________________________________________");
                }
              );
            }
       
        })

// var addNew = function(){
// 	connection.query('SELECT * FROM products', function(err, res) {
//        for (var i=0; i<res.length; i++){
//           console.log(res[i].id + " | " + res[i].itemname + " | " + res[i].category + " | $" + res[i].price + " | Quantity: " + res[i].stock);
//           console.log("-------------------------------------------------");
//        }
//   inquirer.prompt([
//         {
//         name: "choice",
//         type: "input",
//         message: "Please type the item you would like to add.",
//         validate: function(value){
//               if(isNaN(value) == false && parseInt(value) > 0){
//                   return true;
//                 }else{
//                   return false;}
//           }
//         }, 
//         {
//         name: "stock",
//         type: "input",
//         message: "How much would you like to add?",
//         validate: function(value){
//               if(isNaN(value) == false && parseInt(value) > 0){
//                   return true;
//                 }else{
//                   return false;}
//           }
//         },
//         {
//         name: "price",
//         type: "input",
//         message: "How much does it cost?",
//         validate: function(value){
//               if(isNaN(value) == false && parseInt(value) > 0){
//                   return true;
//                 }else{
//                   return false;}
//           }
//         },
//         {
//         name: "category",
//         type: "input",
//         message: "What category is it?",
//         validate: function(value){
//               if(isNaN(value) == false && parseInt(value) > 0){
//                   return true;
//                 }else{
//                   return false;}
//           }
//         }

//       ]).then(function(answer){
//           var cusAmount = parseInt(answer.stock);
//           var cusChoice = answer.choice;
//           var cost = ((res[cusChoice - 1].price) * cusAmount);
//           var currentStock = res[cusChoice - 1].stock;
//           var cusRequest = res[cusChoice - 1].id;
//           var updateStock = (currentStock + cusRequest);
// 		  for (var i=0; i<res.length; i++){
//             connection.query('UPDATE products SET ? WHERE ?', [
//           {stock: updateStock},
//           {id: cusChoice}
//           ], function(err, res){
//             if(err) throw err;
//                 console.log("You added " + updateStock + " to the stockroom.");
//                 console.log("_________________________________________________");
//                 }
//               );
//             }
       
//         })
// }

})
}

start();

