import { useContext, useEffect } from 'react';
import { Context } from '../state/Store';
import { useInterval } from './UseInterval';
import {
    getAllGarageStatus,
    getCurrentTemperature,
    getDevices,
    getLightGroups,
    getScheduledTasks,
    getSumpLevels,
    getUserForecast,
    getUserPreferences
} from './RestApi';
import { useAuth0 } from '@auth0/auth0-react';


export default function ApiInterval({ children }) {
    const [state, dispatch] = useContext(Context);
    const auth0 = useAuth0();

    const roles = state.user.roles || [];
    const hasGarage = roles.includes('garage_door');
    const hasSump = roles.includes('sump_pump');

    useInterval(async () => {
        if (hasGarage) await getGarageData();
    }, 20000);

    useInterval(async () => {
        getTempData();
        getForecastData();
        getLights();
        getUserDevices();
    }, 60000);

    useInterval(async () => {
        if (hasSump) await getSumpData();
        await getPreferences();
        await getActivities();
    }, 120000);

    useEffect(() => {
        if (!state.loadedUtils) {
            getUserDevices();
            getLights();
            if (hasGarage) getGarageData();
            if (hasSump) getSumpData();
            getTempData();
            getForecastData();
            getPreferences();
            getActivities();
            dispatch({ type: 'SET_LOADED_UTILS', payload: true });
        }
    }, []);

    const getGarageData = async () => {
        const token = await auth0.getAccessTokenSilently();
        const doors = await getAllGarageStatus(token);
        dispatch({ type: 'SET_GARAGE_COORDS', payload: doors.coordinates || null });
        dispatch({ type: 'SET_GARAGE_DOORS', payload: doors.doors || [] });
    };

    const getUserDevices = async () => {
        const token = await auth0.getAccessTokenSilently();
        const response = await getDevices(token);
        dispatch({ type: 'SET_DEVICES', payload: response.devices || [] });
    }

    const getSumpData = async () => {
        const token = await auth0.getAccessTokenSilently();
        const sump = await getSumpLevels(token);
        dispatch({ type: 'SET_SUMP_DATA', payload: sump });
    }

    const getTempData = async () => {
        const token = await auth0.getAccessTokenSilently();
        const temp = await getCurrentTemperature(token);
        if (!temp.currentTemp && temp.currentTemp !== 0) return;
        dispatch({ type: 'SET_TEMP_DATA', payload: { ...temp, desiredTemp: Math.round(temp.desiredTemp), currentTemp: Math.round(temp.currentTemp) } });
    }

    const getForecastData = async () => {
        const token = await auth0.getAccessTokenSilently();
        const forecast = await getUserForecast(token);
        if (!forecast.temp && forecast.temp !== 0) return;
        dispatch({ type: 'SET_FORECAST_DATA', payload: { ...forecast, temp: Math.round(forecast.temp), minTemp: Math.round(forecast.minTemp), maxTemp: Math.round(forecast.maxTemp) } });
    }

    const getPreferences = async () => {
        const token = await auth0.getAccessTokenSilently();
        const preferences = await getUserPreferences(token);
        if (Object.keys(preferences).length > 0) {
            dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences });
        }
    }

    const getActivities = async () => {
        const token = await auth0.getAccessTokenSilently();
        const activities = await getScheduledTasks(token);
        dispatch({ type: 'SET_SCHEDULED_TASK', payload: activities.tasks || [] });
    }

    const getLights = async () => {
        const token = await auth0.getAccessTokenSilently();
        const groups = await getLightGroups(token);
        if (groups && groups.length) {
            dispatch({ type: 'SET_LIGHTS', payload: groups });
        }
    }

    return children
}
