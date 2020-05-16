import React from 'react';
import { render, screen, act } from '@testing-library/react';
import SettingsEditPanel from '../../../components/panels/SettingsEditPanel';
import '@testing-library/jest-dom';

describe('Settings Edit Panel', () => {

    const renderComponent = async () => {
        await act(async() => {
            render(<SettingsEditPanel />);
        });
    }

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
        const actual = screen.getByRole('textbox');
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
});