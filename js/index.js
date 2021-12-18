// Господи, прости за кучу говнокода, аминь!

import UIComponents from "./view.js";


function checkHeart() {
    const favouriteItems = [...document.querySelectorAll('.favourite-item')]; 
    const iterations = favouriteItems.map(el => el.childNodes[1].textContent);
    const cityName = UIComponents.cityNameField[0].textContent;

    iterations.includes(cityName) 
        ? UIComponents.addFavouriteBtn.className = 'add-favourite _active'
        : UIComponents.addFavouriteBtn.className = 'add-favourite'
}

function setHTML(data) {
    UIComponents.cityNameField.forEach(el => el.innerHTML = data["name"]);
    UIComponents.tempField.innerHTML = `${Math.round(data['main']['temp'])}°`;
    UIComponents.weatherIcon.src = `https://openweathermap.org/img/wn/${data['weather'][0]['icon']}@2x.png`;

    checkHeart();
}

function catchResult(result) {
    const status = Number(result["cod"]);

    switch(status) {
        case 200:
            setHTML(result);
            break
        case 404:
            throw new Error('Incorrect city name')
            break
        default:
            throw new Error('Incorrect city name')
            break
    }
}

function catchError(error) {
    if (error == 'TypeError: Failed to fetch') {
        alert('Request error!')
    } else {
        alert(error);
    }
}

function sendRequest(cityName) {
    const serverUrl = 'https://api.openweathermap.org/data/2.5/weather';
    const apiKey = 'f660a2fb1e4bad108d6160b7f58c555f';
    const url = `${serverUrl}?q=${cityName}&appid=${apiKey}&units=metric`;

    if (cityName.length > 2) {
        fetch(url)
            .then(response => response.json())
            .then(result => catchResult(result))
            .catch(error => catchError(error));
    } else {
        alert('Incorrect city name');
    }
}


function setTab(event) {
    const slideId = event.target.getAttribute('data-action');

    UIComponents.slides.forEach(element => {
        if (element.classList.contains('_active')) element.classList.remove('_active');

        if (element.getAttribute('data-action') === slideId) element.classList.add('_active');
    });

    UIComponents.activeTab.classList.remove('_active');
    event.target.classList.add('_active');
    UIComponents.activeTab = event.target;
}

function handleSubmit(event) {
    event.preventDefault();

    const cityName = event.target.city.value.trim();
    sendRequest(cityName);

    event.target.reset();
}

function handleClick(event) {

    if (event.target.className == 'favourite-cross') {
        event.target.parentNode.remove();
    } else {
        const cityName = event.target.textContent;
        sendRequest(cityName);
    }
    checkHeart();
}

function addFavourite(event) {
    const cityName = UIComponents.cityNameField[0].textContent;
    const favouriteItems = [...document.querySelectorAll('.favourite-item')]; 

    const iterations = favouriteItems.map(el => el.childNodes[1].textContent);

    if (!iterations.includes(cityName)) {
        const favouriteItem = document.createElement('li');

        favouriteItem.className = 'favourite-item';
        favouriteItem.innerHTML = `
                <button class="favourite-city-name" >${cityName}</button>
                <button class="favourite-cross">+</button>
            `;
        favouriteItem.addEventListener('click', handleClick);
    
        UIComponents.favouritesList.appendChild(favouriteItem);
    }
    checkHeart();
}


UIComponents.tabs.forEach( el => el.addEventListener('click', setTab));

UIComponents.form.addEventListener('submit', handleSubmit);

UIComponents.addFavouriteBtn.addEventListener('click', addFavourite);