import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { GreenButton, BlueButton, RedButton, AddButton, RemoveButton } from '../../../components/controls/Buttons';

describe('Buttons', () => {

    describe('Green Button', () => {
        it('should display the text provided to the buttons inner html', () => {
            render(<GreenButton>GreenTest</GreenButton>);
            const actual = screen.getByText('GreenTest');
            expect(actual).toBeTruthy();
        });

        it('should execute function on click', () => {
            const click = jest.fn();
            render(<GreenButton onClick={click}>Test</GreenButton>);
            fireEvent.click(screen.getByText('Test'));
            expect(click).toHaveBeenCalled();
        });

        it('should execute function when in a form', () => {
            const click = jest.fn(e => e.preventDefault());
            render(
                <form onSubmit={click}>
                    <GreenButton>Test</GreenButton>
                </form>
            );
            fireEvent.click(screen.getByText('Test'));
            expect(click).toHaveBeenCalled();
        });
    });

    describe('Blue Button', () => {
        it('Blue Button should display the text provided to the buttons inner html', () => {
            render(<BlueButton>BlueTest</BlueButton>);
            const actual = screen.getByText('BlueTest');
            expect(actual).toBeTruthy();
        });

        it('should execute function on click', () => {
            const click = jest.fn();
            render(<BlueButton onClick={click}>Test</BlueButton>);
            fireEvent.click(screen.getByText('Test'));
            expect(click).toHaveBeenCalled();
        });

        it('should execute function when in a form', () => {
            const click = jest.fn(e => e.preventDefault());
            render(
                <form onSubmit={click}>
                    <BlueButton>Test</BlueButton>
                </form>
            );
            fireEvent.click(screen.getByText('Test'));
            expect(click).toHaveBeenCalled();
        });
    });

    describe('Red Button', () => {

        it('Red Button should display the text provided to the buttons inner html', () => {
            render(<RedButton>RedTest</RedButton>);
            const actual = screen.getByText('RedTest');
            expect(actual).toBeTruthy();
        });

        it('should execute function on click', () => {
            const click = jest.fn();
            render(<RedButton onClick={click}>Test</RedButton>);
            fireEvent.click(screen.getByText('Test'));
            expect(click).toHaveBeenCalled();
        });

        it('should execute function when in a form', () => {
            const click = jest.fn(e => e.preventDefault());
            render(
                <form onSubmit={click}>
                    <RedButton>Test</RedButton>
                </form>
            );
            fireEvent.click(screen.getByText('Test'));
            expect(click).toHaveBeenCalled();
        });
    });

    describe('Add Button', () => {

        it('should execute function on click', () => {
            const click = jest.fn();
            render(<AddButton onClick={click}></AddButton>);
            fireEvent.click(screen.getByRole('button'));
            expect(click).toHaveBeenCalled();
        });

        it('should execute function when in a form', () => {
            const click = jest.fn(e => e.preventDefault());
            render(
                <form onSubmit={click}>
                    <AddButton></AddButton>
                </form>
            );
            fireEvent.click(screen.getByRole('button'));
            expect(click).toHaveBeenCalled();
        });

        it('should display the aria-label of Add', () => {
            render(<AddButton></AddButton>);
            const actual = screen.getByRole('button', {name: 'Add'});
            expect(actual).toBeTruthy();
        });
    });

    describe('Remove Button', () => {

        it('should execute function on click', () => {
            const click = jest.fn();
            render(<RemoveButton onClick={click}></RemoveButton>);
            fireEvent.click(screen.getByRole('button'));
            expect(click).toHaveBeenCalled();
        });

        it('should execute function when in a form', () => {
            const click = jest.fn(e => e.preventDefault());
            render(
                <form onSubmit={click}>
                    <RemoveButton></RemoveButton>
                </form>
            );
            fireEvent.click(screen.getByRole('button'));
            expect(click).toHaveBeenCalled();
        });

        it('should display the aria-label being passed into the component', () => {
            render(<RemoveButton aria-label="test"></RemoveButton>);
            const actual = screen.getByRole('button', {name: 'test'});
            expect(actual).toBeTruthy();
        });
    });
});