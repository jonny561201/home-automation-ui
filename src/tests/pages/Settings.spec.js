import React from 'react';
import Settings from '../../pages/Settings'
import { FormControlLabel, TextField, RadioGroup } from '@material-ui/core';
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
        const city = 'Vienna'
        const tempUnit = 'metric';
        const measureUnit = 'imperial'

        beforeEach(() => {
            settings.state().city = city;
            settings.state().isEditMode = false;
            settings.state().tempUnit = tempUnit;
            settings.state().measureUnit = measureUnit;
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
            expect(actual).toEqual(tempUnit);
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

        it('should display the measurement unit stored in state', () => {
            const actual = settings.find('.measure-unit').at(1).text();
            expect(actual).toEqual(measureUnit);
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

        it('should display the radio buttons for celsius and fahrenheit', () => {
            const actualGroup = settings.find(RadioGroup).at(0);
            const actual = actualGroup.find(FormControlLabel);

            expect(actual).toHaveLength(2);
            expect(actual.at(0).props()).toHaveProperty('label', 'Fahrenheit');
            expect(actual.at(1).props()).toHaveProperty('label', 'Celsius');
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

        it('should display the radio buttons for imperial and metric', () => {
            const actualGroup = settings.find(RadioGroup).at(1);
            const actual = actualGroup.find(FormControlLabel);

            expect(actual.find(FormControlLabel)).toHaveLength(2);
            expect(actual.at(0).props()).toHaveProperty('label', 'Imperial');
            expect(actual.at(1).props()).toHaveProperty('label', 'Metric');
        });
    })

    describe('ComponentDidMount', () => {
        const expectedCity = 'Venice';
        const expectedTempUnit = 'fahrenheit';
        const expectedMeasureUnit = 'imperial';

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

        it('should default newTempUnit to value from response', async () => {
            const response = { temp_unit: expectedTempUnit };
            spyGet.mockReturnValue(response);
            settings.instance().forceUpdate();
            await settings.instance().componentDidMount();

            const actual = settings.state();
            expect(actual.newTempUnit).toEqual(expectedTempUnit);
        });

        it('should defualt newMeasureUnit to value from response', async () => {
            const response = { measure_unit: expectedMeasureUnit };
            spyGet.mockReturnValue(response);
            settings.instance().forceUpdate();
            await settings.instance().componentDidMount();

            const actual = settings.state();
            expect(actual.newMeasureUnit).toEqual(expectedMeasureUnit);
        });

        it('should store the response of getting the preferences in state', async () => {
            const response = { city: expectedCity, temp_unit: expectedTempUnit, measure_unit: expectedMeasureUnit };
            spyGet.mockReturnValue(response);
            settings.instance().forceUpdate();
            await settings.instance().componentDidMount();

            const actual = settings.state();
            expect(actual.city).toEqual(expectedCity);
            expect(actual.tempUnit).toEqual(expectedTempUnit);
            expect(actual.measureUnit).toEqual(expectedMeasureUnit);
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
        const expectedTempUnit = 'celsius';
        const expectedMeasureUnit = 'imperial';

        beforeEach(() => {
            settings.state().edited = true;
            settings.state().isEditMode = true;
            settings.state().newCity = expectedCity;
            settings.state().newTempUnit = expectedTempUnit;
            settings.state().newMeasureUnit = expectedMeasureUnit
            settings.instance().forceUpdate();
        });

        it('should call the updateUserPreferences api rest call with fahrenheit', () => {
            settings.state().newTempUnit = 'fahrenheit';
            settings.instance().forceUpdate();
            settings.instance().savePreferences();
            expect(spyUpdate).toHaveBeenCalledTimes(1);
            expect(spyUpdate).toBeCalledWith(userId, true, expectedCity);
        });

        it('should call the updateUserPreferences api rest call with celsius', () => {
            settings.state().newTempUnit = expectedTempUnit;
            settings.instance().forceUpdate();
            settings.instance().savePreferences();
            expect(spyUpdate).toHaveBeenCalledTimes(1);
            expect(spyUpdate).toBeCalledWith(userId, false, expectedCity);
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

        it('should update the tempUnit variable to equal new unit', async () => {
            await settings.instance().savePreferences();
            expect(settings.state().tempUnit).toEqual(expectedTempUnit);
        });

        it('should update the measureUnit variable to equal new unit', async () => {
            await settings.instance().savePreferences();
            expect(settings.state().measureUnit).toEqual(expectedMeasureUnit);
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

        it('should reset the state of temp unit when cancelled', async () => {
            const expectedTempUnit = 'fahrenheit';
            settings.state().tempUnit = expectedTempUnit
            settings.state().newTempUnit = 'celsius'
            settings.instance().forceUpdate();
            await settings.instance().cancelPreferences();

            const actual = settings.state().newTempUnit
            expect(actual).toEqual(expectedTempUnit);
        });

        it('should reset the state of measure unit when cancelled', async () => {
            const expectedMeasureUnit = 'imperial';
            settings.state().measureUnit = expectedMeasureUnit
            settings.state().newMeasureUnit = 'metric'
            settings.instance().forceUpdate();
            await settings.instance().cancelPreferences();

            const actual = settings.state().newMeasureUnit
            expect(actual).toEqual(expectedMeasureUnit);
        });

        it('should reset the state of isEditMode when cancelled', async () => {
            settings.state().isEditMode = true
            settings.instance().forceUpdate();
            await settings.instance().cancelPreferences();

            const actual = settings.state().isEditMode
            expect(actual).toBeFalsy();
        });
    });

    describe('updateTempRadioButton', () => {
        const metricUnit = 'celsius';

        it('should set temp unit variable to input value', async () => {
            await settings.instance().updateTempRadioButton({ target: { value: metricUnit } });
            expect(settings.state().newTempUnit).toEqual(metricUnit)
        });

        it('should set the edited mode to true when toggle radio buttons', async () => {
            await settings.instance().updateTempRadioButton({ target: { value: metricUnit } });
            expect(settings.state().edited).toBeTruthy();
        });
    });

    describe('updateMeasureRadioButton', () => {
        const measureUnit = 'imperial';

        it('should set measure unit variable to input value', async () => {
            await settings.instance().updateMeasureRadioButton({ target: { value: measureUnit } });
            expect(settings.state().newMeasureUnit).toEqual(measureUnit);
        });

        it('should set the edited mode to true when toggle radio buttons', async () => {
            await settings.instance().updateMeasureRadioButton({ target: { value: measureUnit } });
            expect(settings.state().edited).toBeTruthy();
        });
    });
});