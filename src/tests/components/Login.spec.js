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
        const headerText = login.find('.header-text').text();
        expect(headerText).toEqual('Sign In');
    });

    it("should contain a body div", () => {
        const body = login.find('.login-body');
        expect(body).toHaveLength(1);
    });
}); 
