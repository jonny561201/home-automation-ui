import base64 from 'base-64';
import fetchMock from 'fetch-mock';
import ApiRequests from '../../utilities/RestApi';

describe('RestApi', () => {
    let restApi;
    const username = 'fakeUser';
    const password = 'fakepass';
    const userId = "f250b5e4-fcf3-11e9-8f0b-362b9e155667";
    const fakeBearerToken = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoiZjI1MGI1ZTQtZmNmMy0xMWU5LThmMGItMzYyYjllMTU1NjY3In0.WdrU1SRBkvDh_TbhEZTXnywdtBnz1XsaMY-G95ntCU8";
    const credentials = username + ":" + password;

    beforeEach(() => {
        restApi = new ApiRequests();
    });

    it('should make rest call to login api using auth header', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { "method": "GET", "headers": { 'Authorization': `Basic ${base64.encode(credentials)}` } };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return {
                status: 400,
                body: { details: 'Bad Request' }
            };
        });

        const actual = await restApi.getBearerToken(username, password, () => { });
        expect(actual.bearerToken).toEqual(fakeBearerToken);
    });

    it('should store bearer token after successful login', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { 'method': 'GET', 'headers': { 'Authorization': `Basic ${base64.encode(credentials)}` }, overwriteRoutes: false };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return { status: 400 };
        });

        await restApi.getBearerToken(username, password, () => { });
        expect(restApi.bearerToken).toEqual(fakeBearerToken);
    });

    it('should store user id after successful login', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = { 'method': 'GET', 'headers': { 'Authorization': `Basic ${base64.encode(credentials)}` }, overwriteRoutes: false };

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return { status: 400 };
        });

        await restApi.getBearerToken(username, password, () => { });
        expect(restApi.userId).toEqual(userId);
    });

    describe('after successful login', () => {
        const bearerToken2 = 'abc123';

        beforeEach(() => {
            restApi.bearerToken = bearerToken2;
        });

        it('should make rest call to get garage door state', async () => {
            const response = { 'isGarageOpen': true };
            const options = { "method": "GET", "headers": { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock('http://localhost:5000/garageDoor/status', response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await restApi.getGarageStatus();
            expect(actual.isGarageOpen).toEqual(true);
        });

        it('should make rest call to post garage door status', async () => {
            const response = { 'garageDoorOpen': false };
            const options = { 'method': 'POST', 'headers': { 'Authorization': `Bearer ${bearerToken2}` }, 'body': { "garageDoorOpen": false } };

            fetchMock.mock('http://localhost:5000/garageDoor/state', response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await restApi.updateGarageState(false);
            expect(actual.garageDoorOpen).toEqual(false);
        });

        it('should make rest call to get current sump pump level', async () => {
            const userId = 'abc123';
            const expectedDepth = 33.3;
            const response = { 'currentDepth': expectedDepth, 'userId': userId, 'latestDate': '2019-11-12', 'averageDepth': 35.8 };
            const options = { 'method': 'GET', 'headers': { 'Authorization': `Bearer ${bearerToken2}` } };

            fetchMock.mock(`http://localhost:5000/sumpPump/user/${userId}/depth`, response, options).catch(unmatchedUrl => {
                return { status: 400 };
            });

            const actual = await restApi.getSumpLevels(userId);
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

            const actual = await restApi.getCurrentTemperature(userId);
            expect(actual.currentTemp).toEqual(expectedTemp);
        });
    });
});