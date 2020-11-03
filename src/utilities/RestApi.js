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
    const response = await fetch(`${garageBaseUrl}/${garageId}/user/${userId}/status`, options);
    return await response.json();
}

export const updateGarageState = async (shouldOpen, userId, garageId) => {
    const request = { 'garageDoorOpen': shouldOpen };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${garageBaseUrl}/${garageId}/user/${userId}/state`, options);
    return await response.json();
}

export const toggleGarageDoor = async (userId, garageId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } }
    return await fetch(`${garageBaseUrl}/${garageId}/user/${userId}/toggle`, options);
}

export const getSumpLevels = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    const response = await fetch(`${sumpBaseUrl}/user/${userId}/depth`, options);
    return await response.json();
}

export const getCurrentTemperature = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    const response = await fetch(`${thermostatBaseUrl}/temperature/${userId}`, options);
    return await response.json();
}

export const setUserTemperature = async (userId, desiredTemp, mode, isFahrenheit) => {
    const request = { 'desiredTemp': desiredTemp, 'mode': mode, 'isFahrenheit': isFahrenheit }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };

    return await fetch(`${thermostatBaseUrl}/temperature/${userId}`, options);
}

export const getUserPreferences = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    const response = await fetch(`${baseUrl}/userId/${userId}/preferences`, options);
    return await response.json();
}

export const updateUserPreferences = async (userId, isFahrenheit, isImperial, city, alarmTime, alarmDays, lightGroup, groupName) => {
    const lightAlarm = {'alarmTime': alarmTime, 'alarmDays': alarmDays, 'alarmLightGroup': lightGroup, 'alarmGroupName': groupName }
    const request = { 'isFahrenheit': isFahrenheit, 'city': city, 'isImperial': isImperial, 'lightAlarm': lightAlarm}
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    }

    return await fetch(`${baseUrl}/userId/${userId}/preferences/update`, options);
}

export const getLightGroups = async () => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    const response = await fetch(`${lightBaseUrl}/groups`, options);
    return response.json();
}

export const setLightGroupState = async (groupId, state, brightness) => {
    const request = { 'groupId': groupId, 'on': state, 'brightness': brightness };
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

    return await fetch(`${accountBaseUrl}/userId/${userId}/updateAccount`, options);
}

export const addUserDevice = async (userId, roleName, ipAddress) => {
    const request = { 'roleName': roleName, 'ipAddress': ipAddress }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    return await fetch(`${deviceBaseUrl}/userId/${userId}/devices`, options);
}

export const addUserDeviceNode = async (userId, deviceId, nodeName) => {
    const request = { 'nodeName': nodeName };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    return await fetch(`${deviceBaseUrl}/userId/${userId}/devices/${deviceId}/node`, options);
}

export const getRolesByUserId = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    const response = await fetch(`${accountBaseUrl}/userId/${userId}/roles`, options);
    return response.json();
}

export const addUserChildAccount = async (userId, email, roles) => {
    const request = { 'email': email, 'roles': roles };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${accountBaseUrl}/userId/${userId}/createChildAccount`, options);
    return response.json();
}

export const getUserChildAccounts = async (userId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    const response = await fetch(`${accountBaseUrl}/userId/${userId}/childAccounts`, options);
    return response.json();
}

export const deleteUserChildAccount = async (userId, childAccountId) => {
    const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${getStore().getBearerToken()}` } };
    return await fetch(`${accountBaseUrl}/userId/${userId}/childUserId/${childAccountId}`, options);
}