


function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9_])+\.)+([a-zA-Z0-9_]{2,4})+$/;
	return regex.test(email);
}

$("#submitButton").click(function() {
	user = {
		email: $("#email").val(),
		password: $("#password").val()
	}

	console.log(user);


function login(email, password, callback) {
  var connection = mysql({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'soccerUser_db'
  });

  connection.connect();

  var query = "SELECT id, email, password " +
    "FROM Admin WHERE email = email";

  connection.query(query, [email], function (err, results) {
    if (err) return callback(err);
    if (results.length === 0) return callback(new WrongUsernameOrPasswordError(email));
    var user = results[0];

    bcrypt.compare(password, user.password, function (err, isValid) {
      if (err) {
        callback(err);
      } else if (!isValid) {
        callback(new WrongUsernameOrPasswordError(email));
      } else {
        callback(null, {
          id: user.id.toString(),
          email: user.email
        });
      }
    });

  });
}


});




