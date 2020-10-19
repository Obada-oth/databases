const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  database: "new_world",
});
connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  const countriesMoreThan8M =
    "SELECT name,population FROM country WHERE population > 8000000 ORDER BY population";
  connection.query(countriesMoreThan8M, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const landCountries = "SELECT name FROM country WHERE name LIKE '%land%'";
  connection.query(landCountries, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const citiesBetween500KAnd1M =
    "SELECT name,population FROM city WHERE population >= 500000 AND population <= 1000000 ORDER BY population";
  connection.query(citiesBetween500KAnd1M, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const europeCountries =
    "SELECT name,continent FROM country WHERE continent LIKE 'Europe'";
  connection.query(europeCountries, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const countriesOrderedByArea =
    "SELECT name,surfaceArea FROM country ORDER BY surfaceArea DESC";
  connection.query(countriesOrderedByArea, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const NetherlandsCities = "SELECT name FROM city WHERE CountryCode = 'NLD'";
  connection.query(NetherlandsCities, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const RotterdamPop =
    "SELECT population FROM city WHERE name LIKE 'Rotterdam'";
  connection.query(RotterdamPop, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const Top10CountriesByArea =
    "SELECT name,surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 10";
  connection.query(Top10CountriesByArea, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const Top10CitiesByPop =
    "SELECT name,population FROM city ORDER BY population DESC LIMIT 10";
  connection.query(Top10CitiesByPop, function (error, results, fields) {
    if (error) console.log(error);
    console.log(results);
  });

  const worldPop = "SELECT population FROM country";
  connection.query(worldPop, function (error, results, fields) {
    if (error) console.log(error);
    let worldPopulation = 0;
    results.forEach((countryPop) => {
      worldPopulation += countryPop.population;
    });
    console.log("World population is : " + worldPopulation);
  });

  connection.end();
});
