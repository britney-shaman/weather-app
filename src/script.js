//Get the date and time information from javascript
let date = new Date();
let weekDay = date.getDay();
let dayOfTheMonth = date.getDate();
let year = date.getFullYear();
let currentMonth = date.getMonth();
let hour = date.getHours();
let minutes = date.getMinutes();

//Format the date using a function formatDate that returns the formatted date
function formatDate() {
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
    "Feburary",
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
  let timeOfDay = date.toLocaleString("en-US", {
    hour: "numeric",
    minute: "numeric",
    hour12: true,
  });
  let day = days[date.getDay()];
  let month = months[date.getMonth()];
  let currentDate = day + ", " + month + " " + dayOfTheMonth + ", " + timeOfDay;
  return currentDate;
}
//Create a variable for the date and time that the user sees on the page and replace it by the return from formatDate
let today = document.querySelector("#current-date");
today.innerHTML = formatDate();

//Create a function that recieves the time from the API and returns the day of the week to use in the forecast
function formatDay(time) {
  let date = new Date(time * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

//Create a function that changes the temperature from celcius to fahrenheit when you click the fahrenheit symbol
let fahrenheit = document.querySelector(".fahrenheitLink");
function celciusFahrenheit(event) {
  event.preventDefault();
  fahrenheitTemperature = Math.round(celciusTemperature * (9 / 5) + 32);
  document.querySelector("#temp-display").innerHTML = fahrenheitTemperature;
}

//Call the function when the fahrenheit symbol is clicked
fahrenheit.addEventListener("click", celciusFahrenheit);

//Create a function that changes the fahrenheit temperature back to celcuis
let celcius = document.querySelector(".celciusLink");
function fahrenheitCelcius(event) {
  event.preventDefault();
  document.querySelector("#temp-display").innerHTML = celciusTemperature;
}

//Call the function when the celcuis symbol is clicked
celcius.addEventListener("click", fahrenheitCelcius);

//Create a function that takes the input from the search bar and replaces the heading with that value
function changeCity(event) {
  event.preventDefault();
  let userInput = document.querySelector("#user-input").value;
  let apiKey = "dob4d22a920ef88t300f64e56eab54e2";
  let inputUrl =
    "https://api.shecodes.io/weather/v1/current?query=" +
    userInput +
    "&key=" +
    apiKey +
    "&units=metric";
  axios.get(inputUrl).then(showTemperature);
}

//Call the funtion when the search button is clicked
let city = document.querySelector("#city-name");
city.addEventListener("submit", changeCity);

//Organize the users location information and send it to the API, then call to the function showTemperature that displays the API weather information
function currentLocation(location) {
  let longitude = location.coords.longitude;
  let latitude = location.coords.latitude;
  let apiKey = "dob4d22a920ef88t300f64e56eab54e2";
  let url =
    "https://api.shecodes.io/weather/v1/forecast?lon=" +
    longitude +
    "&lat=" +
    latitude +
    "&key=" +
    apiKey +
    "&units=metric";

  axios.get(url).then(showTemperature);
}

celciusTemperature = null;
fahrenheitTemperature = null;

//Create a function that collects current location data when the current button is clicked
function youAreHere(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLocation);
}

//Create a variable for the green 'current' button and call the function showTemperature when it is clicked
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", youAreHere);

//Create a function that calls to the weekly forcast API when a city is searched
function changeCity(event) {
  event.preventDefault();
  let userInput = document.querySelector("#user-input").value;
  let apiKey = "dob4d22a920ef88t300f64e56eab54e2";
  let inputUrl =
    "https://api.shecodes.io/weather/v1/forecast?query=" +
    userInput +
    "&key=" +
    apiKey +
    "&units=metric";
  axios.get(inputUrl).then(showTemperature);
}

//Create a function that formats the info from the weather API and displays it to the user
function showTemperature(location) {
  document.querySelector("#tomorrow").innerHTML = formatDay(
    location.data.daily[1].time
  );
  document.querySelector("#tomorrowplusone").innerHTML = formatDay(
    location.data.daily[2].time
  );
  document.querySelector("#tomorrowplustwo").innerHTML = formatDay(
    location.data.daily[3].time
  );
  document.querySelector("#tomorrowplusthree").innerHTML = formatDay(
    location.data.daily[4].time
  );
  document.querySelector("#tomorrowplusfour").innerHTML = formatDay(
    location.data.daily[5].time
  );
  document.querySelector("#tomorrowplusfive").innerHTML = formatDay(
    location.data.daily[6].time
  );
  document.querySelector("#day-1").innerHTML = Math.round(
    location.data.daily[1].temperature.day
  );
  document.querySelector("#day-2").innerHTML = Math.round(
    location.data.daily[2].temperature.day
  );
  document.querySelector("#day-3").innerHTML = Math.round(
    location.data.daily[3].temperature.day
  );
  document.querySelector("#day-4").innerHTML = Math.round(
    location.data.daily[4].temperature.day
  );
  document.querySelector("#day-5").innerHTML = Math.round(
    location.data.daily[5].temperature.day
  );
  document.querySelector("#day-6").innerHTML = Math.round(
    location.data.daily[6].temperature.day
  );
  document.querySelector("#heading").innerHTML = location.data.city;
  document.querySelector("#temp-display").innerHTML = Math.round(
    location.data.daily[0].temperature.day
  );
  document.querySelector("#main-icon").src =
    location.data.daily[0].condition.icon_url;
  document.querySelector("#humidity").innerHTML = Math.round(
    location.data.daily[0].temperature.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    location.data.daily[0].wind.speed
  );
  document.querySelector("#description").innerHTML =
    location.data.daily[0].condition.description;
  celciusTemperature = Math.round(location.data.daily[0].temperature.day);
}
