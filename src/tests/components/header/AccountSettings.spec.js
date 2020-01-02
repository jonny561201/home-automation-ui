import React from 'react';
import { shallow } from 'enzyme';
import { getStore } from '../../../GlobalState';
import AccountSettings from '../../../components/header/AccountSettings';


describe('AccountSettings', () => {
    let accountSettings;

    beforeEach(() => {
        getStore().updateAuth(true);
        accountSettings = shallow(<AccountSettings />);
    });

    it('should display sign out link', () => {
        const actual = accountSettings.find('.account-button').at(1).text();
        expect(actual).toEqual('Sign Out');
    });

    it('should display Settings link when active page is set to home', () => {
        getStore().setActivePage('Home Automation');
        accountSettings.setProps({});

        const actual = accountSettings.find('.account-button').at(0).text();
        expect(actual).toEqual('Settings');
    });

    it('should display Home link when active page is set to settings', () => {
        getStore().setActivePage('Settings');
        accountSettings.setProps({});

        const actual = accountSettings.find('.account-button').at(0).text();
        expect(actual).toEqual('Home');
    });

    it('should deauthenticate user when click sign out', () => {
        const test = accountSettings.find('.account-button').at(1).simulate('click');
        expect(test).toHaveLength(1);
        expect(getStore().isAuthenticated()).toBeFalsy();
    });
});