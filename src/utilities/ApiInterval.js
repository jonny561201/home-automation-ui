import { useContext, useEffect, useRef } from 'react';
import { Context } from '../state/Store';
import { useInterval } from './UseInterval';
import {
    getAllGarageStatus,
    getCurrentTemperature,
    getDevices,
    getExtendedForecast,
    getLightGroups,
    getScenes,
    getScheduledTasks,
    getSumpLevels,
    getUserForecast,
    getUserPreferences
} from './RestApi';
import { useAuth0 } from '@auth0/auth0-react';


export default function ApiInterval({ children }) {
    const [state, dispatch] = useContext(Context);

    const roles = state.user.roles || [];
    const hasGarage = roles.includes('garage_door');
    const hasSump = roles.includes('sump_pump');

    useInterval(async () => {
        if (hasGarage) await getGarageData();
    }, 20000);

    useInterval(async () => {
        getTempData();
        getLights();
        getUserDevices();
    }, 60000);

    useInterval(async () => {
        if (hasSump) await getSumpData();
    }, 120000);

    useInterval(async () => {
        getForecastData();
        getExtendedForecastData();
    }, 300000);

    const loaded = useRef(false);

    useEffect(() => {
        if (!state.user.userId || loaded.current) return;
        loaded.current = true;
        getUserDevices();
        getLights();
        getScenesData();
        if (hasGarage) getGarageData();
        if (hasSump) getSumpData();
        getTempData();
        getForecastData();
        getExtendedForecastData();
        getPreferences();
        getActivities();
    }, [state.user.userId]);

    const getGarageData = async () => {
        const doors = await getAllGarageStatus();
        dispatch({ type: SET_GARAGE_COORDS, payload: doors.coordinates || null });
        const mapped = (doors.doors || []).map(x => ({ ...x, isOpen: x.isGarageOpen }));
        dispatch({ type: SET_GARAGE_DOORS, payload: mapped });
    };

    const getUserDevices = async () => {
        const response = await getDevices();
        dispatch({ type: SET_DEVICES, payload: response.devices || [] });
    }

    const getSumpData = async () => {
        const sump = await getSumpLevels();
        dispatch({ type: SET_SUMP_DATA, payload: sump });
    }

    const getTempData = async () => {
        const temp = await getCurrentTemperature();
        if (Object.keys(temp).length === 0) return;
        const currentTemp = temp.currentTemp != null ? Math.round(temp.currentTemp) : null;
        dispatch({ type: SET_TEMP_DATA, payload: { ...temp, desiredTemp: Math.round(temp.desiredTemp), currentTemp } });
    }

    const getForecastData = async () => {
        const forecast = await getUserForecast();
        if (!forecast.temp && forecast.temp !== 0) return;
        dispatch({ type: SET_FORECAST_DATA, payload: { ...forecast, temp: Math.round(forecast.temp), minTemp: Math.round(forecast.minTemp), maxTemp: Math.round(forecast.maxTemp) } });
    }

    const getExtendedForecastData = async () => {
        const response = await getExtendedForecast();
        if (!response.forecast || !response.forecast.length) return;
        const days = response.forecast.map(d => ({
            day: new Date(d.date).toLocaleDateString('en-us', { weekday: 'short' }),
            high: Math.round(d.maxTemp),
            low: Math.round(d.minTemp),
            description: d.description,
        }));
        dispatch({ type: SET_EXTENDED_FORECAST, payload: days });
    }

    const getPreferences = async () => {
        const preferences = await getUserPreferences();
        if (Object.keys(preferences).length > 0) {
            dispatch({ type: SET_USER_PREFERENCES, payload: preferences });
        }
    }

    const getActivities = async () => {
        const activities = await getScheduledTasks();
        dispatch({ type: SET_SCHEDULED_TASK, payload: activities.tasks || [] });
    }

    const getLights = async () => {
        const groups = await getLightGroups();
        if (groups && groups.length) {
            dispatch({ type: SET_LIGHTS, payload: groups });
        } else {
            dispatch({ type: SET_LIGHTS, payload: testLights });
        }
    }

    const getScenesData = async () => {
        const response = await getScenes();
        const scenes = response.scenes && response.scenes.length ? response.scenes : testScenes;
        dispatch({ type: SET_SCENES, payload: scenes });
    };

    return children
}
