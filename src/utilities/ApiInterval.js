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

    useInterval(async () => {
        await getGarageData();
    }, 20000);

    useInterval(async () => {
        getTempData();
        getForecastData();
        getLights();
        getUserDevices();
    }, 60000);

    useInterval(async () => {
        await getSumpData();
        await getPreferences();
        await getActivities();
    }, 120000);

    useEffect(() => {
        if (!state.loadedUtils) {
            getUserDevices();
            getLights();
            getGarageData();
            getSumpData();
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
        dispatch({ type: 'SET_GARAGE_COORDS', payload: doors.coordinates });
        dispatch({ type: 'SET_GARAGE_DOORS', payload: doors.doors });
    };

    const getUserDevices = async () => {
        const token = await auth0.getAccessTokenSilently();
        const response = await getDevices(token);
        dispatch({ type: 'SET_DEVICES', payload: response.devices });
    }

    const getSumpData = async () => {
        const token = await auth0.getAccessTokenSilently();
        const sump = await getSumpLevels(token);
        dispatch({ type: 'SET_SUMP_DATA', payload: { ...sump, currentDepth: sump.currentDepth.toFixed(1), averageDepth: sump.averageDepth.toFixed(1) } });
    }

    const getTempData = async () => {
        const token = await auth0.getAccessTokenSilently();
        const temp = await getCurrentTemperature(token);
        const updatedTemp = {
            ...temp,
            desiredTemp: Math.round(temp.desiredTemp),
            currentTemp: Math.round(temp.currentTemp),
        };
        dispatch({ type: 'SET_TEMP_DATA', payload: updatedTemp });
    }

    const getForecastData = async () => {
        const token = await auth0.getAccessTokenSilently();
        const forecast = await getUserForecast(token);
        const updatedForecast = {
            ...forecast,
            temp: Math.round(forecast.temp),
            minTemp: Math.round(forecast.minTemp),
            maxTemp: Math.round(forecast.maxTemp)
        };
        dispatch({ type: 'SET_FORECAST_DATA', payload: updatedForecast });
    }

    const getPreferences = async () => {
        const token = await auth0.getAccessTokenSilently();
        const preferences = await getUserPreferences(token);
        dispatch({ type: 'SET_USER_PREFERENCES', payload: preferences })
    }

    const getActivities = async () => {
        const token = await auth0.getAccessTokenSilently();
        const activities = await getScheduledTasks(token);
        dispatch({ type: 'SET_SCHEDULED_TASK', payload: activities.tasks });
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
