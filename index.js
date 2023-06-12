const express = require('express');
app = express();
var http = require('http').Server(app);
const cors = require('cors');
const router = express.Router()
// var mysql = require('mysql');
var bodyParser = require('body-parser')
var fileupload = require("express-fileupload");

// require('dotenv').config();

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(fileupload());




var dbConnection = require('./models/db');

// var dbConnection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "Root@123"
//   });
  
//   dbConnection.connect(function(err) {
//     if (err) throw err;
//     console.log("DB Connected!");
// });


var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200 // For legacy browser support
}

app.use(cors(corsOptions));
// Routes 
const apiRoute = require('./routes/api');
const communicationRoute = require('./routes/communication');
const vahanRoute = require('./routes/vahan');
const uploadRoute = require('./routes/upload');


app.use('/api',apiRoute);
app.use('/communication',communicationRoute);
app.use('/vahan',vahanRoute);
app.use('/upload',uploadRoute);


// const PORT = process.env.PORT || 3000;
 
http.listen(4000, '0.0.0.0',function(){;
    console.log("listening on port 4000");
});
