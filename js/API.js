const SERVER = {
    URL: 'https://api.openweathermap.org/data/2.5/weather',
    API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
}

function catchResult(result, onSuccess) {
    const status = Number(result["cod"]);

    switch(status) {
        case 200:
            onSuccess(result);
            break
        case 404: 
            throw new Error('Incorrect city name!');
        default:
            throw new Error('Unknown error!');
    }
}


function catchError(error) {
    error == 'TypeError: Failed to fetch' 
        ? alert('Request error!') 
        : alert(error)
}


function sendRequest(cityName, onSuccess) {
    const URL = `${SERVER.URL}?q=${cityName}&appid=${SERVER.API_KEY}&units=metric`;

    if (cityName.length > 2) {
        fetch(URL)
            .then(response => response.json())
            .then(result => catchResult(result, onSuccess))
            .catch(catchError);
    } else {
        alert('Incorrect city name');
    }
}


export default { SERVER, sendRequest, catchResult, catchError };