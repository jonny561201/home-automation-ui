
import React, { useContext } from 'react';
import { Context } from '../state/Store';
import { useInterval } from './UseInterval';
import { getGarageStatus } from './RestApi';


export default function StateUtil() {
    const [state, dispatch] = useContext(Context);

    useInterval(async () => {
        await getGarageData();
    }, 20000);
    
    const getGarageData = async () => {
        state.garageRole.devices.forEach(async (door) => {
            const garageStatus = await getGarageStatus(state.userId, door.node_device);
            dispatch({ type: 'SET_GARAGE_COORDS', payload: garageStatus.coordinates });
            dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { 'doorName': door.node_name, 'isOpen': garageStatus.isGarageOpen } });
        });
    };

     return <></>
}
