import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../TestState';
import TemperaturePanel from '../../../components/panels/TemperaturePanel';


describe('TemperaturePanel', () => {
    let tempPanel;
    let userId = 'fakeUserId'
    const spySet = jest.spyOn(lib, 'setUserTemperature');
    const spyGet = jest.spyOn(lib, 'getCurrentTemperature');


    beforeEach(() => {
        getStore().setUserId(userId);
        spyGet.mockClear();
        spySet.mockClear();
        tempPanel = shallow(<TemperaturePanel />);
    });

    it('should display temperature panel', () => {
        const actual = tempPanel.find('.temperature-panel');
        expect(actual).toHaveLength(1);
    })

    it('should display temperature icon', () => {
        const actual = tempPanel.find('.logo-image').prop('alt');
        expect(actual).toEqual('temperature');
    });

    describe('ComponentDidMount', () => {

        const minTemp = 23.9;
        const maxTemp = 49.8;
        const internalTemp = 72.8;
        const externalTemp = 32.7;
        const response = {
            currentTemp: internalTemp, temp: externalTemp,
            minThermostatTemp: minTemp, maxThermostatTemp: maxTemp
        };

        beforeEach(() => {
            spyGet.mockReturnValue(response);
        });

        it('should make api to get current weather', () => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            expect(spyGet).toBeCalledWith(userId);
        });

        it('should show the external temperature from response on backend', () => {
            const actual = tempPanel.find('.external-temp').text();

            expect(actual).toEqual(externalTemp.toString());
        });

        it('should show the internal temperature from response on backend', () => {
            const actual = tempPanel.find('.internal-temp').text();

            expect(actual).toEqual(internalTemp.toString());
        });

        it('should set the rounded desired temp from internal temp response on backend', () => {
            expect(tempPanel.state().desiredTemp).toEqual(73.0);
        });
    });

    describe('toggleHvac', () => {

        const testMode = "test Mode";
        const heatingMode = "heating";
        const heatingColor = "#db5127";
        const coolingMode = "cooling";
        const coolingColor = "#27aedb";
        const defaultColor = "#A0A0A0";

        it('should set mode to the new state provided', async () => {
            await tempPanel.instance().toggleHvac(testMode);

            expect(tempPanel.state().mode).toEqual(testMode);
        });

        it('should set heating to true when in heating mode', async () => {
            await tempPanel.instance().toggleHvac(heatingMode);

            expect(tempPanel.state().isHeating).toBeTruthy();
        });

        it('should set cooling to false when in heating mode', async () => {
            await tempPanel.instance().toggleHvac(heatingMode);

            expect(tempPanel.state().isCooling).toBeFalsy()
        });

        it('should set the color to orange when in heating mode', async () => {
            await tempPanel.instance().toggleHvac(heatingMode);

            expect(tempPanel.state().displayColor).toEqual(heatingColor);
        });

        it('should set cooling to true when in cooling mode', async () => {
            await tempPanel.instance().toggleHvac(coolingMode);

            expect(tempPanel.state().isCooling).toBeTruthy();
        });

        it('should set heating to false when in cooling mode', async () => {
            await tempPanel.instance().toggleHvac(coolingMode);

            expect(tempPanel.state().isHeating).toBeFalsy();
        });

        it('should set the color to blue when in cooling mode', async () => {
            await tempPanel.instance().toggleHvac(coolingMode);

            expect(tempPanel.state().displayColor).toEqual(coolingColor);
        });

        it('should default the display color to dark grey when not heating or cooling', async () => {
            tempPanel.state().isCooling = true;
            await tempPanel.instance().toggleHvac(testMode);

            expect(tempPanel.state().displayColor).toEqual(defaultColor);
        });
    });

    describe('knobChange', () => {

        const desiredTemp = 23.5;
        const mode = 'cooling';
        const isFahrenheit = true;

        beforeEach(() => {
            tempPanel.state().isFahrenheit = isFahrenheit;
            tempPanel.state().mode = mode;
            tempPanel.instance().forceUpdate();
        });

        it('should set the desired temp when heating', () => {
            tempPanel.state().isHeating = true;
            tempPanel.state().isCooling = false;
            tempPanel.instance().forceUpdate();

            tempPanel.instance().knobChange(desiredTemp);
            expect(tempPanel.state().desiredTemp).toEqual(desiredTemp);
        });

        it('should set the desired temp when cooling', () => {
            tempPanel.state().isCooling = true;
            tempPanel.state().isHeating = false;
            tempPanel.instance().forceUpdate();

            tempPanel.instance().knobChange(desiredTemp);
            expect(tempPanel.state().desiredTemp).toEqual(desiredTemp);
        });

        it('should not set the desired temp when neither heating or cooling', () => {
            tempPanel.state().isCooling = false;
            tempPanel.state().isHeating = false;
            tempPanel.instance().forceUpdate();

            tempPanel.instance().knobChange(desiredTemp);
            expect(tempPanel.state().desiredTemp).toEqual(0.0);
        });

        it('should make api call to set user temperature when heating', () => {
            tempPanel.state().isHeating = true;
            tempPanel.state().isCooling = false;
            tempPanel.instance().forceUpdate();

            tempPanel.instance().knobChange(desiredTemp);

            expect(spySet).toHaveBeenCalledTimes(1);
            expect(spySet).toHaveBeenCalledWith(userId, desiredTemp, mode, isFahrenheit);
        });

        it('should make api call to set user temperature when cooling', () => {
            tempPanel.state().isCooling = true;
            tempPanel.state().isHeating = false;
            tempPanel.instance().forceUpdate();

            tempPanel.instance().knobChange(desiredTemp);

            expect(spySet).toHaveBeenCalledTimes(1);
            expect(spySet).toHaveBeenCalledWith(userId, desiredTemp, mode, isFahrenheit);
        });

        it('should not make api call if neither heating or cooling', () => {
            tempPanel.state().isCooling = false;
            tempPanel.state().isHeating = false;
            tempPanel.instance().forceUpdate();

            tempPanel.instance().knobChange(desiredTemp);

            expect(spySet).toHaveBeenCalledTimes(0);
        });
    });
});