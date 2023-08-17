//feature #1
let currentTime = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
let currentYear = currentTime.getFullYear();
let currentDay = days[currentTime.getDay()];
let currentMonth = months[currentTime.getMonth()];
let currentDate = currentTime.getDate();
let hours = currentTime.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = currentTime.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}

let editDate = document.querySelector("#current-date-details");
editDate.innerHTML = `${currentDay} | ${currentDate} ${currentMonth} ${currentYear} | ${hours}:${minutes}`;

//feature #2
function displayTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let humidity = Math.round(response.data.main.humidity);
  let wind = Math.round(response.data.wind.speed);
  let description = response.data.weather[0].description;

  let cityTemperature = document.querySelector(".currentTemperature");
  cityTemperature.innerHTML = `${temperature}`;

  let cityHumidity = document.querySelector("#humidity-value");
  cityHumidity.innerHTML = `${humidity}`;

  let cityWind = document.querySelector("#wind-value");
  cityWind.innerHTML = `${wind}`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${description}`;
}

function enterCity(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#city-input");
  let cityName = `${searchInput.value}`;
  let currentCity = document.querySelector("h1");
  currentCity.innerHTML = cityName;

  let apiKey = "63f46e0b611ab2954e7c07acd5391bb8";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayTemperature);
}

let form = document.querySelector("#city");
form.addEventListener("submit", enterCity);

//Bonus-feature

function showTemperature(response) {
  let cityName = response.data.name;
  let outsideTemperature = Math.round(response.data.main.temp);
  let currentHumidity = Math.round(response.data.main.humidity);
  let currentWind = Math.round(response.data.wind.speed);
  let currentDescription = response.data.weather[0].description;

  let h1 = document.querySelector("h1");
  h1.innerHTML = cityName;

  let cityTemperature = document.querySelector(".currentTemperature");
  cityTemperature.innerHTML = `${outsideTemperature}`;

  let cityHumidity = document.querySelector("#humidity-value");
  cityHumidity.innerHTML = `${currentHumidity}`;

  let cityWind = document.querySelector("#wind-value");
  cityWind.innerHTML = `${currentWind}`;

  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = `${currentDescription}`;
}

function retrievePosition(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "63f46e0b611ab2954e7c07acd5391bb8";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`;

  axios.get(url).then(showTemperature);
}

function currentCoordinates() {
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let currentCityButton = document.querySelector("#current-location");
currentCityButton.addEventListener("click", currentCoordinates);
