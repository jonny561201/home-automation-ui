import React from 'react';
import { render, screen } from '@testing-library/react';
import SettingsPanel from '../../../components/panels/SettingsPanel';


describe('Settings Panel', () => {

    it('should display edit button', () => {
        render(<SettingsPanel />);
        const actual = screen.getByRole('button').textContent;
        expect(actual).toEqual('Edit');
    });

    it('should display the unit text for temperature', () => {
        render(<SettingsPanel />);
        const actual = screen.getAllByText('Unit:')[0].textContent;
        expect(actual).toEqual('Unit:');
    });

    it('should display the fahrenheit setting stored in state', () => {
        const tempUnit = 'fahrenheit'
        render(<SettingsPanel tempUnit={tempUnit}/>);
        const actual = screen.getByText(tempUnit).textContent;
        expect(actual).toEqual(tempUnit);
    });

    it('should display the city text for temperature', () => {
        render(<SettingsPanel />);
        const actual = screen.getByText('City:').textContent;
        expect(actual).toEqual('City:');
    });

    it('should display the currently city setting stored in state', () => {
        const city = 'Vienna';
        render(<SettingsPanel city={city} />);
        const actual = screen.getByText(city).textContent;
        expect(actual).toEqual(city);
    });

    it('should display Temperature header', () => {
        render(<SettingsPanel />);
        const actual = screen.getByText('Temperature').textContent;
        expect(actual).toEqual('Temperature');
    });

    it('should display the Measurement header', () => {
        render(<SettingsPanel />);
        const actual = screen.getByText('Measurement').textContent;
        expect(actual).toEqual('Measurement');
    });

    it('should display the unit text for measurement', () => {
        render(<SettingsPanel />);
        const actual = screen.getAllByText('Unit:')[1].textContent;
        expect(actual).toEqual('Unit:');
    });

    it('should display the measurement unit stored in state', () => {
        const measureUnit = 'imperial';
        render(<SettingsPanel measureUnit={measureUnit}/>);
        const actual = screen.getByText(measureUnit).textContent;
        expect(actual).toEqual(measureUnit);
    });

    it('should display Light Alarm header', () => {
        render(<SettingsPanel />);
        const actual = screen.getByText('Light Alarm').textContent;
        expect(actual).toEqual('Light Alarm');
    });

    it('should display the alarm room text for measurement', () => {
        render(<SettingsPanel />);
        const actual = screen.getByText('Alarm Room:').textContent;
        expect(actual).toEqual('Alarm Room:');
    });

    it('should display the current alarm room setting stored in state', () => {
        const room = 'BedRoom';
        render(<SettingsPanel room={room} />);
        const actual = screen.getByText(room).textContent;
        expect(actual).toEqual(room);
    });

    it('should display the alarm time for measurement', () => {
        render(<SettingsPanel />);
        const actual = screen.getByText('Alarm Time:').textContent;
        expect(actual).toEqual('Alarm Time:');
    });

    it('should display the current alarm time setting stored in state', () => {
        const time = '07:30:00';
        render(<SettingsPanel time={time} />);
        const actual = screen.getByText(time).textContent;
        expect(actual).toEqual(time);
    });
});