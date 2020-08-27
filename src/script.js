function formatDate(timestamp) {
  let date = new Date(timestamp);
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

  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${hour}:${minute}`;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let city = document.querySelector("#city-searched");
  if (searchInput.value) {
    city.innerHTML = `${searchInput.value}`;
    searchCity(searchInput.value);
  } else {
    city.innerHTML = null;
    alert("Please type a city.");
  }
}
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  forecastElement.innerHTML = null;
  let forecast = null;

  for (let index = 0; index < 6; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `
   <div class="col-2">
   <h3 class="hour-forecast"><strong>${formatHours(
     forecast.dt * 1000
   )}</strong></h3>
    <img src="http://openweathermap.org/img/wn/${
      forecast.weather[0].icon
    }@2x.png"
    class= "forecast-icon"/>
    <div class="forecast-description">${forecast.weather[0].description}</div>
    <div class="forecast-degrees"><strong>${Math.round(
      forecast.main.temp_max
    )}</strong>º <span>${Math.round(forecast.main.temp_min)}</span>º</div>
    <div class ="forecast-feels-like">feels like <span id="forecast-feels-like-temp">${Math.round(
      forecast.main.feels_like
    )}</span>º</div>
  </div>`;
  }
}

function searchCity(city) {
  let apiKey = "6140482334c764ca7fa9951280c40d98";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=${unit}`;
  axios.get(apiUrl).then(displayForecast);
}
function showTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp");
  let feelsLikeElement = document.querySelector("#main-feels-like");
  let descriptionElement = document.querySelector("#main-description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");
  let cityElement = document.querySelector("#city-searched");
  let sunriseElement = document.querySelector("#sunrise");
  let sunsetElement = document.querySelector("#sunset");

  cTemp = response.data.main.temp;

  cityElement.innerHTML = response.data.name;
  sunriseElement.innerHTML = `${formatHours(response.data.sys.sunrise * 1000)}`;
  sunsetElement.innerHTML = `${formatHours(response.data.sys.sunset * 1000)}`;
  temperatureElement.innerHTML = Math.round(cTemp);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
function currentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "6140482334c764ca7fa9951280c40d98";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}
function myCurrentLocation() {
  navigator.geolocation.getCurrentPosition(currentLocation);
}

let button = document.querySelector("#current-btn");
button.addEventListener("click", myCurrentLocation);

function currentDate(date) {
  let now = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let hour = now.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = now.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  dateDisplay = `${day} ${hour}:${minute}`;
  return dateDisplay;
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  let fTemp = (cTemp * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fTemp);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = Math.round(cTemp);
}
let cTemp = null;

let fTemp = document.querySelector("#fTemp");
fTemp.addEventListener("click", displayFahrenheitTemperature);

let cTempLink = document.querySelector("#cTemp");
cTempLink.addEventListener("click", displayCelsiusTemperature);

let dateDisplay = document.querySelector("#current-date");
dateDisplay.innerHTML = currentDate();

searchCity("Toronto");
