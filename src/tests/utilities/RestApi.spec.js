import base64 from 'base-64';
import fetchMock from 'fetch-mock';
import { getBearerToken, getGarageStatus, updateGarageState, getSumpLevels } from '../../utilities/RestApi';

describe('RestApi', () => {
    const username = 'fakeUser';
    const password = 'fakepass';
    const fakeBearerToken = "fakeBearerToken";
    
    it('should make rest call to login api using auth header', async () => {
        const response = { 'bearerToken': fakeBearerToken };
        const options = {"method": "GET", "headers": {'Authorization': 'Basic ' + base64.encode(username + ":" + password)}};

        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return {
                status: 400,
                body: {details: 'Bad Request'}
            };
        });

        const actual = await getBearerToken(username, password);
        expect(actual.bearerToken).toEqual(fakeBearerToken);
    });

    it('should make rest call to get garage door state', async () => {
        const response = {'isGarageOpen': true};
        const options = {"method": "GET", "headers": {'Authorization': 'Bearer ' + fakeBearerToken}};

        fetchMock.mock('http://localhost:5000/garageDoor/status', response, options).catch(unmatchedUrl => {
            return { status: 400};
        });

        const actual = await getGarageStatus();
        expect(actual.isGarageOpen).toEqual(true);
    });

    it('should make rest call to post garage door status', async () => {
        const response = {'garageDoorOpen': false};
        const options = {'method': 'POST', 'headers': {'Authorization': 'Bearer ' + fakeBearerToken}, 'body': {"garageDoorOpen": false}};

        fetchMock.mock('http://localhost:5000/garageDoor/state', response, options).catch(unmatchedUrl => {
            return {status: 400};
        });

        const actual = await updateGarageState(false);
        expect(actual.garageDoorOpen).toEqual(false);
    });

    it('should make rest call to get current sump pump level', async () => {
        const userId = 'abc123';
        const expectedDepth = 33.3;
        const response = {'currentDepth': expectedDepth, 'userId': userId, 'latestDate': '2019-11-12', 'averageDepth': 35.8};
        const options = {'method': 'GET', 'headers': {'Authorization': 'Bearer ' + fakeBearerToken}};
    
        fetchMock.mock('http://localhost:5000/sumpPump/user/' + userId + '/depth', response, options).catch(unmatchedUrl => {
            return {status: 400};
        });

        const actual = await getSumpLevels(userId);
        expect(actual.currentDepth).toEqual(expectedDepth);
    })
});