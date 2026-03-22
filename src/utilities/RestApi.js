import jwt_decode from 'jwt-decode';
import { getStore } from '../state/GlobalState';


// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://home.soaringleafsolutions.com';
const accountBaseUrl = `${baseUrl}/account`;
const deviceBaseUrl = `${baseUrl}/devices`;
const garageBaseUrl = `${baseUrl}/garageDoor`;
const lightBaseUrl = `${baseUrl}/lights`;
const sumpBaseUrl = `${baseUrl}/sumpPump`;
const thermostatBaseUrl = `${baseUrl}/thermostat`;

export const getBearerToken = async (username, password) => {
    const request = { 'grant_type': 'client_credentials', 'client_id': username, 'client_secret': password }
    const options = {
        method: 'POST',
        body: JSON.stringify(request)
    };

    const response = await fetch(`${baseUrl}/token`, options);
    if (response.ok) {
        const jsonResponse = await response.json();
        const bearerToken = jsonResponse.bearerToken;
        const dataStore = getStore();
        const decodedToken = jwt_decode(bearerToken);
        dataStore.setUserRoles(decodedToken.roles);
        return jsonResponse;
    }
    return null;
}

export const getRefreshedBearerToken = async (refreshToken) => {
    const request = { 'grant_type': 'refresh_token', 'refresh_token': refreshToken };
    const options = { method: 'POST', body: JSON.stringify(request) };

    return await fetch(`${baseUrl}/token`, options);
}

export const getGarageStatus = async (bearer, garageId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${garageBaseUrl}/${garageId}/status`, options);
    return await response.json();
}

export const updateGarageState = async (bearer, shouldOpen, garageId) => {
    const request = { 'garageDoorOpen': shouldOpen };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${garageBaseUrl}/${garageId}/state`, options);
    return await response.json();
}

export const toggleGarageDoor = async (bearer, garageId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } }
    return await fetch(`${garageBaseUrl}/${garageId}/toggle`, options);
}

export const getSumpLevels = async (bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${sumpBaseUrl}/depth`, options);
    return await response.json();
}

export const getCurrentTemperature = async (bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${thermostatBaseUrl}/temperature`, options);
    return await response.json();
}

export const setUserTemperature = async (userId, bearer, desiredTemp, mode, isFahrenheit) => {
    const request = { 'desiredTemp': desiredTemp, 'mode': mode, 'isFahrenheit': isFahrenheit }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };

    return await fetch(`${thermostatBaseUrl}/temperature/${userId}`, options);
}

export const getUserForecast = async (bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${thermostatBaseUrl}/forecast`, options);
    return await response.json();
}

export const getUserPreferences = async (bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${baseUrl}/preferences`, options);
    return await response.json();
}

export const updateUserPreferences = async (bearer, request) => {
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    }

    return await fetch(`${baseUrl}/preferences/update`, options);
}

export const getLightGroups = async (bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${lightBaseUrl}/groups`, options);
    return response.json();
}

export const setLightGroupState = async (bearer, groupId, state, brightness = null) => {
    const request = { 'groupId': groupId, 'on': state, ...(brightness !== null && { 'brightness': brightness }) };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };

    return await fetch(`${lightBaseUrl}/group/state`, options);
}

export const setLightState = async (bearer, lightId, state, brightness) => {
    const request = { 'lightId': lightId, 'on': state, 'brightness': brightness };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };

    return await fetch(`${lightBaseUrl}/group/light`, options);
}

export const updateUserAccount = async (bearer, oldPass, newPass) => {
    const request = { 'oldPassword': oldPass, 'newPassword': newPass };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };

    return await fetch(`${accountBaseUrl}/updateAccount`, options);
}

export const addUserDevice = async (bearer, roleName, ipAddress) => {
    const request = { 'roleName': roleName, 'ipAddress': ipAddress }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    return await fetch(`${deviceBaseUrl}/register`, options);
}

export const addUserDeviceNode = async (bearer, deviceId, nodeName, preferred) => {
    const request = { 'nodeName': nodeName, 'preferred': preferred };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    return await fetch(`${deviceBaseUrl}/${deviceId}/node`, options);
}

export const getRolesByUserId = async (bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${accountBaseUrl}/roles`, options);
    return response.json();
}

export const addUserChildAccount = async (bearer, email, roles) => {
    const request = { 'email': email, 'roles': roles };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${accountBaseUrl}/createChildAccount`, options);
    return response.json();
}

export const getUserChildAccounts = async (bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${accountBaseUrl}/childAccounts`, options);
    return response.json();
}

export const deleteUserChildAccount = async (bearer, childAccountId) => {
    const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
    return await fetch(`${accountBaseUrl}/childUserId/${childAccountId}`, options);
}

export const deleteScheduledTask = async (bearer, taskId) => {
    const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
    return await fetch(`${baseUrl}/tasks/${taskId}`, options);
}

export const getScheduledTasks = async (bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${baseUrl}/tasks`, options);
    return response.json()
}

export const insertLightTask = async (bearer, enabled, taskType, alarmLightGroup, alarmGroupName, alarmDays, alarmTime) => {
    const request = { 'alarmLightGroup': alarmLightGroup, 'alarmGroupName': alarmGroupName, 'alarmDays': alarmDays, 'alarmTime': alarmTime, 'enabled': enabled, 'taskType': taskType };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${baseUrl}/tasks`, options);
    return response.json()
}

export const insertHvacTask = async (bearer, enabled, taskType, hvacMode, hvacStart, hvacStop, hvacStartTemp, hvacStopTemp, alarmDays) => {
    const request = { 'hvacMode': hvacMode, 'hvacStart': hvacStart, 'hvacStop': hvacStop, 'hvacStartTemp': hvacStartTemp, 'hvacStopTemp': hvacStopTemp, 'alarmDays': alarmDays, 'enabled': enabled, 'taskType': taskType };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${baseUrl}/tasks`, options);
    return response.json()
}

export const updateScheduledTasks = async (bearer, request) => {
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
        body: JSON.stringify(request)
    }
    const response = await fetch(`${baseUrl}/tasks/update`, options);
    return response.json();
}