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

//Create a function that formats the info from the weather API and displays it to the user
function showTemperature(location) {
  console.log(location);
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
  let mainIcon = document.querySelector("#main-icon");
  mainIcon.src = location.data.daily[0].condition.icon_url;
  //document.querySelector("#feels-like").innerHTML = Math.round(
  //location.data.temperature.feels_like
  // );
  document.querySelector("#humidity").innerHTML = Math.round(
    location.data.daily[0].temperature.humidity
  );
  document.querySelector("#wind-speed").innerHTML = Math.round(
    location.data.daily[0].wind.speed
  );
  document.querySelector("#description").innerHTML =
    location.data.daily[0].condition.description;
  document.querySelector("#current-date").innerHTML = new Date(
    location.data.daily[0].time * 1000
  );
  celciusTemperature = Math.round(location.data.daily[0].temperature.day);
}

//Organize the users location information and send it to the API, then call to the function showTemperature that displays the API weather information
//function currentLocation(location) {
// let longitude = location.coords.longitude;
// let latitude = location.coords.latitude;
// let apiKey = "dob4d22a920ef88t300f64e56eab54e2";
//  let url =
//"https://api.shecodes.io/weather/v1/current?lon=" +
//  longitude +
//   "&lat=" +
// latitude +
// "&key=" +
// apiKey +
// "&units=metric";

// axios.get(url).then(showTemperature);
//}

celciusTemperature = null;
fahrenheitTemperature = null;

//Create a function that collects current location data when the current button is clicked
//function youAreHere(event) {
// event.preventDefault();
// navigator.geolocation.getCurrentPosition(currentLocation);
//}

//Create a variable for the green 'current' button and call the function showTemperature when it is clicked
//let currentButton = document.querySelector("#current-button");
//currentButton.addEventListener("click", youAreHere);

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
