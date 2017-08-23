var row = $('<tr><td><span id="firstName"></span></td><td>' + 
	'<span id="secondName"></span></td></tr>');

$("#findByName").on('click', function(){

	var playerName = $("#name").val().trim();

	var currentURL = window.location.origin;

	$.get( currentURL + "/find/" + playerName)
		 
		.done(function(data){
			 
			console.log(data);

		$("#tableContainer").append(row);
		$("#firstName").html(data.firstName);
		$("#secondName").html(data.secondName);	
			 
		})

	return false;
})