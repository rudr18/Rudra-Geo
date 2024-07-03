const getReverseGeocode = async (latitude, longitude) => {
    let apiUrl = `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=db280328369940e88d2a32805925c916`;
    try {
        const res = await fetch(apiUrl);
        const data = await res.json();
        if (data.results.length > 0) {
            const address = data.results[0].formatted;
            document.getElementById('address').textContent = address;
        } else {
            document.getElementById('address').textContent = 'Not found';
        }
    } catch (error) {
        console.log(error);
        document.getElementById('address').textContent = 'Error';
    }
};

document.getElementById('geoform').addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    let latitude = document.getElementById('latitude').value.trim();
    let longitude = document.getElementById('longitude').value.trim();

    getReverseGeocode(latitude, longitude);
});
