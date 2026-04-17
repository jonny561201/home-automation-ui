import React from 'react';
import * as lib from '../../../../utilities/RestApi';
import AddGarage from '../../../../pages/Home/segments/AddGarage';
import { Context } from '../../../../state/Store';
import { render, screen, fireEvent, act } from '@testing-library/react';

const bearer = 'fake-token';

vi.mock('@auth0/auth0-react', () => ({
    useAuth0: () => ({
        getAccessTokenSilently: vi.fn().mockResolvedValue(bearer),
        getIdTokenClaims: vi.fn().mockResolvedValue({
            'https://soaringleafsolutions.com/user_id': 'user123',
            'https://soaringleafsolutions.com/roles': ['garage_door'],
            given_name: 'Test',
            last_name: 'User',
            email: 'test@test.com',
        }),
    }),
}));


describe('Add Garage', () => {
    const device = { deviceId: 1, name: 'Garage Hub', type: 'garage_door', registered: false, maxNodes: 2 };
    const spyAdd = vi.spyOn(lib, 'addUserDeviceNode');
    const spyGetDevices = vi.spyOn(lib, 'getDevices');
    const spyGetGarageStatus = vi.spyOn(lib, 'getAllGarageStatus');
    const mockOnComplete = vi.fn();
    const mockDispatch = vi.fn();

    const renderComponent = async () => {
        await act(async () => {
            render(
                <Context.Provider value={[{}, mockDispatch]}>
                    <AddGarage device={device} onComplete={mockOnComplete} />
                </Context.Provider>
            );
        });
    }

    beforeEach(() => {
        spyAdd.mockClear();
        spyGetDevices.mockClear();
        spyGetGarageStatus.mockClear();
        mockOnComplete.mockClear();
        mockDispatch.mockClear();
        spyAdd.mockResolvedValue({ ok: true });
        spyGetDevices.mockResolvedValue({ devices: [] });
        spyGetGarageStatus.mockResolvedValue({ coordinates: null, doors: [] });
    });

    describe('Add Door Form', () => {

        it('should display the Add Garage Door heading', async () => {
            await renderComponent();
            const actual = screen.getByRole('heading').textContent;
            expect(actual).toEqual('Add Garage Door');
        });

        it('should display the available nodes count', async () => {
            await renderComponent();
            const actual = screen.getByText('1 of 2 available');
            expect(actual).toBeDefined();
        });

        it('should display a single Door Name input', async () => {
            await renderComponent();
            const actual = screen.getAllByRole('textbox');
            expect(actual).toHaveLength(1);
        });

        it('should display the save button', async () => {
            await renderComponent();
            const actual = screen.getByRole('button', { name: 'Save' });
            expect(actual).toBeDefined();
        });

        it('should display the cancel button', async () => {
            await renderComponent();
            const actual = screen.getByRole('button', { name: 'Cancel' });
            expect(actual).toBeDefined();
        });

        it('should not show add button until first door name is valid', async () => {
            await renderComponent();
            const addButton = screen.queryByRole('button', { name: 'Add' });
            expect(addButton).toBeNull();
        });

        it('should show add button after entering a valid door name', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Main Door' } });
            const addButton = screen.getByRole('button', { name: 'Add' });
            expect(addButton).toBeDefined();
        });

        it('should call onComplete when cancel button clicked', async () => {
            await renderComponent();
            fireEvent.click(screen.getByRole('button', { name: 'Cancel' }));
            expect(mockOnComplete).toHaveBeenCalled();
        });

        it('should not show preferred checkbox with a single door', async () => {
            await renderComponent();
            const checkbox = screen.queryByRole('checkbox');
            expect(checkbox).toBeNull();
        });

        it('should default single door to preferred when saving', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Main Door' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            expect(spyAdd).toHaveBeenCalledWith(bearer, device.deviceId, [
                { nodeDevice: 1, nodeName: 'Main Door', preferred: true }
            ]);
        });

        it('should not make api call when name is empty', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: '' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            expect(spyAdd).toHaveBeenCalledTimes(0);
        });

        it('should not make api call when name is untouched', async () => {
            await renderComponent();
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            expect(spyAdd).toHaveBeenCalledTimes(0);
        });
    });

    describe('Multiple Doors', () => {

        it('should add a second door input when add button is clicked', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Left Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            const inputs = screen.getAllByRole('textbox');
            expect(inputs).toHaveLength(2);
        });

        it('should update available count when adding a door', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Left Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            const actual = screen.getByText('0 of 2 available');
            expect(actual).toBeDefined();
        });

        it('should show preferred checkboxes when two doors are present', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Left Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            const checkboxes = screen.getAllByRole('checkbox');
            expect(checkboxes).toHaveLength(2);
        });

        it('should replace add button with a remove button on the last row', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Left Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            const addButton = screen.queryByRole('button', { name: 'Add' });
            expect(addButton).toBeNull();
            const removeButton = screen.getByRole('button', { name: 'Remove' });
            expect(removeButton).toBeDefined();
        });

        it('should remove a door and restore add button when remove is clicked', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Left Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
            const inputs = screen.getAllByRole('textbox');
            expect(inputs).toHaveLength(1);
            const addButton = screen.getByRole('button', { name: 'Add' });
            expect(addButton).toBeDefined();
        });

        it('should reset remaining door to preferred after removing a door', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Left Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            const checkboxes = screen.getAllByRole('checkbox');
            fireEvent.click(checkboxes[0]);
            fireEvent.click(screen.getByRole('button', { name: 'Remove' }));
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            expect(spyAdd).toHaveBeenCalledWith(bearer, device.deviceId, [
                { nodeDevice: 1, nodeName: 'Left Door', preferred: true }
            ]);
        });

        it('should only allow one door to be preferred', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Left Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            const checkboxes = screen.getAllByRole('checkbox');
            expect(checkboxes[0].checked).toBe(true);
            expect(checkboxes[1].checked).toBe(false);
            fireEvent.click(checkboxes[1]);
            expect(checkboxes[0].checked).toBe(false);
            expect(checkboxes[1].checked).toBe(true);
        });

        it('should make a single api call with both doors when saving', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Left Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            const inputs = screen.getAllByRole('textbox');
            fireEvent.change(inputs[1], { target: { value: 'Right Door' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            expect(spyAdd).toHaveBeenCalledTimes(1);
            expect(spyAdd).toHaveBeenCalledWith(bearer, device.deviceId, [
                { nodeDevice: 1, nodeName: 'Left Door', preferred: true },
                { nodeDevice: 2, nodeName: 'Right Door', preferred: false }
            ]);
        });

        it('should not save when a door name is empty', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Main Door' } });
            fireEvent.click(screen.getByRole('button', { name: 'Add' }));
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            expect(spyAdd).toHaveBeenCalledTimes(0);
        });
    });

    describe('Success Screen', () => {

        beforeEach(() => {
            vi.useFakeTimers();
        });

        afterEach(() => {
            vi.useRealTimers();
        });

        it('should display the success message after saving', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Main' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            const actual = screen.getByText('Successfully Added').textContent;
            expect(actual).toEqual('Successfully Added');
        });

        it('should call onComplete after 5 seconds', async () => {
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Main' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            expect(mockOnComplete).not.toHaveBeenCalled();
            act(() => { vi.advanceTimersByTime(5000); });
            expect(mockOnComplete).toHaveBeenCalled();
        });

        it('should not show success when api call fails', async () => {
            spyAdd.mockResolvedValue({ ok: false });
            await renderComponent();
            fireEvent.change(screen.getByRole('textbox'), { target: { value: 'Main' } });
            await act(async () => {
                fireEvent.click(screen.getByRole('button', { name: 'Save' }));
            });
            const success = screen.queryByText('Successfully Added');
            expect(success).toBeNull();
        });
    });
});
