import React from 'react';
import { Context } from '../../../state/Store';
import { render, screen, act } from '@testing-library/react';
import Header from '../../../components/header/Header';
import { getStore } from '../../../state/GlobalState';


jest.mock('../../../utilities/StateUtil', () => () => { });


describe('HeaderComponent', () => {
    const expectedPage = 'Home Automation';
    const user = { firstName: 'test', lastName: 'test' };


    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ user: user }, () => { }]}>
                    <Header />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        getStore().setActivePage(expectedPage);
    });

    it('should display header text', async () => {
        await renderComponent();
        const actual = screen.getByText(expectedPage).textContent;
        expect(actual).toEqual(expectedPage);
    });

    it('should display company logo', async () => {
        await renderComponent();
        const actual = screen.getByRole('img');
        expect(actual).toBeDefined();
    });

    it('should display account icon', async () => {
        await renderComponent();
        const actual = screen.getByTestId('user-initials');
        expect(actual).toBeDefined();
    });
});