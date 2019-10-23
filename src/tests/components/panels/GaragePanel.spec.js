import React from 'react';
import { shallow } from 'enzyme';
import GaragePanel from "../../../components/panels/GaragePanel";

describe('GaragePanel', () => {
    let garagePanel;
    const mockGetStatus = jest.fn();
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

        it('should store garage status in state', () => {
            mockGetStatus.mockImplementation(() => 'true');
            const test = shallow(<GaragePanel apiRequests={mockRequests} />);
            const actual = test.state().isGarageOpen;
            expect(actual).toEqual('true');
        });
    });
});