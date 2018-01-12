var express = require('express');
var path = require('path');
var app = express();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var Player = require('../../models/')["Player"];
var Admin = require('../../models/')["Admin"];

app.get('/', function(req, res){
		res.redirect('/');
});

app.get('/login', function (req, res) {
  res.sendFile(path.join(__dirname, '../login.html'));
});

app.get('/findbyname', function (req, res) {
  res.sendFile(path.join(__dirname, '../findByName.html'));
});

app.get('/addPlayer', function (req, res) {
  res.sendFile(path.join(__dirname, '../addPlayer.html'));
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

app.get('/findById/:id?', function(req, res){
	if(req.params.id) {
		Player.findById(req.params.id).then(player => {
			return res.json(player);
		})
	}
	if(!req.params.id) {
		res.status(404).send("Not found!");
	}
});

app.delete('/player/delete/:id?', function(req, res){
	var deletePlayer = req.params.id;
	if(deletePlayer) {
		Player.findOne({
			where: {
				id: deletePlayer
			}
		}).then(function(obj){
			console.log('This is obj ' + obj);
			if(obj) {
				obj.destroy({
    				where: {
        				id: deletePlayer
    				}
				}).then(function(){
					res.redirect(303, '/findbyname');
				})
			}
		})
	}
});

app.put('/player/update/:id?', function(req, res){
	var updatedPlayer = req.body;
	var playerId = req.params.id;
	if(playerId) {
		Player.findOne({
			where: {
				id: playerId
			}
		}).then(function(obj){
			if(obj) {

				var routeName = updatedPlayer.firstName.replace(/\s+/g, '').toLowerCase();

				obj.updateAttributes({
					routeName: routeName,
					firstName: updatedPlayer.firstName,
					lastName: updatedPlayer.lastName,
					pitchPosition: updatedPlayer.pitchPosition,
					dob: updatedPlayer.dob,
					address: updatedPlayer.address,
					email: updatedPlayer.email,
					phoneNumber: updatedPlayer.phoneNumber,
					emergencyPhoneNumber: updatedPlayer.emergencyPhoneNumber,
					profilePicture: updatedPlayer.profilePicture,
					currentTeam: updatedPlayer.currentTeam
				}).then(function(){
					res.redirect(303, '/findbyname');
				})
			}
		})
	}
});

app.post('/create/player', function(req, res){
		var player = req.body;

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

app.get('/findByEmail/:email?', function(req, res){
	console.log('This is req.params.email ' + req.params.email);
	var adminEmail = req.params.email;
		Admin.findAll({
			where: {
				email: adminEmail
			}
		})
		.then(function(obj) {
			console.log('This is obj ' + obj);
			return res.json(obj);
		})
});

app.get('*', function (req, res) {
	res.status(404).sendFile(path.join(__dirname, '../404NotFound.html'));
});

app.use(new LocalStrategy({
  usernameField: 'email',
    passwordField: 'password'
},
  function(username, password, done) {
    Admin.findOne({ username: username }, function(err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

app.post('/login',
  		passport.authenticate('local', { successRedirect: '/findbyname',
                                  		failureRedirect: '/login',
                                  		failureFlash: true })
);

module.exports = app;