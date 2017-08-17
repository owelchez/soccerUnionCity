$('#addPlayer').on("click", function(){

	var newPlayer = 
	{
		firstName: $("#firstName").val().trim(),
		lastName: $("#lastName").val().trim(), 
		position: $("#position").val().trim(),
		dob: $("#dob").val().trim(),
		address: $("#address").val().trim(),
		emailAddress: $("#email").val().trim(),
		phoneNumber: $("#phoneNumber").val().trim(),
		emergencyPhoneNumber: $("#ePhoneNumber").val().trim(),
		profilePicture: $("#profilePicture").val().trim(),
		currentTeam: $("#currentTeam").val().trim()
	};

	 
	var currentURL = window.location.origin;

	 
	$.post( currentURL + "/create/player", newPlayer)
		 
		.done(function(data){
			 
			console.log(data);
			 
			alert("Adding Player...")
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