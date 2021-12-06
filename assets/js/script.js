
/* Fetch API */
/* Gets Weather and calles displayWeather */
var getWeather = function(lon, lat, name) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly&appid=091f1752a6e9d90fa6a0ffdd6099b4c4&units=imperial`;

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        console.log(data, name);
        displayWeather(data, name);
        displayForcast(data);
      })
    }
    else {
      console.log("error")
    }
  })
};
/* end Gets and returns Weather */

/* Gets Forecast */
/* var getForecast = function(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=091f1752a6e9d90fa6a0ffdd6099b4c4&units=imperial`;

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
      })
    }
    else {
      console.log("error")
    }
  })
}; */
/* end Gets and returns Forecast */

/* Gets latitude and longitude and calls getWeather() */
var getLatAndLon = function(city) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=091f1752a6e9d90fa6a0ffdd6099b4c4&units=imperial`;

  fetch(apiUrl).then(function(response) {
    if (response.ok) {
      response.json().then(function(data) {
        getWeather(data.coord.lon, data.coord.lat, data.name);
      })
    }
    else {
      console.log("error")
    }
  })
};
/* end Gets latitude and longitude and calls getWeather() */
/* end Fetch API */


/* Display current day Weather */
var displayWeather = function(weather, name) {
  var currentDayWeatherEl = document.querySelector(".currentDayWeather");

  currentDayWeatherEl.innerHTML = `
    <h2>
      <span>${name} ${moment().format('l')}</span>
      <img src="http://openweathermap.org/img/wn/${weather.current.weather[0].icon}@2x.png" alt="Sky">
    </h2>
    <ul>
      <li>Temp: ${weather.current.temp}\u00B0F</li>
      <li>Wind: ${weather.current.wind_speed} MPH</li>
      <li>Humidity: ${weather.current.humidity} %</li>
      <li>UV Index: <span class="index-uv">${weather.current.uvi}</span></li>
    </ul>
  `;

  indexUVColor(weather);
};

/* Changes color of span, based on UV Index, to indecate severity of UV radiation*/
var indexUVColor = function(weather) {
  var indexUV = weather.current.uvi;
  var indexUVEl = $(".index-uv");

  if (indexUV <= 2) {
    indexUVEl.css("background-color", "green");
  }
  else if (indexUV <= 5) {
    indexUVEl.css("background-color", "yellow");
  }
  else if (indexUV <= 7) {
    indexUVEl.css("background-color", "orange");
  }
  else if (indexUV <= 10) {
    indexUVEl.css("background-color", "red");
  }
  else {
    indexUVEl.css("background-color", "purple");
  }
}
/* end Changes color of span around UV Index to indecate severity of UV radiation*/
/* end Display current day Weather */

/* Display Forcast */
var displayForcast = function(weather) {
  var forcast = $(".forcast");
  var date = moment();

  for(var i = 1; i < 6; i++) {
    date.add(1, 'days');

    forcast.children('li').eq(i - 1).html(`
      <h4>${date.format('l')}</h4>
      <div><img src="http://openweathermap.org/img/wn/${weather.daily[i].weather[0].icon}@2x.png" alt="Sky"></div>
      <div>Temp: ${weather.daily[i].temp.day}\u00B0F</div>
      <div>Wind: ${weather.daily[i].wind_speed} MPH</div>
      <div>Humidity: ${weather.daily[i].humidity} %</div>
    `);
  }
}
/* endDisplay Forcast */



var weather = getLatAndLon('Austin');
