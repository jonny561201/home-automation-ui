import React from 'react';
import Settings from '../../pages/Settings'
import { shallow } from 'enzyme';

describe('Settings Page', () => {
    let settings;

    beforeEach(() => {
        settings = shallow(<Settings />);
    });

    it('should display logo header', () => {
        const actual = settings.find('Header');
        expect(actual).toHaveLength(1);
    });

    it('should display Temperature header', () => {
        const actual = settings.find('h2').text();
        expect(actual).toEqual('Temperature');
    });

    it('should display is fahrenheit settings switch', () => {
        const actual = settings.find('.switch');
        expect(actual).toHaveLength(1);
    });

    it('should display text to set to fahrenheit', () => {
        const actual = settings.find('.settings-text').text();
        expect(actual).toEqual('Fahrenheit');
    });

    it('should display save button to submit updated preferences', () => {
        const actual = settings.find('button').text();
        expect(actual).toEqual('Save');
    });

    it('should display city input textbox', () => {
        const actual = settings.find('input');
    })
});