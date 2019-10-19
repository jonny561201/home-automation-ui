import base64 from 'base-64';
import fetchMock from 'fetch-mock';
import { getBearerToken, getGarageStatus } from '../../utilities/RestApi';

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
            }
        });

        const actual = await getBearerToken(username, password);
        expect(actual.bearerToken).toEqual(fakeBearerToken);
    });

    it('should make rest call to get garage door state', async () => {
        const response = {'isGarageOpen': true}
        const options = {"method": "GET", "headers": {'Authorization': 'Bearer ' + fakeBearerToken}};

        fetchMock.mock('http://localhost:5000/garageDoor/status', response, options).catch(unmatchedUrl => {
            return { status: 400}
        });

        const actual = await getGarageStatus();
        expect(actual.isGarageOpen).toEqual(true);
    });
});