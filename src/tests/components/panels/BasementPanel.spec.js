import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../../utilities/RestApi';
import { getStore } from '../../../GlobalState';
import BasementPanel from '../../../components/panels/BasementPanel';

describe('BasementPanel', () => {

    let basementPanel;
    const fakeUserId = "fakeUserId";
    const spyGet = jest.spyOn(lib, 'getSumpLevels');

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

    describe('Sump Pump Icon', () => {

        it('should display the low icon when warning level 0', () => {
            basementPanel.state().warningLevel = 0;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.sump-icon');
            expect(actual.props()).toHaveProperty('label', 'warning-low')
        });

        it('should display the medium low icon when warning level 1', () => {
            basementPanel.state().warningLevel = 1;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.sump-icon');
            expect(actual.props()).toHaveProperty('label', 'warning-medium-low')
        });

        it('should display the medium high icon when warning level 2', () => {
            basementPanel.state().warningLevel = 2;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.sump-icon');
            expect(actual.props()).toHaveProperty('label', 'warning-medium-high')
        });

        it('should display the high icon when warning level 3', () => {
            basementPanel.state().warningLevel = 3;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.sump-icon');
            expect(actual.props()).toHaveProperty('label', 'warning-high')
        });
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
            const actual = basementPanel.find('.current-text').at(0).text();
            expect(actual).toEqual('Current: ');
        });

        it('should display current depth of sump pump', () => {
            const currentDepth = 32.1;
            basementPanel.state().currentSumpDepth = currentDepth;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.current-depth').text();
            expect(parseFloat(actual)).toEqual(currentDepth);
        });

        it('should display the current depth unit of measure', () => {
            const unit = 'in';
            basementPanel.state().depthUnit = unit;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.current-text').at(1).text();
            expect(actual).toEqual(unit);
        });

        it('should display average sump depth text', () => {
            const actual = basementPanel.find('.average-text').at(0).text();
            expect(actual).toEqual('Average: ');
        });

        it('should display average depth of sump pump', () => {
            const averageDepth = 24.4;
            basementPanel.state().averageSumpDepth = averageDepth;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.average-depth').text();
            expect(parseFloat(actual)).toEqual(averageDepth);
        });

        it('should display the average depth unit of measure', () => {
            const unit = 'in';
            basementPanel.state().depthUnit = unit;
            basementPanel.instance().forceUpdate();

            const actual = basementPanel.find('.average-text').at(1).text();
            expect(actual).toEqual(unit);
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