import { getStore } from '../GlobalState';


describe('GlobalState', () => {

    describe('ActivePage', () => {
        let state;
        const activePage = "testPage";

        beforeEach(() => {
            state = getStore()
        });

        it('should set active page', () => {
            state.setActivePage(activePage);
            const actual = state.state.activePage;
            expect(actual).toEqual(activePage);
        });

        it('should get active page', () => {
            state.state.activePage = activePage;
            expect(state.getActivePage()).toEqual(activePage);
        });
    });

    describe('Authorization', () => {
        let state;

        beforeEach(() => {
            state = getStore();
        });

        it('should update the authorization to true', () => {
            state.updateAuth(true);
            expect(state.state.isAuthenticated).toBeTruthy();
        });

        it('should update the authorization to false', () => {
            state.updateAuth(false);
            expect(state.state.isAuthenticated).toBeFalsy();
        });

        it('should get the authorization', () => {
            state.state.isAuthenticated = true;
            expect(state.isAuthenticated()).toBeTruthy();
        });
    });

    describe('BearerToken', () => {
        let state;
        const bearerToken = 'ImAFakeBearerToken';

        beforeEach(() => {
            state = getStore();
        });

        it('should set bearer token', () => {
            state.setBearerToken(bearerToken);
            expect(state.state.bearerToken).toEqual(bearerToken);
        });

        it('should get bearer token', () => {
            state.state.bearerToken = bearerToken;
            expect(state.getBearerToken()).toEqual(bearerToken);
        });
    });

    describe('UserId', () => {
        let state;
        const userId = 'fakeUserId';

        beforeEach(() => {
            state = getStore();
        });

        it('should set the user Id', () => {
            state.setUserId(userId);
            expect(state.state.userId).toEqual(userId);
        });

        it('should get the user Id', () => {
            state.state.userId = userId;
            expect(state.getUserId()).toEqual(userId);
        });
    });

    describe('Registered Devices', () => {
        let state;

        beforeEach(() => {
            state = getStore();
        });

        it('should return true when garage role has no devices under role', () => {
            const roles = [{role_name: 'garage_door'}];
            state.state.userRoles = roles;
            expect(state.hasUnregisteredDevices()).toBeTruthy();
        });

        it('should return true when garage role has devices list without items under role', () => {
            const roles = [{role_name: 'garage_door', devices: []}];
            state.state.userRoles = roles;
            expect(state.hasUnregisteredDevices()).toBeTruthy();
        });

        it('should return false when garage role has devices under role', () => {
            const role = [{role_name: 'garage_door', devices:[{node_name:'first garage'}]}]
            state.state.userRoles = role;
            expect(state.hasUnregisteredDevices()).toBeFalsy();
        });

        it('should return false when no garage role', () => {
            const role = [{role_name: 'security'}]
            state.state.userRoles = role;
            expect(state.hasUnregisteredDevices()).toBeFalsy();
        });
    });
});