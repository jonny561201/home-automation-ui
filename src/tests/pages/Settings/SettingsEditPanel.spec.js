import React from 'react';
import * as lib from '../../../utilities/RestApi';
import { render, screen, act } from '@testing-library/react';
import SettingsEditPanel from '../../../pages/Settings/SettingsEditPanel';
import '@testing-library/jest-dom';
import { Context } from '../../../state/Store';


describe('Settings Edit Panel', () => {
    const userId = 'fakeUserId';
    const bearer = 'asdf8o6sdf';
    const roles = [{ "role_name": "lighting" }];
    const user = { userId: userId, roles: roles }
    const preference = { city: 'Des Moines', temp_unit: 'fahrenheit', measureUnit: 'impreial' };
    const spyUpdate = jest.spyOn(lib, 'updateUserPreferences');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{ garageDoors: [], auth: { bearer: bearer }, preferences: preference, daysOfWeek: [], user: user }, () => { }]}>
                    <SettingsEditPanel tempUnit={"fahrenheit"} measureUnit={"imperial"} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyUpdate.mockClear();
    });

    it('should display save button to submit updated preferences', async () => {
        await renderComponent();
        const actual = screen.getByText('Save').textContent;
        expect(actual).toEqual('Save');
    });

    it('should display the cancel button', async () => {
        await renderComponent();
        const actual = screen.getByText('Cancel').textContent;
        expect(actual).toEqual('Cancel');
    });

    it('should display the radio buttons for celsius and fahrenheit', async () => {
        await renderComponent();
        const fahrenheitRadio = screen.getAllByRole('radio')[0];
        const celciusRadio = screen.getAllByRole('radio')[1];
        expect(fahrenheitRadio).toHaveAttribute('value', 'fahrenheit');
        expect(celciusRadio).toHaveAttribute('value', 'celsius');
    });

    it('should display city input textbox', async () => {
        await renderComponent();
        const actual = screen.getAllByRole('textbox')[0];
        expect(actual).toBeDefined();
    })

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

    it('should display the radio buttons for imperial and metric', async () => {
        await renderComponent();
        const imperialRadio = screen.getAllByRole('radio')[2];
        const metricRadio = screen.getAllByRole('radio')[3];
        expect(imperialRadio).toHaveAttribute('value', 'imperial');
        expect(metricRadio).toHaveAttribute('value', 'metric');
    });

    it('should display the Garage header', async () => {
        await renderComponent();
        const actual = screen.getByText('Garage').textContent;
        expect(actual).toEqual('Garage');
    });

    it('should display the garage door drop down', async () => {
        await renderComponent();
        const imperialRadio = screen.getAllByRole('radio')[2];
        const metricRadio = screen.getAllByRole('radio')[3];
        expect(imperialRadio).toHaveAttribute('value', 'imperial');
        expect(metricRadio).toHaveAttribute('value', 'metric');
    });
});