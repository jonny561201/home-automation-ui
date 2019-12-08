import base64 from 'base-64';
import jwt_decode from 'jwt-decode';
import {useState} from '../TestState';


export default class ApiRequests {

    loginUrl = 'http://localhost:5000/login';
    garageToggleUrl = 'http://localhost:5000/garageDoor/toggle';
    garageStatusUrl = 'http://localhost:5000/garageDoor/status';
    garageStateUrl = 'http://localhost:5000/garageDoor/state';

    getBearerToken = async (username, password) => {
        //make it a cached response where this is the only entry to the bearer token
        const options = { method: 'GET', headers: { 'Authorization': `Basic ${base64.encode(username + ":" + password)}` } };

        const response = await fetch(this.loginUrl, options);
        if (response.ok) {
            const jsonResponse = await response.json();
            const bearerToken = jsonResponse.bearerToken;
            useState().setBearerToken(bearerToken);
            useState().setUserId(jwt_decode(bearerToken).user_id);
        }
        return response.ok;
    }

    getGarageStatus = async () => {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${useState().getBearerToken()}` } };

        const response = await fetch(this.garageStatusUrl, options);
        return await response.json();
    }

    updateGarageState = async (shouldOpen) => {
        const request = { 'garageDoorOpen': shouldOpen };
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${useState().getBearerToken()}` },
            body: JSON.stringify(request)
        };

        const response = await fetch(this.garageStateUrl, options);
        return await response.json();
    }

    toggleGarageDoor = async () => {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${useState().getBearerToken()}` } }
        return await fetch(this.garageToggleUrl, options);
    }

    getSumpLevels = async (userId) => {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${useState().getBearerToken()}` } };

        const sumpUrl = `http://localhost:5000/sumpPump/user/${userId}/depth`
        const response = await fetch(sumpUrl, options);
        return await response.json();
    }

    getCurrentTemperature = async (userId) => {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${useState().getBearerToken()}` } };

        const tempUrl = `http://localhost:5000/thermostat/temperature/${userId}`;
        const response = await fetch(tempUrl, options);
        return await response.json();
    }

    getUserPreferences = async (userId) => {
        const options = { method: 'GET', headers: { 'Authorization': `Bearer ${useState().getBearerToken()}` } };

        const tempUrl = `http://localhost:5000/userId/${userId}/preferences`;
        const response = await fetch(tempUrl, options);
        return await response.json();
    }

    updateUserPreferences = async (userId, isFahrenheit, city) => {
        const request = { 'isFahrenheit': isFahrenheit, 'city': city }
        const options = {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${useState().getBearerToken()}` },
            body: JSON.stringify(request)
        }

        const tempUrl = `http://localhost:5000/userId/${userId}/preferences/update`
        return await fetch(tempUrl, options);
    }
}
