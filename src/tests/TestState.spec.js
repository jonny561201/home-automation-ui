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
    });
});