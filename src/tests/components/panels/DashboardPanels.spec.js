import React from 'react';
import { shallow } from 'enzyme';
import DashboardPanels from '../../../components/panels/DashboardPanels';
import { getStore } from '../../../GlobalState';

describe('DashboardPanel', () => {

    // let dashboard;
    const store = getStore();

    // beforeEach(() => {
    //     dashboard = shallow(<DashboardPanels />);
    // });

    describe('ExpansionPanel', () => {

        it('should show the Garage Panel if user has garage role', () => {
            store.setUserRoles([{'role_name': 'garage_door'}]);
            const dashboard = shallow(<DashboardPanels />);

            const actual = dashboard.find('GaragePanel');
            expect(actual).toHaveLength(1);
        });

        it('should not show the Garage Panel if user does not have garage role', () => {
            store.setUserRoles([]);
            const dashboard = shallow(<DashboardPanels />);

            const actual = dashboard.find('GaragePanel');
            expect(actual).toHaveLength(0);
        });

        it('should show the Basement Panel if user has the sump pump role', () => {
            store.setUserRoles([{'role_name': 'sump_pump'}]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('BasementPanel');
            expect(actual).toHaveLength(1);
        });

        it('should not show the Basement Panel if user does not have the sump pump role', () => {
            store.setUserRoles([]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('BasementPanel');
            expect(actual).toHaveLength(0);
        });

        it('should show the Temperature Panel if user has the thermostat role', () => {
            store.setUserRoles([{'role_name': 'thermostat'}]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('TemperaturePanel');
            expect(actual).toHaveLength(1);
        });

        it('should not show the Temperature Panel if user does not have the thermostat role', () => {
            store.setUserRoles([]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('TemperaturePanel');
            expect(actual).toHaveLength(0);
        });

        it('should show the Lighting Panel if user has the lighting role', () => {
            store.setUserRoles([{'role_name': 'lighting'}]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('LightingPanel');
            expect(actual).toHaveLength(1);
        });

        it('should not show the Lighting Panel if user does not have the lighting role', () => {
            store.setUserRoles([]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('LightingPanel');
            expect(actual).toHaveLength(0);
        });

        it('should show the Security Panel if user has the security role', () => {
            store.setUserRoles([{'role_name': 'security'}]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('SecurityPanel');
            expect(actual).toHaveLength(1);
        });

        it('should not show the Security Panel if user does not have the security role', () => {
            store.setUserRoles([]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('SecurityPanel');
            expect(actual).toHaveLength(0);
        });
    });
});