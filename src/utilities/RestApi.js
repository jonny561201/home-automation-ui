import base64 from 'base-64';
import jwt_decode from 'jwt-decode';
import { getStore } from '../state/GlobalState';


const baseUrl = 'http://localhost:5000';
const accountBaseUrl = `${baseUrl}/account`;
const deviceBaseUrl = `${baseUrl}/devices`;
const garageBaseUrl = `${baseUrl}/garageDoor`;
const lightBaseUrl = `${baseUrl}/lights`;
const sumpBaseUrl = `${baseUrl}/sumpPump`;
const thermostatBaseUrl = `${baseUrl}/thermostat`;

export const getBearerToken = async (username, password) => {
    const options = { method: 'GET', headers: { 'Authorization': `Basic ${base64.encode(username + ":" + password)}` } };

    const response = await fetch(`${baseUrl}/login`, options);
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
        return jsonResponse;
    }
    return null;
}

export const getGarageStatus = async (userId, garageId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    const garageStatusUrl = `${garageBaseUrl}/${garageId}/user/${userId}/status`;

    const response = await fetch(garageStatusUrl, options);
    return await response.json();
}

export const updateGarageState = async (shouldOpen, userId, garageId) => {
    const request = { 'garageDoorOpen': shouldOpen };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    const garageStateUrl = `${garageBaseUrl}/${garageId}/user/${userId}/state`;
    const response = await fetch(garageStateUrl, options);
    return await response.json();
}

export const toggleGarageDoor = async (userId, garageId) => {
    const garageToggleUrl = `${garageBaseUrl}/${garageId}/user/${userId}/toggle`;
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } }
    return await fetch(garageToggleUrl, options);
}

export const getSumpLevels = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const sumpUrl = `${sumpBaseUrl}/user/${userId}/depth`
    const response = await fetch(sumpUrl, options);
    return await response.json();
}

export const getCurrentTemperature = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const tempUrl = `${thermostatBaseUrl}/temperature/${userId}`;
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

    const tempUrl = `${thermostatBaseUrl}/temperature/${userId}`;
    return await fetch(tempUrl, options);
}

export const getUserPreferences = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const tempUrl = `${baseUrl}/userId/${userId}/preferences`;
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

    const tempUrl = `${baseUrl}/userId/${userId}/preferences/update`
    return await fetch(tempUrl, options);
}

export const getLightGroups = async () => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const response = await fetch(`${lightBaseUrl}/groups`, options);
    return response.json();
}

export const setLightGroupState = async (groupId, state, brightness) => {
    const request = { 'groupId': groupId, 'on': state };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    return await fetch(`${lightBaseUrl}/group/state`, options);
}

export const setLightState = async (lightId, state, brightness) => {
    const request = { 'lightId': lightId, 'on': state, 'brightness': brightness };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    return await fetch(`${lightBaseUrl}/group/light`, options);
}

export const updateUserAccount = async (userId, oldPass, newPass) => {
    const request = { 'oldPassword': oldPass, 'newPassword': newPass };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    const url = `${accountBaseUrl}/userId/${userId}/updateAccount`;
    return await fetch(url, options);
}

export const addUserDevice = async (userId, roleName, ipAddress) => {
    const request = { 'roleName': roleName, 'ipAddress': ipAddress }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    const url = `${deviceBaseUrl}/userId/${userId}/devices`;
    return await fetch(url, options);
}

export const addUserDeviceNode = async (userId, deviceId, nodeName) => {
    const request = { 'nodeName': nodeName };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    const url = `${deviceBaseUrl}/userId/${userId}/devices/${deviceId}/node`;
    return await fetch(url, options);
}

export const getRolesByUserId = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };

    const url = `${accountBaseUrl}/userId/${userId}/roles`;
    const response = await fetch(url, options);
    return response.json();
}

export const addUserChildAccount = async (userId, email, roles) => {
    const request = { 'email': email, 'roles': roles };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    const url = `${accountBaseUrl}/userId/${userId}/createChildAccount`;

    return await fetch(url, options);;
}