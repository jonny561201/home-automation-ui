import React from 'react';
import { render, screen } from '@testing-library/react'
import RegisterDevice from '../../../components/panels/RegisterDevice';

describe('Add Device', () => {

    it('should display Add Device text', () => {
        render(<RegisterDevice />)
        const actual = screen.getByTestId('data-add-device');

        expect(actual.textContent).toEqual("Add Device");
    });

});