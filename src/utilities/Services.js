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
export const isNightTime = (garageCoords, userCoords) => {
    if (garageCoords !== null) {
        const today = new Date();
        const sunrise = calculateSunrise(garageCoords.latitude, garageCoords.longitude)
        const sunset = calculateSunset(garageCoords.latitude, garageCoords.longitude);
        const isNight = (today >= sunset && today < sunrise);
        return isNight;
    } else if (userCoords !== null) {
        const today = new Date();
        const sunrise = calculateSunrise(userCoords.latitude, userCoords.longitude);
        const sunset = calculateSunset(userCoords.latitude, userCoords.longitude);
        return (today >= sunset && today < sunrise);
    }
}

const calculateSunrise = (latitude, longitude) => {
    const today = new Date();
    if (today.getHours() < 12) {
        return getSunrise(latitude, longitude, today);
    } else {
        today.setDate(new Date().getDate() +1);
        return getSunrise(latitude, longitude, today);
    }
}

const calculateSunset = (latitude, longitude) => {
    const today = new Date();
    if (today.getHours() < 12) {
        today.setDate(new Date().getDate() -1);
        return getSunset(latitude, longitude, today);
    } else {
        today.setDate(new Date().getDate() +1)
        return getSunset(latitude, longitude, today);
    }
}

export const toggleDarkMode = () => {
    localStorage.getItem('theme') === 'theme-dark'
    ? setTheme('theme-light')
    : setTheme('theme-dark')
}


export const setTheme = (themeName) =>  {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}