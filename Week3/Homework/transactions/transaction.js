const util = require("util");
const mysql = require("mysql");
const moment = require("moment");

const CONNECTION_CONFIG = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "userdb",
};

async function seedDatabase() {
  const connection = mysql.createConnection(CONNECTION_CONFIG);
  const execQuery = util.promisify(connection.query.bind(connection));

  try {
    await execQuery(`START TRANSACTION`);
    await execQuery(
      `UPDATE account 
        SET balance = balance - 1000 
        WHERE account_number = 101`
    );
    await execQuery(
      `UPDATE account 
        SET balance = balance + 1000 
        WHERE account_number = 102`
    );
    await execQuery(
      `INSERT INTO account_changes
      (account_number,change_amount,change_date,remark)
      VALUES (
          101,
          -1000,
          '${moment().format("YYYY/MM/DD, HH:mm:ss")}',
          'Transfer to account 102'
          
      )
      
    `
    );
    await execQuery(
      `INSERT INTO account_changes
        (account_number,change_amount,change_date,remark)
        VALUES (
            102,
            1000,
            '${moment().format("YYYY/MM/DD, HH:mm:ss")}',
            'Transfer from account 101'
            
        )
        
      `
    );
    await execQuery("COMMIT");
    console.log("Transaction is done!");
  } catch (err) {
    console.error(err.message);
    await execQuery("ROLLBACK");
    connection.end();
  }
  connection.end();
}

seedDatabase();
