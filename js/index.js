var searchCity = document.querySelector('input');
//--------------------- Today's variables ---------------------\\
var forecastDayName = document.querySelector(".today.forecast .day");
var forecastDayDate = document.querySelector(".today.forecast .date");
var dayAMonth = document.querySelector(".today.forecast .dayAMonth");

var cityForecast = document.querySelector(
  ".today.forecast .forecast-body .city"
);
var degreeForecast = document.querySelector(
  ".today.forecast .forecast-body .degree"
);
var weatherCondition = document.querySelector(
  ".today.forecast .forecast-body .weatherCondition"
);
var humidityForecast = document.querySelector(
  ".today.forecast .forecast-body .humidity span"
);
var windsForecast = document.querySelector(
  ".today.forecast .forecast-body .winds span"
);
var weatherTrendForecast = document.querySelector(
  ".today.forecast .forecast-body .weatherTrend span"
);


//--------------------- tomorrow's variables ---------------------\\

var forecastTomorrowName = document.querySelector(".tomorrow.forecast .day");
var degreeTomorrowForecast = document.querySelector(
  ".tomorrow.forecast .forecast-body .degree .forecast-icon img"
);
var maxDegreeTomorrowForecast = document.querySelector(
  ".tomorrow.forecast .forecast-body .degree .maxTemperature"
);
var minDegreeTomorrowForecast = document.querySelector(
  ".tomorrow.forecast .forecast-body .degree .minTemperature"
);
var weatherConditionTomorrow = document.querySelector(
  ".tomorrow.forecast .forecast-body .weatherCondition"
);


var homeToContact = document.querySelector('#homeToContact');
var contactToHome = document.querySelector('#contactToHome');


homeToContact.addEventListener('click' , function(){
    contactToHome.classList.remove('active');
    homeToContact.classList.add('active');
})
contactToHome.addEventListener('click' , function(){
    homeToContact.classList.remove('active');
    contactToHome.classList.add('active');
})

//--------------------- AfterTomorrow's variables ---------------------\\

var forecastAfterTomorrowName = document.querySelector(".after-tomorrow.forecast .day");
var degreeAfterTomorrowForecast = document.querySelector(".after-tomorrow.forecast .forecast-body .degree .forecast-icon img");
var maxDegreeAfterTomorrowForecast = document.querySelector(".after-tomorrow.forecast .forecast-body .degree .maxTemperature");
var minDegreeAfterTomorrowForecast = document.querySelector(".after-tomorrow.forecast .forecast-body .degree .minTemperature");
var weatherConditionAfterTomorrow = document.querySelector('.after-tomorrow.forecast .forecast-body .weatherCondition');




//--------------------- Days of the week ---------------------\\
//--------------------- Months of the year ---------------------\\
var Days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var months = [
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

async function getWeather(searchLocation) {
  var response = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=e1baaf75a72f4cd8a4462359242703&q=${searchLocation}&days=7`
  );
  var data = await response.json();
  // displayData(data);
  displayData(data);
  displayTomorrow(data);
  displayAfterTomorrow(data);
}
getWeather("cairo");

//--------------------- Variables get date and day ---------------------\\


let history = new Date();

var getDay = history.getDay();
var printDay = Days[getDay];
// console.log(printDay);

var getDate = history.getDate();
// console.log(getDate);

var getMonth = history.getMonth();
var getMonth = months[getMonth];
// console.log(getMonth);
function displayData(show) {
  forecastDayName.innerHTML = printDay;
  forecastDayDate.innerHTML = getDate;
  dayAMonth.innerHTML = getMonth;
  cityForecast.innerHTML = show.location.name;

  degreeForecast.innerHTML = `<div class="fw-bolder text-white">${show.current.temp_c}<sup>o</sup>C</div> 
  <span class="forecast-icon d-block"> 
  <img src="https:${show.current.condition.icon}" alt="weatherapi"/> 
  </span>`;

  weatherCondition.innerHTML = show.current.condition.text;
  humidityForecast.innerHTML = show.current.humidity;
  windsForecast.innerHTML = `${show.current.wind_degree}km/h`;
  weatherTrendForecast.innerHTML = show.current.wind_dir;
}

function displayTomorrow(tomorro) {
  getDay++
  if(getDay=7){
    getDay=0
  }
  
  forecastTomorrowName.innerHTML = Days[getDay];
  degreeTomorrowForecast.setAttribute(
    "src",
    `https:${tomorro.forecast.forecastday[1].day.condition.icon}`
  );
  maxDegreeTomorrowForecast.innerHTML = `${tomorro.forecast.forecastday[1].day.maxtemp_c}&#176;C`;
  minDegreeTomorrowForecast.innerHTML = `${tomorro.forecast.forecastday[1].day.mintemp_c}&#176`;
  weatherConditionTomorrow.innerHTML =
    tomorro.forecast.forecastday[1].day.condition.text;
}

function displayAfterTomorrow(afTomorrow){
  getDay+=2
  if(getDay=7){
    getDay=0
  }
  if(getDay=8){
    getDay=1
  }
 forecastAfterTomorrowName.innerHTML = Days[getDay];
 degreeAfterTomorrowForecast.setAttribute('src', `https:${afTomorrow.forecast.forecastday[2].day.condition.icon}` );
 maxDegreeAfterTomorrowForecast.innerHTML = `${afTomorrow.forecast.forecastday[2].day.maxtemp_c}&#176;C`;
 minDegreeAfterTomorrowForecast.innerHTML = `${afTomorrow.forecast.forecastday[2].day.mintemp_c}&#176`;
 weatherConditionAfterTomorrow.innerHTML = afTomorrow.forecast.forecastday[2].day.condition.text;
}


searchCity.addEventListener('input', function(e){
  getCity = e.target.value;
  getWeather(getCity);
})

function getLocation() {
  startTime()

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(showPosition,defaultCity)
  } else {
    getWeather('cairo')
  }
}