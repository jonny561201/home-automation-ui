import base64 from 'base-64';
import fetchMock from 'fetch-mock';
import {
    getBearerToken, getGarageStatus, updateGarageState, addUserDevice,
    toggleGarageDoor, getSumpLevels, getCurrentTemperature, addUserDeviceNode,
    getUserPreferences, updateUserPreferences, setUserTemperature, addUserChildAccount,
    getLightGroups, setLightGroupState, setLightState, updateUserAccount, getRolesByUserId
} from '../../utilities/RestApi';
import { getStore } from '../../state/GlobalState';


describe('RestApi', () => {
    const username = 'fakeUser';
    const password = 'fakepass';
    const userId = "e97febc0-fd10-11e9-8f0b-362b9e155667";
    const fakeBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiJlOTdmZWJjMC1mZDEwLTExZTktOGYwYi0zNjJiOWUxNTU2NjciLCJyb2xlcyI6WyJnYXJhZ2VfZG9vciIsInNlY3VyaXR5IiwidGhlcm1vc3RhdCIsImxpZ2h0aW5nIiwic3VtcF9wdW1wIl0sImZpcnN0X25hbWUiOiJKb24iLCJsYXN0X25hbWUiOiJUZXN0ZXIifSwiZXhwIjoxNTg1OTY3MDIwfQ.AfGoDyYuMhdQh4UYsMUEFenTDxnQnKg3iMhX3RxXac4";
    const credentials = username + ":" + password;

    it('should make rest call to login api using auth header', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { "method": "GET", "headers": { 'Authorization': `Basic ${base64.encode(credentials)}` } };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return {
                status: 400,
                body: { details: 'Bad Request' }
            };
        });

        const actual = await getBearerToken(username, password);
        expect(actual).toBeTruthy();
    });

    it('should store bearer token after successful login', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { 'method': 'GET', 'headers': { 'Authorization': `Basic ${base64.encode(credentials)}` }, overwriteRoutes: false };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return { status: 400 };
        });

        await getBearerToken(username, password);
        expect(getStore().getBearerToken()).toEqual(fakeBearerToken);
    });

    it('should store user id after successful login', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { 'method': 'GET', 'headers': { 'Authorization': `Basic ${base64.encode(credentials)}` }, overwriteRoutes: false };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return { status: 400 };
        });

        await getBearerToken(username, password);
        expect(getStore().getUserId()).toEqual(userId);
    });

    it('should store roles after successful login', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { 'method': 'GET', 'headers': { 'Authorization': `Basic ${base64.encode(credentials)}` }, overwriteRoutes: false };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return { status: 400 };
        });

        await getBearerToken(username, password);
        expect(getStore().getUserRoles()).toEqual(["garage_door","security","thermostat","lighting","sump_pump"]);
    });

    it('should store user first name after successful login', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { 'method': 'GET', 'headers': { 'Authorization': `Basic ${base64.encode(credentials)}` }, overwriteRoutes: false };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return { status: 400 };
        });

        await getBearerToken(username, password);
        expect(getStore().getFirstName()).toEqual("Jon");
    });

    it('should store user last name after successful login', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { 'method': 'GET', 'headers': { 'Authorization': `Basic ${base64.encode(credentials)}` }, overwriteRoutes: false };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return { status: 400 };
        });

        await getBearerToken(username, password);
        expect(getStore().getLastName()).toEqual("Tester");
    });

    describe('after successful login', () => {
        let state;
        const garageId = 1;
        const bearerToken2 = 'abc123';

        beforeEach(() => {
            state = getStore();
            state.state.bearerToken = bearerToken2;
        });

        it('should make rest call to get garage door state', async () => {
            const response = { 'isGarageOpen': true };
            const options = { "method": "GET", "headers": { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`http://localhost:5000/garageDoor/${garageId}/user/${userId}/status`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getGarageStatus(userId, garageId);
            expect(actual.isGarageOpen).toEqual(true);
        });

        it('should make rest call to post garage door status', async () => {
            const response = { 'garageDoorOpen': false };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': { "garageDoorOpen": false } };

            fetchMock.mock(`http://localhost:5000/garageDoor/${garageId}/user/${userId}/state`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await updateGarageState(false, userId, garageId);
            expect(actual.garageDoorOpen).toEqual(false);
        });

        it('should make rest call to toggle garage door state', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } }

            fetchMock.mock(`http://localhost:5000/garageDoor/${garageId}/user/${userId}/toggle`, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await toggleGarageDoor(userId, garageId);
            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get current sump pump level', async () => {
            const userId = 'abc123';
            const expectedDepth = 33.3;
            const response = { 'currentDepth': expectedDepth, 'userId': userId, 'latestDate': '2019-11-12', 'averageDepth': 35.8 };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`http://localhost:5000/sumpPump/user/${userId}/depth`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getSumpLevels(userId);
            expect(actual.currentDepth).toEqual(expectedDepth);
        })

        it('should query the current thermostat temperature', async () => {
            const userId = 'abc123';
            const expectedTemp = 74.9;
            const response = { 'currentTemp': expectedTemp, 'isFahrenheit': true };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`http://localhost:5000/thermostat/temperature/${userId}`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getCurrentTemperature(userId);
            expect(actual.currentTemp).toEqual(expectedTemp);
        });

        it('should make rest call to post thermostat temperature', async () => {
            const desiredTemp = 54.9;
            const mode = "cooling";
            const isFahrenheit = true;
            const body = { 'desiredTemp': desiredTemp, 'mode': mode, 'isFahrenheit': isFahrenheit }
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body }

            fetchMock.mock(`http://localhost:5000/thermostat/temperature/${userId}`, options).catch(unmatchedUrl => {
                return { status: 400 }
            })

            const actual = await setUserTemperature(userId, desiredTemp, mode, isFahrenheit)
            expect(actual.status).toEqual(200);
        });

        it('should query the user settings', async () => {
            const userId = 'abc1234';
            const expectedUnit = 'imperial';
            const response = { 'unit': expectedUnit, 'city': 'Des Moines', 'is_fahrenheit': true };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`http://localhost:5000/userId/${userId}/preferences`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getUserPreferences(userId);
            expect(actual.unit).toEqual(expectedUnit);
        });

        it('should make rest call to post user preferences', async () => {
            const userId = 'abc12345';
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': { 'isFahrenheit': true, 'city': 'Praha', 'isImperial': false } }

            fetchMock.mock(`http://localhost:5000/userId/${userId}/preferences/update`, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await updateUserPreferences(userId, true, true, 'Praha');

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get light groups', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };
            const response = [{ 'groupId': 'One', 'groupName': 'Bathroom' }]

            fetchMock.mock('http://localhost:5000/lights/groups', response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await getLightGroups();

            expect(actual[0].groupName).toEqual('Bathroom');
        });

        it('should make rest call to set the state of a light group', async () => {
            const body = { 'groupId': 1, 'on': true, 'brightness': 224 };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock('http://localhost:5000/lights/group/state', options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await setLightGroupState(body.groupId, body.on, body.brightness);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to set the state of an individual light', async () => {
            const body = { 'lightId': 1, 'on': true, 'brightness': 211 };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock('http://localhost:5000/group/light', options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await setLightState(body.lightId, body.on, body.brightness);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to change user password', async () => {
            const body = { 'oldPassword': 'alsoFake', 'newPassword': 'StillFake' };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`http://localhost:5000/userId/${userId}/updateAccount`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await updateUserAccount(userId, body.oldPassword, body.newPassword);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to add device to a user', async () => {
            const body = { 'roleName': 'fakeName', 'ipAddress': '1.0.0.1' };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`http://localhost:5000/userId/${userId}/devices`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await addUserDevice(userId, body.roleName, body.ipAddress);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to add device node for a user', async () => {
            const deviceId = '456def'
            const body = { 'nodeName': 'fakeName'};
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`http://localhost:5000/userId/${userId}/devices/${deviceId}/node`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await addUserDeviceNode(userId, deviceId, body.nodeName);

            expect(actual.status).toEqual(200);
        });

        it('should make rest call to get roles with bearer token', async () => {
            const userId = 'jkasdf1';
            const response = {'roles': [{}]};
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`http://localhost:5000/userId/${userId}/roles`, response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await getRolesByUserId(userId);

            expect(actual.roles).toEqual([{}]);
        });

        it('should make rest call to add child account to a user account', async () => {
            const body = { 'email': 'fakeName', 'roles': ['garage_door']};
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': body };

            fetchMock.mock(`http://localhost:5000/userId/${userId}/createChildAccount`, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await addUserChildAccount(userId, body.email, body.roles);

            expect(actual.status).toEqual(200);
        });
    });
});