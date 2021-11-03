import React from 'react';
import { Context } from '../../../state/Store';
import { render, screen, act } from '@testing-library/react';
import Account from '../../../components/header/AccountIcon';


describe('Account Icon', () => {
    const firstName = "Jon";
    const lastName = "Rox";

    const renderComponent = async (first, last) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ user: { firstName: first, lastName: last } }, () => { }]}>
                    <Account />
                </Context.Provider>
            );
        });
    }

    it('should display account login border', async () => {
        await renderComponent(firstName, lastName);
        const actual = screen.getByTestId('account-border');
        expect(actual).toBeDefined();
    });

    it('should display account login token', async () => {
        await renderComponent(firstName, lastName);
        const actual = screen.getByTestId('account-center');
        expect(actual).toBeDefined();
    });

    it('should display the first letter of users first name and first letter of users last name', async () => {
        await renderComponent(firstName, lastName);
        const actual = screen.getByText('JR').textContent;
        expect(actual).toEqual("JR");
    });

    it('should trim whitespace from users first and last name', async () => {
        const newFirst = " Jon";
        const newLast = " Rox";
        await renderComponent(newFirst, newLast);

        const actual = screen.getByText('JR').textContent;
        expect(actual).toEqual("JR");
    });
});