import React from 'react';
import { shallow } from 'enzyme';
import TemperaturePanel from '../../../components/panels/TemperaturePanel';

describe('TemperaturePanel', () => {
    let tempPanel;
    let userId = 'fakeUserId'
    let mockRequests = jest.fn();
    let apiRequests = { getCurrentTemperature: mockRequests, userId: userId };

    beforeEach(() => {
        mockRequests.mockClear();
        tempPanel = shallow(<TemperaturePanel apiRequests={apiRequests} />);
    });

    it('should display temperature panel', () => {
        const actual = tempPanel.find('.temperature-panel');
        expect(actual).toHaveLength(1);
    })

    it('should display temperature icon', () => {
        const actual = tempPanel.find('.temperature-panel img').prop('alt');
        expect(actual).toEqual('temperature');
    });

    describe('ComponentDidMount', () => {
        it('should make api to get current weather', () => {
            expect(mockRequests).toHaveBeenCalledTimes(1);
            expect(mockRequests).toBeCalledWith(userId);
        });
    });
});