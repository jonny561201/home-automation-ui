import React from 'react';
import * as lib from '../../../utilities/RestApi';
import { render, screen, act, fireEvent } from '@testing-library/react';
import SettingsEditPanel from '../../../components/panels/SettingsEditPanel';
import '@testing-library/jest-dom';
import { getStore } from '../../../state/GlobalState';
import { Context } from '../../../state/Store';

describe('Settings Edit Panel', () => {
    const userId = 'fakeUserId';
    const days = 'MonTue';
    const time = '01:00:00';
    const groupName = 'Bedroom';
    const groups = [{groupId: '1', groupName: groupName}];
    const spyUpdate = jest.spyOn(lib, 'updateUserPreferences');

    const renderComponent = async (alarmDays, alarmTime, alarmName) => {
        await act(async () => {
            render(
                <Context.Provider value={[{userLightGroups: groups}, () => { }]}>
                    <SettingsEditPanel tempUnit={"fahrenheit"} measureUnit={"imperial"} days={alarmDays} time={alarmTime} groupName={alarmName} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        getStore().setUserId(userId);
        spyUpdate.mockClear();
    });

    it('should display save button to submit updated preferences', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByText('Save').textContent;
        expect(actual).toEqual('Save');
    });

    it('should display the cancel button', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByText('Cancel').textContent;
        expect(actual).toEqual('Cancel');
    });

    it('should display the radio buttons for celsius and fahrenheit', async () => {
        await renderComponent(days, time, groupName);
        const fahrenheitRadio = screen.getAllByRole('radio')[0];
        const celciusRadio = screen.getAllByRole('radio')[1];
        expect(fahrenheitRadio).toHaveAttribute('value', 'fahrenheit');
        expect(celciusRadio).toHaveAttribute('value', 'celsius');
    });

    it('should display city input textbox', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getAllByRole('textbox')[0];
        expect(actual).toBeDefined();
    })

    it('should display Temperature header', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByText('Temperature').textContent;
        expect(actual).toEqual('Temperature');
    });

    it('should display the Measurement header', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByText('Measurement').textContent;
        expect(actual).toEqual('Measurement');
    });

    it('should display the radio buttons for imperial and metric', async () => {
        await renderComponent(days, time, groupName);
        const imperialRadio = screen.getAllByRole('radio')[2];
        const metricRadio = screen.getAllByRole('radio')[3];
        expect(imperialRadio).toHaveAttribute('value', 'imperial');
        expect(metricRadio).toHaveAttribute('value', 'metric');
    });

     it('should display the time picker', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByTestId('time-picker');
        expect(actual).toBeDefined();
     });

     it('should display the light room label', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByText('Room');
        expect(actual).toBeDefined();
     });

     it('should display the light room name selector', async () => {
        await renderComponent(days, time, groupName);
        const actual = screen.getByTestId('alarm-room-picker');
        expect(actual).toBeDefined();
     });

     it('should display the drop down options in the menu', async () => {
        await renderComponent(days, time, groupName);
        await act(async () => {
            fireEvent.click(screen.getByTestId('alarm-room-picker'));
        });
        const actual = screen.getByText(groupName).textContent;
        expect(actual).toEqual(groupName);
     });
});