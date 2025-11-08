// ========== STEP 1: Select all elements ==========
const searchBtn = document.getElementById("search-btn");
const cityInput = document.getElementById("city-input");
const weatherResult = document.getElementById("weather-result");
const loading = document.getElementById("loading");
const errorMessage = document.getElementById("error-message");

// Weather details elements
const cityName = document.getElementById("city-name");
const temperature = document.getElementById("temperature");
const weatherDescription = document.getElementById("weather-description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("wind-speed");
const minTemp = document.getElementById("min-temp");
const maxTemp = document.getElementById("max-temp");
const weatherIcon = document.getElementById("weather-icon");

// ========== STEP 2: API Setup ==========
// ⚠️ Use your real key from OpenWeather (wait 10–15 min after creating)
// Test key for now:
const API_KEY = "7273395480a4e4de35ae7096364b5c1b";

// ========== STEP 3: Fetch Weather Function ==========
async function getWeather(city) {
  try {
    loading.style.display = "block";
    weatherResult.style.display = "none";
    errorMessage.style.display = "none";

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === "404" || data.cod === 404) {
      loading.style.display = "none";
      errorMessage.textContent = "City not found. Please try again.";
      errorMessage.style.display = "block";
      return;
    }

    cityName.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    humidity.textContent = `${data.main.humidity}%`;
    windSpeed.textContent = `${data.wind.speed} km/h`;
    minTemp.textContent = `${Math.round(data.main.temp_min)}°C`;
    maxTemp.textContent = `${Math.round(data.main.temp_max)}°C`;

    const iconCode = data.weather[0].icon;
    weatherIcon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

    loading.style.display = "none";
    weatherResult.style.display = "block";
  } catch (error) {
    loading.style.display = "none";
    errorMessage.textContent = "Error fetching data. Try again later.";
    errorMessage.style.display = "block";
  }
}

// ========== STEP 4: Event Listeners ==========
searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") {
    errorMessage.textContent = "Please enter a city name.";
    errorMessage.style.display = "block";
    return;
  }
  getWeather(city);
  cityInput.value = "";
});

cityInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    searchBtn.click();
  }
});

// ========== STEP 5: Display current date ==========
const dateDisplay = document.getElementById("current-date");
const now = new Date();
const options = { weekday: "long", month: "long", day: "numeric" };
dateDisplay.textContent = now.toLocaleDateString("en-US", options);
