import React from 'react';
import { shallow } from 'enzyme';
import BasementPanel from '../../../components/panels/BasementPanel';

describe('BasementPanel', () => {

    let basementPanel;

    beforeEach(() => {
        basementPanel = shallow(<BasementPanel />);
    });

    it('should show the Basement Panel', () => {
        const actual = basementPanel.find('.basement-panel');
        expect(actual).toHaveLength(1);
    });

    it('should show basement icon', () => {
        const actual = basementPanel.find('.basement-panel img').prop('alt');
        expect(actual).toEqual('basement');
    });
});