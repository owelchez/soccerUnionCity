var models = require('./../../models');

module.exports = function(page) {

app.get('/find/:players?', function(req, res){
	if(req.params.players) {
		Player.findOne({
			where: {
				routeName: req.params.players
			}
		}).then(function(result){
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

		var routeName = player.name.replace(/\s+/g, '').toLowerCase();

		Player.create({
			routeName: routeName,
			firstName: player.firstName,
			lastName: player.lastName,
			pitchPosition: player.pitchPosition,
			dob: player.dob,
			address: player.address,
			email: player.email,
			phone: player.phone,
			emergencyPhone: player.emergencyPhone,
			profilePicture: player.profilePicture,
			currentTeam: player.currentTeam
		});
	})

}