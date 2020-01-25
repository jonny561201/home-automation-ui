import React from 'react';
import ClearIcon from '../../resources/weatherIcons/clear.png';
import CloudyIcon from '../../resources/weatherIcons/cloudy.png';
import PartlyCloudy from '../../resources/weatherIcons/partly_cloudy.png';
import Snowy from '../../resources/weatherIcons/snowy.png';
import LightSnow from '../../resources/weatherIcons/light_snow.png';
import LightRain from '../../resources/weatherIcons/light_rain.png';
import HeavyRain from '../../resources/weatherIcons/heavy_rain.png';
import Thunderstorm from '../../resources/weatherIcons/thunderstorm.png';
import './TemperatureImage.css'


export default function TemperatureImage(props) {

    const getWeatherImage = () => {
        switch (props.description.toLowerCase()) {
            case "clear sky":
                return <img className="weather-icon" alt="description" src={ClearIcon} label="clear sky" />;
            case "heavy intensity rain":
            case "vert heavy rain":
            case "extreme rain":
            case "shower rain":
            case "heavy intensity shower rain":
                return <img className="weather-icon" alt="description" src={HeavyRain} label="clear sky" />;
            case "few clouds":
            case "scattered clouds":
                return <img className="weather-icon" alt="description" src={PartlyCloudy} label="few clouds" />
            case "drizzle":
            case "drizzle rain":
                return <img className="weather-icon" alt="description" src={LightRain} label="few clouds" />
            case "snow":
            case "light snow":
                return <img className="weather-icon" alt="description" src={LightSnow} label="few clouds" />
            case "heavy snow":
            case "sleet":
                return <img className="weather-icon" alt="description" src={Snowy} label="few clouds" />
            case "thunderstorm with light rain":
            case "thunderstorm with rain":
            case "thunderstorm with heavy rain":
            case "light thunderstorm":
            case "heavy thunderstorm":
            case "thunderstorm with drizzle thunderstorm":
                return <img className="weather-icon" alt="description" src={Thunderstorm} label="few clouds" />
            default:
                return <img className="weather-icon" alt="description" src={CloudyIcon} label="broken clouds" />;
        }
    }

    return (
        <div>
            {getWeatherImage()}
        </div>
    );
}