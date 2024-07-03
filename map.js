let map; // Define map variable outside functions for global scope

document.getElementById('mapForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    const latitude = document.getElementById('latitude-input').value.trim();
    const longitude = document.getElementById('longitude-input').value.trim();

    if (latitude && longitude) {
        locateOnMap(latitude, longitude);
    } else {
        alert('Please enter both latitude and longitude.');
    }
});

// Function to locate on map
function locateOnMap(latitude, longitude) {
    if (!map) {
        // Initialize map if it's not already initialized
        map = L.map('map').setView([latitude, longitude], 13);
        L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        }).addTo(map);
    } else {
        // Set new view without clearing the map
        map.setView([latitude, longitude], 13);
    }

    // Clear previous markers if any
    map.eachLayer(function(layer) {
        if (layer instanceof L.Marker) {
            map.removeLayer(layer);
        }
    });

    // Add new marker
    L.marker([latitude, longitude]).addTo(map)
        .bindPopup(`Latitude: ${latitude}<br>Longitude: ${longitude}`)
        .openPopup();

    // Show the hidden tip
    document.getElementById('tip').classList.remove('hidden');
}

// Button to use current location
document.getElementById('current-location-button').addEventListener('click', function() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            document.getElementById('latitude-input').value = latitude;
            document.getElementById('longitude-input').value = longitude;

            locateOnMap(latitude, longitude);
        }, function(error) {
            if (error.code === 1) {
                alert("Please allow geolocation access.");
            } else {
                alert("Error getting current location.");
            }
        });
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});
