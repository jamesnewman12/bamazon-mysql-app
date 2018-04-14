const mysql = require("mysql");
const inquirer = require("inquirer");
const emptyArray = [];

const connection = mysql.createConnection({
  host: "localhost",
  port: 8889,

  
  user: "root",

  password: "root",
  database: "bamazon"
});

connection.connect(function(err) {
  if (err) {
    console.error("error connecting: " + err.stack);
  }
  loadProducts();
});

function loadProducts() {
  connection.query("SELECT * FROM products", function(err, res) {
    if (err) throw err;
    console.log(typeof res);
    console.log("Item Id    Product Name    Product Kind    Price     Quantity");
    for (var i = 0; i < res.length; i++) {
      var itemList = (`${res[i].item_id}      ${res[i].product_name}    ${res[i].department_name}    ${res[i].price}     ${res[i].stock_quantity}`);
        console.log(`${res[i].item_id}      ${res[i].product_name}    ${res[i].department_name}    ${res[i].price}     ${res[i].stock_quantity}`);
        emptyArray.push(JSON.stringify(itemList))
      }
      // `${}` allows to skip concatenation   
    })
  // delay in calling the purchase function so it isnt thrown onto the table
  //setTimeout(function(){_____()}, 1000 = 1 second);
  setTimeout(function(){customerPrompt()}, 1000);
};

//   console.table(res);
    // customerPrompt(res);
 function customerPrompt(inventory) {
  // Prompts user for what they would like to purchase
  inquirer
    .prompt([
      {
        type: "input",
        name: "choice",
        message: "What is the id of the product you want to buy? [exit with letter q]",
        validate: function(val) {
          return !isNaN(val) || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      // if they want to quit the program
      checkIfShouldExit(val.choice);
      var choiceId = parseInt(val.choice);
      var product = checkInventory(choiceId, inventory);

      if (product) {
        promptCustomerForQuantity(product);
      }
      else {
        console.log("\nThat item is not available.");
        loadProducts();
      }
    });
}

function promptCustomerForQuantity(product) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "quantity",
        message: "How many of the item would you like? [exit with letter q]",
        validate: function(val) {
          return val > 0 || val.toLowerCase() === "q";
        }
      }
    ])
    .then(function(val) {
      //  if they want to quit the program
      checkIfShouldExit(val.quantity);
      var quantity = parseInt(val.quantity);

      // not enough of the item, reloads.
      if (quantity > product.stock_quantity) {
        console.log("\nNot enough of this item");
        loadProducts();
      }
      else {
        // Otherwise run makePurchase, give it the product information and desired quantity to purchase
        makePurchase(product, quantity);
      }
    });
}

// Purchase the desired quanity of the desired item
function makePurchase(product, quantity) {
  connection.query(
    "UPDATE products SET stock_quantity = stock_quantity - ? WHERE item_id = ?",
    [quantity, product.item_id],
    function(err, res) {
      // tell them they bought the item without problems
      console.log("\nYou bought successfully! " + quantity + " " + product.product_name + "'s!");
      loadProducts();
    }
  );
}

// does the item exist already in the inventory?
function checkInventory(choiceId, inventory) {
  for (var i = 0; i < inventory.length; i++) {
    if (inventory[i].item_id === choiceId) {
      // return what they search for if its found
      return inventory[i];
    }
  }

  return null;
}

// if they want to quit the program
function checkIfShouldExit(choice) {
  if (choice.toLowerCase() === "q") {
    // message logs and quits
    console.log("Goodbye from us at bamazon!");
    process.exit(0);
  }
}
