$("#findByName").on('click', function(){

	$("table tbody").empty();

	var playerName = $("#searchName").val().trim();

	var currentURL = window.location.origin;

	$.get( currentURL + "/find/" + playerName)
		 
		.done(function(data){

			for(index = 0; index < data.length; index++){
				row = $('<tr>' + 
						'<td><span>' + data[index].firstName + '</span></td>' + 
						'<td><span>' + data[index].lastName + '</span></td>' + 
						'<td><span>' + data[index].pitchPosition + '</span></td>' + 
						'<td><span>' + data[index].dob + '</span></td>' + 
						'<td><span>' + data[index].address + '</span></td>' + 
						'<td><span>' + data[index].email + '</span></td>' + 
						'<td><span>' + data[index].phoneNumber + '</span></td>' + 
						'<td><span>' + data[index].emergencyPhoneNumber + '</span></td>' + 
						'<td><span>' + data[index].currentTeam + '</span>' + 
						'</td>');
			 
			 $("table tbody").append(row);
			}

		})

		$("#name").val("");
		playerName = "";

	return false;
})

$('#searchName').keydown(function(event){
	console.log(event);
	if(event.keyCode == 13){
		event.preventDefault();
		$('#findByName').click();
	}
});