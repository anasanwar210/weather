/*
===================
- Catch What I Need From Api
===================
*/

let currentDay;

let apiKey = `24156785969741f0915104448240512`;
let userLat, userLon;

let iframe = document.getElementById("weather-iframe");
iframe.src = `https://maps.google.com/maps?q=${userLat},${userLon}&hl=es&z=14&output=embed`;

async function getData(location) {
  try {
    let allData = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
      ),
      response = await allData.json();
    getDetails(response);
    displayData(response);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
}

getUserLocation();
getData("cairo");

function getDetails(apiData) {
  const location = apiData.location.name;
  const minTemp = apiData.current.temp_c;
  const condition = apiData.current.condition.text;
  const icon = apiData.current.condition.icon;
  const humidity = apiData.current.humidity;
  const windSpeed = apiData.current.wind_kph;
  const windDirection = apiData.current.wind_dir;

  // Get Date
  const date = new Date(apiData.forecast.forecastday[0].date);
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = days[date.getDay()];
  const dayNumber = date.getDate();
  const months = [
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
  const monthName = months[date.getMonth()];
  currentDay = [
    dayName,
    dayNumber,
    monthName,
    location,
    minTemp,
    icon,
    condition,
    humidity,
    windSpeed,
    windDirection,
  ];
}

function displayData(response) {
  let rowData = document.getElementById("rowData");
  let forecastData = response.forecast.forecastday;
  rowData.innerHTML = `
    <div class="col-md-4 mb-3">
    <div class="weather-card">
      <div class="title">
        <div class="date p-2 rounded-top-3 d-flex justify-content-between">
        <span>${currentDay[0]}</span>
        <span>${currentDay[1]} ${currentDay[2]}</span>
        </div>
      </div>
      <div class="body p-2 d-flex flex-column gap-2">
        <h6>${currentDay[3]}</h6>
        <h1 class="temp">${currentDay[4]}°C</h1>
        <img src="${currentDay[5]}" class="w-25" alt="Weather Icon">
        <p class="">${currentDay[6]}</p>
        <div class="d-flex justify-content-center">
          <span class="w-50"><img src="imgs/icon-umberella.png" class="me-1" alt="Umbrella">${currentDay[7]}%</span>
          <span class="w-50"><img src="imgs/icon-wind.png" class="me-1" alt="Wind">${currentDay[8]}km/h</span>
          <span class="w-50"><img src="imgs/icon-compass.png" class="me-1" alt="Compass">${currentDay[9]}</span>
        </div>
      </div>
    </div>
  </div>`;

  for (let i = 1; i < forecastData.length; i++) {
    const date = new Date(response.forecast.forecastday[i].date);
    const days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const dayName = days[date.getDay()];
    let cols = `
        <div class="col-md-4 mb-3">
          <div class="weather-card text-center">
            <div class="title">
              <div class="date p-2 rounded-top-3">${dayName}</div>
            </div>
            <div class="body p-2 py-4 d-flex flex-column gap-2">
              <h1>${forecastData[i].day.mintemp_c}°C</h1>
              <img src="${forecastData[i].day.condition.icon}" alt="Weather Icon" class="w-25 m-auto">
              <p>${forecastData[i].day.condition.text}</p>
              <p>${forecastData[i].day.maxtemp_c}°C</p>
            </div>
          </div>
        </div>
    `;
    rowData.innerHTML += cols;
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLat = position.coords.latitude;
        const userLon = position.coords.longitude;
        getData(`${userLat},${userLon}`);
      },
      (error) => {
        console.log("User denied location access or error occurred:", error);
        displayMessage("Location access is required to display weather data.");
      }
    );
  } else {
    console.log("Geolocation is not supported by this browser.");
    displayMessage("Geolocation is not supported by your browser.");
  }
}

function displayMessage(message) {
  let rowData = document.getElementById("rowData");
  rowData.innerHTML = `
    <div class="alert alert-warning text-center">
      ${message}
    </div>
  `;
}
alert("new")
getUserLocation();

let locationInput = document.getElementById("location-input");

locationInput.addEventListener("input", (e) => {
  getData(e.target.value);
});
