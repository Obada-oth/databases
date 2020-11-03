const util = require("util");
const mysql = require("mysql");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
};

const createAccountTable = `
  CREATE TABLE IF NOT EXISTS account (
    account_number INT PRIMARY KEY AUTO_INCREMENT,
    balance FLOAT NOT NULL
  );`;

const createAccountChangesTable = `
  CREATE TABLE IF NOT EXISTS account_changes (
    change_number INT PRIMARY KEY AUTO_INCREMENT,
    account_number INT NOT NULL,
    change_amount FLOAT,
    change_date DATETIME,
    remark VARCHAR(100),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
    
  );`;

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(createAccountTable);
    await execQuery(createAccountChangesTable);
    console.log("Tables created");
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
  connection.end();
}

seedDatabase();
