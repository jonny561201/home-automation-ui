import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as lib from '../../utilities/RestApi';
import LightSwitch from '../../components/controls/LightSwitch';
import { Context } from '../../state/Store';


vi.mock('../../pages/Home/segments/SwitchSlider', () => ({ default: (props) => <div role="region" aria-label="light switch slider">{props.data?.lightName || 'Light'}</div> }));


describe('LightSwitch', () => {
    const bearer = 'akjshdf897';
    const groupName = 'DinningRoom';
    const lights = [
        { 'lightName': 'desk lamp', 'on': true, 'brightness': 123, 'lightId': 1, 'groupId': 1 },
        { 'lightName': 'table lamp', 'on': false, 'brightness': 76, 'lightId': 2, 'groupId': 2 }
    ]
    const group = {
        'groupId': '1', 'groupName': groupName, 'on': true,
        'brightness': 155, 'lights': lights
    }
    const spySetGroup = vi.spyOn(lib, 'setLightGroupState');

    const renderComponent = async (groupData) => {
        render(
            <Context.Provider value={[{ lights: [groupData], auth: { bearer: bearer } }, () => { }]}> 
                <LightSwitch data={groupData} />
            </Context.Provider >
        );
    }

    beforeEach(() => {
        spySetGroup.mockClear();
    });

    it('should display the group name for the group light switch', async () => {
        await renderComponent(group);
        const actual = screen.getByText(groupName);
        expect(actual).toBeDefined();
    });

    it('should display the expansion icon', async () => {
        await renderComponent(group);
        const actual = screen.getByRole('button', { name: 'expand' });

        expect(actual).toBeDefined();
    });

    it('should display the group light switch button', async () => {
        await renderComponent(group);
        const actual = screen.getByRole('slider');
        expect(actual).toBeDefined();
    });

    //TODO: need to get testing working on slider components...
    it('should call set light group state on toggleChecked', async () => {
        await renderComponent(group);
        fireEvent.change(screen.getByRole('slider'), { target: { value: 0 } });
        // fireEvent.click(screen.getByRole('checkbox'));

        // expect(spySetGroup).toBeCalledWith(bearer, groups.groupId, true, 0);
    });

    describe('Light Expansion', () => {

        it('should display expansion panel when areLightsOpen is true', async () => {
            await renderComponent(group);
            fireEvent.click(screen.getByRole('button', { name: 'expand' }));
            const actual = screen.getAllByRole('region', { name: /light switch slider/i });
            expect(actual.length).toBeGreaterThan(0);
        });

        it('should not display expansion panel when areLightsOpen is false', async () => {
            await renderComponent(group);
            const actual = screen.queryAllByRole('region', { name: /light switch slider/i });
            expect(actual).toHaveLength(0);
        });

        it('should display all light switches', async () => {
            await renderComponent(group);
            fireEvent.click(screen.getByRole('button', { name: 'expand' }));
            const actual = screen.getAllByRole('region', { name: /light switch slider/i });
            expect(actual).toHaveLength(2);
        });

        it('should not display light switches when not expanded', async () => {
            await renderComponent(group);
            const actual = screen.queryAllByRole('region', { name: /light switch slider/i });
            expect(actual).toHaveLength(0);
        });

        it('should display message that there are null lights for a group when zero lights', async () => {
            const data = {
                'groupId': '1', 'groupName': groupName, 'on': true,
                'brightness': 155, 'lights': null
            }
            await renderComponent(data);
            fireEvent.click(screen.getByRole('button', { name: 'expand' }));
            const actual = screen.getByText('No lights assigned to group');

            expect(actual).toBeTruthy();
        });

        it('should display message that there are empty lights for a group when zero lights', async () => {
            const data = {
                'groupId': '1', 'groupName': groupName, 'on': true,
                'brightness': 155, 'lights': []
            }
            await renderComponent(data);
            fireEvent.click(screen.getByRole('button', { name: 'expand' }));
            const actual = screen.getByText('No lights assigned to group');

            expect(actual).toBeTruthy();
        });

        it('should call api to turn off light when button clicked', async () => {
            await renderComponent(group);
            fireEvent.click(screen.getByRole('button', { name: group.groupName }));
            expect(spySetGroup).toHaveBeenCalledWith(bearer, group.groupId, false);
        });

        it('should call api to turn on light when button clicked', async () => {
            const newGroup = {
                'groupId': '1', 'groupName': groupName, 'on': false,
                'brightness': 155, 'lights': [{'lightName': 'test lamp'}]
            }

            await renderComponent(newGroup);
            fireEvent.click(screen.getByRole('button', { name: group.groupName }));
            expect(spySetGroup).toHaveBeenCalledWith(bearer, group.groupId, true);
        });
    });
})