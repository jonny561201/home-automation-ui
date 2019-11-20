import base64 from 'base-64';
import jwt_decode from 'jwt-decode';

export default class ApiRequests {

    bearerToken = null;
    userId = null;
    loginUrl = 'http://localhost:5000/login';
    garageStatusUrl = 'http://localhost:5000/garageDoor/status';
    garageStateUrl = 'http://localhost:5000/garageDoor/state';

    getBearerToken = async (username, password) => {
        //make it a cached response where this is the only entry to the bearer token
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Basic ${base64.encode(username + ":" + password)}` }
        };

        const response = await fetch(this.loginUrl, options);
        const jsonResponse = await response.json();
        if (response.ok) {
            this.bearerToken = jsonResponse.bearerToken;
            this.userId = jwt_decode(this.bearerToken).user_id;
        }
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

    getSumpLevels = async (userId) => {
        const options = {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${this.bearerToken}`
            }
        }

        const sumpUrl = `http://localhost:5000/sumpPump/user/${userId}/depth`
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

    getUserPreferences = async (userId) => {
        const options = {
            method: 'GET',
            headers: { 'Authorization': `Bearer ${this.bearerToken}` }
        }

        const tempUrl = `http://localhost:5000/userId/${userId}/preferences`;
        const response = await fetch(tempUrl, options);
        return await response.json();
    }

    updateUserPreferences = async (userId, isFahrenheit, city) => {
        const request = { 'isFahrenheit': isFahrenheit, 'city': city }
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${this.bearerToken}` },
            body: JSON.stringify(request)
        }

        const tempUrl = `http://localhost:5000/userId/${userId}/preferences/update`
        const response = await fetch(tempUrl, options);
        return await response.json();
    }
}
