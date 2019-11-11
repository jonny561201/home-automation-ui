import React from 'react';
import Settings from '../../pages/Settings'
import { shallow } from 'enzyme';

describe('Settings Page', () => {
    let settings;

    beforeEach(() => {
        settings = shallow(<Settings />)
    });

    it('should display logo header', () => {
        const actual = settings.find('LogoHeader');
        expect(actual).toHaveLength(1);
    });
});