import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../../utilities/RestApi';
import {getStore} from '../../../TestState';
import BasementPanel from '../../../components/panels/BasementPanel';

describe('BasementPanel', () => {

    let basementPanel;
    const fakeUserId = "fakeUserId";
    const spyGet = jest.spyOn(lib, 'getSumpLevels');
    // const mockGetSump = jest.fn();
    // const mockRequests = {
    //     getSumpLevels: mockGetSump,
    //     userId: fakeUserId,
    // };

    beforeEach(() => {
        getStore().setUserId(fakeUserId);
        spyGet.mockClear();
        basementPanel = shallow(<BasementPanel />);
    });

    it('should show the Basement Panel', () => {
        const actual = basementPanel.find('.basement-panel');
        expect(actual).toHaveLength(1);
    });

    it('should show basement icon', () => {
        const actual = basementPanel.find('.summary img').prop('alt');
        expect(actual).toEqual('basement');
    });

    describe('Sump Details', () => {

        it('should show sump pump icon', () => {
            const actual = basementPanel.find('.center img');
            expect(actual).toHaveLength(1);
        });

        it('should make call to get sump pump depth', () => {
            expect(spyGet).toHaveBeenCalledTimes(1);
            expect(spyGet).toBeCalledWith(fakeUserId);
        });

        it('should display current sump depth text', () => {
            const actual = basementPanel.find('.current-text').text();
            expect(actual).toEqual('Current: ');
        });

        it('should display current depth of sump pump', () => {
            const currentDepth = 32.1;
            basementPanel.state().currentSumpDepth = currentDepth;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.current-depth').text();
            expect(parseFloat(actual)).toEqual(currentDepth);
        });

        it('should display average sump depth text', () => {
            const actual = basementPanel.find('.average-text').text();
            expect(actual).toEqual('Average: ');
        });

        it('should display average depth of sump pump', () => {
            const averageDepth = 24.4;
            basementPanel.state().averageSumpDepth = averageDepth;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.average-depth').text();
            expect(parseFloat(actual)).toEqual(averageDepth);
        });

        it('should set current depth in view', () => {
            const currentDepth = 23.8;
            basementPanel.state().currentSumpDepth = currentDepth;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.current-depth').text();
            expect(parseFloat(actual)).toEqual(currentDepth);
        });

        it('should set average depth in view', () => {
            const averageDepth = 37.1;
            basementPanel.state().averageSumpDepth = averageDepth;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.average-depth').text();
            expect(parseFloat(actual)).toEqual(averageDepth);
        });
    });
});