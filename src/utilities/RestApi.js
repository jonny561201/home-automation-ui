import base64 from 'base-64';

export default class ApiRequests {

    getBearerToken = async (username, password) => {
        const options = {  
            method: 'GET',
            headers: {'Authorization': 'Basic ' + base64.encode(username + ":" + password)}
        };
    
        const loginUrl = 'http://localhost:5000/login';
        const response = await fetch(loginUrl, options);
        return await response.json();
    }
    
    getGarageStatus = async () => {
        const options = {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + 'fakeBearerToken'}
        };
    
        const garageStatusUrl = 'http://localhost:5000/garageDoor/status';
        const response = await fetch(garageStatusUrl, options);
        return await response.json();
    }
    
    updateGarageState = async (shouldOpen) => {
        const request = {'garageDoorOpen': shouldOpen};
        const options = {
            method: 'POST',
            headers: {'Authorization': 'Bearer ' + 'fakeBearerToken'},
            body: JSON.stringify(request)
        };
    
        const garageStateUrl = 'http://localhost:5000/garageDoor/state';
        const response = await fetch(garageStateUrl, options);
        return await response.json();
    }
    
    getSumpLevels = async (userID) => {
        const options = {
            method: 'GET',
            headers: {'Authorization': 'Bearer ' + 'fakeBearerToken'}
        }
    
        const sumpUrl = `http://localhost:5000/sumpPump/user/${userID}/depth`
        const response = await fetch(sumpUrl, options);
        return await response.json();
    }
    
    getCurrentTemperature = async (userId) => {
        const options = {
            method: 'GET',
            headers: {'Authorization': `Bearer fakeBearerToken`}
        }
    
        const tempUrl = `http://localhost:5000/thermostat/temperature/${userId}`;
        const response = await fetch(tempUrl, options);
        return await response.json();
    }
}
