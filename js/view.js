import API from "./API.js";
import STORAGE from "./storage.js";
import UI from "./ui.js";


function checkHeart() {
    const favouriteItems = [...document.querySelectorAll('.favourite-item')];
    const iterations = favouriteItems.map(el => el.childNodes[1].textContent);
    const cityName = UI.cityNameFields[0].textContent;

    iterations.includes(cityName) 
        ? UI.addFavouriteBtn.className = 'add-favourite _active'
        : UI.addFavouriteBtn.className = 'add-favourite'
}


function setHTML(data) {
    UI.cityNameFields.forEach(el => el.innerHTML = data.name);
    UI.tempFields.forEach(el => el.innerHTML = `${Math.round(data.main.temp)}&#176`);
    UI.weatherIcon.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
    UI.weather.innerHTML = data.weather[0].main;
    UI.feelsLike.innerHTML = Math.round(data.main.feels_like);
    UI.sunRise.innerHTML = data.sys.sunrise;
    UI.sunSet.innerHTML = data.sys.sunset;

    UI.forecastList.innerHTML = '';
    const forecast = data.list.splice(0, 3);
    
    forecast.forEach(data => {
        const forecastItem = document.createElement('div');
        const date = new Date(data.dt_txt);
        const month = String(date).split(' ')[1];


        forecastItem.className = 'forecast-item';
        forecastItem.innerHTML = `
            <div class="date-time">
                <p class="date">${date.getDate()} ${month}</p>
                <p class="time">${date.getHours()}:${date.getMinutes()}</p>
            </div>

            <div class="temp-forecast">
                <div class="temp">
                    <p>Temperature: ${Math.round(data.main.temp)}</p>
                    <p>Feels like: ${Math.round(data.main.feels_like)}</p>
                </div>
                <div class="forecast-info">
                    <p>${data.weather[0].main}</p>
                    <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="rain">
                </div>
            </div>
        `;

        UI.forecastList.appendChild(forecastItem);
    });


    STORAGE.setLastLocation(data['name']);
    checkHeart();
}


function setTab(event) {
    const slideId = event.target.getAttribute('data-action');

    UI.slides.forEach(element => {
        if (element.classList.contains('_active')) element.classList.remove('_active');

        if (element.getAttribute('data-action') === slideId) element.classList.add('_active');
    });

    UI.activeTab.classList.remove('_active');
    event.target.classList.add('_active');
    UI.activeTab = event.target;
}


function addFavourite() {
    const cityName = UI.cityNameFields[0].textContent;
    STORAGE.addFavouriteLocation(cityName);

    renderFavourites();
    checkHeart();
}


function removeFavourite(element) {
    const cityName = element.parentNode.childNodes[1].textContent;
    
    STORAGE.deleteFavouriteLocation(cityName);

    renderFavourites();
}


function renderFavourites() {
    UI.favouritesList.innerHTML = '';
    const locations = STORAGE.getFavouriteLocations();
    
    locations.forEach(city => {
        const favouriteItem = document.createElement('li');

        favouriteItem.className = 'favourite-item';
        favouriteItem.innerHTML = `
                <button class="favourite-city-name" >${city}</button>
                <button class="favourite-cross">+</button>
            `;
        favouriteItem.addEventListener('click', handleClick);

        UI.favouritesList.appendChild(favouriteItem);
    });
}



function handleSubmit(event) {
    event.preventDefault();

    const cityName = event.target.city.value.trim();
    API.sendRequest(cityName, setHTML);

    event.target.reset();
}


function handleClick(event) {
    if (event.target.className == 'favourite-cross') {
        removeFavourite(event.target);
    }

    if (event.target.className == 'favourite-city-name') {
        const cityName = event.target.textContent;
        API.sendRequest(cityName, setHTML);
    }
    
    checkHeart();
}


function handleLoad() {
    const cityName = STORAGE.getLastLocation();
    API.sendRequest(cityName, setHTML);

    renderFavourites();
}


UI.addFavouriteBtn.addEventListener('click', addFavourite);
UI.tabs.forEach(el => el.addEventListener('click', setTab));
UI.form.addEventListener('submit', handleSubmit);

document.addEventListener('DOMContentLoaded', handleLoad);