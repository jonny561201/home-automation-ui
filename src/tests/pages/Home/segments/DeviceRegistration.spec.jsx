import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import DeviceRegistration from '../../../../pages/Home/segments/DeviceRegistration';


describe('DeviceRegistration', () => {

    const garageDevice = { id: 1, name: 'Garage Hub', type: 'garage_door', registered: false };
    const lightDevice = { id: 2, name: 'Living Room', type: 'lighting', registered: false };
    const thermostatDevice = { id: 3, name: 'Main Thermostat', type: 'thermostat', registered: false };
    const sumpDevice = { id: 4, name: 'Basement Pump', type: 'sump_pump', registered: false };
    const securityDevice = { id: 5, name: 'Front Door', type: 'security', registered: false };

    describe('Before Registration', () => {

        it('should display Register New Device heading', () => {
            render(<DeviceRegistration device={garageDevice} />);
            const actual = screen.getByText('Register New Device!');
            expect(actual).toBeDefined();
        });

        it('should display the device type label for garage', () => {
            render(<DeviceRegistration device={garageDevice} />);
            const actual = screen.getByText(/Garage Door/);
            expect(actual).toBeDefined();
        });

        it('should display the device type label for lighting', () => {
            render(<DeviceRegistration device={lightDevice} />);
            const actual = screen.getByText(/Lighting/);
            expect(actual).toBeDefined();
        });

        it('should display the Register button', () => {
            render(<DeviceRegistration device={garageDevice} />);
            const actual = screen.getByRole('button', { name: 'Register' });
            expect(actual).toBeDefined();
        });
    });

    describe('After clicking Register', () => {

        it('should show AddGarage for garage_door type', async () => {
            render(<DeviceRegistration device={garageDevice} />);
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Register' }));
            });
            const actual = screen.getByText('Add Garage Door');
            expect(actual).toBeDefined();
        });

        it('should show AddLight for lighting type', async () => {
            render(<DeviceRegistration device={lightDevice} />);
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Register' }));
            });
            const actual = screen.getByText('Add Lighting Device');
            expect(actual).toBeDefined();
        });

        it('should show AddThermostat for thermostat type', async () => {
            render(<DeviceRegistration device={thermostatDevice} />);
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Register' }));
            });
            const actual = screen.getByText('Add Thermostat');
            expect(actual).toBeDefined();
        });

        it('should show AddSumpPump for sump_pump type', async () => {
            render(<DeviceRegistration device={sumpDevice} />);
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Register' }));
            });
            const actual = screen.getByText('Add Sump Pump');
            expect(actual).toBeDefined();
        });

        it('should show AddSecurity for security type', async () => {
            render(<DeviceRegistration device={securityDevice} />);
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Register' }));
            });
            const actual = screen.getByText('Add Security Device');
            expect(actual).toBeDefined();
        });
    });
});
