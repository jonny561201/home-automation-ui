import React from 'react';
import ClearIcon from '../../resources/weatherIcons/sunny.png';
import DrizzleIcon from '../../resources/weatherIcons/drizzle.png';
import CloudyIcon from '../../resources/weatherIcons/cloudy.png';
import PartlyCloudyIcon from '../../resources/weatherIcons/partly_cloudy.png';
import SnowyIcon from '../../resources/weatherIcons/heavy_snow.png';
import LightSnowIcon from '../../resources/weatherIcons/light_snow.png';
import LightRainIcon from '../../resources/weatherIcons/light_rain.png';
import HeavyRainIcon from '../../resources/weatherIcons/heavy_rain.png';
import ThunderstormIcon from '../../resources/weatherIcons/thunderstorm.png';
import HomeIcon from '../../resources/weatherIcons/home.png';
import './TemperatureImage.css'


export default function TemperatureImage(props) {

    const weatherTypes = {
        "light intensity drizzle": DrizzleIcon, "drizzle": DrizzleIcon, "drizzle rain": DrizzleIcon, "heavy intensity drizzle": DrizzleIcon,
        "light intensity drizzle rain": DrizzleIcon, "shower drizzle": DrizzleIcon, "light rain": LightRainIcon, "moderate rain": LightRainIcon,
        "heavy intensity rain": HeavyRainIcon, "very heavy rain": HeavyRainIcon, "extreme rain": HeavyRainIcon, "shower rain": HeavyRainIcon,
        "heavy intensity shower rain": HeavyRainIcon, "clear sky": ClearIcon, "few clouds": PartlyCloudyIcon, "scattered clouds": PartlyCloudyIcon, "snow": LightSnowIcon,
        "light snow": LightSnowIcon, "heavy snow": SnowyIcon, "sleet": SnowyIcon
    };

    const getWeatherLabel = (weather) => {
        return weather.replace("_", " ").replace(".png", "");
    }

    const getWeatherImage = () => {
        const weatherDesc = props.description.toLowerCase();
        if (weatherDesc.includes("thunderstorm")) {
            return <img className="weather-icon" alt="description" src={ThunderstormIcon} label="thunderstorms" />
        } else if (weatherDesc in weatherTypes) {
            return <img className="weather-icon" alt="description" src={weatherTypes[weatherDesc]} label={getWeatherLabel(weatherTypes[weatherDesc])} />
        } else {
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