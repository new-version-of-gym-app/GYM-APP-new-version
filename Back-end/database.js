const mysql = require('mysql2')

var connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database : 'GYM', 
    password: "achref2050"
  });
  
  connection.connect(function(err) {
    if (err) throw err;
    console.log("my sql connection is active !!!");
  });

  module.exports = connection

