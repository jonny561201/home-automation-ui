import React from 'react';
import ClearIcon from '../../resources/weatherIcons/clear.png';
import CloudyIcon from '../../resources/weatherIcons/cloudy.png';
import PartlyCloudy from '../../resources/weatherIcons/partly_cloudy.png';
import Snowy from '../../resources/weatherIcons/snowy.png';
import LightSnow from '../../resources/weatherIcons/light_snow.png';
import LightRain from '../../resources/weatherIcons/light_rain.png';
import HeavyRain from '../../resources/weatherIcons/heavy_rain.png';
import Thunderstorm from '../../resources/weatherIcons/thunderstorm.png';
import HomeIcon from '../../resources/weatherIcons/home.png';
import './TemperatureImage.css'


export default function TemperatureImage(props) {

    const getWeatherImage = () => {
        switch (props.description.toLowerCase()) {
            case "clear sky":
                return <img className="weather-icon" alt="description" src={ClearIcon} label="clear sky" />;
            case "heavy intensity rain":
            case "very heavy rain":
            case "extreme rain":
            case "shower rain":
            case "heavy intensity shower rain":
                return <img className="weather-icon" alt="description" src={HeavyRain} label="heavy rain" />;
            case "few clouds":
            case "scattered clouds":
                return <img className="weather-icon" alt="description" src={PartlyCloudy} label="partly cloudy" />
            case "drizzle":
            case "drizzle rain":
            case "light rain":
            case "moderate rain":
                return <img className="weather-icon" alt="description" src={LightRain} label="light rain" />
            case "snow":
            case "light snow":
                return <img className="weather-icon" alt="description" src={LightSnow} label="light snow" />
            case "heavy snow":
            case "sleet":
                return <img className="weather-icon" alt="description" src={Snowy} label="heavy snow" />
            case "thunderstorm with light rain":
            case "thunderstorm with rain":
            case "thunderstorm with heavy rain":
            case "light thunderstorm":
            case "heavy thunderstorm":
            case "thunderstorm with drizzle":
            case "thunderstorm with light drizzle":
            case "thunderstorm with heavy drizzle":
            case "thunderstorm":
            case "ragged thunderstorm":
                return <img className="weather-icon" alt="description" src={Thunderstorm} label="thunderstorms" />
            default:
                return <img className="weather-icon" alt="description" src={CloudyIcon} label="cloudy" />;
        }
    }

    return (
        <div>
            {getWeatherImage()}
            <img className="home-icon" alt="home" src={HomeIcon} />
        </div>
    );
}