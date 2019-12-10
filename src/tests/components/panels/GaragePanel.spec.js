import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../../utilities/RestApi';
import GaragePanel from "../../../components/panels/GaragePanel";


describe('GaragePanel', () => {
    let garagePanel;
    const spyGet = jest.spyOn(lib, 'getGarageStatus');
    const spyUpdate = jest.spyOn(lib, 'updateGarageState');
    const spyToggle = jest.spyOn(lib, 'toggleGarageDoor');

    beforeEach(() => {
        spyGet.mockClear();
        spyUpdate.mockClear();
        spyToggle.mockClear();
        garagePanel = shallow(<GaragePanel />);
    });

    it('should show the Garage Panel', () => {
        const actual = garagePanel.find('.garage-panel');
        expect(actual).toHaveLength(1);
    });

    it('should show garage icon', () => {
        const actual = garagePanel.find('.garage-panel img').prop('alt');
        expect(actual).toEqual('garage');
    });

    it('should show open garage button', () => {
        const actual = garagePanel.find('.open-button');
        expect(actual).toHaveLength(1);
    });

    it('should show toggle garage button', () => {
        const actual = garagePanel.find('.toggle-button');
        expect(actual).toHaveLength(1);
    });

    describe('ComponentDidMount', () => {

        it('should make api call to get status', () => {
            expect(spyGet).toHaveBeenCalledTimes(1);
        });

        // it('should store garage status in state', async () => {
        //     const instance = garagePanel.instance();
        //     await instance.componentDidMount();
        //     const actual = garagePanel.state().isGarageOpen;
        //     expect(actual).toEqual('true');
        // });

        it('should show open when garage state is closed', () => {
            garagePanel.state().isGarageOpen = false;
            garagePanel.instance().forceUpdate();

            const actual = garagePanel.find('.open-button').text();
            expect(actual).toEqual('Open');
        });

        it('should show close when garage state is open', () => {
            garagePanel.state().isGarageOpen = true;
            garagePanel.instance().forceUpdate();

            const actual = garagePanel.find('.close-button').text();
            expect(actual).toEqual('Close');
        });

        it('should show garage status base text', () => {
            const actual = garagePanel.find('.door-status').text();
            expect(actual).toEqual('Door Status: ');
        });

        it('should show garage status as open when state set to true', () => {
            garagePanel.state().isGarageOpen = true;
            garagePanel.instance().forceUpdate();

            const actual = garagePanel.find('.status-text').text();
            expect(actual).toEqual('Open');
        });

        it('should show garage status as closed when state set to false', () => {
            garagePanel.state().isGarageOpen = false;
            garagePanel.instance().forceUpdate();

            const actual = garagePanel.find('.status-text').text();
            expect(actual).toEqual('Closed');
        });
    });

    describe('garage door api', () => {

        it('should call open function with false when closing', () => {
            garagePanel.instance().openGarageDoor(false);
            expect(spyUpdate).toBeCalledWith(false);
        });

        it('should call open function with true when opening', () => {
            garagePanel.instance().openGarageDoor(true);
            expect(spyUpdate).toBeCalledWith(true);
        });

        it('should call toggle function', () => {
            garagePanel.instance().toggleGarageDoor();
            expect(spyToggle).toHaveBeenCalledTimes(1);
        });
    });
});