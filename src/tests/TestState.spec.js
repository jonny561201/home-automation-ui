import Reducer from '../state/Reducer';


describe('Reducer', () => {

    describe('ActivePage', () => {
        let state;
        const activePage = "testPage";

        beforeEach(() => {
            state = { activePage: null };
        });

        it('should set active page', () => {
            const actual = Reducer(state, { type: 'SET_ACTIVE_PAGE', payload: activePage });
            expect(actual.activePage).toEqual(activePage);
        });

        it('should retain existing state values when updating active page', () => {
            const current = { ...state, auth: { isAuthenticated: false } };
            const actual = Reducer(current, { type: 'SET_ACTIVE_PAGE', payload: activePage });
            expect(actual.auth).toEqual({ isAuthenticated: false });
        });
    });
});