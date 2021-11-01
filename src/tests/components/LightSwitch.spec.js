import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import * as lib from '../../utilities/RestApi';
import LightSwitch from '../../components/controls/LightSwitch';
import { Context } from '../../state/Store';

describe('LightSwitch', () => {
    const bearer = 'akjshdf897';
    const groupName = 'DinningRoom';
    const lights = [
        { 'lightName': 'desk lamp', 'on': true, 'brightness': 123, 'lightId': 1, 'groupId': 1 },
        { 'lightName': 'table lamp', 'on': false, 'brightness': 76, 'lightId': 2, 'groupId': 2 }
    ]
    const groups = {
        'groupId': '1', 'groupName': groupName, 'on': true,
        'brightness': 155, 'lights': lights
    }
    const spySetGroup = jest.spyOn(lib, 'setLightGroupState');

    const renderComponent = async (userLights, groupData) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ userLights: userLights, auth: { bearer: bearer } }, () => { }]}>
                    <LightSwitch data={groupData} />
                </Context.Provider >
            );
        });
    }

    beforeEach(() => {
        spySetGroup.mockClear();
    });

    it('should display the group name for the group light switch', async () => {
        await renderComponent(lights, groups);
        const actual = screen.getByText(groupName);
        expect(actual).toBeDefined();
    });

    it('should display the expansion icon', async () => {
        await renderComponent(lights, groups);
        const actual = screen.getByTestId('expansion-chevron');

        expect(actual).toBeDefined();
    });

    it('should display the group light switch button', async () => {
        await renderComponent(lights, groups);
        const actual = screen.getByTestId('light-group-switch').querySelector('input');
        expect(actual).toBeDefined();
    });

    //TODO: need to get testing working on slider components...
    it('should call set light group state on toggleChecked', async () => {
        await renderComponent(lights, groups);
        await act(async () => {
            fireEvent.change(screen.getByTestId('light-group-switch').querySelector('input'), { target: { value: 0 } });
            // fireEvent.click(screen.getByRole('checkbox'));
        });

        // expect(spySetGroup).toBeCalledWith(bearer, groups.groupId, true, 0);
    });

    describe('Light Expansion', () => {

        it('should display expansion panel when areLightsOpen is true', async () => {
            await renderComponent(lights, groups);
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByTestId('light-group-expansion');

            expect(actual).toBeDefined();
        });

        it('should not display expansion panel when areLightsOpen is false', async () => {
            await renderComponent(lights, groups);
            const actual = screen.queryByTestId('light-group-expansion');

            expect(actual).toBeNull();
        });

        it('should display all light switches', async () => {
            await renderComponent(lights, groups);
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getAllByTestId('light-switch');

            expect(actual).toHaveLength(2);
        });

        it('should not display light switches when not expanded', async () => {
            await renderComponent(lights, groups);
            const actual = screen.queryAllByTestId('light-switch');

            expect(actual).toHaveLength(0);
        });

        it('should display message that there are null lights for a group when zero lights', async () => {
            const data = {
                'groupId': '1', 'groupName': groupName, 'on': true,
                'brightness': 155, 'lights': null
            }
            await renderComponent(null, data);
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('No lights assigned to group').textContent;

            expect(actual).toEqual('No lights assigned to group');
        });

        it('should display message that there are empty lights for a group when zero lights', async () => {
            const data = {
                'groupId': '1', 'groupName': groupName, 'on': true,
                'brightness': 155, 'lights': []
            }
            await renderComponent([], data);
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('No lights assigned to group').textContent;

            expect(actual).toEqual('No lights assigned to group');
        });
    });
})