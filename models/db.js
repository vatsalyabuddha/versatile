var mysql = require('mysql2');

var dbConnection = mysql.createConnection({
    host: "172.50.3.197",
    user: "versatile_user",
    password: "mdob08HYjehjd9",
    database : "versatile"
});
  
dbConnection.connect(function(err) {
    if (err) throw err;
    console.log("DB Connected!!!!");
});

global.dbConnection = dbConnection;