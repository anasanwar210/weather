// let currentDay;
// let apiKey = `24156785969741f0915104448240512`;
// let locationInput = document.getElementById("location-input");
// let rowData = document.getElementById("rowData");

// async function getData(location) {
//   try {
//     let allData = await fetch(
//         `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
//       ),
//       response = await allData.json();

//     getDetails(response);
//     displayData(response);
//     console.log(response);
//   } catch (error) {
//     console.log(error);
//   }
// }
// getData("cairo");

// function getDetails(apiData) {
//   const location = apiData.location.name;
//   const minTemp = apiData.current.temp_c;
//   const condition = apiData.current.condition.text;
//   const icon = apiData.current.condition.icon;
//   const humidity = apiData.current.humidity;
//   const windSpeed = apiData.current.wind_kph;
//   const windDirection = apiData.current.wind_dir;

//   // Get Date
//   const date = new Date(apiData.forecast.forecastday[0].date);
//   const days = [
//     "Sunday",
//     "Monday",
//     "Tuesday",
//     "Wednesday",
//     "Thursday",
//     "Friday",
//     "Saturday",
//   ];
//   const dayName = days[date.getDay()];
//   const dayNumber = date.getDate();
//   const months = [
//     "January",
//     "February",
//     "March",
//     "April",
//     "May",
//     "June",
//     "July",
//     "August",
//     "September",
//     "October",
//     "November",
//     "December",
//   ];
//   const monthName = months[date.getMonth()];
//   currentDay = [
//     dayName,
//     dayNumber,
//     monthName,
//     location,
//     minTemp,
//     icon,
//     condition,
//     humidity,
//     windSpeed,
//     windDirection,
//   ];
// }
// let dataLoaded = false;
// function displayData(response) {
//   if (navigator.geolocation && !dataLoaded) {
//     navigator.geolocation.getCurrentPosition((position) => {
//       const lat = position.coords.latitude;
//       const lon = position.coords.longitude;
//       dataLoaded = true
//       let forecastData = response.forecast.forecastday;
//       let userCity = `${lat},${lon}`;
//       let iframe = document.getElementById("weather-iframe");
//       iframe.src = `https://maps.google.com/maps?q=${lat},${lon}&hl=es&z=14&output=embed`;
//       getData(userCity);
//       rowData.innerHTML = `
//   <div class="col-md-4 mb-3">
//   <div class="weather-card">
//     <div class="title">
//       <div class="date p-2 rounded-top-3 d-flex justify-content-between">
//       <span>${currentDay[0]}</span>
//       <span>${currentDay[1]} ${currentDay[2]}</span>
//       </div>
//     </div>
//     <div class="body p-2 d-flex flex-column gap-2">
//       <h6>${currentDay[3]}</h6>
//       <h1 class="temp">${currentDay[4]}°C</h1>
//       <img src="${currentDay[5]}" class="w-25" alt="Weather Icon">
//       <p class="">${currentDay[6]}</p>
//       <div class="d-flex justify-content-center">
//         <span class="w-50"><img src="imgs/icon-umberella.png" class="me-1" alt="Umbrella">${currentDay[7]}%</span>
//         <span class="w-50"><img src="imgs/icon-wind.png" class="me-1" alt="Wind">${currentDay[8]}km/h</span>
//         <span class="w-50"><img src="imgs/icon-compass.png" class="me-1" alt="Compass">${currentDay[9]}</span>
//       </div>
//     </div>
//   </div>
// </div>`;

//       for (let i = 1; i < forecastData.length; i++) {
//         const date = new Date(response.forecast.forecastday[i].date);
//         const days = [
//           "Sunday",
//           "Monday",
//           "Tuesday",
//           "Wednesday",
//           "Thursday",
//           "Friday",
//           "Saturday",
//         ];
//         const dayName = days[date.getDay()];
//         let cols = `
//       <div class="col-md-4 mb-3">
//         <div class="weather-card text-center">
//           <div class="title">
//             <div class="date p-2 rounded-top-3">${dayName}</div>
//           </div>
//           <div class="body p-2 py-4 d-flex flex-column gap-2">
//             <h1>${forecastData[i].day.maxtemp_c}°C</h1>
//             <img src="${forecastData[i].day.condition.icon}" alt="Weather Icon" class="w-25 m-auto">
//             <p>${forecastData[i].day.condition.text}</p>
//             <p>${forecastData[i].day.mintemp_c}°C</p>
//           </div>
//         </div>
//       </div>
//   `;
//         rowData.innerHTML += cols;
//       }
//     });
//   } else {
//     console.error("Geolocation is not supported by this browser.");
//   }
// }

// locationInput.addEventListener("input", (e) => {
//   getData(e.target.value);
// });


let currentDay;
let apiKey = `24156785969741f0915104448240512`;
let locationInput = document.getElementById("location-input");
let rowData = document.getElementById("rowData");
let isGeolocationLoaded = false;

async function getData(location) {
  try {
    let allData = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${location}&days=3`
      ),
      response = await allData.json();
    if (response.error) {
      throw new Error(response.error.message);
    }
    getDetails(response);
    displayData(response);
    console.log(response);
  } catch (error) {
    console.error(error);
    rowData.innerHTML = `<p class="error alert alert-danger">Unable to retrieve weather data. Please check the location and try again.</p>`;
  }
}
getData();

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
  let forecastData = response.forecast.forecastday;
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
            <span class="w-50"><img src="imgs/icon-umberella.png" class="me-1" alt="Umbrella">${currentDay[7]}%</span>
            <span class="w-50"><img src="imgs/icon-wind.png" class="me-1" alt="Wind">${currentDay[8]}km/h</span>
            <span class="w-50"><img src="imgs/icon-compass.png" class="me-1" alt="Compass">${currentDay[9]}</span>
          </div>
        </div>
      </div>
    </div>`;

  for (let i = 1; i < forecastData.length; i++) {
    const date = new Date(forecastData[i].date);
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

if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition((position) => {
    if (!isGeolocationLoaded) {
      const lat = position.coords.latitude;
      const lon = position.coords.longitude;
      isGeolocationLoaded = true;
      getData(`${lat},${lon}`);
    }
  });
} else {
  console.error("Geolocation is not supported by this browser.");
  rowData.innerHTML = `<p class="error">Geolocation is not supported by your browser.</p>
  <button onclick="getUserLocation()" class="btn btn-warning">Retry Access</button>`;
}

locationInput.addEventListener("input", (e) => {
  const inputValue = e.target.value.trim();
  if (inputValue) {
    isGeolocationLoaded = false;
    getData(inputValue);
  }
});
