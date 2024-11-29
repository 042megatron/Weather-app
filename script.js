let apiKey = config.myKey;
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const errorMessage1 = document.querySelector(".error");
const weather = document.querySelector(".weather");

async function checkWeather(city) {
    if (!city.trim()) {
        errorMessage1.textContent = "Please enter a city name!";
        errorMessage1.style.display = "block";
        weather.style.display = "none";
        return;
    }

    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (!response.ok) {
            if (response.status === 404) {
                errorMessage1.textContent = "City not found!";
                errorMessage1.style.display = "block";
                weather.style.display = "none";
            } else {
                throw new Error(`Error: ${response.status}`);
            }
            return;
        }

        const data = await response.json();
        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = Math.round(data.wind.speed) + " Km/h";

        const weatherIconMap = {
            Clouds: "cloudy.png",
            Clear: "clear.png",
            Rain: "rain.png",
            Drizzle: "drizzle.png",
            Mist: "mist.png",
            Snow: "snow.png"
        };
        weatherIcon.src = `assets/${weatherIconMap[data.weather[0].main]}`;

        weather.style.display = "block";
        errorMessage1.style.display = "none";
    } catch (error) {
        console.error("Error fetching weather data:", error);
        errorMessage1.textContent = "Unable to fetch data. Check your internet connection!";
        weather.style.display = "none";
        errorMessage1.style.display = "block";
    }
}

searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
});

searchBox.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        event.preventDefault();
        checkWeather(searchBox.value);
    }
});
