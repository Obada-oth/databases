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

  const paperAndNumOfAuthors = `
  SELECT
  paper_title,
  count(author_no)
  FROM research_papers
  JOIN auth_paper
     ON research_papers.paper_id =
            auth_paper.paper_id group by auth_paper.paper_id;
  `;
  con.query(paperAndNumOfAuthors, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  const papersByFeAuthors = `
  SELECT 
  COUNT(paper_id) AS pa_by_female_authors
  FROM auth_paper 
  JOIN authors 
    ON auth_paper.author_no =  authors.author_no
  WHERE authors.gender = 'f'
  `;
  con.query(papersByFeAuthors, function (err, result) {
    if (err) throw err;
    console.log(result);
  });

  const papersByUni = `
  SELECT university,COUNT(paper_id) 
  FROM authors 
  JOIN auth_paper 
     ON authors.author_no = auth_paper.author_no
  GROUP BY authors.university;
  `;
  con.query(papersByUni, function (err, result) {
    if (err) throw err;
    console.log(result);
  });
  con.end();
});
