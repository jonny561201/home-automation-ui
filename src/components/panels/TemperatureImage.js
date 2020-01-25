import React from 'react';
import ClearIcon from '../../resources/weatherIcons/clear.png';
import CloudyIcon from '../../resources/weatherIcons/cloudy.png';
import PartlyCloudyIcon from '../../resources/weatherIcons/partly_cloudy.png';
import SnowyIcon from '../../resources/weatherIcons/snowy.png';
import LightSnowIcon from '../../resources/weatherIcons/light_snow.png';
import LightRainIcon from '../../resources/weatherIcons/light_rain.png';
import HeavyRainIcon from '../../resources/weatherIcons/heavy_rain.png';
import ThunderstormIcon from '../../resources/weatherIcons/thunderstorm.png';
import HomeIcon from '../../resources/weatherIcons/home.png';
import './TemperatureImage.css'


export default function TemperatureImage(props) {

    const lightRain = ["drizzle", "drizzle rain", "light rain", "moderate rain"];
    const heavyRain = ["heavy intensity rain", "very heavy rain", "extreme rain", "shower rain", "heavy intensity shower rain"];

    const getWeatherImage = () => {
        const weatherDesc = props.description.toLowerCase();
        if (weatherDesc.includes("thunderstorm")) {
            return <img className="weather-icon" alt="description" src={ThunderstormIcon} label="thunderstorms" />
        } else if (weatherDesc === "clear sky") {
            return <img className="weather-icon" alt="description" src={ClearIcon} label="clear sky" />;
        } else if (heavyRain.includes(weatherDesc)) {
            return <img className="weather-icon" alt="description" src={HeavyRainIcon} label="heavy rain" />;
        } else if (lightRain.includes(weatherDesc)) {
            return <img className="weather-icon" alt="description" src={LightRainIcon} label="light rain" />
        } else if (weatherDesc === "few clouds" || weatherDesc === "scattered clouds") {
            return <img className="weather-icon" alt="description" src={PartlyCloudyIcon} label="partly cloudy" />;
        } else if (weatherDesc === "snow" || weatherDesc === "light snow") {
            return <img className="weather-icon" alt="description" src={LightSnowIcon} label="light snow" />
        } else if (weatherDesc === "heavy snow" || weatherDesc === "sleet") {
            return <img className="weather-icon" alt="description" src={SnowyIcon} label="heavy snow" />
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