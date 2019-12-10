import base64 from 'base-64';
import jwt_decode from 'jwt-decode';
import { getStore } from '../TestState';


const loginUrl = 'http://localhost:5000/login';
const garageToggleUrl = 'http://localhost:5000/garageDoor/toggle';
const garageStatusUrl = 'http://localhost:5000/garageDoor/status';
const garageStateUrl = 'http://localhost:5000/garageDoor/state';

export const getBearerToken = async (username, password) => {
    //make it a cached response where this is the only entry to the bearer token
    const options = { method: 'GET', headers: { 'Authorization': `Basic ${base64.encode(username + ":" + password)}` } };

    const response = await fetch(loginUrl, options);
    if (response.ok) {
        const jsonResponse = await response.json();
        const bearerToken = jsonResponse.bearerToken;
        const dataStore = getStore();
        dataStore.setBearerToken(bearerToken);
        dataStore.setUserId(jwt_decode(bearerToken).user_id);
    }
    return response.ok;
}

export const getGarageStatus = async () => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const response = await fetch(garageStatusUrl, options);
    return await response.json();
}

export const updateGarageState = async (shouldOpen) => {
    const request = { 'garageDoorOpen': shouldOpen };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    const response = await fetch(garageStateUrl, options);
    return await response.json();
}

export const toggleGarageDoor = async () => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } }
    return await fetch(garageToggleUrl, options);
}

export const getSumpLevels = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const sumpUrl = `http://localhost:5000/sumpPump/user/${userId}/depth`
    const response = await fetch(sumpUrl, options);
    return await response.json();
}

export const getCurrentTemperature = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const tempUrl = `http://localhost:5000/thermostat/temperature/${userId}`;
    const response = await fetch(tempUrl, options);
    return await response.json();
}

export const getUserPreferences = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const tempUrl = `http://localhost:5000/userId/${userId}/preferences`;
    const response = await fetch(tempUrl, options);
    return await response.json();
}

export const updateUserPreferences = async (userId, isFahrenheit, city) => {
    const request = { 'isFahrenheit': isFahrenheit, 'city': city }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    }

    const tempUrl = `http://localhost:5000/userId/${userId}/preferences/update`
    return await fetch(tempUrl, options);
}
