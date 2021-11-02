
import { useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Context } from '../state/Store';
import { useInterval } from './UseInterval';
import {
    getGarageStatus, getSumpLevels, getCurrentTemperature, getUserPreferences,
    getScheduledTasks, getRefreshedBearerToken
} from './RestApi';


export default function StateUtil() {
    const [state, dispatch] = useContext(Context);

    useInterval(async () => {
        await getGarageData();
        await refreshBearerToken();
    }, 20000);

    useInterval(async () => {
        await getTempData();
    }, 60000);

    useInterval(async () => {
        await getSumpData();
        await getPreferences();
        await getActivities();
    }, 120000);

    useEffect(() => {
        getGarageData();
        getSumpData();
        getTempData();
        getPreferences();
        getActivities();
    }, []);

    const getGarageData = async () => {
        const doors = state.garageRole.devices;
        if (doors) {
            doors.forEach(async (door) => {
                const garageStatus = await getGarageStatus(state.user.userId, state.auth.bearer, door.node_device);
                dispatch({ type: 'SET_GARAGE_COORDS', payload: garageStatus.coordinates });
                dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { 'doorName': door.node_name, 'isOpen': garageStatus.isGarageOpen, 'duration': garageStatus.statusDuration } });
            });
        }
    };

    const getSumpData = async () => {
        const sump = await getSumpLevels(state.user.userId, state.auth.bearer);
        dispatch({ type: 'SET_SUMP_DATA', payload: { ...sump, currentDepth: sump.currentDepth.toFixed(1), averageDepth: sump.averageDepth.toFixed(1) } });
    }

    const getTempData = async () => {
        const temp = await getCurrentTemperature(state.user.userId, state.auth.bearer);
        const updatedTemp = {
            ...temp,
            desiredTemp: Math.round(temp.desiredTemp),
            temp: Math.round(temp.temp),
            currentTemp: Math.round(temp.currentTemp)
        };
        dispatch({ type: 'SET_TEMP_DATA', payload: updatedTemp });
    }

    const getPreferences = async () => {
        const preferences = await getUserPreferences(state.user.userId, state.auth.bearer);
        dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences })
    }

    const getActivities = async () => {
        const activities = await getScheduledTasks(state.user.userId, state.auth.bearer);
        dispatch({ type: 'SET_SCHEDULED_TASK', payload: activities });
    }

    const refreshBearerToken = async () => {
        const fiveMinutes = 300000;
        const refreshInterval = Date.now() + fiveMinutes;
        const newDate = state.auth.exp * 1000
        if (newDate <= refreshInterval) {
            const bearer = await getRefreshedBearerToken(state.auth.refresh);
            const decodedToken = jwt_decode(bearer.bearerToken);
            dispatch({ type: 'SET_AUTH_DATA', payload: { bearer: bearer.bearerToken, refresh: decodedToken.refresh_token, isAuthenticated: true, exp: decodedToken.exp } });
        }
    }
}
