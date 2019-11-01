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
        const actual = basementPanel.find('.summary img').prop('alt');
        expect(actual).toEqual('basement');
    });

    it('should show sump pump icon', () => {
        const actual = basementPanel.find('.center img');
        expect(actual).toHaveLength(1);
    });

    it('should display sump depth text', () => {
        const actual = basementPanel.find('.sump-text p').text();
        expect(actual).toEqual('Depth: ');
    });
});