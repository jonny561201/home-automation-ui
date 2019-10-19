import React from 'react';
import { shallow } from 'enzyme';
import DashboardPanels from '../../../components/panels/DashboardPanels';

describe('DashboardPanel', () => {

    let dashboard;

    beforeEach(() => {
        dashboard = shallow(<DashboardPanels />);
    });

    describe('ExpansionPanel', () => {

        it('should show the Garage Panel', () => {
            const actual = dashboard.find('GaragePanel');
            expect(actual).toHaveLength(1);
        });

        it('should show the Basement Panel', () => {
            const actual = dashboard.find('BasementPanel');
            expect(actual).toHaveLength(1);
        });
    });
});