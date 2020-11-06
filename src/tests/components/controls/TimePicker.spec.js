import React from 'react';
import { render, screen } from '@testing-library/react';
import TimePicker from '../../../components/controls/TimePicker';


describe('Time Picker', () => {
    const time = '09:00:00';

    const renderComponent = async () => {
        render(<TimePicker initialTime={time}/>);
    }

    it('should display the current time', async () => {
        await renderComponent();
        const actual = screen.getByRole('textbox');
        expect(actual.value).toEqual('09:00 AM')
    });
});