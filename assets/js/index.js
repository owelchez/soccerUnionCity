console.log("Goooooool!!");

/*function hidePanelAnswer(){
    $('#clubLogo').hide();
}

$('#clubLogo').on('click', function(){
	hidePanelAnswer();
})*/

function hideDropdown() {
    let dropMenu = document.getElementById("dropMenu");
    if (dropMenu.style.display !== "none") {
            dropMenu.style.display = "none";
        } 
        else {
            dropMenu.style.display = "block";
        }
}

function buttonStyleHide() {
    let button = document.getElementById("topLinks");
    console.log(button);
    	if (button.style.display !== "none") {
        	button.style.display = "none";
    	} 
    	else {
        	button.style.display = "block";
    	}
}






/*if(window.attachEvent) {
    window.attachEvent('onresize', function() {
        var windowWidth = window.innerWidth;
        alert(windowWidth);
    });
}
else if(window.addEventListener) {
    window.addEventListener('resize', function() {
        var windowWidth = window.innerWidth;
        if(windowWidth < 800) {
            buttonStyleHide();
        }
    }, true);
}
else {
    //The browser does not support Javascript event binding
}*/