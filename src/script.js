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
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }
  return `${day} ${hour}:${minute}`;
}

function defaultCity(response) {
  console.log(response);
  let yourCity = response.data.name;
  let header = document.querySelector("#city-searched");
  let tempElement = document.querySelector("#main-temp");
  let descriptionElement = document.querySelector("#main-description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let dateElement = document.querySelector("#current-date");
  let iconElement = document.querySelector("#icon");
  let feelsLikeElement = document.querySelector("#main-feels-like");

  header.innerHTML = yourCity;
  tempElement.innerHTML = Math.round(response.data.main.temp);
  descriptionElement.innerHTML = response.data.weather[0].description;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  humidityElement.innerHTML = Math.round(response.data.main.humidity);
  dateElement.innerHTML = formatDate(response.data.dt * 1000);
  feelsLikeElement.innerHTML = Math.round(response.data.main.feels_like);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
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

function searchCity(city) {
  let apiKey = "6140482334c764ca7fa9951280c40d98";
  let unit = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}`;
  axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemperature);
}
function showTemperature(response) {
  let temperatureElement = document.querySelector("#main-temp");
  let feelsLikeElement = document.querySelector("#main-feels-like");
  let descriptionElement = document.querySelector("#main-description");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let iconElement = document.querySelector("#icon");

  temperatureElement.innerHTML = Math.round(response.data.main.temp);
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
  axios.get(apiUrl).then(defaultCity);
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
let dateDisplay = document.querySelector("#current-date");
dateDisplay.innerHTML = currentDate();
searchCity("Toronto");
myCurrentLocation();
