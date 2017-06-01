console.log("Goooooool!!");





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




twttr.widgets.createTimeline(
  {
    sourceType: "profile",
    screenName: "UnionCitySC"
  },
  document.getElementById("twitterContainer")
);


