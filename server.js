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

require("./public/routes/html-routes.js");
require("./public/routes/api-routes.js");



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));

// This will override a POST request from my form to update players (Once I get it done ;p)
app.use(methodOverride('_method'));


/**********************************************************/
/**********************************************************/

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, './public/login.html'));
});

app.get('/findbyname', function (req, res) {
  res.sendFile(path.join(__dirname, './public/findByName.html'));
});

app.get('/addPlayer', function (req, res) {
  res.sendFile(path.join(__dirname, './public/addPlayer.html'));
});

app.get('/find/:players?', function(req, res){
	if(req.params.players) {
		// FindAll to find any possible repeated names
		Player.findAll({
			where: {
				routeName: req.params.players
			}
		}).then(function(result){
			if(result.length < 1) {
				return res.status(404).send(result);
			}

			return res.json(result);
		
		})
	} else {
		Player.findAll({})
			.then(function(result){
				return res.json(result);
			})
	}
});

app.post('/create/player', function(req, res){
		var player = req.body;
		console.log(player);

		var routeName = player.firstName.replace(/\s+/g, '').toLowerCase();

		Player.create({
			routeName: routeName,
			firstName: player.firstName,
			lastName: player.lastName,
			pitchPosition: player.pitchPosition,
			dob: player.dob,
			address: player.address,
			email: player.email,
			phoneNumber: player.phoneNumber,
			emergencyPhoneNumber: player.emergencyPhoneNumber,
			profilePicture: player.profilePicture,
			currentTeam: player.currentTeam
		});
})


app.get('*', function (req, res) {
	res.status(404).sendFile(path.join(__dirname, './public/404NotFound.html'));
});
 

app.listen(PORT);
console.log('Hackin\' n Slacking on PORT ' + PORT);