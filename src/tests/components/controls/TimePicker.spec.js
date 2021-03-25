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
        const actual = screen.getByRole('textbox');
        expect(actual.value).toEqual('09:00 AM')
    });

    it('should display the current time when initial value not supplied', async () => {
        await renderComponent(undefined);
        const actual = screen.getByRole('textbox');
        const date = new Date();
        expect(actual.value).toContain(`${date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true })}`)
    });
});