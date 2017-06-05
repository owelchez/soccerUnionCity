

var weatherAPIKey = "194fa6305bc1a1fb55714a954b6da066";

var cityID = "4227777"

var weatherURL = "http://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&APPID=" + weatherAPIKey;

$.ajax({url: weatherURL, method: "GET"})
	.done(function(weatherResponse){
		console.log(weatherResponse);
})
