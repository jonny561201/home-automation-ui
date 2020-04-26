import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../utilities/RestApi';
import LightSwitch from '../../components/controls/LightSwitch';

describe('LightSwitch', () => {
    let lightSwitch;
    const spySetGroup = jest.spyOn(lib, 'setLightGroupState');
    const spySetLight = jest.spyOn(lib, 'setLightState');
    const groupData = {
        'groupId': '1', 'groupName': 'DinningRoom', 'on': true,
        'brightness': 155, 'lights': [
            { 'lightName': 'desk lamp', 'on': true, 'brightness': 123 },
            { 'lightName': 'table lamp', 'on': false, 'brightness': 76 }
        ]
    }

    beforeEach(() => {
        spySetLight.mockClear();
        spySetGroup.mockClear();
        lightSwitch = shallow(<LightSwitch data={groupData} />);
    })

    it('should display the group name as the label', () => {
        const actual = lightSwitch.find('.MuiFormControlLabel-label');

        // expect(actual).toEqual(groupData.groupName);
    });

    it('should call set light group state on toggleChecked', async () => {
        await lightSwitch.instance().toggleChecked();

        expect(spySetGroup).toBeCalledWith(groupData.groupId, false, groupData.brightness);
    });

    it('should display the expansion icon', () => {
        const actual = lightSwitch.find('ChevronRightIcon');

        expect(actual).toHaveLength(1);
    });

    // it('should call set light state on toggleCheckedLight', async () => {
    //     await lightSwitch.state().lights = [{"on": true, "lightName": "Test"}];
    //     await lightSwitch.instance().toggleCheckedLight();

    //     expect(spySetLight).toBeCalledWith();
    // });

    describe('Light Expansion', () => {

        it('should display expansion panel when areLightsOpen is true', () => {
            lightSwitch.state().areLightsOpen = true;
            lightSwitch.instance().forceUpdate();

            const actual = lightSwitch.find('.light-group-expansion');

            expect(actual).toHaveLength(1);
        });

        it('should not display expansion panel when areLightsOpen is false', () => {
            lightSwitch.state().areLightsOpen = false;
            lightSwitch.instance().forceUpdate();

            const actual = lightSwitch.find('.light-group-expansion');

            expect(actual).toHaveLength(0);
        });

        it('should display all light switches', () => {
            lightSwitch.state().areLightsOpen = true;
            lightSwitch.instance().forceUpdate();

            const actual = lightSwitch.find('.light-switches');

            expect(actual).toHaveLength(2);
        });
    });
})