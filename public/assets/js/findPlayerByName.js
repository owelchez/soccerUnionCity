$("#updatePlayer").hide();

renderTableData();

function renderTableData(callback){
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
							'<td><span class="userId" id="' + data[index].id + '"><a href="#">Edit</span></span></td>' +  
							'</td>');

					$("table tbody").append(row);
				}
// After findId I will reference the id clicked on and querie that specific
// entry id in the database to fill in all the information in the update form.
				findId();

			}).fail(function() {
				$('#errorMessage').append('<p>Player not found!</p>');
			})

			$("#searchName").val("");
			playerName = "";

		return false;
	})
}

$('#searchName').keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
			$('#findByName').click();
		}
});

function renderUpdateForm(){
	$("#updatePlayer").show();
}

function findId(){
	$(".userId").on('click', function(callback){
		var playerId = this.id;
		console.log("This is playerId " + playerId);
		$("table tbody").empty();
		renderUpdateForm();
		findByUserId(playerId);
	})
}

function findByUserId(id){
	var currentURL = window.location.origin;
	$.get( currentURL + "/findById/" + id)	 
		.done(function(data){
			console.log(data);
			var newPlayerData = data;
			console.log(newPlayerData);
			return data;		
	})
}

function fillUpdateForm(playerObject){
	$("#playerFirstName").val = playerObject.firstName;
}





