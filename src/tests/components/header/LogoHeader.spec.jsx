import React from 'react';
import { render, screen } from '@testing-library/react';
import LogoCircle from '../../../components/header/LogoHeader';

describe('LogoHeader', () => {

    it("should contain logo image", () => {
        render(<LogoCircle />);
        const actual = screen.getByRole('img');
        expect(actual).toBeDefined();
    });

    it("should contain white logo border", () => {
        render(<LogoCircle />);
        const actual = screen.getByTestId('white-header');
        expect(actual).toBeDefined();
    });

    it("should contain brown logo background", () => {
        render(<LogoCircle />);
        const actual = screen.getByTestId('logo-background');
        expect(actual).toBeDefined();
    });
});