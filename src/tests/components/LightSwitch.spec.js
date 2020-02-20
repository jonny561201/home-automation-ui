import React from 'react';
import { shallow } from 'enzyme';
import * as lib from '../../utilities/RestApi';
import LightSwitch from '../../components/LightSwitch';

describe('LightSwitch', () => {
    let lightSwitch;
    const spySet = jest.spyOn(lib, 'setLightGroupState');
    const groupData = { 'groupId': '1', 'groupName': 'DinningRoom', 'on': true, 'brightness': 155 }

    beforeEach(() => {
        spySet.mockClear();
        lightSwitch = shallow(<LightSwitch data={groupData} />);
    })

    it('should display the group name as the label', () => {
        const actual = lightSwitch.find('.MuiFormControlLabel-label');

        // expect(actual).toEqual(groupData.groupName);
    });

    it('should call set light group state on toggleChecked', () => {
        lightSwitch.instance().toggleChecked();

        expect(spySet).toBeCalledWith(groupData.groupId, false, groupData.brightness);
    });
})