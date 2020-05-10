import React from 'react';
import { mount } from 'enzyme';
import Header from '../../../components/header/Header';
import { getStore } from '../../../state/GlobalState';

describe('HeaderComponent', () => {
    let header;
    const expectedPage = 'Home Automation';

    beforeEach(() => {
        getStore().setActivePage(expectedPage);
        header = mount(<Header />)
    });

    it('should display header bar', () => {
        const actual = header.find('.home-header');
        expect(actual).toHaveLength(1)
    });

    it('should display header text', () => {
        const actual = header.find('h1').text();
        expect(actual).toEqual(expectedPage);
    });

    it('should display company logo', () => {
        const actual = header.find('LogoHeader');
        expect(actual).toHaveLength(1);
    });

    it('should display account icon', () => {
        const actual = header.find('Account');
        expect(actual).toHaveLength(1);
    });
});