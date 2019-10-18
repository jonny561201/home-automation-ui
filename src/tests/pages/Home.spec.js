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

    describe('AccountSettings', () => {
        it('should not show account settings when settingsActive false', () => {
            home.state().settingsActive = false;
            const accountSettings = home.find('AccountSettings');
            expect(accountSettings).toHaveLength(0);
        });

        it('should show account settings when settingsActive true', () => {
            home.state().settingsActive = true;
            home.instance().forceUpdate();
            const accountSettings = home.find('AccountSettings');
            expect(accountSettings).toHaveLength(1);
        });
    });

    describe('toggleAccountSettings', () => {
        let instance;

        beforeEach(() => {
            instance = home.instance();
        });

        it('should set state to true when false', () => {
            home.state().settingsActive = false;
            instance.toggleAccountSettings();
            expect(home.state().settingsActive).toBeTruthy;
        });

        it('should set state to false when true', () => {
            home.state().settingsActive = true;
            instance.toggleAccountSettings();
            expect(home.state().settingsActive).toBeFalsy;
        });
    });

    describe('ExpansionPanel', () => {

        it('should show the Garage Panel', () => {
            const actual = home.find('.garage-panel');
            expect(actual).toHaveLength(1);
        });

        it('should show the Basement Panel', () => {
            const actual = home.find('.basement-panel');
            expect(actual).toHaveLength(1);
        });
    });
});