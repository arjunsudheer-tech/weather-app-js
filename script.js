import { apiKey , apiUrl } from './config.js';

const searchInput = document.querySelector('.search-input');
const searchIcon = document.querySelector('.search-icon');
const errorMessage = document.querySelector('.error-message');

const weatherIcon = document.querySelector('.weather-icon-image');
const temperatureElement = document.querySelector('.temperature');
const cityName = document.querySelector('.city-name');
const weatherConditionElement = document.querySelector('.weather-condition');

const humidityElement = document.querySelector('.humidity-details span');
const windSpeedElement = document.querySelector('.wind-speed-details span');

async function checkWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}&units=metric`);
    if(!response.ok) {
      throw new Error('City not found');
    }
    const data = await response.json();

    errorMessage.textContent = '';

    weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    cityName.textContent = data.name;
    temperatureElement.textContent = `${Math.round(data.main.temp)}°C`;
    weatherConditionElement.textContent = `${data.weather[0].description}`;
    humidityElement.textContent = `${data.main.humidity}%`

    const windSpeed = data.wind.speed * 3.6;
    windSpeedElement.textContent = `${windSpeed.toFixed(1)} km/h`;

    console.log(data);

  }catch(error) {
    console.log(error);
    errorMessage.textContent = error.message;
  }
}

function searchWeather() {
  const city = searchInput.value.trim();

  if(city) {
    checkWeather(city);
  } else {
    errorMessage.textContent = 'Please enter city name';
  }
}

searchIcon.addEventListener('click' , () => {
  searchWeather();
});

searchInput.addEventListener('keydown' , (event) => {

  if(event.key === 'Enter') {
    searchWeather();
  }
});
