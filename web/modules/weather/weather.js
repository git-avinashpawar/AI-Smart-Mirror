let appId = "5499e3e6f8cf2d545f684c2294033f77";
let units = "metric"; // other option is metric
let searchMethod; // q means searching as a string.
let lat;
let long;
let searchTerm = "kolhapur";
function getSearchMethod(searchTerm) {
  if (
    searchTerm.length === 5 &&
    Number.parseInt(searchTerm) + "" === searchTerm
  )
    searchMethod = "zip";
  else searchMethod = "q";
}

function searchWeather(searchTerm) {
  getSearchMethod(searchTerm);
  fetch(
    `http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`
  )
    .then(result => {
      return result.json();
    })
    .then(res => {
      init(res);
    });
}

function init(resultFromServer) {
  console.log(resultFromServer);
  switch (resultFromServer.weather[0].main) {
    case "Clear":
      document.getElementById("myImg").src = "images/001-sunny.png";
      break;

    case "Clouds":
      document.getElementById("myImg").src = "images/002-cloudy.png";
      break;

    case "Rain":
    case "Drizzle":
    case "Mist":
      document.getElementById("myImg").src = "images/050-rain.png";
      break;

    case "Thunderstorm":
      document.getElementById("myImg").src = "images/006-storm.png";
      break;

    case "Snow":
      document.getElementById("myImg").src = "images/021-snow.png";
      break;

    default:
      break;
  }

  let weatherDescriptionHeader = document.getElementById(
    "weatherDescriptionHeader"
  );
  let temperatureElement = document.getElementById("temperature");
  let humidityElement = document.getElementById("humidity");
  let windSpeedElement = document.getElementById("windSpeed");
  let cityHeader = document.getElementById("cityHeader");

  let weatherIcon = document.getElementById("documentIconImg");
  weatherIcon.src =
    "http://openweathermap.org/img/w/" +
    resultFromServer.weather[0].icon +
    ".png";

  let resultDescription = resultFromServer.weather[0].description;
  weatherDescriptionHeader.innerText =
    resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);
  temperatureElement.innerHTML =
    Math.floor(resultFromServer.main.temp) + "&#176;";
  windSpeedElement.innerHTML =
    "Winds at  " + Math.floor(resultFromServer.wind.speed) + " m/s";
  cityHeader.innerHTML = resultFromServer.name;
  humidityElement.innerHTML =
    "Humidity levels at " + resultFromServer.main.humidity + "%";

  //setPositionForWeatherInfo();
}

function setPositionForWeatherInfo() {
  let weatherContainer = document.getElementById("weatherContainer");
  let weatherContainerHeight = weatherContainer.clientHeight;
  let weatherContainerWidth = weatherContainer.clientWidth;

  weatherContainer.style.left = `calc(50% - ${weatherContainerWidth / 2}px)`;
  weatherContainer.style.top = `calc(50% - ${weatherContainerHeight / 1.3}px)`;
  weatherContainer.style.visibility = "visible";
}

//window.onload = searchWeather(searchTerm);
