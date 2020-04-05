import React from 'react';
import { shallow } from 'enzyme';
import Account from '../../pages/Account';

describe('Account Page', () => {

    let account;

    beforeEach(() => {
        account = shallow(<Account />)
    });

    it('should display header for changing password', () => {
        const actual = account.find('h2');

        expect(actual).toHaveLength(1);
    });
});