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

    it("should contain a body div", () => {
        const body = login.find('.login-body');
        expect(body).toHaveLength(1);
    });

    it("should contain logo image", () => {
        const logo = login.find('.logo-image');
        expect(logo).toHaveLength(1);
    });
}); 
