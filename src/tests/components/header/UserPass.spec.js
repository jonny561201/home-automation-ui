import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as lib from '../../../utilities/RestApi';
import { Context } from '../../../state/Store';
import UserPass from '../../../pages/Login/UserPass';


describe('UserPass', () => {

    const spyGet = jest.spyOn(lib, 'getBearerToken');

    const renderComponent = async () => {
        await act(async () => {
            render(
                <div>
                    <Context.Provider value={[{ auth: { isAuthenticated: false } }, () => { }]}>
                        <UserPass />
                    </Context.Provider>
                </div>
            );
        });
    }

    beforeEach(() => {
        spyGet.mockClear();
    });

    it('should contain username input', async () => {
        await renderComponent();
        const actual = screen.getByTestId('user-name');
        expect(actual).toBeDefined();
    });

    it('should contain password input', async () => {
        await renderComponent();
        const actual = screen.getByTestId('password');
        expect(actual).toBeDefined();
    });

    it('should contain a login button', async () => {
        await renderComponent();
        const actual = screen.getByRole('button');
        expect(actual).toBeDefined();
    });

    describe('Form Validation', () => {

        it('should not display error styles when username is valid', async () => {
            await renderComponent();
            fireEvent.change(screen.getByTestId('user-name'), { target: { value: 'validName' } });

            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            const actual = screen.getByTestId('user-name').className;
            expect(actual).not.toContain('Mui-error');
        });

        it('should display error styles when username is an empty string', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('user-name'), { target: { value: '' } });
            });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Username').className;
            expect(actual).toContain('Mui-error');
        });

        it('should display error styles when username is undefined', async () => {
            await renderComponent();
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Username').className;
            expect(actual).toContain('Mui-error');
        });

        it('should not display error styles when password is valid', async () => {
            await renderComponent();
            fireEvent.change(screen.getByTestId('password'), { target: { value: 'validName' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button'));
            });
            const actual = screen.getByTestId('password').className;
            expect(actual).not.toContain('Mui-error');
        });

        it('should display error styles when password is an empty string', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('password'), { target: { value: '' } });
            });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Password').className;
            expect(actual).toContain('Mui-error');
        });

        it('should display error styles when password is undefined', async () => {
            await renderComponent();
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Password').className;
            expect(actual).toContain('Mui-error');
        });

        it('should make api call to get bearer token when user and pass are valid', async () => {
            const userName = 'validFirst';
            const password = 'validPass';
            await renderComponent();
            await act(async () => {
                fireEvent.change(screen.getByTestId('user-name'), { target: { value: userName } });
                fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
            });
            await act(async () => {
                fireEvent.submit(screen.getByRole('button'));
            });

            expect(spyGet).toHaveBeenCalledWith(userName, password);
        });

        // it('should navigate to home screen on successful login', async () => {
        //     const userName = 'validFirst';
        //     const password = 'validPass';
        //     const bearerToken = { bearerToken: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ1c2VyIjp7InVzZXJfaWQiOiJlOTdmZWJjMC1mZDEwLTExZTktOGYwYi0zNjJiOWUxNTU2NjciLCJyb2xlcyI6W3sicm9sZV9uYW1lIjoidGhlcm1vc3RhdCJ9LHsicm9sZV9uYW1lIjoic2VjdXJpdHkifSx7InJvbGVfbmFtZSI6ImdhcmFnZV9kb29yIn0seyJyb2xlX25hbWUiOiJsaWdodGluZyJ9LHsicm9sZV9uYW1lIjoic3VtcF9wdW1wIn1dLCJmaXJzdF9uYW1lIjoiSm9uIiwibGFzdF9uYW1lIjoiVGVzdGVyIn0sImV4cCI6MTU4ODQ4MTU2NX0.SJhFh7v2Xf3d85vQj3Aop4tBYXJlI7_pQvvinwxti0M" };
        //     spyGet.mockReturnValue(bearerToken);
        //     await renderComponent();
        //     await act(async () => {
        //         fireEvent.change(screen.getByTestId('user-name'), { target: { value: userName } });
        //         fireEvent.change(screen.getByTestId('password'), { target: { value: password } });
        //     });
        //     await act(async () => {
        //         fireEvent.submit(screen.getByRole('button'));
        //     });

        //     const actual = screen.getByText('Home Automation').textContent;

        //     expect(actual).toEqual('Home Automation');
        // });
    });
});