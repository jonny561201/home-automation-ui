import React from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';
import * as lib from '../../../../utilities/RestApi';
import { Context } from '../../../../state/Store';
import SwitchSlider from '../../../../pages/Home/segments/SwitchSlider';


describe('SwitchSlider', () => {
    const lightId = '1';
    const bearer = 'aksjdf876';
    const light = { 'lightName': 'desk lamp', 'on': true, 'brightness': 123, 'lightId': lightId, 'groupId': 1 };
    const group = {
        'groupId': 1, 'groupName': 'Living Room', 'on': true,
        'brightness': 155, 'lights': [light]
    }
    const spySetLight = jest.spyOn(lib, 'setLightState');

    const renderComponent = async (group) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ lights: [group], auth: { bearer: bearer } }, () => { }]}>
                    <SwitchSlider data={light} lightId={lightId} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spySetLight.mockClear();
    });

    // it('should make api call when toggling on the desk lamp', async () => {
    //     await renderComponent(group);

    //     await act(async () => {
    //         // fireEvent.change(screen.getByTestId('light-switch'), { target: { value: 25 } });
    //         fireEvent.click(screen.getByRole('slider'));
    //     });

    //     expect(spySetLight).toHaveBeenCalled();
    // });

    it('should display the light name', async () => {
        await renderComponent(group);
        expect((screen.getByText('desk lamp')).textContent).toEqual('desk lamp');
    });

    it('should display the slider', async () => {
        await renderComponent(group);
        expect((screen.getByRole('slider'))).toBeDefined();
    });

    it('should make api call to turn off light on first click of button', async () => {
        await renderComponent(group);
        await act(async () => {
            fireEvent.click(screen.getByRole('button', {name: light.lightName}));
        });

        expect(spySetLight).toHaveBeenCalledWith(bearer, light.lightId, false, 0);
    });

    it('should make api call to turn on light on first click of button', async () => {
        const light = { 'lightName': 'desk lamp', 'on': false, 'brightness': 123, 'lightId': lightId, 'groupId': 1 };
        const offGroup = {
            'groupId': 1, 'groupName': 'Living Room', 'on': true,
            'brightness': 155, 'lights': [light]
        }
        await renderComponent(offGroup);
        await act(async () => {
            fireEvent.click(screen.getByRole('button', {name: light.lightName}));
        });

        expect(spySetLight).toHaveBeenCalledWith(bearer, light.lightId, true, 0);
    });
});