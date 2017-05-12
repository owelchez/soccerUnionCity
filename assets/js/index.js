console.log("Goooooool!!");

/*function hidePanelAnswer(){
    $('#clubLogo').hide();
}

$('#clubLogo').on('click', function(){
	hidePanelAnswer();
})*/

function buttonStyleHide(idString) {
    let button = document.getElementById('\'' + idString + '\'');
    console.log(button);
    	if (button.style.display !== "none") {
        	button.style.display = "none";
    	} 
    	else {
        	button.style.display = "block";
    	}
}


/*function buttonStyleHide() {
    let button = document.getElementById("topLinks");
    console.log(button);
    	if (button.style.display !== "none") {
        	button.style.display = "none";
    	} 
    	else {
        	button.style.display = "block";
    	}
}*/


// buttonStyleHide();
buttonStyleHide("titleHeader");

var intViewportWidth = window.innerWidth;

console.log(intViewportWidth);