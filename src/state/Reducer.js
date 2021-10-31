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
        case 'SET_REFRESH_TOKEN':
            return {
                ...state,
                refreshToken: action.payload
            }
        case 'SET_USER_DATA':
            const payload = action.payload;
            return {
                ...state,
                user: { userId: payload.user_id, roles: payload.roles, firstName: payload.first_name, lastName: payload.last_name }
            }
        case 'SET_DEVICE_ID':
            return {
                ...state,
                deviceId: action.payload
            };
        case 'SET_AUTHENTICATION':
            return {
                ...state,
                isAuthenticated: action.payload
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
                garageDoors: doorIndex > -1 ? state.garageDoors.map(door => door.doorName === action.payload.doorName ? { ...door, "isOpen": action.payload.isOpen } : door) : [...state.garageDoors, action.payload]
            }
        case 'SET_SCHEDULED_TASK':
            return {
                ...state,
                tasks: action.payload
            }
        case 'DELETE_SCHEDULED_TASK':
            return {
                ...state,
                tasks: state.tasks.filter(task => task.task_id !== action.payload)
            }
        case 'ADD_SCHEDULED_TASK':
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case 'SET_SUMP_DATA':
            return {
                ...state,
                sumpData: action.payload
            }
        case 'SET_TEMP_DATA':
            const color = toggleColor(action.payload.mode)
            return {
                ...state,
                tempData: { ...action.payload, gaugeColor: color }
            }
        case 'SET_USER_PREFERENCES':
            return {
                ...state,
                preferences: action.payload
            }
        default:
            return state;
    }
};

const toggleColor = (mode) => {
    if (mode === "cooling")
        return "#27aedb";
    else if (mode === "heating")
        return "#db5127";
    else if (mode === "auto")
        return "#00c774";
    else
        return "#A0A0A0";
}

export default Reducer;