import API from "./api.js";
import STORAGE from "./storage.js";

const UI = {
    tabs: document.querySelectorAll('.tab'),
    slides: document.querySelectorAll('.slide'),
    cityNameFields: document.querySelectorAll('.city-name'),
    favouriteItems: [...document.querySelectorAll('.favourite-item')],

    activeTab: document.querySelector('.tab._active'),
    form: document.querySelector('.search-form'),
    tempField: document.querySelector('.temperature'),
    weatherIcon: document.querySelector('.weather-icon'),
    addFavouriteBtn: document.querySelector('.add-favourite'),
    favouritesList: document.querySelector('.favourites'),
}


function checkHeart() {
    const favouriteItems = [...document.querySelectorAll('.favourite-item')];
    const iterations = favouriteItems.map(el => el.childNodes[1].textContent);
    const cityName = UI.cityNameFields[0].textContent;

    iterations.includes(cityName) 
        ? UI.addFavouriteBtn.className = 'add-favourite _active'
        : UI.addFavouriteBtn.className = 'add-favourite'
}


function setHTML(data) {
    UI.cityNameFields.forEach(el => el.innerHTML = data["name"]);
    UI.tempField.innerHTML = `${Math.round(data['main']['temp'])}&#176`;
    UI.weatherIcon.src = `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`;

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