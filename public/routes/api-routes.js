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

}