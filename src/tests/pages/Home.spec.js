import React from 'react';
import Home from '../../pages/Home';
import { shallow } from 'enzyme';

describe('Home', () => {
    let home;
    const mockUpdatePage = jest.fn();

    beforeEach(() => {
        mockUpdatePage.mockClear();
        home = shallow(<Home updatePage={mockUpdatePage} />);
    });

    it('should display Header component', () => {
        const actual = home.find('Header');
        expect(actual).toHaveLength(1);
    });

    it('should display page body', () => {
        const actual = home.find('.home-body');
        expect(actual).toHaveLength(1)
    });

    it('should display DashboardPanel', () => {
        const actual = home.find('DashboardPanel');
        expect(actual).toHaveLength(1);
    });

    it('should set the active page to Home', () => {
        expect(mockUpdatePage).toHaveBeenCalledWith('Home');
    });
});