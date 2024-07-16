//Dummy database entries
const { Client } = require("pg");
const { faker } = require("@faker-js/faker");

const client = new Client({
  user: "postgres",
  host: "localhost",
  database: "shopease",
  password: "4986",
  port: 5432,
});

client.connect();

const populateProducts = async () => {
  for (let i = 0; i < 10000; i++) {
    const text = 'INSERT INTO products(name, description, price) VALUES($1, $2, $3)';
    const values = [faker.commerce.productName(), faker.commerce.productDescription(), faker.commerce.price()];
    await client.query(text, values);
  }
  console.log('Products table populated');
};

const populateCustomers = async () => {
  for (let i = 0; i < 10000; i++) {
    const text = 'INSERT INTO customers(name, email) VALUES($1, $2)';
    const values = [faker.person.fullName(), faker.internet.email({ allowSpecialCharacters: true }) + i];
    await client.query(text, values);
  }
  console.log('Customers table populated');
};

const populateOrders = async () => {
  const { rows: customerIds } = await client.query('SELECT customer_id FROM customers');

  for (let i = 0; i < 10000; i++) {
    const customerIndex = Math.floor(Math.random() * customerIds.length);
    const customerId = customerIds[customerIndex].customer_id;

    const text = 'INSERT INTO orders(customer_id, product_id, quantity, total_price) VALUES($1, $2, $3, $4)';
    const values = [
      customerId,
      Math.floor(Math.random() * 10000) + 1,
      Math.floor(Math.random() * 10) + 1,
      faker.commerce.price(),
    ];
    await client.query(text, values);
  }
  console.log('Orders table populated');
};

const populateDatabase = async () => {
  await populateProducts();
  await populateCustomers();
  await populateOrders();
  client.end();
};

populateDatabase();
