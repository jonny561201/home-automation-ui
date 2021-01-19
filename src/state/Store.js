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
    garageRole: [],
    addedGarageNode: false,
    garageCoords: null,
    garageDoors: [],
    userCoords: null,
    userLights: [],
    userLightGroups: [],
    // daysOfWeek: [{ id: 'Sun', day: 'S', on: false }, { id: 'Mon', day: 'M', on: false }, { id: 'Tue', day: 'T', on: false },
    //             { id: 'Wed', day: 'W', on: false }, { id: 'Thu', day: 'T', on: false }, { id: 'Fri', day: 'F', on: false }, { id: 'Sat', day: 'S', on: false }],
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