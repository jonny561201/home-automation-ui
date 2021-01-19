const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_PAGE':
            return {
                ...state,
                activePage: action.payload
            };
        case 'SET_BEARER_TOKEN':
            return {
                ...state,
                bearerToken: action.payload
            };
        case 'SET_USER_ID':
            return {
                ...state,
                userId: action.payload
            };
        case 'SET_DEVICE_ID':
            return {
                ...state,
                deviceId: action.payload
            };
        case 'SET_FIRST_NAME':
            return {
                ...state,
                firstName: action.payload
            };
        case 'SET_LAST_NAME':
            return {
                ...state,
                lastName: action.payload
            };
        case 'SET_AUTHENTICATION':
            return {
                ...state,
                isAuthenticated: action.payload
            };
        case 'SET_ROLES':
            return {
                ...state,
                roles: action.payload
            };
        case 'SET_STARTED_GARAGE_REGISTRATION':
            return {
                ...state,
                startedGarageRegistration: action.payload
            };
        case 'SET_DEVICES_TO_REGISTER':
            return {
                ...state,
                devicesToRegister: action.payload
            };
        case 'SET_GARAGE_ROLE':
            return {
                ...state,
                garageRole: action.payload
            };
        case 'SET_ADDED_GARAGE_NODE':
            return {
                ...state,
                addedGarageNode: action.payload
            };
        case 'SET_GARAGE_COORDS':
            return {
                ...state,
                garageCoords: action.payload
            };
        case 'SET_USER_COORDS':
            return {
                ...state,
                userCoords: action.payload
            };
        case 'SET_ALL_USER_LIGHTS':
            return {
                ...state,
                userLights: action.payload
            };
        case 'SET_USER_LIGHT':
            return {
                ...state,
                userLights: state.userLights.map(light => [action.payload].find(p => p.lightId === light.lightId) || light)
            };
        case 'SET_USER_LIGHT_GROUPS':
            return {
                ...state,
                userLightGroups: action.payload
            };
        case 'UPDATE_GARAGE_DOORS':
            const doorIndex = state.garageDoors.findIndex(door => door.doorName === action.payload.doorName);
            return {
                ...state,
                garageDoors: doorIndex > -1 ? state.garageDoors.map(door => door.doorName === action.payload.doorName ? {...door, "isOpen": action.payload.isOpen} : door) : [...state.garageDoors, action.payload]
            }
        default:
            return state;
    }
};

export default Reducer;