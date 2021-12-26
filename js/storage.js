const ACTIONS = {
    favLocations: 'FAVOURITE_LOCATIONS',
    lastLocation: 'LAST_LOCATION',
}

const Storage = {
    get(action) {
        const testStorage = JSON.parse(localStorage.getItem(action));

        if (!testStorage) {
            localStorage.setItem( action, JSON.stringify([]) );
            console.log(`${action} storage has been created!`);
        }

        return JSON.parse(localStorage.getItem(action));
    },

    set(action, data) {
        localStorage.setItem(action, JSON.stringify(data));
    },
}


function addFavouriteLocation(cityName) {
    const storage = Storage.get(ACTIONS.favLocations);
    const replys = storage.includes(cityName);

    if (!replys) {
        storage.push(cityName);
    }

    Storage.set(ACTIONS.favLocations, storage);
}


function deleteFavouriteLocation(cityName) {
    const storage = Storage.get(ACTIONS.favLocations);
    const index = storage.indexOf(cityName);

    storage.splice(index, 1);

    Storage.set(ACTIONS.favLocations, storage);
}


function getFavouriteLocations() {
    return Storage.get(ACTIONS.favLocations);
}


function setLastLocation(cityName) {
    Storage.set(ACTIONS.lastLocation, cityName);
}


function getLastLocation() {
    const storage = Storage.get(ACTIONS.lastLocation);

    if (storage.length === 0) {
        const cityName = 'Aktobe';
        
        Storage.set(ACTIONS.lastLocation, cityName);
    } 

    return Storage.get(ACTIONS.lastLocation);
}


export default { 
    addFavouriteLocation,
    deleteFavouriteLocation,
    getFavouriteLocations,

    setLastLocation,
    getLastLocation
};