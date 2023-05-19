const API_KEY = 'b8be150dfad74285aef134259231805';
const LOCATION = 'Novosibirsk';
// HTML-разметка виджета
const widgetContainer = document.getElementById('weather-widget');

const createWeatherWidget = (weatherData) => {
    const location = weatherData.location.name;
    const temperature = weatherData.current.temp_c;
    const conditionText = weatherData.current.condition.text;
    const iconUrl = `http:${weatherData.current.condition.icon}`;
    const feelsLikeTemperature = weatherData.current.feelslike_c;
    const windSpeed = weatherData.current.wind_kph;
    const humidity = weatherData.current.humidity;
    const airQualityIndex = weatherData.current.air_quality['us-epa-index'];

    // Создание элементов виджета
    const locationElement = document.createElement('h2');
    locationElement.textContent = location;

    const temperatureElement = document.createElement('p');
    temperatureElement.classList.add('temperature');
    temperatureElement.innerHTML = `<span class="value">${temperature}</span><span class="unit">°C</span>`;

    const conditionElement = document.createElement('p');
    conditionElement.textContent = conditionText;

    const iconElement = document.createElement('img');
    iconElement.src = iconUrl;
    iconElement.alt = conditionText;

    const feelsLikeElement = document.createElement('p');
    feelsLikeElement.innerHTML = `Feels like: <span class="value">${feelsLikeTemperature}</span>°C`;

    const windElement = document.createElement('p');
    windElement.innerHTML = `Wind: <span class="value">${windSpeed}</span> km/h`;

    const humidityElement = document.createElement('p');
    humidityElement.innerHTML = `Humidity: <span class="value">${humidity}</span>%`;

    const airQualityElement = document.createElement('p');
    airQualityElement.innerHTML = `Air Quality Index: <span class="value">${airQualityIndex}</span>`;

    // Добавление элементов в контейнер виджета
    widgetContainer.innerHTML = '';
    widgetContainer.appendChild(locationElement);
    widgetContainer.appendChild(temperatureElement);
    widgetContainer.appendChild(conditionElement);
    widgetContainer.appendChild(iconElement);
    widgetContainer.appendChild(feelsLikeElement);
    widgetContainer.appendChild(windElement);
    widgetContainer.appendChild(humidityElement);
    widgetContainer.appendChild(airQualityElement);
};

const showLoadingIndicator = () => {
    widgetContainer.textContent = 'Loading...';
};

const showError = () => {
    widgetContainer.textContent = 'Error loading weather data.';
};

const getWeatherData = async () => {
    try {
        const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${LOCATION}&aqi=yes`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw new Error('Failed to fetch weather data.');
    }
};

const updateWeatherWidget = async () => {
    showLoadingIndicator();

    try {
        const weatherData = await getWeatherData();
        createWeatherWidget(weatherData);
    } catch (error) {
        console.error(error);
        showError();
    }
};

// Вызов функции для обновления виджета при загрузке страницы
updateWeatherWidget();
