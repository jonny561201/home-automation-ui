import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import Routes from '../../../components/routes/Routes';
import { Context } from '../../../state/Store';

vi.mock('../../../utilities/RestApi', async () => {
    const actual = await vi.importActual('../../../utilities/RestApi');
    return {
        ...actual,
        getUserChildAccounts: vi.fn().mockResolvedValue([]),
    };
});


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
    devices: [],
    garageCoords: null,
};

const authState = {
    ...unauthState,
    auth: { isAuthenticated: true, bearer: 'fakeToken' },
    user: { firstName: 'Test', lastName: 'User', userId: '123', roles: [] },
    loadedUtils: true,
};

describe.skip('Routes', () => {

    const renderAt = async (path, state) => {
        const activePages = {
            '/': 'Login',
            '/home': 'Home Automation',
            '/activities': 'Activities',
            '/settings': 'Settings',
            '/account': 'Account'
        };
        const stateWithPage = { ...state, activePage: activePages[path] || state.activePage };

        render(
            <MemoryRouter initialEntries={[path]}>
                <Context.Provider value={[stateWithPage, () => { }]}> 
                    <Routes />
                </Context.Provider>
            </MemoryRouter>
        );
    };


    describe('app routes', () => {

        it('should render the Login route at /', async () => {
            await renderAt('/', unauthState);
            const actual = await screen.findByRole('heading', { name: 'Member Login' });
            expect(actual).toBeDefined();
        });

        it('should redirect unauthenticated user from /home to /', async () => {
            await renderAt('/home', unauthState);
            const actual = await screen.findByRole('heading', { name: 'Member Login' });
            expect(actual).toBeDefined();
        });

        it('should render the Home route at /home when authenticated', async () => {
            await renderAt('/home', authState);
            const actual = await screen.findByText('Home Automation');
            expect(actual).toBeDefined();
        });

        it('should render the Activities route at /activities when authenticated', async () => {
            await renderAt('/activities', authState);
            const actual = await screen.findAllByRole('heading', { name: 'Activities' });
            expect(actual).toBeDefined();
        });

        it('should render the Settings route at /settings when authenticated', async () => {
            await renderAt('/settings', authState);
            const actual = await screen.findByText('Preferences');
            expect(actual).toBeDefined();
        });

        it('should render the Account route at /account when authenticated', async () => {
            await renderAt('/account', authState);
            const actual = await screen.findByText('Change Password');
            expect(actual).toBeDefined();
        });
    });
});