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

				findId();

			}).fail(function() {
				$('#errorMessage').append('<p>Player not found!</p>');
			})

			$("#searchName").val("");
			playerName = "";

		return false;
	})
}

function renderUpdateForm(){
	$("#updatePlayer").show();
}

	$('#searchName').keydown(function(event){
		if(event.keyCode == 13){
			event.preventDefault();
			$('#findByName').click();
		}
	});

function findId(){
	$(".userId").on('click', function(callback){
		console.log(this.id);
		$("table tbody").empty();
		renderUpdateForm();
	})
	
}

function findByUserId(){
	var currentURL = window.location.origin;

	$.get( currentURL + "/find/" + 1)
				 
		.done(function(data){
			console.log(data);		
	})
}


findByUserId();




