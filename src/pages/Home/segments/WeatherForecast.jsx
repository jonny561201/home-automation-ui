import React, { useState, useEffect } from 'react';
import { Card } from '@mui/material';
import { dayWeather, defaultWeatherIcon } from '../../../utilities/WeatherIcons';
import './WeatherForecast.scss';


export default function WeatherForecast() {
    const [forecast, setForecast] = useState([]);

    useEffect(() => {
        const mockForecast = [
            { day: 'Mon', high: 72, low: 58, description: 'sunny' },
            { day: 'Tue', high: 68, low: 55, description: 'partly cloudy' },
            { day: 'Wed', high: 65, low: 52, description: 'light rain' },
            { day: 'Thu', high: 70, low: 54, description: 'cloudy' },
            { day: 'Fri', high: 74, low: 60, description: 'thunderstorm' },
        ];
        setForecast(mockForecast);
    }, []);

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
