import React from 'react';
import { render, screen } from '@testing-library/react';
import Account from '../../../components/header/AccountIcon';
import { getStore } from '../../../state/GlobalState';

describe('Account', () => {
    const firstName = "Jon";
    const lastName = "Rox";

    beforeEach(() => {
        getStore().setFirstName(firstName);
        getStore().setLastName(lastName);
    });

    it('should display account login border', () => {
        render(<Account />);
        const actual = screen.getByTestId('account-border');
        expect(actual).toBeDefined();
    });

    it('should display account login token', () => {
        render(<Account />);
        const actual = screen.getByTestId('account-center');
        expect(actual).toBeDefined();
    });

    it('should display the first letter of users first name and first letter of users last name', () => {
        render(<Account />);
        const actual = screen.getByText('JR').textContent;
        expect(actual).toEqual("JR");
    });

    it('should trim whitespace from users first and last name', () => {
        const firstName = " Jon";
        const lastName = " Rox";
        getStore().setFirstName(firstName);
        getStore().setLastName(lastName);
        render(<Account />);

        const actual = screen.getByText('JR').textContent;
        expect(actual).toEqual("JR");
    });
});