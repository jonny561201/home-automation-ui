import React from 'react';
import { shallow } from 'enzyme';
import GaragePanel from "../../../components/panels/GaragePanel";

describe('GaragePanel', () => {
    let garagePanel;
    const mockGetStatus = jest.fn(() => 'true');
    const mockRequests = { getGarageStatus: mockGetStatus };

    beforeEach(() => {
        mockGetStatus.mockClear();
        garagePanel = shallow(<GaragePanel apiRequests={mockRequests} />);
    });

    it('should show the Garage Panel', () => {
        const actual = garagePanel.find('.garage-panel');
        expect(actual).toHaveLength(1);
    });

    it('should show garage icon', () => {
        const actual = garagePanel.find('.garage-panel img').prop('alt');
        expect(actual).toEqual('garage');
    });

    it('should show garage door button', () => {
        const actual = garagePanel.find('button');
        expect(actual).toHaveLength(1);
    });

    describe('ComponentDidMount', () => {

        it('should make api call to get status', () => {
            expect(mockGetStatus).toHaveBeenCalledTimes(1);
        });

        // it('should store garage status in state', async () => {
        //     const instance = garagePanel.instance();
        //     await instance.componentDidMount();
        //     const actual = garagePanel.state().isGarageOpen;
        //     expect(actual).toEqual('true');
        // });

        it('should show open when garage state is closed', () => {
            garagePanel.state().isGarageOpen = false;
            garagePanel.instance().forceUpdate();

            const actual = garagePanel.find('button').text();
            expect(actual).toEqual('Open');
        });

        it('should show close when garage state is open', () => {
            garagePanel.state().isGarageOpen = true;
            garagePanel.instance().forceUpdate();

            const actual = garagePanel.find('button').text();
            expect(actual).toEqual('Close');
        });

        it('should show garage status as open when state set to true', () => {
            garagePanel.state().isGarageOpen = true;
            garagePanel.instance().forceUpdate();

            const actual = garagePanel.find('.door-status').text();
            expect(actual).toEqual('Door Status: Open');
        });

        it('should show garage status as closed when state set to false', () => {
            garagePanel.state().isGarageOpen = false;
            garagePanel.instance().forceUpdate();

            const actual = garagePanel.find('.door-status').text();
            expect(actual).toEqual('Door Status: Closed');
        });
    });
});