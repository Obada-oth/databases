const mysql = require("mysql");

const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "company",
});
con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");

  const authorsSql =
    "CREATE TABLE IF NOT EXISTS Authors (author_no INT PRIMARY KEY, author_name VARCHAR(100),university VARCHAR(100),date_of_birth DATE,h_index INT,gender ENUM('m','f'))";
  con.query(authorsSql, function (err, result) {
    if (err) throw err;
    console.log("Table Authors created");
  });

  const collaboratorSql = "ALTER TABLE Authors ADD column (collaborator INT)";
  con.query(collaboratorSql, function (err, result) {
    if (err) throw err;
    console.log("Column added");
  });

  const foreignKeySql =
    "ALTER TABLE Authors ADD FOREIGN KEY (collaborator) REFERENCES Authors (author_no)";
  con.query(foreignKeySql, function (err, result) {
    if (err) throw err;
    console.log("foreign key added");
  });

  con.end();
});
