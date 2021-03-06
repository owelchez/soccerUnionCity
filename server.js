var bodyParser = require('body-parser');
var session = require('express-session');
var express = require('express');
var flash = require('req-flash');
var favicon = require('serve-favicon');
var path = require('path');
var mysql = require('mysql');
var methodOverride = require('method-override');
var sequelize = require('sequelize');
var models = require('./models');
var app = express();

// Database setup
var Sequelize = require('sequelize');
var connection;

if(process.env.JAWSDB_URL) {
	connection = new Sequelize(process.env.JAWSDB_URL);
} else {
	connection = new Sequelize('todo_db', 'root', 'password', {
		host: 'localhost',
		dialect: 'mysql',
		port: '3306'
	})
}

// This will synchronize Admin and Player tables
var Admin = require('./models')["Admin"];
Admin.sync();
var Player = require('./models')["Player"];
Player.sync();

var port = process.env.PORT || 3000;


app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))
app.use(flash());

// This will override a POST request from my form to update players (Once I get it done ;p)
app.use(methodOverride('_method'));

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
//app.use(express.static(__dirname + '/package'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

var routes = require('./public/routes/api-routes.js');

app.use('/', routes);
app.use('/login', routes);
app.use('/findbyname', routes);
app.use('/addPlayer', routes);
app.use('/find/:players?', routes);
app.use('/create/player', routes);
app.use('/update/player', routes);
app.use('*', routes);

app.listen(port, function(){
	console.log('Hackin\' n Slacking on PORT ' + port);
});