import React from 'react';
import { render, screen, act } from '@testing-library/react';
import Account from '../../../components/header/AccountIcon';
import { getStore } from '../../../state/GlobalState';

describe('Account', () => {
    const firstName = "Jon";
    const lastName = "Rox";

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Account />
            );
        });
    }

    beforeEach(() => {
        getStore().setFirstName(firstName);
        getStore().setLastName(lastName);
    });

    it('should display account login border', async () => {
        await renderComponent();
        const actual = screen.getByTestId('account-border');
        expect(actual).toBeDefined();
    });

    it('should display account login token', async () => {
        await renderComponent();
        const actual = screen.getByTestId('account-center');
        expect(actual).toBeDefined();
    });

    it('should display the first letter of users first name and first letter of users last name', async () => {
        await renderComponent();
        const actual = screen.getByText('JR').textContent;
        expect(actual).toEqual("JR");
    });

    it('should trim whitespace from users first and last name', async () => {
        const firstName = " Jon";
        const lastName = " Rox";
        getStore().setFirstName(firstName);
        getStore().setLastName(lastName);
        await renderComponent();

        const actual = screen.getByText('JR').textContent;
        expect(actual).toEqual("JR");
    });
});