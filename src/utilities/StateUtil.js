
import { useContext, useEffect } from 'react';
import { Context } from '../state/Store';
import { useInterval } from './UseInterval';
import { getGarageStatus, getSumpLevels, getCurrentTemperature, getUserPreferences } from './RestApi';


export default function StateUtil() {
    const [state, dispatch] = useContext(Context);

    useInterval(async () => {
        await getGarageData();
    }, 20000);

    useInterval(async () => {
        await getTempData();
    }, 60000);

    useInterval(async () => {
        await getSumpData();
        await getPreferences();
    }, 120000);

    useEffect(() => {
        getGarageData();
        getSumpData();
        getTempData();
        getPreferences();
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

    const getSumpData = async () => {
        const sump = await getSumpLevels(state.userId);
        dispatch({ type: 'SET_SUMP_DATA', payload: { ...sump, currentDepth: sump.currentDepth.toFixed(1), averageDepth: sump.averageDepth.toFixed(1) } });
    }

    const getTempData = async () => {
        const temp = await getCurrentTemperature(state.userId);
        const updatedTemp = {
            ...temp,
            desiredTemp: Math.round(temp.desiredTemp),
            temp: Math.round(temp.temp),
            currentTemp: Math.round(temp.currentTemp)
        };
        dispatch({ type: 'SET_TEMP_DATA', payload: updatedTemp });
    }

    const getPreferences = async () => {
        const preferences = await getUserPreferences(state.userId);
        dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences })
    }
}
