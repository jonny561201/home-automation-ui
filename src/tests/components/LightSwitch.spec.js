import React from 'react';
import {act} from 'react-dom/test-utils';
import { shallow, mount } from 'enzyme';
import * as lib from '../../utilities/RestApi';
import LightSwitch from '../../components/controls/LightSwitch';
import { ButtonBase } from '@material-ui/core';

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

    //TODO: fix this test
    // it('should call set light group state on toggleChecked', async () => {
    //     const testSwitch = shallow(<LightSwitch data={groupData}/>)
    //     testSwitch.find(ButtonBase).simulate('click');
    //     await act(async () => {
    //         testSwitch.find(".test-something").simulate('change');
    //     });
    //     // await lightSwitch.instance().toggleChecked();

    //     expect(spySetGroup).toBeCalledWith(groupData.groupId, false, groupData.brightness);
    // });

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
            lightSwitch.find(ButtonBase).simulate('click');
            const actual = lightSwitch.find('.light-group-expansion');

            expect(actual).toHaveLength(1);
        });

        it('should not display expansion panel when areLightsOpen is false', () => {
            const actual = lightSwitch.find('.light-group-expansion');

            expect(actual).toHaveLength(0);
        });

        it('should display all light switches', () => {
            lightSwitch.find(ButtonBase).simulate('click');
            const actual = lightSwitch.find('.light-switches');

            expect(actual).toHaveLength(2);
        });

        // TODO: create test to make sure api call is make when an individual light switch is toggled
    });
})