const baseUrl = import.meta.env.PROD ? 'https://soaringleafsolutions.com' : 'http://localhost:5000';
const accountBaseUrl = `${baseUrl}/account`;
const deviceBaseUrl = `${baseUrl}/devices`;
const garageBaseUrl = `${baseUrl}/garageDoor`;
const lightBaseUrl = `${baseUrl}/lights`;
const sumpBaseUrl = `${baseUrl}/sumpPump`;
const sceneBaseUrl = `${baseUrl}/scenes`;
const thermostatBaseUrl = `${baseUrl}/thermostat`;


export const changeUserPassword = async (bearer) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' }
        };
        const response = await fetch(`${baseUrl}/resetPassword`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getAllGarageStatus = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${garageBaseUrl}/status`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const updateGarageState = async (bearer, shouldOpen, garageId) => {
    try {
        const request = { 'garageDoorOpen': shouldOpen };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(`${garageBaseUrl}/${garageId}/state`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const toggleGarageDoor = async (bearer, garageId) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } }
        const response = await fetch(`${garageBaseUrl}/${garageId}/toggle`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const scheduleGarageClose = async (bearer, garageId) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' }
        };
        const response = await fetch(`${garageBaseUrl}/${garageId}/schedule`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const cancelGarageSchedule = async (bearer, garageId) => {
    try {
        const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${garageBaseUrl}/${garageId}/schedule`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getSumpLevels = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sumpBaseUrl}/depth`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getSumpDepthHistory = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sumpBaseUrl}/depth/history`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getSumpDailyHistory = async (bearer, days) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sumpBaseUrl}/depth/daily?days=${days}`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getCurrentTemperature = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${thermostatBaseUrl}/temperature`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const setUserTemperature = async (bearer, desiredTemp, mode, isFahrenheit) => {
    try {
        const request = { 'desiredTemp': desiredTemp, 'mode': mode, 'isFahrenheit': isFahrenheit }
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(`${thermostatBaseUrl}/temperature/desired`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getUserForecast = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${thermostatBaseUrl}/forecast`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getExtendedForecast = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${thermostatBaseUrl}/forecast/extended`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getUserPreferences = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${baseUrl}/preferences`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const reverseGeocode = async (bearer, latitude, longitude) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${baseUrl}/geocode/reverse?latitude=${latitude}&longitude=${longitude}`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const updateUserPreferences = async (bearer, request) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }
        const response = await fetch(`${baseUrl}/preferences/update`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getLightGroups = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${lightBaseUrl}/groups`, options);
        if (!response.ok) return {};
        return response.json();
    } catch {
        return {};
    }
}

export const setLightGroupState = async (bearer, groupId, state, brightness = null) => {
    try {
        const request = { 'groupId': groupId, 'on': state, ...(brightness !== null && { 'brightness': brightness }) };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(`${lightBaseUrl}/group/state`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const setLightState = async (bearer, lightId, state, brightness) => {
    try {
        const request = { 'lightId': lightId, 'on': state, 'brightness': brightness };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(`${lightBaseUrl}/group/light`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getScenes = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sceneBaseUrl}/list`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const createScene = async (bearer, request) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(sceneBaseUrl, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const deleteScene = async (bearer, sceneId) => {
    try {
        const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sceneBaseUrl}/${sceneId}`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getDevices = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${deviceBaseUrl}/devices`, options);
        if (!response.ok) return {};
        return response.json();
    } catch {
        return {};
    }
}

export const addUserDeviceNode = async (bearer, deviceId, nodes) => {
    try {
        const request = { 'nodes': nodes };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(`${deviceBaseUrl}/${deviceId}/node`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const addUserChildAccount = async (bearer, email, roles) => {
    try {
        const request = { 'email': email, 'roles': roles };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(`${accountBaseUrl}/createChildAccount`, options);
        if (!response.ok) return {};
        return response.json();
    } catch {
        return {};
    }
}

export const getUserChildAccounts = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${accountBaseUrl}/childAccounts`, options);
        if (!response.ok) return {};
        return response.json();
    } catch {
        return {};
    }
}

export const deleteUserChildAccount = async (bearer, childAccountId) => {
    try {
        const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${accountBaseUrl}/childUserId/${childAccountId}`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const deleteScheduledTask = async (bearer, taskId) => {
    try {
        const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${baseUrl}/tasks/${taskId}`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getScheduledTasks = async (bearer) => {
    try {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${baseUrl}/tasks`, options);
        if (!response.ok) return {};
        return response.json()
    } catch {
        return {};
    }
}

export const insertLightTask = async (bearer, enabled, taskType, alarmLightGroup, alarmGroupName, alarmDays, alarmTime) => {
    try {
        const request = { 'alarmLightGroup': alarmLightGroup, 'alarmGroupName': alarmGroupName, 'alarmDays': alarmDays, 'alarmTime': alarmTime, 'enabled': enabled, 'taskType': taskType };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(`${baseUrl}/tasks`, options);
        if (!response.ok) return {};
        return response.json()
    } catch {
        return {};
    }
}

export const insertHvacTask = async (bearer, enabled, taskType, hvacMode, hvacStart, hvacStop, hvacStartTemp, hvacStopTemp, alarmDays) => {
    try {
        const request = { 'hvacMode': hvacMode, 'hvacStart': hvacStart, 'hvacStop': hvacStop, 'hvacStartTemp': hvacStartTemp, 'hvacStopTemp': hvacStopTemp, 'alarmDays': alarmDays, 'enabled': enabled, 'taskType': taskType };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        };
        const response = await fetch(`${baseUrl}/tasks`, options);
        if (!response.ok) return {};
        return response.json()
    } catch {
        return {};
    }
}

export const updateScheduledTasks = async (bearer, request) => {
    try {
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(request)
        }
        const response = await fetch(`${baseUrl}/tasks/update`, options);
        if (!response.ok) return {};
        return response.json();
    } catch {
        return {};
    }
}
