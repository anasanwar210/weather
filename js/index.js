/*
===================
- Catch What I Need From Api
===================
*/

/*
===================
- Start Call Functions
===================
*/

let locationInput = document.getElementById("location-input");
locationInput.addEventListener("input", function () {
  let result = this.value;
  getData(result);
});

getData("cairo");

/*
===================
- End Call Functions
===================
*/
function getData(location) {
  let myHttp = new XMLHttpRequest();
  myHttp.open(
    "GET",
    `https://api.weatherapi.com/v1/forecast.json?key=24156785969741f0915104448240512&q=${location}&days=3`
  );
  myHttp.send();
  myHttp.responseType = "json";
  myHttp.addEventListener("load", function () {
    if (myHttp.status >= 200 && myHttp.status < 300) {
      let allData = myHttp.response;
      console.log(allData);
      displayData(allData);
    }
  });
}

function displayData(allData) {
  if (allData && allData.current) {
    const iframe = document.getElementById("weather-iframe");
    iframe.src = `https://www.google.com/maps/embed/v1/place?key=24156785969741f0915104448240512&q=${allData.location.lat},${allData.location.lon}`;
    // Get Current Day
    let currentDateObject = new Date(allData.current.last_updated),
      currentDayName = currentDateObject.toLocaleDateString("en-US", {
        weekday: "long",
      }),
      dayNumber = currentDateObject.getDate(),
      monthName = currentDateObject.toLocaleDateString("en-US", {
        month: "long",
      });
    let location = allData.location.name,
      temp = allData.current.temp_c,
      condition = allData.current.condition.text,
      humidity = allData.current.humidity,
      windSpeed = allData.current.wind_kph,
      windDirection = allData.current.wind_dir,
      currentIcon = allData.current.condition.icon;

    // Get Second Day Forecast
    let secondDateObject = new Date(allData.forecast.forecastday[1].date),
      secondDayName = secondDateObject.toLocaleDateString("en-US", {
        weekday: "long",
      });
    let secondDayIcon = allData.forecast.forecastday[1].day.condition.icon,
      secondDayHigh = allData.forecast.forecastday[1].day.maxtemp_c,
      secondDayLow = allData.forecast.forecastday[1].day.mintemp_c,
      secondDayCondition = allData.forecast.forecastday[1].day.condition.text;

    // Get Third Day Forecast
    let thirdDateObject = new Date(allData.forecast.forecastday[2].date),
      thirdDayName = thirdDateObject.toLocaleDateString("en-US", {
        weekday: "long",
      });
    let thirdDayIcon = allData.forecast.forecastday[2].day.condition.icon,
      thirdDayHigh = allData.forecast.forecastday[2].day.maxtemp_c,
      thirdDayLow = allData.forecast.forecastday[2].day.mintemp_c,
      thirdDayCondition = allData.forecast.forecastday[2].day.condition.text;

    document.getElementById("rowData").innerHTML = `
    <div class="col-md-4 mb-3">
    <div class="weather-card">
      <div class="title">
        <div class="date p-2 rounded-top-3 d-flex justify-content-between">
        <span>${currentDayName}</span>
        <span>${dayNumber} ${monthName}</span></div>
      </div>
      <div class="body p-2 d-flex flex-column gap-2">
        <h6>${location}</h6>
        <h1 class="temp">${temp}°C</h1>
        <img src="${currentIcon}" class="w-25" alt="Weather Icon">
        <p class="">${condition}</p>
        <div class="d-flex justify-content-center">
          <span class="w-50"><img src="imgs/icon-umberella.png" class="me-1" alt="Umbrella">${humidity}%</span>
          <span class="w-50"><img src="imgs/icon-wind.png" class="me-1" alt="Wind">${windSpeed}km/h</span>
          <span class="w-50"><img src="imgs/icon-compass.png" class="me-1" alt="Compass">${windDirection}</span>
        </div>
      </div>
    </div>
  </div>
  <div class="col-md-4 mb-3">
    <div class="weather-card text-center">
      <div class="title">
        <div class="date p-2 rounded-top-3">${secondDayName}</div>
      </div>
      <div class="body p-2 py-4 d-flex flex-column gap-2">
        <h1>${secondDayHigh}°C</h1>
        <img src="${secondDayIcon}" alt="Weather Icon" class="w-25 m-auto">
        <p>${secondDayCondition}</p>
        <p>${secondDayLow}°C</p>
      </div>
    </div>
  </div>
  <div class="col-md-4 mb-3">
    <div class="weather-card text-center">
      <div class="title">
        <div class="date p-2 rounded-top-3">${thirdDayName}</div>
      </div>
      <div class="body p-2 py-4 d-flex flex-column gap-2">
        <h1>${thirdDayHigh}°C</h1>
        <img src="${thirdDayIcon}" alt="Weather Icon" class="w-25 m-auto">
        <p>${thirdDayCondition}</p>
        <p>${thirdDayLow}°C</p>
      </div>
    </div>
  </div>
`;
  }
}

// Edite Iframe

// https://api.weatherapi.com/v1/current.json?key=24156785969741f0915104448240512&q=London
