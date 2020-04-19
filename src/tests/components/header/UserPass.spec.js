import React from 'react';
import { mount } from 'enzyme';
import UserPass from '../../../components/header/UserPass';


describe('UserPass', () => {
    let userPass;

    beforeEach(() => {
        userPass = mount(<UserPass />);
    });

    it('renders', () => {
        expect(userPass).toBeTruthy();
    });

    it('should contain username input', () => {
        const userInput = userPass.find('input[name="Username"]');
        expect(userInput).toHaveLength(1);
    });

    it('should contain password input', () => {
        const passInput = userPass.find('input[name="Password"]');
        expect(passInput).toHaveLength(1);
    });

    it('should contain a login button', () => {
        const buttonText = userPass.find('button').text();
        expect(buttonText).toEqual('Login');
    });

    describe('Form Validation', () => {

        it('should display error text when username an empty string', () => {
            userPass.find('input[name="Username"]').simulate('change', { target: { value: '', }, });
            userPass.find('button').simulate('submit');

            const errorText = userPass.find('.error-text');
            expect(errorText.at(0).text()).toEqual('Invalid username!');
        });

        it('should display error text when username is undefined', () => {
            userPass.find('input[name="Username"]').simulate('change', { target: { value: undefined, }, });
            userPass.find('button').simulate('submit');

            const errorText = userPass.find('.error-text');
            expect(errorText.at(0).text()).toEqual('Invalid username!');
        });

        it('should display error text when username is null', () => {
            userPass.find('input[name="Username"]').simulate('change', { target: { value: null, }, });
            userPass.find('button').simulate('submit');

            const errorText = userPass.find('.error-text');
            expect(errorText.at(0).text()).toEqual('Invalid username!');
        });

        it('should not display error text when username is valid', () => {
            userPass.find('input[name="Username"]').simulate('change', { target: { value: 'User', }, });
            userPass.find('button').simulate('submit');

            const errorText = userPass.find('.error-text').map(x => x.text());
            expect(errorText.includes('Invalid username!')).toBeFalsy();
        });

        it('should display error text when password an empty string', () => {
            userPass.find('input[name="Password"]').simulate('change', { target: { value: '', }, });
            userPass.find('button').simulate('submit');

            const errorText = userPass.find('.error-text');
            expect(errorText.at(1).text()).toEqual('Invalid password!');
        });

        it('should display error text when password is undefined', () => {
            userPass.find('input[name="Password"]').simulate('change', { target: { value: undefined, }, });
            userPass.find('button').simulate('submit');

            const errorText = userPass.find('.error-text');
            expect(errorText.at(1).text()).toEqual('Invalid password!');
        });

        it('should display error text when password is null', () => {
            userPass.find('input[name="Password"]').simulate('change', { target: { value: null, }, });
            userPass.find('button').simulate('submit');

            const errorText = userPass.find('.error-text');
            expect(errorText.at(1).text()).toEqual('Invalid password!');
        });

        it('should not display error text when password is valid', () => {
            userPass.find('input[name="Password"]').simulate('change', { target: { value: 'Pass', }, });
            userPass.find('button').simulate('submit');

            const errorText = userPass.find('.error-text').map(x => x.text());
            expect(errorText.includes('Invalid password!')).toBeFalsy();
        });
    });
});