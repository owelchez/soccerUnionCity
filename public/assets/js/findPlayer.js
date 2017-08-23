var row = $('<tr><td><span id="firstName"></span></td>' + 
	'<td><span id="lastName"></span></td>' + 
	'<td><span id="pitchPosition"></span></td>' + 
	'<td><span id="dob"></span></td>' + 
	'<td><span id="address"></span></td>' + 
	'<td><span id="email"></span></td>' + 
	'<td><span id="phoneNumber"></span></td>' + 
	'<td><span id="emergencyPhoneNumber"></span></td>' + 
	'<td><span id="currentTeam"></span></td>');

$("#findByName").on('click', function(){

	var playerName = $("#name").val().trim();

	var currentURL = window.location.origin;

	$.get( currentURL + "/find/" + playerName)
		 
		.done(function(data){
			 
			console.log(data);

		$("#tableContainer").append(row);
		$("#firstName").html(data.firstName);
		$("#lastName").html(data.lastName);
		$("#pitchPosition").html(data.pitchPosition);	
		$("#dob").html(data.dob);
		$("#address").html(data.address);
		$("#email").html(data.email);
		$("#phoneNumber").html(data.phoneNumber);
		$("#emergencyPhoneNumber").html(data.emergencyPhoneNumber);
		$("#profilePicture").html(data.profilePicture);
		$("#currentTeam").html(data.currentTeam);	 
		})

		$("#name").val("");
		playerName = "";

	return false;
})