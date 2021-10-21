
import { useContext, useEffect } from 'react';
import { Context } from '../state/Store';
import { useInterval } from './UseInterval';
import { getGarageStatus } from './RestApi';
import { getDate } from 'date-fns';


export default function StateUtil() {
    const [state, dispatch] = useContext(Context);

    useInterval(async () => {
        await getGarageData();
    }, 20000);

    useEffect(() => {
        getGarageData();
    }, []);

    const getGarageData = async () => {
        const doors = state.garageRole.devices;
        if (doors) {
            doors.forEach(async (door) => {
                const garageStatus = await getGarageStatus(state.userId, door.node_device);
                dispatch({ type: 'SET_GARAGE_COORDS', payload: garageStatus.coordinates });
                dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { 'doorName': door.node_name, 'isOpen': garageStatus.isGarageOpen, 'duration': garageStatus.statusDuration } });
            });
        }
    };
}
