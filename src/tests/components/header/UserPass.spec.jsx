import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import * as lib from '../../../utilities/RestApi';
import { Context } from '../../../state/Store';
import UserPass from '../../../pages/Login/UserPass';


describe('UserPass', () => {

    const spyGet = vi.spyOn(lib, 'getBearerToken');

    const renderComponent = async () => {
        render(
            <div>
                <Context.Provider value={[{ auth: { isAuthenticated: false } }, () => { }]}> 
                    <UserPass />
                </Context.Provider>
            </div>
        );
    }

    beforeEach(() => {
        spyGet.mockClear();
    });

    it('should contain username input', async () => {
        await renderComponent();
        const actual = screen.getByRole('textbox', { name: 'Username' });
        expect(actual).toBeDefined();
    });

    it('should contain password input', async () => {
        await renderComponent();
        const actual = screen.getByLabelText('Password');
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
            fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), { target: { value: 'validName' } });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByRole('textbox', { name: 'Username' }).className;
            expect(actual).not.toContain('Mui-error');
        });

        it('should display error styles when username is an empty string', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), { target: { value: '' } });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Username', { selector: 'label' }).className;
            expect(actual).toContain('Mui-error');
        });

        it('should display error styles when username is undefined', async () => {
            await renderComponent();
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Username', { selector: 'label' }).className;
            expect(actual).toContain('Mui-error');
        });

        it('should not display error styles when password is valid', async () => {
            await renderComponent();
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'validName' } });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByLabelText('Password').className;
            expect(actual).not.toContain('Mui-error');
        });

        it('should display error styles when password is an empty string', async () => {
            await renderComponent();
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: '' } });
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Password', { selector: 'label' }).className;
            expect(actual).toContain('Mui-error');
        });

        it('should display error styles when password is undefined', async () => {
            await renderComponent();
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByText('Password', { selector: 'label' }).className;
            expect(actual).toContain('Mui-error');
        });

        it('should make api call to get bearer token when user and pass are valid', async () => {
            const userName = 'validFirst';
            const password = 'validPass';
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox', { name: 'Username' }), { target: { value: userName } });
            fireEvent.change(screen.getByLabelText('Password'), { target: { value: password } });
            fireEvent.submit(screen.getByRole('button'));

            expect(spyGet).toHaveBeenCalledWith(userName, password);
        });

    });
});