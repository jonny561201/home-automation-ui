import { parseDate } from "../utilities/Services";

const Reducer = (state, action) => {
    switch (action.type) {
        case 'SET_ACTIVE_PAGE':
            return {
                ...state,
                activePage: action.payload
            };
        case 'SET_AUTH_DATA':
            return {
                ...state,
                auth: action.payload
            }
        case 'SET_USER_DATA':
            return {
                ...state,
                user: action.payload
            }
        case 'SET_DEVICE_ID':
            return {
                ...state,
                deviceId: action.payload
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
            const color = toggleColor(action.payload.mode, state);
            const current = determineDesired(state, action.payload);
            return {
                ...state,
                tempData: { ...action.payload, gaugeColor: color, currentDesiredTemp: current }
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

const toggleColor = (mode, state) => {
    if (mode === "cooling")
        return "#27aedb";
    else if (mode === "heating")
        return "#db5127";
    else if (mode === "auto" && state.tasks.some(x => x.task_type === 'hvac'))
        return "#00c774";
    else
        return "#A0A0A0";
}


//TODO: doesnt handle multiple hvac events well..what if more than one are active?
const determineDesired = (state, payload) => {
    const now = new Date();
    const name = now.toLocaleString('en-us', { weekday: 'long' }).substring(0, 3);
    const tasks = state.tasks.filter(x => x.task_type === 'hvac');
    const activeTask = tasks.find(x => now > parseDate(x.hvac_start) && now < parseDate(x.hvac_stop) && x.alarm_days.includes(name));
    if (payload.mode === 'auto' && activeTask)
        return activeTask.hvac_start_temp;
    else if (payload.mode === 'auto' && tasks.length > 0 && tasks.find(x => x.alarm_days.includes(name)))
        return tasks.find(x => x.task_type === 'hvac').hvac_stop_temp;
    else if (payload.minThermostatTemp && payload.mode === 'auto')
        return (payload.minThermostatTemp + payload.maxThermostatTemp) / 2;
    else
        return payload.desiredTemp;
}

export default Reducer;