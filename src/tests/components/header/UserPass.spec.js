import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as lib from '../../../utilities/RestApi';
import { Context } from '../../../state/Store';
import App from '../../../App';
import UserPass from '../../../components/header/UserPass';


const renderComponent = async () => {
    await act(async () => {
        render(
            <App>
                <Context.Provider>
                    <UserPass />
                </Context.Provider>
            </App>
        );
    });
}

describe('UserPass', () => {

    const spyGet = jest.spyOn(lib, 'getBearerToken');

    beforeEach(() => {
        spyGet.mockClear();
    });

    it('should contain username input', async () => {
        renderComponent();
        const actual = screen.getByTestId('user-name');
        expect(actual).toBeDefined();
    });

    it('should contain password input', async () => {
        renderComponent();
        const actual = screen.getByTestId('password');
        expect(actual).toBeDefined();
    });

    it('should contain a login button', async () => {
        renderComponent();
        const actual = screen.getByRole('button');
        expect(actual).toBeDefined();
    });

    describe('Form Validation', () => {

        it('should not display error text when username is valid', async () => {
            renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('user-name'), { target: { value: 'validName' } });
            });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.queryByText('Invalid username!');
            expect(actual).toBeNull();
        });

        it('should display error text when username is an empty string', async () => {
            renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('user-name'), { target: { value: '' } });
            });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Invalid username!').textContent;
            expect(actual).toEqual('Invalid username!');
        });

        it('should display error text when username is undefined', async () => {
            renderComponent();
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Invalid username!').textContent;
            expect(actual).toEqual('Invalid username!');
        });

        it('should not display error text when password is valid', async () => {
            renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('password'), { target: { value: 'validName' } });
            });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.queryByText('Invalid password!');
            expect(actual).toBeNull();
        });

        it('should display error text when password is an empty string', async () => {
            renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('password'), { target: { value: '' } });
            });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Invalid password!').textContent;
            expect(actual).toEqual('Invalid password!');
        });

        it('should display error text when password is undefined', async () => {
            renderComponent();
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Invalid password!').textContent;
            expect(actual).toEqual('Invalid password!');
        });

        it('should make api call to get bearer token when user and pass are valid', async () => {
            const userName = 'validFirst';
            const password = 'validPass';
            renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('user-name'), { target: { value: userName } });
                fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
            });
            await act(async () => {
                fireEvent.submit(screen.getByRole('button'));
            });

            expect(spyGet).toHaveBeenCalledWith(userName, password);
        });

        it('should navigate to home screen on successful login', async () => {
            const userName = 'validFirst';
            const password = 'validPass';
            spyGet.mockReturnValue(true);
            renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('user-name'), { target: { value: userName } });
                fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
            });
            await act(async () => {
                fireEvent.submit(screen.getByRole('button'));
            });

            const actual = screen.getByText('Home Automation').textContent;

            expect(actual).toEqual('Home Automation');
        });
    });
});