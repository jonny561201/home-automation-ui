import { getStore } from '../state/GlobalState';


describe('GlobalState', () => {

    describe('ActivePage', () => {
        let state;
        const activePage = "testPage";

        beforeEach(() => {
            state = getStore()
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
            state = getStore();
        });

        it('should get the authorization', () => {
            state.state.isAuthenticated = true;
            expect(state.isAuthenticated()).toBeTruthy();
        });
    });

    describe('UserId', () => {
        let state;
        const userId = 'fakeUserId';

        beforeEach(() => {
            state = getStore();
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