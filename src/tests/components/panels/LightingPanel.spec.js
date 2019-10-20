import React from 'react';
import { shallow } from 'enzyme';
import LightingPanel from '../../../components/panels/LightingPanel';

describe('LightingPanel', () => {

    let lightingPanel;

    beforeEach(() => {
        lightingPanel = shallow(<LightingPanel />);
    });

    it('should show the Lighting Panel', () => {
        const actual = lightingPanel.find('.lighting-panel');
        expect(actual).toHaveLength(1);
    });

    it('should show lighting icon', () => {
        const actual = lightingPanel.find('.lighting-panel img').prop('alt');
        expect(actual).toEqual('lighting');
    });
});