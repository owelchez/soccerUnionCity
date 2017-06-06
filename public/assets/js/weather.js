
  /*Weather Underground API*/
var weatherAPIKey = "706e48f06be3e154";

var weatherURL = "http://api.wunderground.com/api/" + weatherAPIKey + "/forecast/q/NJ/Union_City.json";

$.ajax({url: weatherURL, method: "GET"})
	.done(function(weatherResponse){
		console.log(weatherResponse);
})

						/**************************************************
						**************************************************/

						

				/*This is the script for the weather widget on top of the page*/
	window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 24,cityid: '5404555',appid: '194fa6305bc1a1fb55714a954b6da066',units: 'imperial',containerid: 'openweathermap-widget-24',  });  (function() {var script = document.createElement('script');script.async = true;script.src = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();

				/*This is the script for the weather widget at the bottom of the page*/
	window.myWidgetParam ? window.myWidgetParam : window.myWidgetParam = [];  window.myWidgetParam.push({id: 1,cityid: '5404555',appid: '194fa6305bc1a1fb55714a954b6da066',units: 'imperial',containerid: 'openweathermap-widget-1',  });  (function() {var script = document.createElement('script');script.async = true;script.src = "https://openweathermap.org/themes/openweathermap/assets/vendor/owm/js/weather-widget-generator.js";var s = document.getElementsByTagName('script')[0];s.parentNode.insertBefore(script, s);  })();