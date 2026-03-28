import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import * as lib from '../../../../utilities/Services';
import * as api from '../../../../utilities/RestApi'
import RegisterDevice from '../../../../pages/Home/segments/RegisterDevice';
import { Context } from '../../../../state/Store';


describe('Register Device', () => {

    const userId = 'fakeUserId';
    const bearer = 'kljahsdf86';
    const spyAdd = vi.spyOn(api, 'addUserDevice')
    const spyDebounce = vi.spyOn(lib, 'debounchApi');
    const spyValidate = vi.spyOn(lib, 'isValidIpAddress');

    const renderComponent = () => {
        render(
            <Context.Provider value={[{ startedGarageRegistration: false, user: { userId: userId }, auth: { bearer: bearer } }, () => { }] }>
                <RegisterDevice close={() => {}} parentRef={{ contains: () => true }} />
            </Context.Provider>
        );
    }

    beforeEach(() => {
        spyAdd.mockClear();
        spyDebounce.mockClear();
        spyValidate.mockClear();
        // Execute the debounced callback immediately in tests to avoid timer-driven act warnings.
        spyDebounce.mockImplementation((fn) => fn());
    });

    afterAll(() => {
        spyAdd.mockRestore();
        spyDebounce.mockRestore();
        spyValidate.mockRestore();
    });

    describe('Before Transition', () => {

        beforeEach(() => {
            spyAdd.mockResolvedValue({ ok: false, json: async () => ({ deviceId: "" }) });
        });

        it('should display Add Device text', () => {
            renderComponent();
            const actual = screen.getByText('Add Device');
            expect(actual.textContent).toEqual("Add Device");
        });

        it('should have an input box for the ip address', () => {
            renderComponent();
            const actual = screen.getByRole('textbox');
            expect(actual).toBeDefined();
        });

        it('should display button for submitting request', () => {
            renderComponent();
            const actual = screen.getByRole('button');
            expect(actual).toBeDefined();
        });

        it('should display the close icon', () => {
            renderComponent();
            const actual = screen.getByTestId('close-button');
            expect(actual).toBeDefined();
        });

        it('should call debounce function on change', async () => {
            const ipAddress = "12.12.12.12";
            renderComponent();
            const inputBox = screen.getByRole('textbox');
            await act(async () => {
                fireEvent.change(inputBox, { target: { value: ipAddress } });
            });
            expect(spyDebounce).toBeCalled();
        });

        it('should make api call to add device when IP not in error', async () => {
            const ipAddress = "12.12.12.12";
            renderComponent();
            const inputBox = screen.getByRole('textbox');

            await act(async () => {
                fireEvent.change(inputBox, { target: { value: ipAddress } });
            });

            const button = screen.getByRole('button');
            await act(async () => {
                fireEvent.submit(button);
            });

            expect(spyAdd).toBeCalledWith(bearer, 'garage_door', ipAddress);
        });

        // it('should not make api call to add device when IP in error', async () => {
        //     spyValidate.mockReturnValue(false);
        //     await act(() => {
        //         render(<RegisterDevice />);
        //     });
        //     const inputBox = screen.getByRole('textbox');
        //     fireEvent.change(inputBox, {target: {value: "I dont matter"}});

        //     const button = screen.getByRole('button');
        //     // screen.getByText('Add Device')
        //     fireEvent.submit(button);
        //     expect(spyAdd).toHaveBeenCalledTimes(0);
        // });
    });

    // Transition-state tests can be re-enabled when this flow is covered with user-event.
});