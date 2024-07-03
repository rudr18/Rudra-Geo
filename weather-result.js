
        document.addEventListener('DOMContentLoaded', () => {
            const weatherInfo = document.getElementById('weather-info');
            const weatherChartCtx = document.getElementById('weather-chart').getContext('2d');
            const weatherData = JSON.parse(localStorage.getItem('weatherData'));
            console.log(weatherData);  // Log for debugging

            if (!weatherData) {
                weatherInfo.textContent = 'No weather data available. Please go back and enter a city name or coordinates.';
                return;
            }

            // Assuming we are working with a forecast data response
            const conditionIconUrl = `http://openweathermap.org/img/wn/${weatherData.list[0].weather[0].icon}@2x.png`;

            weatherInfo.innerHTML = `
                <img src="${conditionIconUrl}" alt="Weather Icon">
                <p>Location: ${weatherData.city.name}, ${weatherData.city.country}</p>
                <p>Temperature: ${(weatherData.list[0].main.temp - 273.15).toFixed(2)}°C</p>
                <p>Condition: ${weatherData.list[0].weather[0].description}</p>
                <p>Humidity: ${weatherData.list[0].main.humidity}%</p>
                <p>Wind: ${weatherData.list[0].wind.speed} m/s</p>
                <p>Latitude: ${weatherData.city.coord.lat}</p>
                <p>Longitude: ${weatherData.city.coord.lon}</p>
                <button onclick="editData()">Edit Data</button>
            `;

            new Chart(weatherChartCtx, {
                type: 'bar',
                data: {
                    labels: ['Temperature (°C)', 'Humidity (%)', 'Wind (m/s)'],
                    datasets: [{
                        label: 'Weather Data',
                        data: [
                            (weatherData.list[0].main.temp - 273.15).toFixed(2),
                            weatherData.list[0].main.humidity,
                            weatherData.list[0].wind.speed
                        ],
                        backgroundColor: ['rgba(75, 192, 192, 0.2)', 'rgba(255, 159, 64, 0.2)', 'rgba(153, 102, 255, 0.2)'],
                        borderColor: ['rgba(75, 192, 192, 1)', 'rgba(255, 159, 64, 1)', 'rgba(153, 102, 255, 1)'],
                        borderWidth: 1
                    }]
                },
                options: {
                    scales: {
                        y: {
                            beginAtZero: true
                        }
                    }
                }
            });
        });

        function editData() {
            window.location.href = 'weather.html';
        }

