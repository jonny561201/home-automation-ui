import React from 'react';
import { render, screen } from '@testing-library/react';
import AddGarage from "../../../components/panels/AddGarage";

describe('Add Garage', () => {

    it('should display the Add Garage Door text', () => {
        render(<AddGarage />);
        const actual = screen.getByRole('heading').textContent;
        expect(actual).toEqual('Add Garage Door');
    });

    it('should display the Garage Door input box', () => {
        render(<AddGarage />);
        const actual = screen.getByRole('textbox');
        expect(actual).toBeDefined();
    });
});