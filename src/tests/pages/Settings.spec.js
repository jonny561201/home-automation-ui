import React from 'react';
import Settings from '../../pages/Settings'
import { FormControlLabel, TextField } from '@material-ui/core';
import { shallow } from 'enzyme';
import * as lib from '../../utilities/RestApi';
import { getStore } from '../../TestState';

describe('Settings Page', () => {
    let settings;
    const userId = 'fakeUserId';
    const spyUpdate = jest.spyOn(lib, 'updateUserPreferences');
    const spyGet = jest.spyOn(lib, 'getUserPreferences');


    beforeEach(() => {
        spyUpdate.mockClear();
        spyGet.mockClear();
        getStore().setUserId(userId);
        settings = shallow(<Settings />);
    });

    it('should display logo header', () => {
        const actual = settings.find('Header');
        expect(actual).toHaveLength(1);
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

        it('should display the unit text for temperature', () => {
            const actual = settings.find('.temp-unit').at(0).text();
            expect(actual).toEqual('Unit:');
        });

        it('should display the fahrenheit setting stored in state', () => {
            const actual = settings.find('.temp-unit').at(1).text();
            expect(actual).toEqual(unitMeasure);
        });

        it('should display the city text for temperature', () => {
            const actual = settings.find('.temp-city').at(0).text();
            expect(actual).toEqual('City:');
        });

        it('should display the currently city setting stored in state', () => {
            const actual = settings.find('.temp-city').at(1).text();
            expect(actual).toEqual(city);
        });

        it('should display Temperature header', () => {
            const actual = settings.find('h2').at(0).text();
            expect(actual).toEqual('Temperature');
        });

        it('should display the Measurement header', () => {
            const actual = settings.find('h2').at(1).text();
            expect(actual).toEqual('Measurement');
        });

        it('should display the unit text for measurement', () => {
            const actual = settings.find('.measure-unit').at(0).text();
            expect(actual).toEqual('Unit:');
        });
    });

    describe('Edit View', () => {

        beforeEach(() => {
            settings.state().isEditMode = true;
            settings.instance().forceUpdate();
        });

        it('should display save button to submit updated preferences', () => {
            const actual = settings.find('.submit').text();
            expect(actual).toEqual('Save');
        });

        it('should display the cancel button', () => {
            const actual = settings.find('.cancel').text();
            expect(actual).toEqual('Cancel');
        });

        it('should display the radio buttons for imperial and metric', () => {
            const actual = settings.find(FormControlLabel);
            expect(actual).toHaveLength(2);
        });

        it('should display city input textbox', () => {
            const actual = settings.find(TextField);
            expect(actual).toHaveLength(1);
        })

        it('should display Temperature header', () => {
            const actual = settings.find('h2').at(0).text();
            expect(actual).toEqual('Temperature');
        });

        it('should display the Measurement header', () => {
            const actual = settings.find('h2').at(1).text();
            expect(actual).toEqual('Measurement');
        });
    })

    describe('ComponentDidMount', () => {
        const expectedCity = 'Venice';
        const expectedUnit = 'imperial';

        it('should make api call to get preferences', () => {
            expect(spyGet).toHaveBeenCalledTimes(1);
        });

        it('should set the active page to Settings', () => {
            expect(getStore().state.activePage).toEqual('Settings');
        });

        it('should default newCity to value from response', async () => {
            const response = { city: expectedCity };
            spyGet.mockReturnValue(response);
            settings.instance().forceUpdate();
            await settings.instance().componentDidMount();

            const actual = settings.state();
            expect(actual.newCity).toEqual(expectedCity);
        });

        it('should default newUnit to value from response', async () => {
            const response = { unit: expectedUnit };
            spyGet.mockReturnValue(response);
            settings.instance().forceUpdate();
            await settings.instance().componentDidMount();

            const actual = settings.state();
            expect(actual.newUnit).toEqual(expectedUnit);
        });

        it('should store the response of getting the preferences in state', async () => {
            const response = { city: expectedCity, unit: expectedUnit };
            spyGet.mockReturnValue(response);
            settings.instance().forceUpdate();
            await settings.instance().componentDidMount();

            const actual = settings.state();
            expect(actual.city).toEqual(expectedCity);
            expect(actual.unit).toEqual(expectedUnit);
        });
    });

    describe('updateCity', () => {
        const expectedCity = 'Munchin'
        const response = { target: { value: expectedCity } }

        it('should update the city value', async () => {
            settings.state().newCity = 'old city';
            settings.instance().forceUpdate();

            await settings.instance().updateCity(response);

            expect(settings.state().newCity).toEqual(expectedCity);
        });

        it('should set is edited to true when value updated', async () => {
            settings.state().newCity = 'old city';
            settings.instance().forceUpdate();

            await settings.instance().updateCity(response);

            expect(settings.state().edited).toBeTruthy();
        });
    });

    describe('savePreferences', () => {

        const expectedCity = 'Berlin';
        const expectedUnit = 'metric';

        beforeEach(() => {
            settings.state().edited = true;
            settings.state().newCity = expectedCity;
            settings.state().newUnit = expectedUnit;
            settings.state().isEditMode = true;
            settings.instance().forceUpdate();
        });

        it('should call the updateUserPreferences api rest call', () => {
            settings.instance().savePreferences();
            expect(spyUpdate).toHaveBeenCalledTimes(1);
            expect(spyUpdate).toBeCalledWith(userId, expectedUnit === 'imperial', expectedCity);
        });

        it('should toggle edit mode after making api call', async () => {
            await settings.instance().savePreferences();
            expect(settings.state().isEditMode).toBeFalsy();
        });

        it('should reset edit mode after save', async () => {
            await settings.instance().savePreferences();
            expect(settings.state().edited).toBeFalsy();
        });

        it('should update the city variable to equal new city', async () => {
            await settings.instance().savePreferences();
            expect(settings.state().city).toEqual(expectedCity);
        });

        it('should update the unit variable to equal new unit', async () => {
            await settings.instance().savePreferences();
            expect(settings.state().unit).toEqual(expectedUnit);
        });
    });

    describe('cancelPreferences', () => {
        it('should reset the state of city when cancelled', async () => {
            const expectedCity = 'Sydney';
            settings.state().city = expectedCity
            settings.state().newCity = 'Perth'
            settings.instance().forceUpdate();
            await settings.instance().cancelPreferences();

            const actual = settings.state().newCity
            expect(actual).toEqual(expectedCity);
        });

        it('should reset the state of unit when cancelled', async () => {
            const expectedUnit = 'imperial';
            settings.state().unit = expectedUnit
            settings.state().newUnit = 'metric'
            settings.instance().forceUpdate();
            await settings.instance().cancelPreferences();

            const actual = settings.state().newUnit
            expect(actual).toEqual(expectedUnit);
        });

        it('should reset the state of isEditMode when cancelled', async () => {
            settings.state().isEditMode = true
            settings.instance().forceUpdate();
            await settings.instance().cancelPreferences();

            const actual = settings.state().isEditMode
            expect(actual).toBeFalsy();
        });
    });

    describe('updateRadioButton', () => {
        const metricUnit = 'metric';

        it('should set temp unit variable to input value', async () => {
            await settings.instance().updateRadioButton({ target: { value: metricUnit } });
            expect(settings.state().newUnit).toEqual(metricUnit)
        });

        it('should set the edited mode to true when toggle radio buttons', async () => {
            await settings.instance().updateRadioButton({ target: { value: metricUnit } });
            expect(settings.state().edited).toBeTruthy();
        });
    });
});