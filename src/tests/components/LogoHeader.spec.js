import React from 'react';
import LogoCircle from '../../components/LogoHeader';
import {shallow} from 'enzyme';

describe('LogoHeader', () => {
    let logoHeader;

    beforeEach(() => {
        logoHeader = shallow(<LogoCircle />)
    });

    it("should contain logo image", () => {
        const logo = logoHeader.find('.logo-image');
        expect(logo).toHaveLength(1);
    });

    it("should contain white logo border", () => {
        const logo = logoHeader.find('.white-header');
        expect(logo).toHaveLength(1);
    });

    it("should contain brown logo background", () => {
        const logo = logoHeader.find('.logo-background');
        expect(logo).toHaveLength(1);
    });
});