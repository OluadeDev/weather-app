document.getElementById("searchBtn").addEventListener("click", getWeather);

async function getWeather() {
  const apiKey = "9f5ea6958015c10398b63de7fd49cfa6"; 
  const city = document.getElementById("cityInput").value.trim();
  const weatherResult = document.getElementById("weatherResult");
  const errorMsg = document.getElementById("errorMsg");

  weatherResult.innerHTML = "";
  errorMsg.textContent = "";

  if (city === "") {
    errorMsg.textContent = "⚠ Please enter a city name.";
    return;
  }

  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    weatherResult.innerHTML = `
      <h3>${data.name}, ${data.sys.country}</h3>
      <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather icon">
      <p><strong>${data.main.temp}°C</strong></p>
      <p>${data.weather[0].description}</p>
      <p>💧 Humidity: ${data.main.humidity}%</p>
      <p>🌬 Wind: ${data.wind.speed} m/s</p>
    `;
  } catch (error) {
    errorMsg.textContent = "❌ City not found. Try again!";
  }
}
