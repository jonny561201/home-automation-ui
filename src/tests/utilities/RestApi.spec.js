import nock from 'nock';
import { getBearerToken } from '../../utilities/RestApi';

describe('RestApi', () => {
    let apiMock;
    const fakeBearerToken = "fakeBearerToken";

    beforeEach(() => {
        apiMock = nock('http://localhost:5000')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get('/login')
            .reply(200, {bearerToken: fakeBearerToken});
    });

    it('should make rest call to login api', async () => {
        const actual = await getBearerToken();
        apiMock.done();
        expect(actual).toEqual({bearerToken: fakeBearerToken});
    });
});