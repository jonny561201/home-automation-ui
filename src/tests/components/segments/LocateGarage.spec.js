import React from 'react';
import LocateGarage from '../../../components/segments/LocateGarage';
import { act, render, screen } from '@testing-library/react';

describe('Locate Garage', () => {

    const renderComponent = async () => {
        await act(async () => {
            render(<LocateGarage />);
        });
    }

    it('should display the header to locate the garage door', async () => {
        await renderComponent();
        const actual = screen.getByText('Set Garage Location');
    });
});