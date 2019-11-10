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
        const actual = tempPanel.find('.logo-image').prop('alt');
        expect(actual).toEqual('temperature');
    });

    describe('ComponentDidMount', () => {

        const internalTemp = 72.8;
        const externalTemp = 32.7;

        it('should make api to get current weather', () => {
            expect(mockRequests).toHaveBeenCalledTimes(1);
            expect(mockRequests).toBeCalledWith(userId);
        });

        it('should show the internal temperature', () => {
            tempPanel.state().internalTemp = internalTemp;
            tempPanel.instance().forceUpdate();

            const actual = tempPanel.find('.internal-temp').text();
            expect(actual).toEqual(internalTemp.toString());
        });

        it('should show the external temperature', () => {
            tempPanel.state().externalTemp = externalTemp;
            tempPanel.instance().forceUpdate();

            const actual = tempPanel.find('.external-temp').text();
            expect(actual).toEqual(externalTemp.toString());
        });
    });
});