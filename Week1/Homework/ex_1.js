const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  // database: "meetup",
});

connection.connect((err) => {
  if (err) {
    console.log(err);
  }
  const meetup = "CREATE DATABASE IF NOT EXISTS meetup";
  connection.query(meetup, function (error, results, fields) {
    if (error) throw error;
    console.log("database created");
  });

  connection.query("USE meetup", function (error, results, fields) {
    if (error) throw error;
    console.log("database meetup selected");
  });

  let invitee = `CREATE TABLE IF NOT EXISTS invitee(invitee_no INTEGER NOT NULL PRIMARY KEY , invitee_name TEXT NOT NULL , invited_by TEXT)`;
  connection.query(invitee, function (error, results, fields) {
    if (error) throw error;
    console.log("table created");
  });

  let room = `CREATE TABLE IF NOT EXISTS room(room_no INTEGER PRIMARY KEY NOT NULL, room_name TEXT, floor_number INTEGER )`;
  connection.query(room, function (error, results, fields) {
    if (error) throw error;
    console.log("table created");
  });

  let meeting = `CREATE TABLE IF NOT EXISTS meeting(meeting_no INTEGER PRIMARY KEY NOT NULL, meeting_title TEXT, starting_time TIME NOT NULL, ending_time TIME, room_no INTEGER)`;
  connection.query(meeting, function (error, results, fields) {
    if (error) throw error;
    console.log("table created");
  });

  let inviteeData = `INSERT INTO invitee VALUES(1,'John','Lisa'),
  (2,'Mark','Steve'),
  (3,'Jena','Sean'),
  (4,'Hanna','Obi'),
  (5,'Noah','Jack');`;

  connection.query(inviteeData, function (error, results, fields) {
    if (error) throw error;
    console.log("added records to invitee");
  });

  let roomData = `INSERT INTO room VALUES(101,'Meetings 1',1),
  (102,'Meetings 2',1),
  (201,'Meetings 3',2),
  (305,'Meetings 4',3),
  (306,'Meetings 5',3)`;
  connection.query(roomData, function (error, results, fields) {
    if (error) throw error;
    console.log("added records to room");
  });

  let meetingData = `INSERT INTO meeting VALUES(1,'Weekly review','08:00:00','09:00:00',102),
  (2,'Accounting meeting','10:00:00','11:00:00',101),
  (3,'Brainstorming','13:00:00','14:00:00',201),
  (4,'HR Meeting','09:00:00','11:00:00',305),
  (5,'Sales team meeting','14:00:00','15:00:00',306)`;
  connection.query(meetingData, function (error, results, fields) {
    if (error) throw error;
    console.log("added records to meeting");
  });
  // connection.query("DROP DATABASE IF EXISTS meetup", function (
  //   error,
  //   results,
  //   fields
  // ) {
  //   if (error) throw error;
  //   console.log("database dropped");
  // });
  connection.end();
});
