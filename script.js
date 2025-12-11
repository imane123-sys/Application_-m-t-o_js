const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city");
const weatherInfosSection = document.querySelector(".weather-info");
const countryTxt = document.querySelector(".contry-text");
const tempTxt = document.querySelector(".temp-txt");
const conditionTxt = document.querySelector(".condition-txt");
const humidityValueTxt = document.querySelector(".humidity-value-txt");
const windValueTxt = document.querySelector(".wind-value-txt");
const weatherSummaryImg = document.querySelector(".weather-summary-img");
const currentDateTxt = document.querySelector(".current-date-txt");
const forecastItemsContanier = document.querySelector(
  ".forecast-items-container"
);

const apiKey = "1928a8c18d44dc1a3a99702805f15969";
searchBtn.addEventListener("click", () => {
  if (cityInput.value.trim() != "") {
    updateWeatherInfos(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});
cityInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter" && cityInput.value.trim) {
    updateWeatherInfos(cityInput.value);
    cityInput.value = "";
    cityInput.blur();
  }
});

async function getFetchData(endPoint, city) {
  const apiUrl = `https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=1928a8c18d44dc1a3a99702805f15969&units=metric `;
  const response = await fetch(apiUrl);
  return response.json();
}
function getWeatherIcon(id) {
  if (id <= 232) return "thunderstorm.svg";
  if (id <= 321) return "drizzle.svg";
  if (id <= 521) return "rain.svg";
  if (id <= 622) return "snow.svg";
  if (id <= 800) return "clear.svg";
  else return "clouds.svg";
}
function getCurrentDate() {
  const currentDate = new Date();
  const options = {
    weekday: "short",
    day: "2-digit",
    month: "short",
  };
  return currentDate.toLocaleDateString("en-GB", options); //Mon, 05 Feb
}

// function getFetchData(){
//   fetch(`https://api.openweathermap.org/data/2.5/${endPoint}?q=${city}&appid=1928a8c18d44dc1a3a99702805f15969&units=metric`)

// }
async function updateWeatherInfos(city) {
  const weatherData = await getFetchData("weather", city);
  if (weatherData.cod != 200) {
    showDisplaySection(notFoundSection);
    return;
  }
  console.log(weatherData);

  const {
    name: country,
    main: { temp, humidity },
    weather: [{ id, main }],
    wind: { speed },
  } = weatherData;
  countryTxt.textContent = country;
  tempTxt.textContent = Math.round(temp) + "°C";
  conditionTxt.textContent = main;
  humidityValueTxt.textContent = humidity + "%";
  windValueTxt.textContent = speed + "M/s";
  currentDateTxt.textContent = getCurrentDate();
  console.log(getCurrentDate);
  await updateForecastsInfo();
  weatherSummaryImg.src = `assets/weather/${getWeatherIcon(id)}`;
  async function updateForecastsInfo() {
    const forecastsData = await getFetchData("forecast", city);
    const timeTaken = "12:00:00";
    const todayDate = new Date().toISOString().split("T")[0];
    forecastItemsContanier.innerHTML = "";
    forecastsData.list.foreach((forecastWeather) => {
      if (
        forecastWeather.dt_txt.includes(timeTaken) &&
        !forecastWeather.dt_txt.includes(todayDate)
      )
        updateForecastItems(forecastWeather);
    });
  }
  function updateForecastItems(weatherData) {}
  // showDisplaySection(weatherInfosSection);
  console.log(weatherData);
  const {
    dt_txt:date,
    weather:[{id}],
    main:{temp}

  } = weatherData
  const forecastItem=`
      <div class="forecast-item">
        <h5 class="forecast-item-date regular-txt">09 Dec</h5>
        <img
          src="assets/weather/thunderstorm.svg"
          class="forecast-item-img"
          alt=""
        />
        <h5 class="forecast-item-temp">29 °C</h5>
      </div>
  `
  forecastItemsContanier.insertAdjacentHTML('beforeend',forecastItem)
}
function showDisplaySection(section) {
  [weatherInfosSection, searchCitySection, notFoundSection].forEach(
    (section) => (section.style.display = "none")
  );
  section.style.display = "flex";
}
