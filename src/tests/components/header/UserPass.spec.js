import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../GlobalState';
import UserPass from '../../../components/header/UserPass';


describe('UserPass', () => {
    let userPass;
    const spyBearer = jest.spyOn(lib, 'getBearerToken');

    beforeEach(() => {
        spyBearer.mockClear();
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
        let instance;
        const username = 'Jon';
        const password = 'bestestPass'
        const mockEvent = jest.fn();
        const event = { preventDefault: mockEvent }

        beforeEach(() => {
            mockEvent.mockClear();
            instance = userPass.instance();
        });

        it('should set username to invalid when null', () => {
            userPass.state().password = password;
            userPass.state().username = null;
            instance.validateCredentials(event);

            expect(userPass.state().isUsernameInvalid).toEqual(true);
        });

        it('should set username to invalid when undefined', () => {
            userPass.state().password = password;
            userPass.state().username = undefined;
            instance.validateCredentials(event);

            expect(userPass.state().isUsernameInvalid).toEqual(true);
        });

        it('should set username to invalid when empty string', () => {
            userPass.state().password = password;
            userPass.state().username = '';
            instance.validateCredentials(event);

            expect(userPass.state().isUsernameInvalid).toEqual(true);
        });

        it('should leave isUsernameInvalid to false when valid', () => {
            userPass.state().username = username;
            instance.validateCredentials(event);

            expect(userPass.state().isUsernameInvalid).toEqual(false);
        });

        it('should set password to invalid when null', () => {
            userPass.state().password = null;
            userPass.state().username = username;
            instance.validateCredentials(event);

            expect(userPass.state().isPasswordInvalid).toEqual(true);
        });

        it('should set password to invalid when undefined', () => {
            userPass.state().password = undefined;
            userPass.state().username = username;
            instance.validateCredentials(event);

            expect(userPass.state().isPasswordInvalid).toEqual(true);
        });

        it('should set password to invalid when empty string', () => {
            userPass.state().password = '';
            userPass.state().username = username;
            instance.validateCredentials(event);

            expect(userPass.state().isPasswordInvalid).toEqual(true);
        });

        it('should leave isPasswordInvalid to false when valid', () => {
            userPass.state().password = password;
            instance.validateCredentials(event);

            expect(userPass.state().isPasswordInvalid).toEqual(false);
        });

        it('should reset isUsernameInvalid to false when new value provided', async () => {
            userPass.state().isUsernameInvalid = true;
            userPass.state().username = username;
            await instance.validateCredentials(event);

            expect(userPass.state().isUsernameInvalid).toBeFalsy();
        });

        it('should reset isPasswordInvalid to false when new value provided', async () => {
            userPass.state().isPasswordInvalid = true;
            userPass.state().password = password;
            await instance.validateCredentials(event);

            expect(userPass.state().isPasswordInvalid).toBeFalsy();
        });

        it('should set isValidLogin to false when non 200', async () => {
            spyBearer.mockReturnValue(false);

            await instance.getBearerTokenFromLogin();
            expect(userPass.state().isValidLogin).toEqual(false);
        });

        it('should set the user to authenticated when response returns successfully', async () => {
            getStore().setBearerToken('FakeBearerToken');
            spyBearer.mockReturnValue(true);

            await instance.getBearerTokenFromLogin();
            expect(getStore().isAuthenticated()).toBeTruthy();
        });

        it('should make call to get bearer token when inputs valid', () => {
            userPass.state().username = username;
            userPass.state().password = password;

            instance.validateCredentials(event);

            expect(spyBearer).toHaveBeenCalledTimes(1);
        });

        it('should not make call to get bearer token when user invalid', () => {
            userPass.state().password = password;
            userPass.state().username = null;

            instance.validateCredentials(event);

            expect(spyBearer).toHaveBeenCalledTimes(0);
        });

        it('should not make call to get bearer token when password invalid', () => {
            userPass.state().password = null;
            userPass.state().username = username;

            instance.validateCredentials(event);

            expect(spyBearer).toHaveBeenCalledTimes(0);
        });

        it('should not make call to get bearer token when user and pass invalid', () => {
            userPass.state().password = null;
            userPass.state().username = null;

            instance.validateCredentials(event);

            expect(spyBearer).toHaveBeenCalledTimes(0);
        });

        it('should make call to prevent defaults', () => {
            instance.validateCredentials(event);
            expect(mockEvent).toHaveBeenCalledTimes(1);
        });
    });
});