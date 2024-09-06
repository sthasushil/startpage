function dateTime() {
	const date = new Date();
	let today = date.toDateString();
	let time = date.toLocaleTimeString([], {hour12:false});
	document.getElementById('date-time').innerHTML = '<p id="date">' + today + '</p><p id="time">' + time + '</p>';
	setTimeout(dateTime, 1000);
}

function weatherBalloon(locationKey) {
  // Replace with your AccuWeather API key
  var apiKey = 'LrOg1L0VCogAL0Mid9VP6Auu3Az33Wq3';

  fetch('https://dataservice.accuweather.com/currentconditions/v1/' + 246935 + '?apikey=' + apiKey + '&language=en-us&details=false')
    .then(function (resp) {
      return resp.json();
    })
    .then(function (data) {
      if (data.length === 0) {
        console.error("Weather data not found for the given location key.");
        return;
      }

      const weather = data[0].WeatherText;
      const weatherIcon = data[0].WeatherIcon;
      const tempC = data[0].Temperature.Metric.Value;
      const tempF = data[0].Temperature.Imperial.Value;

      // Update UI with AccuWeather data
      document.getElementById('weather').innerHTML = '<p id="location">' + '</p><p id="details" ' +
        'title="' + tempF + '&deg;F">' + '<img src="https://developer.accuweather.com/sites/default/files/' + weatherIcon + '-s.png">' + weather + '<span class="separator">|</span>' + tempC + '&deg;C</p>';
    })
    .catch(function (error) {
      console.error("Error:", error);
    });
}



function traichu() {
	dateTime();
	weatherBalloon(246935); //OpenWeather city ID
}
