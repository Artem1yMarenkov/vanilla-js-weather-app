const SERVER = {
    URL: 'https://api.openweathermap.org/data/2.5/',
    API_KEY: 'f660a2fb1e4bad108d6160b7f58c555f',
}

function catchResult(result, onSuccess) {
    const status = Number(result.cod);

    console.log(result);

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


async function sendRequest(cityName, onSuccess) {
    const weatherUrl = `${SERVER.URL}${'weather'}?q=${cityName}&appid=${SERVER.API_KEY}&units=metric`;
    const forecastUrl = `${SERVER.URL}${'forecast'}?q=${cityName}&appid=${SERVER.API_KEY}&units=metric`;

    if (cityName.length > 2) {
        try {
            const weatherRequest = await fetch(weatherUrl);        
            const weatherResult = await weatherRequest.json();

            const forecastRequest = await fetch(forecastUrl);        
            const forecastResult = await forecastRequest.json();

            const result = { ...weatherResult, ...forecastResult }

            catchResult(result, onSuccess);
        } catch (err) {
            alert(err);
        }
    }
}
    
    
export default { sendRequest };