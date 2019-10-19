import React from 'react';
import { shallow } from 'enzyme';
import Account from '../../../components/header/Account';

describe('Account', () => {
    let account;

    beforeEach(() => {
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
});