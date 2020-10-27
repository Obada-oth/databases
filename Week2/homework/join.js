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

  const authorsAndCollaborators = `
  SELECT 
  a1.author_name AS Author,
  a2.author_name AS Collaborator
  FROM authors AS a1
  LEFT JOIN authors AS a2
  ON a1.author_no = a2.collaborator 
  `;
  con.query(authorsAndCollaborators, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  const authorsAndPapers = `
  SELECT 
  a.author_no,
  a.author_name,
  a.university,
  a.date_of_birth,
  a.h_index,gender,
  a.collaborator,
  rp.paper_title
  
  FROM authors AS a
  LEFT JOIN auth_paper AS ap
  ON a.author_no = ap.author_no
  LEFT JOIN research_papers AS rp
  ON ap.paper_id = rp.paper_id
  `;
  con.query(authorsAndPapers, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  con.end();
});
