$('#findByName').on("click", function(){

	
	var currentURL = window.location.origin;

	 
	$.get( currentURL + "/find/:players?")
		 
		.done(function(data){
			 
			console.log(data);
			 
			alert("Finding Player...")
		})

	 

	return false;

});	