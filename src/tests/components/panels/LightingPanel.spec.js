import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../../utilities/RestApi';
import LightingPanel from '../../../components/panels/LightingPanel';

describe('LightingPanel', () => {

    let lightingPanel;
    const spyGet = jest.spyOn(lib, 'getLightGroups');

    beforeEach(() => {
        spyGet.mockClear();
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

    describe('ComponentDidMount', () => {

        it('should make api call to get lighting groups', () => {
            expect(spyGet).toHaveBeenCalledTimes(1);
        });
    });
});