import {useState} from '../TestState';

describe('TestState', () => {

    describe('ActivePage', () => {
        let state;
        const activePage = "testPage";

        beforeEach(() => {
            state = useState()
        });

        it('should setActivePage', () => {
            state.setActivePage(activePage);
            const actual = state.state.activePage;
            expect(actual).toEqual(activePage);
        });
    });
});