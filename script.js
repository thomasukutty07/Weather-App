const inputBox = document.getElementById("input-text");
const button = document.getElementById("search-btn");
const weatherIcon = document.getElementsByClassName("weather-icon")[0];

// fetching api
const url = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "36cc2fdb3d8c06fecf7754c0bde6c247";

async function weatherFetching(city) {
  const respone = await fetch(url + city + `&appid=${apiKey}`);

  if (respone.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await respone.json();
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + " %";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
}

button.addEventListener("click", () => {
  weatherFetching(inputBox.value);
});
