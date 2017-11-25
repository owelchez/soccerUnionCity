$("form").on('submit', function(e){


	var newPlayer = 
	{
		firstName: $("#firstName").val().trim(),
		lastName: $("#lastName").val().trim(), 
		pitchPosition: $("#position").val().trim(),
		dob: $("#dob").val().trim(),
		address: $("#address").val().trim(),
		email: $("#email").val().trim(),
		phoneNumber: $("#phoneNumber").val().trim(),
		emergencyPhoneNumber: $("#ePhoneNumber").val().trim(),
		profilePicture: $("#profilePicture").val().trim(),
		currentTeam: $("#currentTeam").val().trim()
	};

	var currentURL = window.location.origin;
	 
	$.post( currentURL + "/create/player", newPlayer)
		 
		.done(function(data){
			 
			console.log("This is data from POST " + data);
			 
		})
		
	 
	$("#firstName").val("");
	$("#lastName").val("");
	$("#position").val("");
	$("#dob").val("");
	$("#address").val("");
	$("#email").val("");
	$("#phoneNumber").val("");
	$("#ePhoneNumber").val("");
	$("#profilePicture").val("");
	$("#currentTeam").val("");

	return false;

});	