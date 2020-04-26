import React from 'react';
import { shallow, mount } from 'enzyme';
import * as lib from '../../../utilities/RestApi';
import LightingPanel from '../../../components/panels/LightingPanel';
import { act } from 'react-dom/test-utils';

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

    describe('useEffect', () => {

        it('should make api call to get lighting groups', async () => {
            await act(async () => {
                mount(<LightingPanel />);
            });
            expect(spyGet).toHaveBeenCalledTimes(1);
        });

        // TODO: NEED TO FIX TEST!!!
        // it('should render a button for every group in response', async () => {
        //     const response = [{groupId: "1",groupName: "LivingRoom",on: false,brightness: 127}, {groupId: "1",groupName: "LivingRoom",on: false,brightness: 127}];
        //     spyGet.mockReturnValue(response);
        //     const panel = mount(<LightingPanel />);

        //     await act(async () => {
        //         const actual = panel.find('LightSwitch');
        //         console.log('----------Actual:', actual)
        //         expect(actual.length).toEqual(2);
        //     });
        // });
    });
});