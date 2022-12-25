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

function displayTemperature(response) {
  console.log(response);
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

search("New York");

let form = document.querySelector("#search-form");
form.addEventListener("submit", searchcity);
