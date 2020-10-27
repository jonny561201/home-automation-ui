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

export const calculateTimeOfDay = (garageCoords, userCoords) => {
    if (garageCoords !== null) {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        const sunrise = getSunrise(garageCoords.latitude, garageCoords.longitude, tomorrow);
        const sunset = getSunset(garageCoords.latitude, garageCoords.longitude);
        return (today >= sunset && today < sunrise);
    }
    if (userCoords !== null) {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(new Date().getDate()+1);
        const sunrise = getSunrise(userCoords.latitude, userCoords.longitude, tomorrow);
        const sunset = getSunset(userCoords.latitude, userCoords.longitude);
        return (today >= sunset && today < sunrise);
    }
}