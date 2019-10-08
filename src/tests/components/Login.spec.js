import React from 'react';
import Login from '../../components/Login';
import { shallow } from 'enzyme';

describe('Login Component', () => {
    let login;

    beforeEach(() => {
        login = shallow(<Login />);
    });

    it('renders', () => {
        expect(login).toBeTruthy();
    });

    it("should contain a header div", () => {
        const header = login.find('.login-header');
        expect(header).toHaveLength(1);
    });

    it('should have sign in text', () => {
        const headerText = login.find('h1').text();
        expect(headerText).toEqual('Member Login');
    });

    it('should have Logo element', () => {
        const logoHeader = login.find('LogoHeader').text();
        expect(logoHeader).toHaveLength(1);
    });

    it("should contain a body div", () => {
        const body = login.find('.login-body');
        expect(body).toHaveLength(1);
    });
}); 
