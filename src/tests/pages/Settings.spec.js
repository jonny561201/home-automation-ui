import React from 'react';
import Settings from '../../pages/Settings'
import { shallow } from 'enzyme';

describe('Settings Page', () => {
    let settings;
    const userId = 'fakeUserId';
    const mockGet = jest.fn();
    const mockUpdate = jest.fn();
    let mockRequests = {
        userId: userId,
        updateUserPreferences: mockUpdate,
        getUserPreferences: mockGet,
    }

    beforeEach(() => {
        mockUpdate.mockClear();
        mockGet.mockClear();
        settings = shallow(<Settings apiRequests={mockRequests} />);
    });

    it('should display logo header', () => {
        const actual = settings.find('Header');
        expect(actual).toHaveLength(1);
    });

    it('should display Temperature header', () => {
        const actual = settings.find('h2').text();
        expect(actual).toEqual('Temperature');
    });

    describe('toggleEditMode', () => {

        it('should switch isEditMode from true to false', async () => {
            settings.state().isEditMode = true;
            settings.instance().forceUpdate();
            await settings.instance().toggleEditMode();

            const actual = settings.state().isEditMode;
            expect(actual).toBeFalsy();
        });

        it('should switch isEditMode from false to true', async () => {
            settings.state().isEditMode = false;
            settings.instance().forceUpdate();
            await settings.instance().toggleEditMode();

            const actual = settings.state().isEditMode;
            expect(actual).toBeTruthy();
        });
    });

    describe('Default View', () => {
        const unitMeasure = 'metric';
        const city = 'Vienna'

        beforeEach(() => {
            settings.state().isEditMode = false;
            settings.state().unit = unitMeasure;
            settings.state().city = city;
            settings.instance().forceUpdate();
        });

        it('should display edit button', () => {
            const actual = settings.find('button').text();
            expect(actual).toEqual('Edit');
        });

        it('should display the unit text', () => {
            const actual = settings.find('.unit').at(0).text();
            expect(actual).toEqual('Unit:');
        });

        it('should display the fahrenheit setting stored in state', () => {
            const actual = settings.find('.unit').at(1).text();
            expect(actual).toEqual(unitMeasure);
        });

        it('should display the city text', () => {
            const actual = settings.find('.city').at(0).text();
            expect(actual).toEqual('City:');
        });

        it('should display the currently city setting stored in state', () => {
            const actual = settings.find('.city').at(1).text();
            expect(actual).toEqual(city);
        });
    });

    describe('Edit View', () => {

        beforeEach(() => {
            settings.state().isEditMode = true;
            settings.instance().forceUpdate();
        });

        it('should display is fahrenheit settings switch', () => {
            const actual = settings.find('.switch');
            expect(actual).toHaveLength(1);
        });

        it('should display text to set to fahrenheit', () => {
            const actual = settings.find('.unit').text();
            expect(actual).toEqual('Fahrenheit');
        });

        it('should display save button to submit updated preferences', () => {
            const actual = settings.find('.submit').text();
            expect(actual).toEqual('Save');
        });

        it('should display the cancel button', () => {
            const actual = settings.find('.cancel').text();
            expect(actual).toEqual('Cancel');
        });

        // TODO: fix this text
        it('should display city input textbox', () => {
            const actual = settings.find('TextField');
            // expect(actual).toHaveLength(1);
        })
    })

    describe('ComponentDidMount', () => {
        it('should make api call to get preferences', () => {
            expect(mockGet).toHaveBeenCalledTimes(1);
        });

        // TODO: add tests for storing the state in the response
    });

    describe('savePreferences', () => {

        const expectedCity = 'Berlin';
        const expectedIsFahrenheit = false;

        beforeEach(() => {
            settings.state().city = expectedCity;
            settings.state().isFahrenheit = expectedIsFahrenheit;
            settings.instance().forceUpdate();
        });

        it('should call the updateUserPreferences api rest call', () => {
            settings.instance().savePreferences();
            expect(mockUpdate).toHaveBeenCalledTimes(1);
            expect(mockUpdate).toBeCalledWith(userId, expectedIsFahrenheit, expectedCity);
        });
    });
});