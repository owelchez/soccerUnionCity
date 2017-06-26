var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');

var PORT = 3000;
var app = express();



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: 'application/vnd.api+json'}));


			/*This is a sample for user's data*/
var users = [{
	routeName: 'orvin',
	name: 'Orvin',
	role: 'Couch',
	age: 35,
	phoneNumber: '3677530816'
}, {
	routeName: 'messi',
	name: 'Messi',
	role: 'Player',
	age: 30,
	phoneNumber: '4789234342'
}, {
	routeName: 'robben',
	name: 'Robben',
	role: 'Player',
	age: 33,
	phoneNumber: '5437998723'
}];

/**********************************************************/
/**********************************************************/

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
})

// Search for Specific User (or all users) - provides JSON
app.get('/find/:users?', function (req, res) {
	var chosen = req.params.users;
	console.log(chosen);
	if (chosen) {
		console.log(chosen);

		for (var i = 0; i < users.length; i++) {
			if (chosen === users[i].routeName) {
				res.json(users[i]);
				return;
			}
		}

		res.json(false);
	} else {
		res.json(users);
	}
});

app.get('*', function (req, res) {
	res.status(404).sendFile(path.join(__dirname, './public/404NotFound.html'));
});
 

app.listen(PORT);
console.log('Hackin\' n Slacking on PORT ' + PORT);