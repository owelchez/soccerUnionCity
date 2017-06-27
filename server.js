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

/**********************************************************/
/**********************************************************/

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules/bootstrap/dist/css/'));
app.use('/jquery', express.static(__dirname + '/node_modules/jquery/dist/'));

 
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/find/users', function(req, res){
	res.json(users);
});

app.get('/find/users/:index', function(req, res){
	//index without question mark makes it mandatory
	var userIndex = req.params.index;
	console.log(userIndex);
	if(users[userIndex] !== undefined) {
		res.json(users[userIndex]);
	} else {
		res.status(404).json('User not found!');
	}
});

app.post('/find/users/', function(req, res){
	var newUser = req.body;
	if(typeof newUser === 'object') {
		users.push(newUser);
		res.status(201).json(newUser);
	} else {
		res.status(401).json('Please use valid object');
	}
})

// Search for Specific User (or all users) - provides JSON
/*app.get('/find/:users?', function (req, res) {
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
});*/

app.get('*', function (req, res) {
	res.status(404).sendFile(path.join(__dirname, './public/404NotFound.html'));
});
 

app.listen(PORT);
console.log('Hackin\' n Slacking on PORT ' + PORT);