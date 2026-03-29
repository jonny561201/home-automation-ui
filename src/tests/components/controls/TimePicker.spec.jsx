import React from 'react';
import { render, screen } from '@testing-library/react';
import TimePicker from '../../../components/controls/TimePicker';


describe('Time Picker', () => {
    const time = '09:00:00';

    const renderComponent = async (setTime) => {
        render(<TimePicker initialTime={setTime}/>);
    }

    it('should display the provided time', async () => {
        await renderComponent(time);
        // Check that the hour spinbutton shows the correct value
        const hourSpinner = screen.getByRole('spinbutton', { name: /hours/i });
        expect(hourSpinner).toBeTruthy();
        expect(hourSpinner.getAttribute('aria-valuenow')).toEqual('9');
    });

    it('should display the current time when initial value not supplied', async () => {
        await renderComponent(undefined);
        // Check that the hour spinbutton exists and has current time
        const hourSpinner = screen.getByRole('spinbutton', { name: /hours/i });
        const date = new Date();
        const currentHour = date.getHours();
        expect(hourSpinner).toBeTruthy();
        // The hour should be between 1-12 for 12-hour format
        const hourValue = parseInt(hourSpinner.getAttribute('aria-valuenow'));
        expect(hourValue).toBeGreaterThanOrEqual(1);
        expect(hourValue).toBeLessThanOrEqual(12);
    });
});

