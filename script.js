const cityInput = document.querySelector(".city-input");
const searchBtn = document.querySelector(".search-btn");
const notFoundSection = document.querySelector(".not-found");
const searchCitySection = document.querySelector(".search-city")
const weatherInfosSection = document.querySelector(".weather-info")

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
async function updateWeatherInfos(city) {
  const weatherData = await getFetchData("weather", city);
  if (weatherData) console.log(weatherData.cod != 200){
    showDisplaySection(notFoundSection)

  }
  function notFoundSection(section){
    

  }
}
