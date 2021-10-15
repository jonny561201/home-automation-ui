import React from 'react';
import { Context } from '../../../state/Store';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../state/GlobalState';
import { render, screen, } from '@testing-library/react';
import SettingsPanel from '../../../pages/Settings/SettingsPanel';
import { act } from 'react-dom/test-utils';


describe('Settings Panel', () => {
    let roles;
    const userId = 'ascv123';
    const city = 'Vienna';
    const room = 'BedRoom';
    const time = '07:30:00';
    const tempUnit = 'fahrenheit';
    const measureUnit = 'imperial';
    const days = 'MonTueWedThuFri';

    const spyGet = jest.spyOn(lib, 'getScheduledTasks');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ roles: roles }, () => { }]}>
                    <SettingsPanel/>
                </Context.Provider>
            );
        });
    }

    const renderComponentCustom = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ roles: roles }, () => { }]}>
                    <SettingsPanel tempUnit={tempUnit} city={city} measureUnit={measureUnit}/>
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyGet.mockClear();
        getStore().setUserId(userId);
        roles = [{"role_name": "lighting"}];
        spyGet.mockReturnValue([{ alarm_group_name: room, alarm_light_group: '2', alarm_days: days, alarm_time: time }]);
    });

    it('should display edit button', async () => {
        await renderComponent();
        const actual = screen.getByRole('button').textContent;
        expect(actual).toEqual('Edit');
    });

    it('should display the unit text for temperature', async () => {
        await renderComponent();
        const actual = screen.getAllByText('Unit:')[0].textContent;
        expect(actual).toEqual('Unit:');
    });

    it('should display the fahrenheit setting stored in state', async () => {
        await renderComponentCustom();
        const actual = screen.getByText(tempUnit).textContent;
        expect(actual).toEqual(tempUnit);
    });

    it('should display the city text for temperature', async () => {
        await renderComponent();
        const actual = screen.getByText('City:').textContent;
        expect(actual).toEqual('City:');
    });

    it('should display the currently city setting stored in state', async () => {
        await renderComponentCustom();
        const actual = screen.getByText(city).textContent;
        expect(actual).toEqual(city);
    });

    it('should display Temperature header', async () => {
        await renderComponent();
        const actual = screen.getByText('Temperature').textContent;
        expect(actual).toEqual('Temperature');
    });

    it('should display the Measurement header', async () => {
        await renderComponent();
        const actual = screen.getByText('Measurement').textContent;
        expect(actual).toEqual('Measurement');
    });

    it('should display the unit text for measurement', async () => {
        await renderComponent();
        const actual = screen.getAllByText('Unit:')[1].textContent;
        expect(actual).toEqual('Unit:');
    });

    it('should display the measurement unit stored in state', async () => {
        await renderComponentCustom();
        const actual = screen.getByText(measureUnit).textContent;
        expect(actual).toEqual(measureUnit);
    });
});