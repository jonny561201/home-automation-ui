import jwt_decode from 'jwt-decode';
import { getStore } from '../state/GlobalState';


// const baseUrl = 'http://localhost:5000';
const baseUrl = 'https://www.soaringleafsolutions.com';
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
        dataStore.setUserRoles(decodedToken.user.roles);
        return jsonResponse;
    }
    return null;
}

export const getRefreshedBearerToken = async (refreshToken) => {
    const request = { 'grant_type': 'refresh_token', 'refresh_token': refreshToken };
    const options = { method: 'POST', body: JSON.stringify(request) };

    return await fetch(`${baseUrl}/token`, options);
}

export const getGarageStatus = async (userId, bearer, garageId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${garageBaseUrl}/${garageId}/user/${userId}/status`, options);
    return await response.json();
}

export const updateGarageState = async (userId, bearer, shouldOpen, garageId) => {
    const request = { 'garageDoorOpen': shouldOpen };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${garageBaseUrl}/${garageId}/user/${userId}/state`, options);
    return await response.json();
}

export const toggleGarageDoor = async (userId, bearer, garageId) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } }
    return await fetch(`${garageBaseUrl}/${garageId}/user/${userId}/toggle`, options);
}

export const getSumpLevels = async (userId, bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${sumpBaseUrl}/user/${userId}/depth`, options);
    return await response.json();
}

export const getCurrentTemperature = async (userId, bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${thermostatBaseUrl}/temperature/${userId}`, options);
    return await response.json();
}

export const setUserTemperature = async (userId, bearer, desiredTemp, mode, isFahrenheit) => {
    const request = { 'desiredTemp': desiredTemp, 'mode': mode, 'isFahrenheit': isFahrenheit }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };

    return await fetch(`${thermostatBaseUrl}/temperature/${userId}`, options);
}

export const getUserForecast = async (userId, bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${thermostatBaseUrl}/forecast/${userId}`, options);
    return await response.json();
}

export const getUserPreferences = async (userId, bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${baseUrl}/userId/${userId}/preferences`, options);
    return await response.json();
}

export const updateUserPreferences = async (userId, bearer, request) => {
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    }

    return await fetch(`${baseUrl}/userId/${userId}/preferences/update`, options);
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
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };

    return await fetch(`${lightBaseUrl}/group/state`, options);
}

export const setLightState = async (bearer, lightId, state, brightness) => {
    const request = { 'lightId': lightId, 'on': state, 'brightness': brightness };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };

    return await fetch(`${lightBaseUrl}/group/light`, options);
}

export const updateUserAccount = async (userId, bearer, oldPass, newPass) => {
    const request = { 'oldPassword': oldPass, 'newPassword': newPass };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };

    return await fetch(`${accountBaseUrl}/userId/${userId}/updateAccount`, options);
}

export const addUserDevice = async (userId, bearer, roleName, ipAddress) => {
    const request = { 'roleName': roleName, 'ipAddress': ipAddress }
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };
    return await fetch(`${deviceBaseUrl}/userId/${userId}/devices`, options);
}

export const addUserDeviceNode = async (userId, bearer, deviceId, nodeName, preferred) => {
    const request = { 'nodeName': nodeName, 'preferred': preferred };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };
    return await fetch(`${deviceBaseUrl}/userId/${userId}/devices/${deviceId}/node`, options);
}

export const getRolesByUserId = async (userId, bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${accountBaseUrl}/userId/${userId}/roles`, options);
    return response.json();
}

export const addUserChildAccount = async (userId, bearer, email, roles) => {
    const request = { 'email': email, 'roles': roles };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${accountBaseUrl}/userId/${userId}/createChildAccount`, options);
    return response.json();
}

export const getUserChildAccounts = async (userId, bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${accountBaseUrl}/userId/${userId}/childAccounts`, options);
    return response.json();
}

export const deleteUserChildAccount = async (userId, bearer, childAccountId) => {
    const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
    return await fetch(`${accountBaseUrl}/userId/${userId}/childUserId/${childAccountId}`, options);
}

export const deleteScheduledTask = async (userId, bearer, taskId) => {
    const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
    return await fetch(`${baseUrl}/userId/${userId}/tasks/${taskId}`, options);
}

export const getScheduledTasks = async (userId, bearer) => {
    const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
    const response = await fetch(`${baseUrl}/userId/${userId}/tasks`, options);
    return response.json()
}

export const insertLightTask = async (userId, bearer, enabled, taskType, alarmLightGroup, alarmGroupName, alarmDays, alarmTime) => {
    const request = { 'alarmLightGroup': alarmLightGroup, 'alarmGroupName': alarmGroupName, 'alarmDays': alarmDays, 'alarmTime': alarmTime, 'enabled': enabled, 'taskType': taskType };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${baseUrl}/userId/${userId}/tasks`, options);
    return response.json()
}

export const insertHvacTask = async (userId, bearer, enabled, taskType, hvacMode, hvacStart, hvacStop, hvacStartTemp, hvacStopTemp, alarmDays) => {
    const request = { 'hvacMode': hvacMode, 'hvacStart': hvacStart, 'hvacStop': hvacStop, 'hvacStartTemp': hvacStartTemp, 'hvacStopTemp': hvacStopTemp, 'alarmDays': alarmDays, 'enabled': enabled, 'taskType': taskType };
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    };
    const response = await fetch(`${baseUrl}/userId/${userId}/tasks`, options);
    return response.json()
}

export const updateScheduledTasks = async (userId, bearer, request) => {
    const options = {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${bearer}` },
        body: JSON.stringify(request)
    }
    const response = await fetch(`${baseUrl}/userId/${userId}/tasks/update`, options);
    return response.json();
}