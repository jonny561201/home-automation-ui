import React, { createContext, useReducer } from "react";
import Reducer from './Reducer'


export const initialState = {
    activePage: null,
    user: { userId: null, firstName: '', lastName: '', email: '', roles: [] },
    devices: [],
    garageCoords: null,
    garageDoors: [],
    userCoords: null,
    lights: [],
    sumpData: {},
    tempData: { gaugeColor: '#A0A0A0', currentDesiredTemp: 0.0 },
    forecastData: { description: '' },
    preferences: null,
    location: { notified: false, granted: false },
    tasks: [],
    loadedUtils: false,
    taskTypes: ['sunrise alarm', 'turn on', 'turn off', 'hvac']
};

const noopDispatch = () => {};

const Store = ({ children }) => {
    const [state, dispatch] = useReducer(Reducer, initialState);
    return (
        <Context.Provider value={[state, dispatch]}>
            {children}
        </Context.Provider>
    )
};

export const Context = createContext([initialState, noopDispatch]);
export default Store;