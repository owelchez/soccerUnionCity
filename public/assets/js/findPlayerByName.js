$("#updatePlayer").hide();

$("#findByName").on('click', function(){

	$("table tbody").empty();
	$("#errorMessage").html("");

	var playerName = $("#searchName").val().trim();

	var currentURL = window.location.origin;

	$.get( currentURL + "/find/" + playerName)
		 
		.done(function(data){
			for(index = 0; index < data.length; index++){
				row = $('<tr>' + 
						'<td><span>' + (index + 1) + '</span></td>' + 
						'<td><span>' + data[index].firstName + '</span></td>' + 
						'<td><span>' + data[index].lastName + '</span></td>' + 
						'<td><span>' + data[index].pitchPosition + '</span></td>' + 
						'<td><span>' + data[index].dob + '</span></td>' + 
						'<td><span>' + data[index].address + '</span></td>' + 
						'<td><span>' + data[index].email + '</span></td>' + 
						'<td><span>' + data[index].phoneNumber + '</span></td>' + 
						'<td><span>' + data[index].emergencyPhoneNumber + '</span></td>' + 
						'<td><span>' + data[index].currentTeam + '</span>' + 
						'<td><span id="' + data[index].id + '"><a href="#">Edit</a></span></td>' +  
						'</td>');

			$("table tbody").append(row);

			}

		}).fail(function() {
			$('#errorMessage').append('<p>Player not found!</p>');
		})

		$("#searchName").val("");
		playerName = "";

	return false;
})

$('#searchName').keydown(function(event){
	if(event.keyCode == 13){
		event.preventDefault();
		$('#findByName').click();
	}
});

