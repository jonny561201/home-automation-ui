import base64 from 'base-64';

export default class ApiRequests {

    bearerToken;
    loginUrl = 'http://localhost:5000/login';
    garageStatusUrl = 'http://localhost:5000/garageDoor/status';
    garageStateUrl = 'http://localhost:5000/garageDoor/state';

    getBearerToken = async (username, password) => {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Basic ${base64.encode(username + ":" + password)}` }
        };

        const response = await fetch(this.loginUrl, options);
        const jsonResponse = await response.json();
        this.bearerToken = jsonResponse.bearerToken;
        return jsonResponse;
    }

    getGarageStatus = async () => {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.bearerToken}` }
        };

        const response = await fetch(this.garageStatusUrl, options);
        return await response.json();
    }

    updateGarageState = async (shouldOpen) => {
        const request = { 'garageDoorOpen': shouldOpen };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${this.bearerToken}` },
            body: JSON.stringify(request)
        };

        const response = await fetch(this.garageStateUrl, options);
        return await response.json();
    }

    getSumpLevels = async (userID) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.bearerToken}`
            }
        }

        const sumpUrl = `http://localhost:5000/sumpPump/user/${userID}/depth`
        const response = await fetch(sumpUrl, options);
        return await response.json();
    }

    getCurrentTemperature = async (userId) => {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.bearerToken}` }
        }

        const tempUrl = `http://localhost:5000/thermostat/temperature/${userId}`;
        const response = await fetch(tempUrl, options);
        return await response.json();
    }
}
