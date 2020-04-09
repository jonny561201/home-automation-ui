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
            store.setUserRoles(['garage_door']);
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

        it('should show the Basement Panel if user has the basement role', () => {
            store.setUserRoles(['sump_pump']);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('BasementPanel');
            expect(actual).toHaveLength(1);
        });

        it('should not show the Basement Panel if user does not have the basement role', () => {
            store.setUserRoles([]);
            const dashboard = shallow(<DashboardPanels />);
            const actual = dashboard.find('BasementPanel');
            expect(actual).toHaveLength(0);
        });
    });
});