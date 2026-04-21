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
}, 300);

export const isValidIpAddress = (ipAddress) => {
    return (/^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/.test(ipAddress));
}

export const parseDate = (time) => {
    const [hours, minutes, seconds] = time.split(":");
    const date = new Date();
    date.setHours(hours);
    date.setMinutes(minutes);
    return date;
}

export const isDayLight = (coords, today = new Date()) => {
    if (!coords) return true;
    const sunrise = getSunrise(coords.latitude, coords.longitude, today);
    const sunset = getSunset(coords.latitude, coords.longitude, today);
    return today >= sunrise && today < sunset;
}

export const toggleDarkMode = () => {
    localStorage.getItem('theme') === 'theme-dark'
        ? setTheme('theme-light')
        : setTheme('theme-dark')
}


export const setTheme = (themeName) => {
    localStorage.setItem('theme', themeName);
    document.documentElement.className = themeName;
}