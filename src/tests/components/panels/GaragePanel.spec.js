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

    it('should display the Garage text', () => {
        render(<GaragePanel />);
        const actual = screen.getByText("Garage");
        expect(actual).toBeDefined();
    });

    it('should show garage icon', () => {
        render(<GaragePanel />);
        const actual = screen.getByTestId("garage-icon");
        expect(actual).toBeDefined();
    });

    it('should show open garage button', () => {
        render(<GaragePanel />);
        const actual = screen.getByTestId('update-garage-open').textContent;
        expect(actual).toEqual('Open');
    });

    it('should show toggle garage button', () => {
        render(<GaragePanel />);
        const actual = screen.getByTestId('toggle-garage-button').textContent;
        expect(actual).toEqual('Toggle');
    });

    it('should show Door Status text', () => {
        render(<GaragePanel />);
        const actual = screen.getByText('Door Status:').textContent;
        expect(actual).toEqual('Door Status: ');
    });

    it('should show Duration text', () => {
        render(<GaragePanel />);
        const actual = screen.getByText('Duration:').textContent;
        expect(actual).toEqual('Duration: ');
    });

    describe('garage door api', () => {

        it('should make the initial call to get the garage data', () => {
            render(<GaragePanel />);
            expect(spyGet).toBeCalledWith(userId);
        });

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