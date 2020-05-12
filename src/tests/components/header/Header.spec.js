import React from 'react';
import { render, screen } from '@testing-library/react';
import Header from '../../../components/header/Header';
import { getStore } from '../../../state/GlobalState';

describe('HeaderComponent', () => {
    const expectedPage = 'Home Automation';

    beforeEach(() => {
        getStore().setActivePage(expectedPage);
    });

    it('should display header text', () => {
        render(<Header />);
        const actual = screen.getByText(expectedPage).textContent;
        expect(actual).toEqual(expectedPage);
    });

    it('should display company logo', () => {
        render(<Header />);
        const actual = screen.getByRole('img');
        expect(actual).toBeDefined();
    });

    it('should display account icon', () => {
        render(<Header />);
        const actual = screen.getByTestId('user-initials');
        expect(actual).toBeDefined();
    });
});