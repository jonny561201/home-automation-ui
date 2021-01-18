import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsPanel from '../../../components/panels/SettingsPanel';
import { Context } from '../../../state/Store';


describe('Settings Panel', () => {
    let roles;
    const city = 'Vienna';
    const room = 'BedRoom';
    const time = '07:30:00';
    const tempUnit = 'fahrenheit';
    const measureUnit = 'imperial';
    const days = 'MonTueWedThuFri';

    const renderComponent = async () => {
        render(
            <Context.Provider value={[{ roles: roles }, () => { }]}>
                <SettingsPanel />
            </Context.Provider>
        );
    }

    const renderComponentCustom = async () => {
        render(
            <Context.Provider value={[{ roles: roles }, () => { }]}>
                <SettingsPanel tempUnit={tempUnit} city={city} measureUnit={measureUnit} groupName={room} time={time} days={days}/>
            </Context.Provider>
        );
    }

    beforeEach(() => {
        roles = [{"role_name": "lighting"}]
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