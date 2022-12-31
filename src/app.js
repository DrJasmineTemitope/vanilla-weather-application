function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  return days[day];
}

function displayWeatherForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      
                    <div class="col-2">
                    <div class="card" style="width: 5rem;" id="forecast-card">
                    
                  <div id="forecast-days">${formatDay(forecastDay.dt)}</div>
                  <img
                    src="https://openweathermap.org/img/w/${
                      forecastDay.weather[0].icon
                    }.png"
                    alt=""
                    
                  />
                  <div class="forecast-temperature">
                    <span class="forecast-temperature-max"> ${Math.round(
                      forecastDay.temp.max
                    )}º</span>
                    <span class="forecast-temperature-mini"> ${Math.round(
                      forecastDay.temp.min
                    )}º</span>
                  </div>
                  </div>
                                                                        </div>`;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "ed55b36e362d8733f7d859247cedeaf2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeatherForecast);
}

function displayTemperature(response) {
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
  document.querySelector("#humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document.querySelector("#time").innerHTML = formatDate(
    response.data.dt * 1000
  );
  document
    .querySelector("#icons")
    .setAttribute(
      "src",
      `http://openweathermap.org/img/w/${response.data.weather[0].icon}.png`
    );
  document
    .querySelector("#icons")
    .setAttribute("alt", response.data.weather[0].description);

  celsiusTemperature = Math.round(response.data.main.temp);

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "f029b2b922567275529f515833feaaac";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayTemperature);
}

function searchcity(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city-input");
  search(city.value);
}

function displayFahrenheitValue(event) {
  event.preventDefault();

  let fahrenheit = (celsiusTemperature * 9) / 5 + 32;
  document.querySelector("#temperature").innerHTML = Math.round(fahrenheit);
}

function displayCelsiusValue(event) {
  event.preventDefault();

  document.querySelector("#temperature").innerHTML = celsiusTemperature;
}

let celsiusTemperature = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchcity);

let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", displayFahrenheitValue);

let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", displayCelsiusValue);

search("Ibadan");
