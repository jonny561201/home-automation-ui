import base64 from 'base-64';
import jwt_decode from 'jwt-decode';
import { getStore } from '../GlobalState';

const loginUrl = 'http://localhost:5000/login';
const lightGroupsUrl = 'http://localhost:5000/lights/groups';
const setLightGroupUrl = 'http://localhost:5000/lights/group/state';
const setLightUrl = 'http://localhost:5000/group/light';

export const getBearerToken = async (username, password) => {
    const options = { method: 'GET', headers: { 'Authorization': `Basic ${base64.encode(username + ":" + password)}` } };

    const response = await fetch(loginUrl, options);
    if (response.ok) {
        const jsonResponse = await response.json();
        const bearerToken = jsonResponse.bearerToken;
        const dataStore = getStore();
        dataStore.setBearerToken(bearerToken);
        const decodedToken = jwt_decode(bearerToken);
        dataStore.setUserId(decodedToken.user.user_id);
        dataStore.setUserRoles(decodedToken.user.roles);
        dataStore.setFirstName(decodedToken.user.first_name)
        dataStore.setLastName(decodedToken.user.last_name)
    }
    return response.ok;
}

export const getGarageStatus = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    const garageStatusUrl = `http://localhost:5000/garageDoor/user/${userId}/status`;

    const response = await fetch(garageStatusUrl, options);
    return await response.json();
}

export const updateGarageState = async (shouldOpen, userId) => {
    const request = { 'garageDoorOpen': shouldOpen };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    const garageStateUrl = `http://localhost:5000/garageDoor/user/${userId}/state`;
    const response = await fetch(garageStateUrl, options);
    return await response.json();
}

export const toggleGarageDoor = async (userId) => {
    const garageToggleUrl = `http://localhost:5000/garageDoor/user/${userId}/toggle`;
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

export const setUserTemperature = async (userId, desiredTemp, mode, isFahrenheit) => {
    const request = { 'desiredTemp': desiredTemp, 'mode': mode, 'isFahrenheit': isFahrenheit }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    const tempUrl = `http://localhost:5000/thermostat/temperature/${userId}`;

    return await fetch(tempUrl, options);
}

export const getUserPreferences = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const tempUrl = `http://localhost:5000/userId/${userId}/preferences`;
    const response = await fetch(tempUrl, options);
    return await response.json();
}

export const updateUserPreferences = async (userId, isFahrenheit, isImperial, city) => {
    const request = { 'isFahrenheit': isFahrenheit, 'city': city, 'isImperial': isImperial }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    }

    const tempUrl = `http://localhost:5000/userId/${userId}/preferences/update`
    return await fetch(tempUrl, options);
}

export const getLightGroups = async () => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const response = await fetch(lightGroupsUrl, options);
    return response.json();
}

export const setLightGroupState = async (groupId, state, brightness) => {
    const request = { 'groupId': groupId, 'on': state };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    return await fetch(setLightGroupUrl, options);
}

export const setLightState = async (lightId, state, brightness) => {
    const request = { 'lightId': lightId, 'on': state, 'brightness': brightness };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    return await fetch(setLightUrl, options);
}

export const updateUserAccount = async (userId, oldPass, newPass) => {
    const request = {'oldPassword': oldPass, 'newPassword': newPass};
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    const url = `http://localhost:5000/userId/${userId}/updateAccount`;
    return await fetch(url, options);
}

export const addUserDevice = async (userId, roleName, ipAddress) => {
    const request = {'roleName': roleName, 'ipAddress': ipAddress}
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}`},
        body: JSON.stringify(request)
    };
    const url = `http://localhost:5000/userId/${userId}/devices`;
    return await fetch(url, options);
}