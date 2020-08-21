function defaultCity(response) {
  let yourCity = response.data.name;
  let header = document.querySelector("#city-searched");
  header.innerHTML = yourCity;
  let currentTemp = Math.round(response.data.main.temp);
  let temp = document.querySelector("#main-temp");
  temp.innerHTML = currentTemp;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;
  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;
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
  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#main-temp");
  temperatureElement.innerHTML = `${temperature}`;

  let feelsLike = Math.round(response.data.main.feels_like);
  let feelsLikeElement = document.querySelector("#main-feels-like");
  feelsLikeElement.innerHTML = `${feelsLike}`;

  let description = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#main-description");
  descriptionElement.innerHTML = `${description}`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `${wind}`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `${humidity}`;
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

myCurrentLocation();
