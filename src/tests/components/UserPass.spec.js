
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

        it('should set username to invalid when null', () => {
            userPass.state().password = password;
            userPass.state().username = null;
            instance.validateCredentials()

            expect(userPass.state().isUsernameInvalid).toEqual(true);
        });

        it('should set username to invalid when undefined', () => {
            userPass.state().password = password;
            userPass.state().username = undefined;
            instance.validateCredentials()

            expect(userPass.state().isUsernameInvalid).toEqual(true);
        });

        it('should set username to invalid when empty string', () => {
            userPass.state().password = password;
            userPass.state().username = '';
            instance.validateCredentials()

            expect(userPass.state().isUsernameInvalid).toEqual(true);
        });

        it('should leave isUsernameInvalid to false when valid', () => {
            userPass.state().username = username;
            instance.validateCredentials()

            expect(userPass.state().isUsernameInvalid).toEqual(false);
        });

        it('should set password to invalid when null', () => {
            userPass.state().password = null;
            userPass.state().username = username;
            instance.validateCredentials()

            expect(userPass.state().isPasswordInvalid).toEqual(true);
        });

        it('should set password to invalid when undefined', () => {
            userPass.state().password = undefined;
            userPass.state().username = username;
            instance.validateCredentials()

            expect(userPass.state().isPasswordInvalid).toEqual(true);
        });

        it('should set password to invalid when empty string', () => {
            userPass.state().password = '';
            userPass.state().username = username;
            instance.validateCredentials()

            expect(userPass.state().isPasswordInvalid).toEqual(true);
        });

        it('should leave isPasswordInvalid to false when valid', () => {
            userPass.state().password = password;
            instance.validateCredentials()

            expect(userPass.state().isPasswordInvalid).toEqual(false);
        });

        it('should reset isUsernameInvalid to false when new value provided', () => {
            userPass.state().isUsernameInvalid = true;
            userPass.state().username = username;
            instance.validateCredentials()
            
            expect(userPass.state().isUsernameInvalid).toBeFalsy();
        });
    });
});