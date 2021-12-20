const UI = {
    tabs: document.querySelectorAll('.tab'),
    slides: document.querySelectorAll('.slide'),
    cityNameFields: document.querySelectorAll('.city-name'),
    favouriteItems: [...document.querySelectorAll('.favourite-item')],
    tempFields: document.querySelectorAll('.temperature'),

    activeTab: document.querySelector('.tab._active'),
    form: document.querySelector('.search-form'),
    weatherIcon: document.querySelector('.weather-icon'),
    addFavouriteBtn: document.querySelector('.add-favourite'),
    favouritesList: document.querySelector('.favourites'),
    
    feelsLike: document.querySelector('.feels-like'),
    weather: document.querySelector('.weather'),
    sunRise: document.querySelector('.sun-rise'),
    sunSet: document.querySelector('.sun-set'),
}

export default UI;