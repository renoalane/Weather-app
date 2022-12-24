const apikey = "d102ce6f8a7f8c61a416505fdeb98697";

const main = document.getElementById("main");
const form = document.getElementById("form");
const search = document.getElementById("search");

const url = (city) =>
  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;

async function getWeatherByLocation(city) {
  const rep = await fetch(url(city), {
    origin: "cros",
  });
  const respData = await rep.json();
  addWeatherToPage(respData);
}

// search.addEventListener("change", () => {
//   console.log(getWeatherByLocation(search.value));
// });

function addWeatherToPage(data) {
  console.log(data);
  const temp = Ktoc(data.main.temp);

  const weather = document.createElement("div");
  weather.classList.add("weather");

  weather.innerHTML = `
    <h2 style="text-align:center;display:block;margin:1rem 0">${data.name}</h2>
    <h2>
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    ${temp}°C
    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png"/>
    </h2>
    <small style="text-align:center;display:block">${data.weather[0].main}</small>
  `;

  // Cleanup
  main.innerHTML = "";
  main.appendChild(weather);
}

function Ktoc(K) {
  return Math.floor(K - 273.15);
}

const text = document.querySelector(".country");

form.addEventListener("keyup", (e) => {
  e.preventDefault();

  const city = search.value;

  if (city) {
    text.style.display = "none";
    getWeatherByLocation(city);
  } else {
    text.style.display = "block";
    main.innerHTML = "";
  }
});
