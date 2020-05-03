import React from 'react';
import userEvent from '@testing-library/user-event';
import { render, screen, act } from '@testing-library/react';
import * as lib from '../../../utilities/RestApi';
import GaragePanel from "../../../components/panels/GaragePanel";
import { getStore } from '../../../GlobalState';


describe('GaragePanel', () => {
    const userId = 'fakeuserid';
    const spyGet = jest.spyOn(lib, 'getGarageStatus');
    const spyUpdate = jest.spyOn(lib, 'updateGarageState');
    const spyToggle = jest.spyOn(lib, 'toggleGarageDoor');

    beforeEach(() => {
        spyGet.mockReturnValue({isGarageOpen: true});
        getStore().setUserId(userId)
        spyGet.mockClear();
        spyUpdate.mockClear();
        spyToggle.mockClear();
    });

    describe('should not display garage details', () => {
        const roles = [{role_name: 'garage_door', devices: []}]

        beforeEach(() => {
            getStore().setUserRoles(roles);
        })

        it('should display Register Device Component', () => {
            render(<GaragePanel />);
            const actual = screen.getByTestId('data-add-device');
            expect(actual).toBeDefined();
        });
    });

    describe('should display garage details', () => {
        const roles = [{role_name: 'garage_door', devices: [{deviceName: 'Garage Door'}]}]

        beforeEach(() => {
            getStore().setUserRoles(roles);
        })

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
    
        it('should display Close text when response is false', async () => {
            spyGet.mockReturnValue({isGarageOpen: false})
            await act(() => {
                render(<GaragePanel />);
            });
            const actual = screen.getByText("Closed").textContent;
            expect(actual).toEqual('Closed');
        });
    
        it('should display Open text when response is true', async () => {
            spyGet.mockReturnValue({isGarageOpen: true})
            await act(() => {
                render(<GaragePanel />);
            });
            const actual = screen.getByText("Open").textContent;
            expect(actual).toEqual('Open');
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
    
                expect(spyToggle).toBeCalledWith(userId);
            });
        });
    });
});