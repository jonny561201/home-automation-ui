import React from 'react';
import { shallow } from 'enzyme';
import TemperaturePanel from '../../../components/panels/TemperaturePanel';

describe('TemperaturePanel', () => {
    let tempPanel;

    beforeEach(() => {
        tempPanel = shallow(<TemperaturePanel />);
    });

    it('should display temperature panel', () => {
        const actual = tempPanel.find('.temperature-panel');
        expect(actual).toHaveLength(1);
    })

    it('should display temperature icon', () => {
        const actual = tempPanel.find('.temperature-panel img').prop('alt');
        expect(actual).toEqual('temperature');
    });
});