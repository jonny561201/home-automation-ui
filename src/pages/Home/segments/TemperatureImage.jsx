import React, { useContext } from 'react';
import { isDayLight } from '../../../utilities/Services';
import { dayWeather, nightWeather, defaultWeatherIcon } from '../../../utilities/WeatherIcons';
import { Context } from '../../../state/Store';
import HomeIcon from '../../../resources/weatherIcons/home.png';
import './TemperatureImage.scss'


export default function TemperatureImage() {
    const [state,] = useContext(Context);

    const isNight = !isDayLight(state.garageCoords, state.userCoords);
    const description = (state.forecastData.description || 'cloudy').toLowerCase();
    const weather = isNight ? nightWeather : dayWeather;
    const icon = weather[description] || defaultWeatherIcon;

    return (
        <div className="temp-container">
            <div className="temp-external-container">
                <img className="weather-icon" alt={state.forecastData.description} src={icon} />
                <div className="external-temp">
                    <p className="bottom-fade min-max text">{state.forecastData.maxTemp}</p>
                    <p className="external text">{state.forecastData.temp}&deg;</p>
                    <p className="top-fade min-max text">{state.forecastData.minTemp}</p>
                </div>
            </div>
            <div className="temp-home-container">
                <img className="home-icon" alt="home" src={HomeIcon} />
                <p className="internal-temp text">{state.tempData.currentTemp}&deg;</p>
            </div>
        </div>
    );
}
