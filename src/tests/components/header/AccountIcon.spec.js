import React from 'react';
import { shallow } from 'enzyme';
import Account from '../../../components/header/AccountIcon';
import { getStore } from '../../../GlobalState';

describe('Account', () => {
    let accountIcon;
    const firstName = "Jon";
    const lastName = "Rox";

    beforeEach(() => {
        getStore().setFirstName(firstName);
        getStore().setLastName(lastName);
        accountIcon = shallow(<Account />);
    });

    it('should display account login border', () => {
        const border = accountIcon.find('.account-border');
        expect(border).toHaveLength(1);
    });

    it('should display account login token', () => {
        const border = accountIcon.find('.account-center');
        expect(border).toHaveLength(1);
    });

    it('should display the first letter of users first name and first letter of users last name', () => {
        const initials = accountIcon.find('p').text();
        expect(initials).toEqual("JR");
    });

    it('should trim whitespace from users first and last name', () => {
        const firstName = " Jon";
        const lastName = " Rox";
        getStore().setFirstName(firstName);
        getStore().setLastName(lastName);
        const newAccount = shallow(<Account />);

        const initials = newAccount.find('p').text();
        expect(initials).toEqual("JR");
    });
});