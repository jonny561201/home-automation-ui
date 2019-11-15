import React from 'react';
import Settings from '../../pages/Settings'
import { shallow } from 'enzyme';

describe('Settings Page', () => {
    let settings;

    beforeEach(() => {
        settings = shallow(<Settings />)
    });

    it('should display logo header', () => {
        const actual = settings.find('Header');
        expect(actual).toHaveLength(1);
    });

    it('should display is fahrenheit settings switch', () => {
        const actual = settings.find('.fahrenheit-toggle');
        expect(actual).toHaveLength(1);
    });

    it('should display text to set to fahrenheit', () => {
        const actual = settings.find('.settings-text').text();
        expect(actual).toEqual('Fahrenheit');
    });
});