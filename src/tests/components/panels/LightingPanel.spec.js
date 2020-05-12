import React from 'react';
import { render, screen } from '@testing-library/react';
import * as lib from '../../../utilities/RestApi';
import LightingPanel from '../../../components/panels/LightingPanel';

describe('LightingPanel', () => {

    const spyGet = jest.spyOn(lib, 'getLightGroups');

    beforeEach(() => {
        spyGet.mockClear();
    });

    it('should show the Lighting Panel text', () => {
        render(<LightingPanel />);
        const actual = screen.getByText('Lighting').textContent;
        expect(actual).toEqual('Lighting');
    });

    it('should show lighting icon', () => {
        render(<LightingPanel />);
        const actual = screen.getByRole('img');
        expect(actual).toBeDefined();
    });

    describe('useEffect', () => {

        it('should make api call to get lighting groups', async () => {
            render(<LightingPanel />);
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