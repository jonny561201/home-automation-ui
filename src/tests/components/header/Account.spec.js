import React from 'react';
import { shallow } from 'enzyme';
import Account from '../../../components/header/Account';
import { getStore } from '../../../GlobalState';

describe('Account', () => {
    let account;
    const firstName = "Jon";
    const lastName = "Rox";

    beforeEach(() => {
        getStore().setFirstName(firstName);
        getStore().setLastName(lastName);
        account = shallow(<Account />);
    });

    it('should display account login border', () => {
        const border = account.find('.account-border');
        expect(border).toHaveLength(1);
    });

    it('should display account login token', () => {
        const border = account.find('.account-center');
        expect(border).toHaveLength(1);
    });

    it('should display the first letter of users first name and first letter of users last name', () => {
        const initials = account.find('p').text();
        expect(initials).toEqual("JR");
    });
});