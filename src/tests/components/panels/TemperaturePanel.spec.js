import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../TestState';
import TemperaturePanel from '../../../components/panels/TemperaturePanel';


describe('TemperaturePanel', () => {
    let tempPanel;
    let userId = 'fakeUserId'
    const spyGet = jest.spyOn(lib, 'getCurrentTemperature');

    beforeEach(() => {
        getStore().setUserId(userId);
        spyGet.mockClear();
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

        const internalTemp = 72.8;
        const externalTemp = 32.7;
        const desiredColor = "B22341";

        it('should make api to get current weather', () => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            expect(spyGet).toBeCalledWith(userId);
        });

        it('should show the internal temperature', () => {
            tempPanel.state().internalTemp = internalTemp;
            tempPanel.instance().forceUpdate();

            const actual = tempPanel.find('.internal-temp').text();
            expect(actual).toEqual(internalTemp.toString());
        });

        it('should show the external temperature', () => {
            tempPanel.state().externalTemp = externalTemp;
            tempPanel.instance().forceUpdate();

            const actual = tempPanel.find('.external-temp').text();
            expect(actual).toEqual(externalTemp.toString());
        });
    });

    describe('toggleHvac', () => {

        const testMode = "test Mode";
        const heatingMode = "heating";
        const heatingColor = "#db5127";

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
    });
});