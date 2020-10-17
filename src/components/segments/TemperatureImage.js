import React, { useContext } from 'react';
import { Context } from '../../state/Store';
import ClearIcon from '../../resources/weatherIcons/sunny.png';
import DrizzleIcon from '../../resources/weatherIcons/drizzle.png';
import CloudyIcon from '../../resources/weatherIcons/cloudy.png';
import PartlyCloudyIcon from '../../resources/weatherIcons/partly_cloudy.png';
import PartlyCloudNightIcon from '../../resources/weatherIcons/partly_cloudy_night.png';
import SnowyIcon from '../../resources/weatherIcons/heavy_snow.png';
import LightSnowIcon from '../../resources/weatherIcons/light_snow.png';
import LightRainIcon from '../../resources/weatherIcons/light_rain.png';
import HeavyRainIcon from '../../resources/weatherIcons/heavy_rain.png';
import ThunderstormIcon from '../../resources/weatherIcons/thunderstorm.png';
import HomeIcon from '../../resources/weatherIcons/home.png';
import ClearNightIcon from '../../resources/weatherIcons/clear_night.png';
import './TemperatureImage.css'


// TODO: test night weather icons
// need to update userlocation component to become userinfo component 
// need to get sunset time and sunrise to get sunrise and sunset each day
// need to update the below to useEffect and check at an interval
export default function TemperatureImage(props) {
    const [state,] = useContext(Context);

    const weatherTypes = {
        "light intensity drizzle": DrizzleIcon, "drizzle": DrizzleIcon, "drizzle rain": DrizzleIcon, "heavy intensity drizzle": DrizzleIcon,
        "light intensity drizzle rain": DrizzleIcon, "shower drizzle": DrizzleIcon, "light rain": LightRainIcon, "moderate rain": LightRainIcon,
        "heavy intensity rain": HeavyRainIcon, "very heavy rain": HeavyRainIcon, "extreme rain": HeavyRainIcon, "shower rain": HeavyRainIcon,
        "heavy intensity shower rain": HeavyRainIcon, "clear sky": ClearIcon, "few clouds": PartlyCloudyIcon, "scattered clouds": PartlyCloudyIcon, "snow": LightSnowIcon,
        "light snow": LightSnowIcon, "heavy snow": SnowyIcon, "sleet": SnowyIcon, "few clouds night": PartlyCloudNightIcon, "clear sky night": ClearNightIcon
    };

    const getWeatherLabel = (weather) => {
        return weather.replace("_", " ").replace(".png", "");
    }

    const getWeatherImage = () => {
        const weatherDesc = props.description.toLowerCase();
        if (weatherDesc.includes("thunderstorm")) {
            return <img className="weather-icon" alt="description" src={ThunderstormIcon} label="thunderstorms" />
        } else if (state.isNight && (weatherDesc === "clear sky")) {
            const nightWeatherDesc = `${weatherDesc} night`
            return <img className="weather-icon" alt="description" label={getWeatherLabel(weatherTypes[nightWeatherDesc])} />
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