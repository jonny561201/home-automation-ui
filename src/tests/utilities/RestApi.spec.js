import base64 from 'base-64';
import fetchMock from 'fetch-mock';
import { getBearerToken } from '../../utilities/RestApi';

describe('RestApi', () => {
    const username = 'fakeUser';
    const password = 'fakepass';
    const fakeBearerToken = "fakeBearerToken";
    const options = {"method": "GET", "headers": {'Authorization': 'Basic ' + base64.encode(username + ":" + password)}};
    const response = { 'bearerToken': fakeBearerToken };

    it('should make rest call to login api using auth header', async () => {
        fetchMock.mock('http://localhost:5000/login', response, options).catch(unmatchedUrl => {
            return {
                status: 400,
                body: {details: 'Bad Request'}
            }
        });

        const actual = await getBearerToken(username, password);
        console.log('Response: ' + JSON.stringify(response));
        expect(actual.bearerToken).toEqual(fakeBearerToken);
    });
});