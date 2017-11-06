var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var methodOverride = require('method-override');
var sequelize = require('sequelize');
var models = require('./models');

// This will synchronize Admin and Player tables
var Admin = require('./models')["Admin"];
Admin.sync();
var Player = require('./models')["Player"];
Player.sync();

var PORT = 3000;
var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// This will override a POST request from my form to update players (Once I get it done ;p)
app.use(methodOverride('_method'));

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
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

app.listen(PORT);
console.log('Hackin\' n Slacking on PORT ' + PORT);