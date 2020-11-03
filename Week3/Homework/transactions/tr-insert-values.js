const util = require("util");
const mysql = require("mysql");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
};

const insertIntoAccount = `
INSERT INTO account 
VALUES
(101,1248.3),
(102,368),
(103,9002);
`;

const insertIntoAccountChanges = `
INSERT INTO account_changes
VALUES 
(10000,102,200.5,'2020-03-05 15:20:13','deposite'),
(10001,103,25,'2020-06-14 07:01:25','withdrawal');

`;

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(insertIntoAccount);
    await execQuery(insertIntoAccountChanges);
    console.log("Values Inserted");
  } catch (err) {
    console.error(err.message);
    connection.end();
  }
  connection.end();
}

seedDatabase();
