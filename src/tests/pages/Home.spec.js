import React from 'react';
import Home from '../../pages/Home';
import { shallow } from 'enzyme';

describe('Home', () => {
    let home;


    beforeEach(() => {
        home = shallow(<Home />);
    });

    it('should display header bar', () => {
        const header = home.find('.home-header');
        expect(header).toHaveLength(1)
    });

    it('should display header text', () => {
        const header = home.find('h1').text();
        expect(header).toEqual('Home Automation');
    });

    it('should display company logo', () => {
        const header = home.find('LogoHeader');
        expect(header).toHaveLength(1);
    });

    it('should display account icon', () => {
        const header = home.find('Account');
        expect(header).toHaveLength(1);
    });

    it('should display page body', () => {
        const body = home.find('.home-body');
        expect(body).toHaveLength(1)
    });
});