let toogle = document.getElementById("toogle");
let ButtonSearch = document.getElementById("search");
let imageCloude = document.getElementById("image1");
let themeV = "light";

function getWeatherData(city) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=1928a8c18d44dc1a3a99702805f15969&units=metric `
  )
    .then((res) => res.json())
    .then(
      (data) => {
        if(data.cod === 400){
          alert("city not Found");
        return;
        }
        document.getElementById("city").innerHTML = data.name;
        
        document.getElementById("temp").innerHTML = data.main.temp + "°C";
        document.getElementById("description").innerHTML =
          data.weather[0].description;

        document.getElementById("humidity").innerHTML =
          data.main.humidity + "%";
        const weatherId =data.weather[0].id;
        imageCloude.src = `weather/${ChangeWeatherIcon(weatherId)}`
         } )
        .catch((error)=>{
          alert("Error");
          console.log(error);
          

        });
}

function theme() {
  if (themeV === "light") {
    document.body.classList.replace("light-body", "dark-body");
    themeV = "dark";
  } else {
    document.body.classList.replace("dark-body", "light-body");
    themeV = "light";
  }
}

toogle.addEventListener("click", () => {
  theme();
});

ButtonSearch.addEventListener("click", () => {
  let city = document.getElementById("input-txt").value;

  getWeatherData(city);
});

function ChangeWeatherIcon(id) {
  if (id <= 232) return "thunderstorm.svg";
  if (id <= 321) return "drizzle.svg";
  if (id <= 521) return "rain.svg";
  if (id <= 622) return "snow.svg";
  if (id <= 800) return "clear.svg";
  else return "clouds.svg";
}
// il me reste de travailler sur responsive
//si aucune ville ne se trouve pas not found
// le changement d'icon cloud et plutot le style
