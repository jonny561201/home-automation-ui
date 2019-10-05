
import React from 'react';
import { shallow } from 'enzyme';
import UserPass from '../../components/UserPass';

describe('UserPass', () => {
    let userPass;

    beforeEach(() => {
        userPass = shallow(<UserPass />);
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
        const username = 'Jon';
        const password = 'bestestPass'
        let instance;

        beforeEach(() => {
            instance = userPass.instance();
        });

        it('should set validate username', () => {
            instance.validateCredentials(null, password)

            expect(userPass.state().isUsernameInvalid).toEqual(true);
        });

        it('should set validate password', () => {
            instance.validateCredentials(username, null)

            expect(userPass.state().isPasswordInvalid).toEqual(true);
        });
    });
});