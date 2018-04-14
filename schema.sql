DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  item_id INT AUTO_INCREMENT NOT NULL,
  product_name VARCHAR(45) NOT NULL,
  department_name VARCHAR(45) NOT NULL,
  price DECIMAL(10,2) NOT NULL,
  stock_quantity INT(10) NOT NULL,
  primary key(item_id)
);

SELECT * FROM products;

INSERT INTO products (product_name, department_name, price, stock_quantity)
VALUES ("Toilet Paper", "Necessities", 20.00, 70),
  ("Salami", "Food", 10.00, 100),
  ("Coca Cola Pack", "Drinks", 30.00, 70),
  ("Button Down Dress Shirt", "Clothes", 50.00, 10),
  ("Designer Sunglasses", "Accessories", 100.00, 20),
  ("Shampoo", "BathroomStuff", 15.00, 150),
  ("Proactive", "BathroomStuff", 30.00, 25),
  ("Dunkaroos", "Food", 7.00, 300);

