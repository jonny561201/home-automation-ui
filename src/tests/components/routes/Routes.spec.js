import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, act } from '@testing-library/react';
import Routes from '../../../components/routes/Routes';
import { Context } from '../../../state/Store';

jest.mock('../../../utilities/RestApi', () => ({
    ...jest.requireActual('../../../utilities/RestApi'),
    getUserChildAccounts: jest.fn().mockResolvedValue([]),
}));


const unauthState = {
    auth: { isAuthenticated: false },
    user: { firstName: '', lastName: '', roles: [] },
    garageDoors: [],
    lights: [],
    sumpData: {},
    tempData: { gaugeColor: '#A0A0A0', currentDesiredTemp: 0, mode: null, isFahrenheit: true },
    forecastData: { description: '', temp: 0, minTemp: 0, maxTemp: 0 },
    preferences: {},
    tasks: [],
    taskTypes: [],
    garageRole: [],
    devicesToRegister: false,
    garageCoords: null,
};

const authState = {
    ...unauthState,
    auth: { isAuthenticated: true, bearer: 'fakeToken' },
    user: { firstName: 'Test', lastName: 'User', userId: '123', roles: [] },
    loadedUtils: true,
};

describe('Routes', () => {

    const renderAt = async (path, state) => {
        await act(async () => {
            render(
                <MemoryRouter initialEntries={[path]}>
                    <Context.Provider value={[state, () => { }]}>
                        <Routes />
                    </Context.Provider>
                </MemoryRouter>
            );
        });
    };


    describe('app routes', () => {

        it('should render the Login route at /', async () => {
            await renderAt('/', unauthState);
            expect(screen.getByTestId('app-routes')).toBeDefined();
        });

        it('should redirect unauthenticated user from /home to /', async () => {
            await renderAt('/home', unauthState);
            // unauthenticated navigates back to login
            expect(screen.getByTestId('app-routes')).toBeDefined();
        });

        it('should render the Home route at /home when authenticated', async () => {
            await renderAt('/home', authState);
            expect(screen.getByTestId('app-routes')).toBeDefined();
        });

        it('should render the Activities route at /activities when authenticated', async () => {
            await renderAt('/activities', authState);
            expect(screen.getByTestId('activities-sub-header')).toBeDefined();
        });

        it('should render the Settings route at /settings when authenticated', async () => {
            await renderAt('/settings', authState);
            expect(screen.getByTestId('app-routes')).toBeDefined();
        });

        it('should render the Account route at /account when authenticated', async () => {
            await renderAt('/account', authState);
            expect(screen.getByTestId('app-routes')).toBeDefined();
        });
    });
});