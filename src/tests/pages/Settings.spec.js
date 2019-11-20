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

    describe('Default View', () => {
        const unitMeasure = 'metric';

        beforeEach(() => {
            settings.state().isEditMode = false;
            settings.state().unit = unitMeasure;
            settings.instance().forceUpdate();
        });

        it('should display edit button', () => {
            const actual = settings.find('button').text();
            expect(actual).toEqual('Edit');
        });

        it('should display the fahrenheit setting stored in state', () => {
            const actual = settings.find('.settings-text').text();
            expect(actual).toEqual(unitMeasure);
        });
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
            const actual = settings.find('.settings-text').text();
            expect(actual).toEqual('Fahrenheit');
        });

        it('should display save button to submit updated preferences', () => {
            const actual = settings.find('button').text();
            expect(actual).toEqual('Save');
        });

        it('should display city input textbox', () => {
            const actual = settings.find('TextField');
            // expect(actual).toHaveLength(1);
        })
    })

    describe('ComponentDidMount', () => {
        it('should make api call to get preferences', () => {
            expect(mockGet).toHaveBeenCalledTimes(1);
        });
    });
});