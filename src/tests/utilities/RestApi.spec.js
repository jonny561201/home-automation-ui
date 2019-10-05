import nock from 'nock';
import { getBearerToken } from '../../utilities/RestApi';

describe('RestApi', () => {
    let apiMock;
    const fakeBearerToken = "fakeBearerToken";

    it('should make rest call to login api', async () => {
        apiMock = nock('http://localhost:5000')
        .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
        .get('/login')
        .reply(200, {bearerToken: fakeBearerToken});

        const actual = await getBearerToken();
        apiMock.done();
        expect(actual).toEqual(fakeBearerToken);
    });

    it('should return unauthorized when api returns unauthorized', async () => {
        apiMock = nock('http://localhost:5000')
            .defaultReplyHeaders({ 'access-control-allow-origin': '*' })
            .get('/login')
            .reply(401, {});

        const actual = await getBearerToken();
        apiMock.done();
        expect(actual).toEqual('unauthorized');
    });
});