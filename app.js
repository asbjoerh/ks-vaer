import descriptions from "./descriptions.json" assert { type: "json" };

const WEATHER_API_URL = "https://api.open-meteo.com/v1/forecast?";

const params = new URLSearchParams({
  latitude: "60.397076",
  longitude: "5.324383",
  current: "temperature_2m,is_day,weather_code",
  forecast_days: "1",
});

document.addEventListener("DOMContentLoaded", async function () {
  try {
    const data = await fetch(`${WEATHER_API_URL}${params}`);
    const weatherData = await data.json();

    document.getElementById("temp").innerText =
      weatherData.current.temperature_2m;
    document.getElementById("tempunit").innerText =
      weatherData.current_units.temperature_2m;

    const weatherCode = weatherData.current.weather_code;
    const isDay = !!Number(weatherData.current.is_day) ? "day" : "night";
    const image = document.getElementById("weathericon");
    image.src = descriptions[weatherCode][isDay].image;
    image.alt = descriptions[weatherCode][isDay].description;
  } catch (error) {
    console.error(error);
    document.getElementById("temp").innerText =
      "Beklager, kunne ikke hente værdata.";
  }
});
