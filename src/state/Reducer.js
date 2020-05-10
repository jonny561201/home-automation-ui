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
        default:
            return state;
    }
};

export default Reducer;