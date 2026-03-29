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
        const actual = screen.getByRole('spinbutton', { name: /hours/i });
        expect(actual).toBeTruthy();
        expect(actual.getAttribute('aria-valuenow')).toEqual('9');
    });

    it('should display the current time when initial value not supplied', async () => {
        await renderComponent(undefined);
        const actual = screen.getByRole('spinbutton', { name: /hours/i });
        expect(actual).toBeTruthy();
        const actualHour = parseInt(actual.getAttribute('aria-valuenow'));
        expect(actualHour).toBeGreaterThanOrEqual(1);
        expect(actualHour).toBeLessThanOrEqual(12);
    });
});


