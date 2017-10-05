var express = require('express');
var router = express.Router();
var path = require('path');
var app = express();
var Player = require('../../models/')["Player"];
var Admin = require('../../models/')["Admin"];

router.get('/', function(req, res){
		res.redirect('/');
});

router.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../login.html'));
});

router.get('/findbyname', function (req, res) {
  res.sendFile(path.join(__dirname, '../findByName.html'));
});

router.get('/addPlayer', function (req, res) {
  res.sendFile(path.join(__dirname, '../addPlayer.html'));
});

router.get('/find/:players?', function(req, res){
	if(req.params.players) {
		// FindAll to find any possible repeated names
		Player.findAll({
			where: {
				routeName: req.params.players
			}
		}).then(function(result){
			if(result.length < 1) {
				res.status(404).send(result);
			} else {
				res.json(result);
			}
		})
	} else {
		Player.findAll({})
			.then(function(result){
				return res.json(result);
			})
	}
});

router.get('/findById/:id?', function(req, res){
	if(req.params.id) {
		Player.findById(req.params.id).then(player => {
			res.json(player);
		})
	}
});

router.post('/create/player', function(req, res){
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

router.get('*', function (req, res) {
	res.status(404).sendFile(path.join(__dirname, '../404NotFound.html'));
});

module.exports = router;