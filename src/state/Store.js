import React, { createContext, useReducer } from "react";
import Reducer from './Reducer'


const initialState = {
    activePage: null,
    bearerToken: null,
    userId: null,
    isAuthenticated: false,
    firstName: "",
    lastName: "",
    roles: [],
    deviceId: null,
    startedGarageRegistration: false,
    devicesToRegister: false,
    garageRole: null,
    addedGarageNode: false,
    garageCoords: null,
    userCoords: null,
    userLights: [],
    userLightGroups: [],
    daysOfWeek: [{ id: 1, day: 'S', on: false }, { id: 2, day: 'M', on: false }, { id: 3, day: 'T', on: false },
                { id: 4, day: 'W', on: false }, { id: 5, day: 'T', on: false }, { id: 6, day: 'F', on: false }, { id: 7, day: 'S', on: false }],
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