import React from 'react';
import { render, screen, act, fireEvent } from '@testing-library/react';
import * as lib from '../../utilities/RestApi';
import LightSwitch from '../../components/controls/LightSwitch';

describe('LightSwitch', () => {
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
        render(<LightSwitch data={groupData} />);
        const actual = screen.getByTestId('expansion-chevron');

        expect(actual).toBeDefined();
    });

    // it('should call set light state on toggleCheckedLight', async () => {
    //     await lightSwitch.state().lights = [{"on": true, "lightName": "Test"}];
    //     await lightSwitch.instance().toggleCheckedLight();

    //     expect(spySetLight).toBeCalledWith();
    // });

    describe('Light Expansion', () => {

        it('should display expansion panel when areLightsOpen is true', () => {
            render(<LightSwitch data={groupData} />);
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getByTestId('light-group-expansion');

            expect(actual).toBeDefined();
        });

        it('should not display expansion panel when areLightsOpen is false', () => {
            render(<LightSwitch data={groupData} />);
            const actual = screen.queryByTestId('light-group-expansion');

            expect(actual).toBeNull();
        });

        it('should display all light switches', () => {
            render(<LightSwitch data={groupData} />);
            fireEvent.click(screen.getByRole('button'));
            const actual = screen.getAllByTestId('light-switches');

            expect(actual).toHaveLength(2);
        });

        // TODO: create test to make sure api call is make when an individual light switch is toggled
    });
})