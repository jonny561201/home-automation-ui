import React, { useState, useEffect, useContext } from 'react';
import { isNightTime } from '../../../utilities/Services';
import { useInterval } from '../../../utilities/UseInterval';
import { Context } from '../../../state/Store';
import ClearIcon from '../../../resources/weatherIcons/sunny.png';
import DrizzleIcon from '../../../resources/weatherIcons/drizzle.png';
import CloudyIcon from '../../../resources/weatherIcons/cloudy.png';
import PartlyCloudyIcon from '../../../resources/weatherIcons/partly_cloudy.png';
import PartlyCloudNightIcon from '../../../resources/weatherIcons/partly_cloudy_night.png';
import SnowyIcon from '../../../resources/weatherIcons/heavy_snow.png';
import LightSnowIcon from '../../../resources/weatherIcons/light_snow.png';
import LightRainIcon from '../../../resources/weatherIcons/light_rain.png';
import HeavyRainIcon from '../../../resources/weatherIcons/heavy_rain.png';
import ThunderstormIcon from '../../../resources/weatherIcons/thunderstorm.png';
import HomeIcon from '../../../resources/weatherIcons/home.png';
import ClearNightIcon from '../../../resources/weatherIcons/clear_night.png';
import MistIcon from '../../../resources/weatherIcons/misty.png';
import './TemperatureImage.css'


export default function TemperatureImage() {
    const [state,] = useContext(Context);
    const [isNight, setIsNight] = useState(false);
    const [weatherIcon, setWeatherIcon] = useState();
    const [weatherDesc, setWeatherDesc] = useState("");

    useEffect(() => {
        setIsNight(isNightTime(state.garageCoords, state.userCoords));
        getWeatherImage();
    });

    useInterval(() => {
        setIsNight(isNightTime(state.garageCoords, state.userCoords));
        getWeatherImage();
    }, 20000);

    const weatherTypes = {
        "light intensity drizzle": DrizzleIcon, "drizzle": DrizzleIcon, "drizzle rain": DrizzleIcon, "heavy intensity drizzle": DrizzleIcon, "mist": MistIcon,
        "light intensity drizzle rain": DrizzleIcon, "shower drizzle": DrizzleIcon, "light rain": LightRainIcon, "moderate rain": LightRainIcon,
        "heavy intensity rain": HeavyRainIcon, "very heavy rain": HeavyRainIcon, "extreme rain": HeavyRainIcon, "shower rain": HeavyRainIcon, "light snow": LightSnowIcon,
        "heavy intensity shower rain": HeavyRainIcon, "clear sky": ClearIcon, "few clouds": PartlyCloudyIcon, "scattered clouds": PartlyCloudyIcon, "snow": LightSnowIcon,
        "heavy snow": SnowyIcon, "sleet": SnowyIcon, "few clouds night": PartlyCloudNightIcon, "clear sky night": ClearNightIcon, "scattered clouds night": PartlyCloudNightIcon
    };

    const getWeatherLabel = (weather) => {
        return weather.replace(/_/g, " ").replace(".png", "");
    }

    const getWeatherImage = () => {
        const weatherDesc = state.tempData.description.toLowerCase();
        if (weatherDesc.includes("thunderstorm")) {
            setWeatherIcon(ThunderstormIcon);
            setWeatherDesc("thunderstorms");
        } else if (isNight && (weatherDesc === "clear sky" || weatherDesc === "few clouds" || weatherDesc === "scattered clouds")) {
            const nightWeatherDesc = `${weatherDesc} night`
            setWeatherIcon(weatherTypes[nightWeatherDesc]);
            setWeatherDesc(getWeatherLabel(weatherTypes[nightWeatherDesc]));
        } else if (weatherDesc in weatherTypes) {
            setWeatherIcon(weatherTypes[weatherDesc]);
            setWeatherDesc(getWeatherLabel(weatherTypes[weatherDesc]));
        } else {
            setWeatherIcon(CloudyIcon);
            setWeatherDesc("cloudy");
        }
    }

    return (
        <div className="temp-container">
            <div className="temp-external-container">
                <img className="weather-icon" alt="description" src={weatherIcon} label={weatherDesc} />
                <div className="external-temp">
                    <p className="bottom-fade min-max text">{state.tempData.maxTemp}</p>
                    <p data-testid={"external-temp"} className="external text">{state.tempData.temp}&deg;</p>
                    <p className="top-fade min-max text">{state.tempData.minTemp}</p>
                </div>
            </div>
            <div className="temp-home-container">
                <img className="home-icon" alt="home" src={HomeIcon} />
                <p data-testid={"internal-temp"} className="internal-temp text">{state.tempData.currentTemp}&deg;</p>
            </div>
        </div>
    );
}