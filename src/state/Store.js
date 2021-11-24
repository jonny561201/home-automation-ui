import React, { createContext, useReducer } from "react";
import Reducer from './Reducer'


const initialState = {
    activePage: null,
    auth: { bearer: null, refresh: null, isAuthenticated: false },
    user: { userId: null, firstName: '', lastName: '', roles: [] },
    deviceId: null,
    startedGarageRegistration: false,
    devicesToRegister: false,
    garageRole: [],
    addedGarageNode: false,
    garageCoords: null,
    garageDoors: [],
    userCoords: null,
    lights: [],
    sumpData: {},
    tempData: { gaugeColor: '#A0A0A0', currentDesiredTemp: 0.0 },
    forecastData: { description: '' },
    preferences: {},
    tasks: [],
    loadedUtils: false,
    taskTypes: ['sunrise alarm', 'turn on', 'turn off', 'hvac']
};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext(initialState);
export default Store;