import React from 'react';
import { Context } from '../../../state/Store';
import LocateGarage from '../../../components/segments/LocateGarage';
import { act, render, screen } from '@testing-library/react';

describe('Locate Garage', () => {
    const coords = { latitude: 23.1234, longitude: -32.1234 }

    const renderComponent = async (coordinates) => {
        await act(async () => {
            render(
                <Context.Provider value={[{ garageCoords: coordinates }, () => { }]}>
                    <LocateGarage />
                </Context.Provider>
            );
        });
    }

    it('should display the header to locate the garage door', async () => {
        await renderComponent(null);
        const actual = screen.getByText('Set Garage Location');
        expect(actual).toBeDefined();
    });

    it('should display the helper text for adding garage location when one not provided ', async () => {
        await renderComponent(null);
        const actual = screen.getByTestId('locate-garage-paragraph').textContent;
        expect(actual).toEqual("To locate your garage; please stand in the center of the garage and click the 'Add' button");
    });

    it('should display the add button when location not provided', async () => {
        await renderComponent(null);
        const actual = screen.getByTestId('locate-garage-button').textContent;
        expect(actual).toEqual('Add');
    });

});