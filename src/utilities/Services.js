import { getSunrise, getSunset } from 'sunrise-sunset-js';


export const debounce = (func, wait) => {
    let timeout;
    return function () {
        const context = this;
        const args = arguments;
        const later = function () {
            timeout = null;
            func.apply(context, args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
};

export const debounchApi = debounce(fn => {
    fn();
}, 200);

export const isValidIpAddress = (ipAddress) => {
    return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress));
}

//TODO: test this function???
export const calculateTimeOfDay = (garageCoords, userCoords) => {
    if (garageCoords !== null) {
        const today = new Date();
        const sunrise = calculateSunrise(garageCoords.latitude, garageCoords.longitude, today)
        const sunset = calculateSunset(garageCoords.latitude, garageCoords.longitude, today);
        return (today >= sunset && today < sunrise);
    } else if (userCoords !== null) {
        const today = new Date();
        const sunrise = calculateSunrise(userCoords.latitude, userCoords.longitude, today);
        const sunset = calculateSunset(userCoords.latitude, userCoords.longitude, today);
        return (today >= sunset && today < sunrise);
    }
}

const calculateSunrise = (latitude, longitude, today) => {
    if (today.getHours() < 12) {
        return getSunrise(latitude, longitude, today);
    } else {
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate() +1);
        return getSunrise(latitude, longitude, tomorrow);
    }
}

const calculateSunset = (latitude, longitude, today) => {
    if (today.getHours() < 12) {
        const yesterday = new Date();
        yesterday.setDate(new Date().getDate() -1);
        return getSunset(latitude, longitude, yesterday);
    } else {
        return getSunset(latitude, longitude);
    }
}