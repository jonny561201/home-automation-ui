import base64 from 'base-64';
import fetchMock from 'fetch-mock';
import {
    getBearerToken, getGarageStatus, updateGarageState,
    toggleGarageDoor, getSumpLevels, getCurrentTemperature,
    getUserPreferences, updateUserPreferences, setUserTemperature,
    getLightGroups, setLightGroupState
} from '../../utilities/RestApi';
import { getStore } from '../../GlobalState';


describe('RestApi', () => {
    const username = 'fakeUser';
    const password = 'fakepass';
    const userId = "f250b5e4-fcf3-11e9-8f0b-362b9e155667";
    const fakeBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZjI1MGI1ZTQtZmNmMy0xMWU5LThmMGItMzYyYjllMTU1NjY3In0.WdrU1SRBkvDh_TbhEZTXnywdtBnz1XsaMY-G95ntCU8";
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

    describe('after successful login', () => {
        let state;
        const bearerToken2 = 'abc123';

        beforeEach(() => {
            state = getStore();
            state.state.bearerToken = bearerToken2;
        });

        it('should make rest call to get garage door state', async () => {
            const response = { 'isGarageOpen': true };
            const options = { "method": "GET", "headers": { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock('http://localhost:5000/garageDoor/status', response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await getGarageStatus();
            expect(actual.isGarageOpen).toEqual(true);
        });

        it('should make rest call to post garage door status', async () => {
            const response = { 'garageDoorOpen': false };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': { "garageDoorOpen": false } };

            fetchMock.mock('http://localhost:5000/garageDoor/state', response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await updateGarageState(false);
            expect(actual.garageDoorOpen).toEqual(false);
        });

        it('should make rest call to toggle garage door state', async () => {
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } }

            fetchMock.mock('http://localhost:5000/garageDoor/toggle', options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await toggleGarageDoor();
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
            const options = {'method': 'GET', 'headers': {'Authorization': `Bearer ${bearerToken2}`}};
            const response = [{'groupId': 'One', 'groupName': 'Bathroom'}]

            fetchMock.mock('http://localhost:5000/lights/groups', response, options).catch(unmatchedUrl => {
                return { status: 400 }
            });

            const actual = await getLightGroups();

            expect(actual[0].groupName).toEqual('Bathroom');
        });

        it('should make rest call to set the state of a light group', async () => {
            const body = {'groupId': 1, 'on': true, 'brightness': 224};
            const options = {'method': 'POST', 'headers': {'Authorization': `Bearer ${bearerToken2}`}, 'body': body};

            fetchMock.mock('http://localhost:5000/lights/group/state', options).catch(unmatchedUrl => {
                return {status: 400}
            });

            const actual = await setLightGroupState(body.groupId, body.on, body.brightness);
            
            expect(actual.status).toEqual(200);
        });
    });
});