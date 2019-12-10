import React from 'react';
import { shallow } from 'enzyme';
import AccountSettings from '../../../components/header/AccountSettings';


describe('AccountSettings', () => {
    let accountSettings;

    beforeEach(() => {
        accountSettings = shallow(<AccountSettings />)
    });

    it('should display sign out link', () => {
        const actual = accountSettings.find('.account-button').at(1).text();
        expect(actual).toEqual('Sign Out');
    });
});