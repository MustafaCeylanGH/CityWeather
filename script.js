"use strict";

const mainHeaderEl = document.querySelector(".main-header");
const mainPageEl = document.querySelector(".main-page");
const secondaryPageEl = document.querySelector(".secondary-page");
const inputEl = document.querySelector(".input");
const btnSearchEl = document.querySelector(".btn-search");
const currentCityNameEl = document.querySelector(".current-city-name");
const currentYearEl = document.querySelector(".current-year");
const weatherDescriptionEl = document.querySelector(".weather-description");

const latitudeEl = document.querySelector(".latitude");
const longitudeEl = document.querySelector(".longitude");
const pressureEl = document.querySelector(".pressure");
const tempEl = document.querySelector(".temp");
const humidityEl = document.querySelector(".humidity");
const windEl = document.querySelector(".wind");

const apiKey = "d8e640a113ddd8ca09da54936d2e74bf";

// Get weather data
const getWeatherData = async function (cityName) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}`;
  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error("Invalid city name. Please enter a valid city.");
    }
    const data = await response.json();
    const latitude = data.coord.lat;
    const longitude = data.coord.lon;
    const pressure = data.main.pressure;
    const temp = data.main.temp;
    const humidity = data.main.humidity;
    const wind = data.wind.speed;
    const weatherDescription = data.weather[0].description;
    return {
      latitude,
      longitude,
      pressure,
      temp,
      humidity,
      wind,
      weatherDescription,
    };
  } catch (error) {
    console.error("Error fetching data:", error);
    alert("Invalid city name. Please enter a valid city.");
    return null;
  }
};

// Show data
const showWeatherData = function (weatherData) {
  weatherDescriptionEl.textContent = `"${capitalizeFirstLetter(
    weatherData.weatherDescription
  )}"`;
  latitudeEl.textContent = `Latitude: ${weatherData.latitude.toFixed(4)}`;
  longitudeEl.textContent = `Longitude: ${weatherData.longitude.toFixed(4)}`;
  pressureEl.textContent = `Pressure: ${weatherData.pressure} hPa`;
  tempEl.textContent = `Temperature: ${(weatherData.temp - 273.15).toFixed(
    1
  )} \u00B0C`;
  humidityEl.textContent = `Humidity: %${weatherData.humidity}`;
  windEl.textContent = `Wind: ${weatherData.wind} km/h`;
};

// User Input //
const getUserInput = async function () {
  if (!inputEl.value) return;

  const userInput = inputEl.value.trim();
  const capitalizedInput = capitalizeFirstLetter(userInput);

  const weatherData = await getWeatherData(capitalizedInput);

  if (weatherData !== null) {
    currentCityNameEl.textContent = capitalizedInput;
    if (!mainPageEl.classList.contains("hidden")) {
      mainPageEl.classList.add("hidden");
      secondaryPageEl.classList.remove("hidden");
    }
  }
  inputEl.value = "";
  showWeatherData(weatherData);
};

// Return Main Page or Refresh //
const returnMainPage = function () {
  if (mainPageEl.classList.contains("hidden")) {
    inputEl.value = "";
    mainPageEl.classList.remove("hidden");
    secondaryPageEl.classList.add("hidden");
    return;
  }
  location.reload();
};

//Event Listener
btnSearchEl.addEventListener("click", getUserInput);
inputEl.addEventListener("keydown", function (e) {
  if (e.key === "Enter") {
    getUserInput();
  }
});
mainHeaderEl.addEventListener("click", returnMainPage);

// Capitalize First Letter
const capitalizeFirstLetter = function (text) {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
};

//Current Date for Footer
const date = new Date();
const currentYear = date.getFullYear();
currentYearEl.textContent = currentYear;
