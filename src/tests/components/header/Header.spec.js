import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../../components/header/Header';
import { getStore } from '../../../GlobalState';

describe('HeaderComponent', () => {
    let header;
    const expectedPage = 'Home Automation';

    beforeEach(() => {
        getStore().setActivePage(expectedPage);
        header = shallow(<Header />)
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

    describe('AccountSettings', () => {
        it('should not show account settings when settingsActive false', () => {
            header.state().settingsActive = false;
            const accountSettings = header.find('AccountSettings');
            expect(accountSettings).toHaveLength(0);
        });

        it('should show account settings when settingsActive true', () => {
            header.state().settingsActive = true;
            header.instance().forceUpdate();
            const accountSettings = header.find('AccountSettings');
            expect(accountSettings).toHaveLength(1);
        });
    });

    describe('toggleAccountSettings', () => {
        let instance;

        beforeEach(() => {
            instance = header.instance();
        });

        it('should set state to true when false', () => {
            header.state().settingsActive = false;
            instance.toggleAccountSettings();
            expect(header.state().settingsActive).toBeTruthy;
        });

        it('should set state to false when true', () => {
            header.state().settingsActive = true;
            instance.toggleAccountSettings();
            expect(header.state().settingsActive).toBeFalsy;
        });
    });
});