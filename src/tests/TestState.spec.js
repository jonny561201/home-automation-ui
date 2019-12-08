import {useState} from '../TestState';


describe('TestState', () => {

    describe('ActivePage', () => {
        let state;
        const activePage = "testPage";

        beforeEach(() => {
            state = useState()
        });

        it('should set active page', () => {
            state.setActivePage(activePage);
            const actual = state.state.activePage;
            expect(actual).toEqual(activePage);
        });

        it('should get active page', () => {
            state.state.activePage = activePage;
            expect(state.getActivePage()).toEqual(activePage);
        });
    });

    describe('Authorization', () => {
        let state;

        beforeEach(() => {
            state = useState();
        });

        it('should update the authorization to true', () => {
            state.updateAuth(true);
            expect(state.state.isAuthenticated).toBeTruthy();
        });

        it('should update the authorization to false', () => {
            state.updateAuth(false);
            expect(state.state.isAuthenticated).toBeFalsy();
        });

        it('should get the authorization', () => {
            state.state.isAuthenticated = true;
            expect(state.isAuthenticated()).toBeTruthy();
        });
    });

    describe('BearerToken', () => {
        let state;
        const bearerToken = 'ImAFakeBearerToken';

        beforeEach(() => {
            state = useState();
        });

        it('should set bearer token', () => {
            state.setBearerToken(bearerToken);
            expect(state.state.bearerToken).toEqual(bearerToken);
        });

        it('should get bearer token', () => {
            state.state.bearerToken = bearerToken;
            expect(state.getBearerToken()).toEqual(bearerToken);
        });
    });

    describe('UserId', () => {
        let state;
        const userId = 'fakeUserId';

        beforeEach(() => {
            state = useState();
        });

        it('should set the user Id', () => {
            state.setUserId(userId);
            expect(state.state.userId).toEqual(userId);
        });

        it('should get the user Id', () => {
            state.state.userId = userId;
            expect(state.getUserId()).toEqual(userId);
        });
    });
});