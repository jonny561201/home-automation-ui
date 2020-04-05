import React from 'react';
import { shallow } from 'enzyme';
import Account from '../../pages/Account';
import { TextField } from '@material-ui/core';

describe('Account Page', () => {

    let account;

    beforeEach(() => {
        account = shallow(<Account />)
    });

    it('should display header for changing password', () => {
        const actual = account.find('h2');

        expect(actual).toHaveLength(1);
    });

    it('should display the old password input box', () => {
        const actual = account.find(TextField);
        expect(actual).toHaveLength(1);
    });

    it('should display the old password label', () => {
        const actual = account.find(TextField);
        expect(actual.props()).toHaveProperty('label', 'Old Password');
    });
});