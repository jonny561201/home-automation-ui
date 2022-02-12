import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GreenButton, BlueButton, RedButton } from '../../../components/controls/Buttons';

describe('Buttons', () => {
    let count = 0;

    beforeEach(() => {
        count = 0;
    });

    describe('Green Button', () => {
        it('should display the text provided to the buttons inner html', () => {
            render(<GreenButton>GreenTest</GreenButton>);
            const actual = screen.getByText('GreenTest');
            expect(actual).toBeTruthy();
        });

        it('should execute function on click', () => {
            const click = () => {count ++}
            render(<GreenButton onClick={click}>Test</GreenButton>);
            fireEvent.click(screen.getByText('Test'));
            expect(count).toEqual(1);
        });
    });

    describe('Blue Button', () => {
        it('Blue Button should display the text provided to the buttons inner html', () => {
            render(<BlueButton>BlueTest</BlueButton>);
            const actual = screen.getByText('BlueTest');
            expect(actual).toBeTruthy();
        });

        it('should execute function on click', () => {
            const click = () => {count ++}
            render(<BlueButton onClick={click}>Test</BlueButton>);
            fireEvent.click(screen.getByText('Test'));
            expect(count).toEqual(1);
        });
    });

    describe('Red Button', () => {

        it('Red Button should display the text provided to the buttons inner html', () => {
            render(<RedButton>RedTest</RedButton>);
            const actual = screen.getByText('RedTest');
            expect(actual).toBeTruthy();
        });

        it('should execute function on click', () => {
            const click = () => {count ++}
            render(<RedButton onClick={click}>Test</RedButton>);
            fireEvent.click(screen.getByText('Test'));
            expect(count).toEqual(1);
        });
    });
});