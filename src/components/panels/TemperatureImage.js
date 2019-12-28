import React from 'react';
import SunnyIcon from '../../resources/Sunny.png';
import CloudyIcon from '../../resources/Cloudy.png';
import './TemperatureImage.css'


export default function TemperatureImage(props) {

    const getWeatherImage = () => {
        switch (props.description) {
            case "clear sky":
                return <img className="weather-icon" alt="description" src={SunnyIcon} label="clear sky" />;
            case "overcast clouds":
                return <img className="weather-icon" alt="description" src={CloudyIcon} label="broken clouds" />;
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