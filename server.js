var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var methodOverride = require('method-override');
var sequelize = require('sequelize');
var fs = require('fs');

var PORT = 3000;
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// This will override a POST request from my form to update players (Once I get it done ;p)
app.use(methodOverride('_method'));


			/*This is a sample for user's data*/
var users = [{
	routeName: 'orvin',
	name: 'Orvin',
	role: 'Coach',
	age: 35,
	phoneNumber: '3677530816',
	profilePic: ''
}, {
	routeName: 'messi',
	name: 'Messi',
	role: 'Player',
	age: 30,
	phoneNumber: '4789234342',
	profilePic: ''
}, {
	routeName: 'robben',
	name: 'Robben',
	role: 'Player',
	age: 33,
	phoneNumber: '5437998723',
	profilePic: ''
}];

var connection = mysql.createConnection({
	host: 'localhost',
	user: 'root',
	password: 'loco',
	database: 'soccerUser_db'
});

connection.connect(function (err) {
	if (err) {
		console.log('Error connecting: ' + err.stack);
		return;
	} else {
		console.log('Working fine!');
	}
});

//connection.connect();


/**********************************************************/
/**********************************************************/

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/find/players', function(req, res){
	connection.query('SELECT * FROM users', function (err, results){
		if (err) {
			throw err;
		}
		res.json(results);
		//res.json(users);
	})
});

app.get('/find/players/:index', function(req, res){
	//index without question mark makes it mandatory
	var userIndex = req.params.index;
	console.log('This is line 90 ' + userIndex);

	connection.query('SELECT * FROM users WHERE ?', { routeName: userIndex }, function (err, results){
		if (err) {
			throw err;
		}
		res.json(results);
	})
});

app.get('*', function (req, res) {
	res.status(404).sendFile(path.join(__dirname, './public/404NotFound.html'));
});
 

app.listen(PORT);
console.log('Hackin\' n Slacking on PORT ' + PORT);