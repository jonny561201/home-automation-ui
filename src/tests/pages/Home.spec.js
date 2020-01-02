import React from 'react';
import Home from '../../pages/Home';
import { shallow } from 'enzyme';
import { getStore } from '../../GlobalState';

describe('Home', () => {
    let home;

    beforeEach(() => {
        home = shallow(<Home />);
    });

    it('should display Header component', () => {
        const actual = home.find('Header');
        expect(actual).toHaveLength(1);
    });

    it('should display page body', () => {
        const actual = home.find('.home-body');
        expect(actual).toHaveLength(1)
    });

    it('should display DashboardPanel', () => {
        const actual = home.find('DashboardPanel');
        expect(actual).toHaveLength(1);
    });

    it('should set the active page to Home', () => {
        expect(getStore().state.activePage).toEqual('Home Automation');
    });
});