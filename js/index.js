let currentDay;
let apiKey = `24156785969741f0915104448240512`;
let locationInput = document.getElementById("location-input");
let rowData = document.getElementById("rowData");
let isGeolocationLoaded = false;

async function getData(location) {
  try {
    document.querySelector(".loading").classList.remove("d-none");
    let response = await fetch(
      `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
    );
    if (!response.ok) {
      throw new Error(
        "Unable to fetch weather data. Please check the location."
      );
    }
    let data = await response.json();
    if (data.error) {
      throw new Error(data.error.message);
    }

    getDetails(data);
    displayData(data);
  } catch (error) {
    console.error(error);
    rowData.innerHTML = `<p class="error alert alert-danger">${error.message}</p>`;
  } finally {
    document.querySelector(".loading").classList.add("d-none");
  }
}

function getDetails(apiData) {
  const location = apiData.location.name;
  const minTemp = apiData.current.temp_c;
  const condition = apiData.current.condition.text;
  const icon = apiData.current.condition.icon;
  const humidity = apiData.current.humidity;
  const windSpeed = apiData.current.wind_kph;
  const windDirection = apiData.current.wind_dir;

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
  const dayName_n = days[date.getDay() + 1];
  const dayName_nn = days[date.getDay() + 2];
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
    dayName_n,
    dayName_nn,
  ];
}

function displayData(response) {
  let forecastData = response.forecast.forecastday;
  let nextForecastDays = [,currentDay[10],currentDay[11]]
  rowData.innerHTML = "";
  rowData.innerHTML += `
    <div class="col-md-4 mb-3">
      <div class="weather-card">
        <div class="title">
          <div class="date p-2 rounded-top-3 d-flex justify-content-between">
            <span>${currentDay[0]}</span>
            <span>${currentDay[1]} ${currentDay[2]}</span>
          </div>
        </div>
        <div class="body p-2 d-flex flex-column gap-2">
          <h6>${currentDay[3]}, ${response.location.country}</h6>
          <h1 class="temp">${currentDay[4]}°C</h1>
          <img src="${currentDay[5]}" class="w-25" alt="Weather Icon">
          <p class="">${currentDay[6]}</p>
          <div class="d-flex justify-content-center">
            <span class="w-50 d-flex justify-content-center"><img src="imgs/icon-umberella.png" class="me-1" alt="Umbrella">${currentDay[7]}%</span>
            <span class="w-50 d-flex justify-content-center"><img src="imgs/icon-wind.png" class="me-1" alt="Wind">${currentDay[8]}km/h</span>
            <span class="w-50 d-flex justify-content-center"><img src="imgs/icon-compass.png" class="me-1" alt="Compass">${currentDay[9]}</span>
          </div>
        </div>
      </div>
    </div>`;

  for (let i = 1; i < forecastData.length; i++) {
    let cols = `
      <div class="col-md-4 mb-3">
        <div class="weather-card text-center">
          <div class="title">
            <div class="date p-2 rounded-top-3">${nextForecastDays[i]}</div>
          </div>
          <div class="body p-2 py-4 d-flex flex-column gap-2">
            <h1>${forecastData[i].day.maxtemp_c}°C</h1>
            <img src="${forecastData[i].day.condition.icon}" alt="Weather Icon" class="w-25 m-auto">
            <p>${forecastData[i].day.condition.text}</p>
            <p>${forecastData[i].day.mintemp_c}°C</p>
          </div>
        </div>
      </div>`;
    rowData.innerHTML += cols;
  }
}

function getUserLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        if (!isGeolocationLoaded) {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          let iframe = document.getElementById("weather-iframe");
          iframe.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=14&output=embed`;
          isGeolocationLoaded = true;
          getData(`${lat},${lon}`);
        }
      },
      (error) => {
        console.error("Error fetching location:", error);
        rowData.innerHTML = `<p class="error alert alert-warning">Unable to retrieve location. Please allow location access or enter a city name manually.</p>
        <button onclick="getUserLocation()" class="btn btn-warning">Retry Access</button>`;
      }
    );
  } else {
    console.error("Geolocation not supported.");
    rowData.innerHTML = `<p class="error alert alert-danger">Geolocation is not supported by your browser.</p>`;
  }
}

locationInput.addEventListener("input", (e) => {
  const inputValue = e.target.value.trim();
  if (inputValue) {
    isGeolocationLoaded = false;
    getData(inputValue);
  }
});

getUserLocation();
