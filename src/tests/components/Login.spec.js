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

    });
}); 
