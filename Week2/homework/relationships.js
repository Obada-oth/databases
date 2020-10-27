const mysql = require("mysql");
const authors = require("./authors.json");
const papers = require("./papers.json");
const auth_paper = require("./auth_paper.json");
const con = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "company",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
  const researchPapersSql = `CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT PRIMARY KEY,
      paper_title VARCHAR(100),
      conference VARCHAR(100),
      publish_date DATE
      )`;

  const authorPaperSql = `
      CREATE TABLE IF NOT EXISTS auth_paper (
      author_no INT NOT NULL, 
      paper_id INT NOT NULL,
      
      CONSTRAINT fk_author_no FOREIGN KEY(author_no) REFERENCES authors(author_no),
      CONSTRAINT fk_paper_id FOREIGN KEY(paper_id) REFERENCES research_papers(paper_id),
      PRIMARY KEY (author_no,paper_id)
      )`;

  con.query(researchPapersSql, function (err, result) {
    if (err) throw err;
    console.log("Table research_papers created");
  });

  con.query(authorPaperSql, function (err, result) {
    if (err) throw err;
    console.log("auth_paper table created");
  });
  authors.forEach((author) => {
    const authorsDataSql = `
    INSERT INTO authors VALUES (
      ${author.author_no},
      "${author.author_name}",
      "${author.university}",
      "${author["date of birth"]}",
      ${author["h-index"]},
      "${author.gender}",
      ${author.collaborators}
    )
    `;
    con.query(authorsDataSql, function (err, result) {
      if (err) throw err;
      console.log("authors data inserted");
    });
  });

  papers.forEach((paper) => {
    const papersDataSql = `
    INSERT INTO research_papers VALUES(
      ${paper.paper_id},
      "${paper.paper_title}",
      "${paper.conference}",
      "${paper.publish_date}"
    )
    `;
    con.query(papersDataSql, function (err, result) {
      if (err) throw err;
      console.log("papers data inserted");
    });
  });

  auth_paper.forEach((entry) => {
    const authPaperSql = `
    INSERT INTO auth_paper VALUES(
      ${entry.author_no},
      ${entry.paper_id}  
    )
    `;
    con.query(authPaperSql, function (err, result) {
      if (err) throw err;
      console.log("papers data inserted");
    });
  });

  con.end();
});
