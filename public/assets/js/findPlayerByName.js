hideUpdateForm();

renderTableData();

function renderTableData(callback){
	$("#findByName").on('click', function(){
		hideUpdateForm();
		$("table tbody").empty();
		$("#errorMessage").html("");

		var playerName = $("#searchName").val().trim();

		var currentURL = window.location.origin;

		$.get( currentURL + "/find/" + playerName )
			 
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
				hideUpdateForm();
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

function showUpdateForm(){
	$("#updatePlayer").show();
}

function hideUpdateForm(){
	$("#playerFirstName").val("");
	$("#playerLastName").val("");
	$("#playerPosition").val("");
	$("#updateDOB").val("");
	$("#address").val("");
	$("#emailAddress").val("");
	$("#phoneNumber").val("");
	$("#ePhoneNumber").val("");
	$("#profilePicture").val("");
	$("#currentTeam").val("");
	$("#updatePlayer").hide();
}

function findId(callback){
	$(".userId").on('click', function(callback){
		var playerId = this.id;
		console.log("This is playerId " + playerId);
		$("table tbody").empty();
		showUpdateForm();
		findByUserId(playerId);
	})
}

function findByUserId(playerId){
	var playerQueried = {};
	var currentURL = window.location.origin;
	$.ajax({ url:currentURL + "/findById/" + playerId, dataType: 'json', success: function(response){
		$("#playerFirstName").val(capitalizeFirstLetter(response.firstName));
		$("#playerLastName").val(capitalizeFirstLetter(response.lastName));
		$("#playerPosition").val(capitalizeFirstLetter(response.pitchPosition));
		$("#updateDOB").val(response.dob);
		$("#address").val(response.address);
		$("#emailAddress").val(response.email);
		$("#phoneNumber").val(response.phoneNumber);
		$("#ePhoneNumber").val(response.emergencyPhoneNumber);
		$("#profilePicture").val(response.profilePicture);
		$("#currentTeam").val(capitalizeFirstLetter(response.currentTeam));
	}, 
	error: function(req, status, err){
		console.log("Your querie failed ", status, err);
	}, complete: function(playerQueried){
     // Handle the complete event
     console.log(JSON.stringify(playerQueried));

     $('#updateActualPlayer').on('click', function(){
     	var updatedPlayer = {
     	firstName: $("#playerFirstName").val().trim(),
		lastName: $("#playerLastName").val().trim(), 
		pitchPosition: $("#playerPosition").val().trim(),
		dob: $("#updateDOB").val().trim(),
		address: $("#address").val().trim(),
		email: $("#emailAddress").val().trim(),
		phoneNumber: $("#phoneNumber").val().trim(),
		emergencyPhoneNumber: $("#ePhoneNumber").val().trim(),
		profilePicture: $("#profilePicture").val().trim(),
		currentTeam: $("#currentTeam").val().trim()
     	}
     	console.log(JSON.stringify(updatedPlayer));
     	console.log('This is playerId' + playerId);
     	var currentURL = window.location.origin;

    $.ajax({ url: currentURL + "/player/update/" + playerId, dataType: 'json', success: function(thePlayer){
    	console.log("This should be my query from DB " + thePlayer);
    }})



     })
    
   }	 
		
// I believe I have to write all the logic for updating player in database here.
	

	})
}

function fillUpdateForm(playerObject){
	$("#playerFirstName").val = playerObject.firstName;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}



