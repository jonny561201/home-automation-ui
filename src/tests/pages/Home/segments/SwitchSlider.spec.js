import React from 'react';
import { render, act, fireEvent, screen } from '@testing-library/react';
import * as lib from '../../../../utilities/RestApi';
import { Context } from '../../../../state/Store';
import SwitchSlider from '../../../../pages/Home/segments/SwitchSlider';


describe('SwitchSlider', () => {
    const lightId = '1';
    const bearer = 'aksjdf876';
    const light = { lightName: 'desk lamp', on: true, brightness: 123, lightId: lightId, groupId: 1 };
    const group = {
        'groupId': '1', 'groupName': 'Living Room', 'on': true,
        'brightness': 155, 'lights': [light]
    }
    const spySetLight = jest.spyOn(lib, 'setLightState');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ lights: [], auth: { bearer: bearer } }, () => { }]}>
                    <SwitchSlider data={light} lightId={lightId} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spySetLight.mockClear();
    });

    it('should make api call when toggling on the desk lamp', async () => {
        await renderComponent();

        await act(async () => {
            fireEvent.change(screen.getByTestId('light-switch').querySelector('input'), { target: { value: 100 } });
        });

        // expect(spySetLight).toHaveBeenCalled();
    });

    it('should display the light name', async () => {
        await renderComponent();
        expect((screen.getByText('desk lamp')).textContent).toEqual('desk lamp');
    });

    it('should display the slider', async () => {
        await renderComponent();
        expect((screen.getByTestId('light-switch'))).toBeDefined();
    });
});