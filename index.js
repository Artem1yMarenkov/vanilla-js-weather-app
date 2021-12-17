import UIComponents from "./view.js";

const tabs = UIComponents.tabs;
const slides = UIComponents.slides;
let activeTab = UIComponents.activeTab;


const setData = (data) => {
    [...UIComponents.cityNameField].forEach(el => el.innerHTML = data["name"]);
    UIComponents.tempField.innerHTML = Math.round(data['main']['temp']);
    UIComponents.weatherIcon.src = `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`;
}


const catchError = (error) => {
    if (error == 'TypeError: Failed to fetch') {
        alert('Request error!')
    } else {
        alert(error);
    }
}


const catchPromise = (response) => {
    const status = Number(response["cod"]);

    switch(status) {
        case 200:
            setData(response);
            break
        case 404:
            throw 'Incorrect city name'
            break
        default:
            throw 'Incorrect city name'
            break
    }
}


const handleSubmit = (event) => {
    event.preventDefault();

    const serverUrl = 'http://api.openweathermap.org/data/2.5/weather';
    const cityName = event.target.city.value.trim();
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    if (cityName.length > 2) {
        fetch(url)
            .then(response => response.json())
            .then(result => catchPromise(result))
            .catch(error => catchError(error));
    } else {
        alert('Incorrect city name');
    }

    event.target.reset();
}


const setTab = (event) => {
    const slideId = event.target.getAttribute('data-action');

    [...slides].forEach(element => {
        if (element.classList.contains('_active')) element.classList.remove('_active');

        if (element.getAttribute('data-action') === slideId) element.classList.add('_active');
    });

    activeTab.classList.remove('_active');
    event.target.classList.add('_active');
    activeTab = event.target;
}


[...tabs].forEach( el => el.addEventListener('click', setTab));

UIComponents.form.addEventListener('submit', handleSubmit);
