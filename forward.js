const getForwardGeocode = async (streetNumber, postalCode, city, country) => {
    let apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${streetNumber}+${postalCode}+${city}+${country}&key=db280328369940e88d2a32805925c916`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.results.length > 0) {
            const coordinates = data.results[0].geometry;
            document.getElementById('coordinates').textContent = `Latitude: ${coordinates.lat}, Longitude: ${coordinates.lng}`;
        } else {
            document.getElementById('coordinates').textContent = 'Not found';
        }
    } catch (error) {
        console.log(error);
        document.getElementById('coordinates').textContent = 'Error';
    }
};
const inputFields = ['streetNumber', 'postalCode', 'city', 'country'];

inputFields.forEach(field => {
    document.getElementById(field).addEventListener('input', (event) => {
        event.target.value = event.target.value.toLowerCase();
    });
});

document.getElementById('geoform').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    let streetNumber = document.getElementById('streetNumber').value.trim();
    let postalCode = document.getElementById('postalCode').value.trim();
    let city = document.getElementById('city').value.trim();
    let country = document.getElementById('country').value.trim();

    getForwardGeocode(streetNumber, postalCode, city, country);
});
