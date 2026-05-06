import React, { useContext } from 'react';
import { Card } from '@mui/material';
import { dayWeather, defaultWeatherIcon } from '../../../utilities/WeatherIcons';
import { Context } from '../../../state/Store';
import './WeatherForecast.scss';


export default function WeatherForecast() {
    const [state] = useContext(Context);
    const forecast = state.extendedForecast || [];

    const getIcon = (description) => {
        return dayWeather[description] || defaultWeatherIcon;
    };

    return (
        <div className="weather-forecast">
            {forecast.map(day =>
                <Card key={day.day} className="forecast-day" elevation={1}>
                    <p className="forecast-day-name text">{day.day}</p>
                    <p className="forecast-high text">{day.high}°</p>
                    <img className="forecast-icon" alt={day.description} src={getIcon(day.description)} />
                    <p className="forecast-low text">{day.low}°</p>
                </Card>
            )}
        </div>
    );
}
