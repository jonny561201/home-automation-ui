const baseUrl = import.meta.env.PROD ? 'https://soaringleafsolutions.com' : 'http://localhost:5000';
const accountBaseUrl = `${baseUrl}/account`;
const deviceBaseUrl = `${baseUrl}/devices`;
const garageBaseUrl = `${baseUrl}/garageDoor`;
const lightBaseUrl = `${baseUrl}/lights`;
const notificationsBaseUrl = `${baseUrl}/notifications`;
const sumpBaseUrl = `${baseUrl}/sumpPump`;
const sceneBaseUrl = `${baseUrl}/scenes`;
const thermostatBaseUrl = `${baseUrl}/thermostat`;

let auth = null;
export const initRestApi = (auth0) => { auth = auth0; };
const getToken = () => auth.getAccessTokenSilently();


export const changeUserPassword = async () => {
    try {
        const bearer = await getToken();
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

export const getVapidPublicKey = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${notificationsBaseUrl}/vapid-key`, options);
        if (!response.ok) return null;
        const data = await response.json();
        return data.publicKey || null;
    } catch {
        return null;
    }
}

export const subscribeToPushNotifications = async (subscription) => {
    try {
        const bearer = await getToken();
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify(subscription)
        };
        const response = await fetch(`${notificationsBaseUrl}/subscribe`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const unsubscribeFromPushNotifications = async (endpoint) => {
    try {
        const bearer = await getToken();
        const options = {
            method: 'DELETE',
            headers: { 'Authorization': `Bearer ${bearer}`, 'Content-Type': 'application/json' },
            body: JSON.stringify({ endpoint })
        };
        const response = await fetch(`${notificationsBaseUrl}/subscribe`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getAllGarageStatus = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${garageBaseUrl}/status`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const updateGarageState = async (shouldOpen, garageId) => {
    try {
        const bearer = await getToken();
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

export const toggleGarageDoor = async (garageId) => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } }
        const response = await fetch(`${garageBaseUrl}/${garageId}/toggle`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const scheduleGarageClose = async (garageId) => {
    try {
        const bearer = await getToken();
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

export const cancelGarageSchedule = async (garageId) => {
    try {
        const bearer = await getToken();
        const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${garageBaseUrl}/${garageId}/schedule`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getSumpLevels = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sumpBaseUrl}/depth`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getSumpDepthHistory = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sumpBaseUrl}/depth/history`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getSumpDailyHistory = async (days) => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sumpBaseUrl}/depth/daily?days=${days}`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getCurrentTemperature = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${thermostatBaseUrl}/temperature`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const setUserTemperature = async (desiredTemp, mode, isFahrenheit) => {
    try {
        const bearer = await getToken();
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

export const getUserForecast = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${thermostatBaseUrl}/forecast`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getExtendedForecast = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${thermostatBaseUrl}/forecast/extended`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const getUserPreferences = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${baseUrl}/preferences`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const reverseGeocode = async (latitude, longitude) => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${baseUrl}/geocode/reverse?latitude=${latitude}&longitude=${longitude}`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const updateUserPreferences = async (request) => {
    try {
        const bearer = await getToken();
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

export const getLightGroups = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${lightBaseUrl}/groups`, options);
        if (!response.ok) return {};
        return response.json();
    } catch {
        return {};
    }
}

export const setLightGroupState = async (groupId, state, brightness = null) => {
    try {
        const bearer = await getToken();
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

export const setLightState = async (lightId, state, brightness) => {
    try {
        const bearer = await getToken();
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

export const getScenes = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sceneBaseUrl}/list`, options);
        if (!response.ok) return {};
        return await response.json();
    } catch {
        return {};
    }
}

export const createScene = async (request) => {
    try {
        const bearer = await getToken();
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

export const deleteScene = async (sceneId) => {
    try {
        const bearer = await getToken();
        const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${sceneBaseUrl}/${sceneId}`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getDevices = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${deviceBaseUrl}/devices`, options);
        if (!response.ok) return {};
        return response.json();
    } catch {
        return {};
    }
}

export const addUserDeviceNode = async (deviceId, nodes) => {
    try {
        const bearer = await getToken();
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

export const addUserChildAccount = async (email, roles) => {
    try {
        const bearer = await getToken();
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

export const getUserChildAccounts = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${accountBaseUrl}/childAccounts`, options);
        if (!response.ok) return {};
        return response.json();
    } catch {
        return {};
    }
}

export const deleteUserChildAccount = async (childAccountId) => {
    try {
        const bearer = await getToken();
        const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${accountBaseUrl}/childUserId/${childAccountId}`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const deleteScheduledTask = async (taskId) => {
    try {
        const bearer = await getToken();
        const options = { method: 'DELETE', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${baseUrl}/tasks/${taskId}`, options);
        return { ok: response.ok };
    } catch {
        return { ok: false };
    }
}

export const getScheduledTasks = async () => {
    try {
        const bearer = await getToken();
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${bearer}` } };
        const response = await fetch(`${baseUrl}/tasks`, options);
        if (!response.ok) return {};
        return response.json()
    } catch {
        return {};
    }
}

export const insertLightTask = async (enabled, taskType, alarmLightGroup, alarmGroupName, alarmDays, alarmTime) => {
    try {
        const bearer = await getToken();
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

export const insertHvacTask = async (enabled, taskType, hvacMode, hvacStart, hvacStop, hvacStartTemp, hvacStopTemp, alarmDays) => {
    try {
        const bearer = await getToken();
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

export const updateScheduledTasks = async (request) => {
    try {
        const bearer = await getToken();
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
