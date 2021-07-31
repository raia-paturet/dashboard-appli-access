const express = require('express');
const path = require("path");
const util = require("util");
const cookieParser = require('cookie-parser');
const Cookies = require('cookies');
const bodyParser = require('body-parser');
const mysql = require('mysql');
//const favicon = require('express-favicon');


const dotenv = require('dotenv');
dotenv.config({ path: './.env'})


const app = express();


const pool  = mysql.createPool({
	host: process.env.DATABASE_HOST,
	user: process.env.DATABASE_USER,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE
});

global.pool = pool;
global.queryPromise = util.promisify(pool.query.bind(pool));




//declarer le template ejs et configuration des paths
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static('public'));

//app.use(favicon(path.join(__dirname, 'public', 'favicon.png')))

//app.use(favicon(__dirname + '/public/images/favicon.png'));
//app.use('favicon.png', express.static('/public/images/favicon.png'));
//Parse url -encoded bodies(as sent by html forms)
app.use(express.urlencoded({ extended: false }));
//Parse JSON bodies (as sent by aPI clients)
app.use(express.json());
app.use(cookieParser());






//declaration du port
const port = 3000
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})


//Define Routes
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));



//pool.end(function (err) {
    // all connections in the pool have ended
//});



