import React from 'react';
import { shallow } from 'enzyme';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
// import { act } from 'react-dom/test-utils';
import * as lib from '../../../utilities/RestApi';
import GaragePanel from "../../../components/panels/GaragePanel";
import { getStore } from '../../../GlobalState';


describe('GaragePanel', () => {
//     let garagePanel;
    const userId = 'fakeuserid';
    const spyGet = jest.spyOn(lib, 'getGarageStatus');
    const spyUpdate = jest.spyOn(lib, 'updateGarageState');
    const spyToggle = jest.spyOn(lib, 'toggleGarageDoor');

    beforeEach(() => {
        getStore().setUserId(userId)
        spyGet.mockClear();
        spyUpdate.mockClear();
        spyToggle.mockClear();
//         garagePanel = shallow(<GaragePanel />);
    });

//     it('should show the Garage Panel', () => {
//         const actual = garagePanel.find('.garage-panel');
//         expect(actual).toHaveLength(1);
//     });

//     it('should show garage icon', () => {
//         const actual = garagePanel.find('.garage-panel img').prop('alt');
//         expect(actual).toEqual('garage');
//     });

//     it('should show open garage button', () => {
//         const actual = garagePanel.find('.open-button');
//         expect(actual).toHaveLength(1);
//     });

//     it('should show toggle garage button', () => {
//         const actual = garagePanel.find('.toggle-button');
//         expect(actual).toHaveLength(1);
//     });

//     describe('ComponentDidMount', () => {

//         it('should make api call to get status', () => {
//             expect(spyGet).toHaveBeenCalledTimes(1);
//         });

//         it('should show open when garage state is closed', () => {
//             garagePanel.state().isGarageOpen = false;
//             garagePanel.instance().forceUpdate();

//             const actual = garagePanel.find('.open-button').text();
//             expect(actual).toEqual('Open');
//         });

//         it('should show close when garage state is open', () => {
//             garagePanel.state().isGarageOpen = true;
//             garagePanel.instance().forceUpdate();

//             const actual = garagePanel.find('.close-button').text();
//             expect(actual).toEqual('Close');
//         });

//         it('should show garage status base text', () => {
//             const actual = garagePanel.find('.door-status').at(0).text();
//             expect(actual).toEqual('Door Status: ');
//         });

//         it('should show garage status as open when state set to true', () => {
//             garagePanel.state().isGarageOpen = true;
//             garagePanel.instance().forceUpdate();

//             const actual = garagePanel.find('.status-text').at(0).text();
//             expect(actual).toEqual('Open');
//         });

//         it('should show garage status as closed when state set to false', () => {
//             garagePanel.state().isGarageOpen = false;
//             garagePanel.instance().forceUpdate();

//             const actual = garagePanel.find('.status-text').at(0).text();
//             expect(actual).toEqual('Closed');
//         });
//     });

    describe('garage door api', () => {

        it('should call update function with false when closing', async () => {
            spyGet.mockReturnValue({isGarageOpen: true})
            await act(() => {
                render(<GaragePanel />);
            });
            userEvent.click(screen.getByTestId("update-garage-close"));
            expect(spyUpdate).toBeCalledWith(false, userId);

        });

        it('should call update function with true when opening', async () => {
            spyGet.mockReturnValue({isGarageOpen: false})
            await act(() => {
                render(<GaragePanel />)
            })
            userEvent.click(screen.getByTestId("update-garage-open"));
            expect(spyUpdate).toBeCalledWith(true, userId);
        });

        it('should call toggle function', () => {
            render(<GaragePanel />)
            userEvent.click(screen.getByTestId("toggle-garage-button"));

            expect(spyToggle).toHaveBeenCalledTimes(1);
        });
    });
})