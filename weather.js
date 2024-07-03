
        const button = document.getElementById('search-button');
        const cityInput = document.getElementById('city-input');
        const latitudeInput = document.getElementById('latitude-input');
        const longitudeInput = document.getElementById('longitude-input');

        async function getData(query, isCoords = false) {
            const apiKey = '0d7208d29b94eb65e542866d510f6efa'; // Replace with your actual API key
            let url;
            if (isCoords) {
                const [lat, lon] = query.split(',');
                url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}`;
            } else {
                url = `https://api.openweathermap.org/data/2.5/forecast?q=${query}&appid=${apiKey}`;
            }
            try {
                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            } catch (error) {
                console.error('Fetch error:', error);
                throw error;
            }
        }

        button.addEventListener('click', async (event) => {
            event.preventDefault(); // Prevent form submission

            let query = '';
            let isCoords = false;

            const cityValue = cityInput.value.trim();
            const latitudeValue = latitudeInput.value.trim();
            const longitudeValue = longitudeInput.value.trim();

            if (cityValue) {
                query = cityValue;
            } else if (latitudeValue && longitudeValue) {
                query = `${latitudeValue},${longitudeValue}`;
                isCoords = true;
            } else {
                alert('Please enter a city name or both latitude and longitude.');
                return;
            }

            try {
                const result = await getData(query, isCoords);
                console.log(result); // Log the result to ensure data is fetched correctly
                localStorage.setItem('weatherData', JSON.stringify(result));
                window.location.href = 'weather_result.html';
            } catch (error) {
                console.error('Error fetching weather data:', error);
                alert('Error fetching weather data. Please try again.');
            }
        });
