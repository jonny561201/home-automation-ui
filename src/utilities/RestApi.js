import base64 from 'base-64';

export async function getBearerToken(username, password) {
    const options = {  
        method: 'GET',
        headers: {'Authorization': 'Basic ' + base64.encode(username + ":" + password)}
    };

    const response = await fetch('http://localhost:5000/login', options);
    return await response.json();
}

export async function getGarageStatus() {
    const options = {
        method: 'GET',
        headers: {'Authorization': 'Bearer ' + 'fakeBearerToken'}
    };

    const response = await fetch('http://localhost:5000/garageDoor/status', options);
    return await response.json();
}

export async function updateGarageState(shouldOpen) {
    const request = {'garageDoorOpen': shouldOpen};
    const options = {
        method: 'POST',
        headers: {'Authorization': 'Bearer ' + 'fakeBearerToken'},
        body: JSON.stringify(request)
    };

    const response = await fetch('http://localhost:5000/garageDoor/state', options);
    return await response.json();
}