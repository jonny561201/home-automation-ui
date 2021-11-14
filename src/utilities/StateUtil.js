
import { useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import { Context } from '../state/Store';
import { useInterval } from './UseInterval';
import {
    getGarageStatus, getSumpLevels, getCurrentTemperature, getUserPreferences,
    getScheduledTasks, getRefreshedBearerToken, getLightGroups
} from './RestApi';


export default function StateUtil() {
    const [state, dispatch] = useContext(Context);

    useInterval(async () => {
        await getGarageData();
        await refreshBearerToken();
    }, 20000);

    useInterval(async () => {
        await getTempData();
        await getLights();
    }, 60000);

    useInterval(async () => {
        await getSumpData();
        await getPreferences();
        await getActivities();
    }, 120000);

    useEffect(() => {
        getLights();
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
                dispatch({ type: 'UPDATE_GARAGE_DOORS', payload: { 'doorName': door.node_name, 'doorId': door.node_device, 'isOpen': garageStatus.isGarageOpen, 'duration': garageStatus.statusDuration } });
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

    const getLights = async () => {
        const groups = await getLightGroups(state.auth.bearer);
        // setGroups(groups);
        if (groups && groups.length) {
            // TODO: !!!!!!!!!!!!!!! REDUCE TO ONE LIGHT GROUP !!!!!!!!!!!!!!!
            dispatch({ type: 'SET_LIGHTS', payload: groups});
            dispatch({ type: 'SET_ALL_USER_LIGHTS', payload: groups.map(x => x.lights).flat(1) });
            dispatch({ type: 'SET_USER_LIGHT_GROUPS', payload: groups });
        }

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
