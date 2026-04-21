import ClearIcon from '../resources/weatherIcons/sunny.png';
import DrizzleIcon from '../resources/weatherIcons/drizzle.png';
import CloudyIcon from '../resources/weatherIcons/cloudy.png';
import PartlyCloudyIcon from '../resources/weatherIcons/partly_cloudy.png';
import PartlyCloudNightIcon from '../resources/weatherIcons/partly_cloudy_night.png';
import MostlyCloudyNightIcon from '../resources/weatherIcons/mostly_cloudy_night.png';
import SnowyIcon from '../resources/weatherIcons/heavy_snow.png';
import LightSnowIcon from '../resources/weatherIcons/light_snow.png';
import LightRainIcon from '../resources/weatherIcons/light_rain.png';
import HeavyRainIcon from '../resources/weatherIcons/heavy_rain.png';
import ThunderstormIcon from '../resources/weatherIcons/thunderstorm.png';
import ClearNightIcon from '../resources/weatherIcons/clear_night.png';
import MistIcon from '../resources/weatherIcons/misty.png';


export const dayWeather = {
    "sunny": ClearIcon,
    "mostly sunny": PartlyCloudyIcon,
    "partly cloudy": PartlyCloudyIcon,
    "cloudy": CloudyIcon,
    "drizzle": DrizzleIcon,
    "heavy drizzle": LightRainIcon,
    "light rain": LightRainIcon,
    "rain": LightRainIcon,
    "rain showers": HeavyRainIcon,
    "heavy rain": HeavyRainIcon,
    "light snow": LightSnowIcon,
    "snow": SnowyIcon,
    "heavy snow": SnowyIcon,
    "snow showers": SnowyIcon,
    "thunderstorm": ThunderstormIcon,
    "thunderstorm w/ hail": ThunderstormIcon,
    "severe thunderstorm": ThunderstormIcon,
    "mist": MistIcon,
};

export const nightWeather = {
    ...dayWeather,
    "sunny": ClearNightIcon,
    "mostly sunny": PartlyCloudNightIcon,
    "partly cloudy": PartlyCloudNightIcon,
    "cloudy": MostlyCloudyNightIcon,
};

export const defaultWeatherIcon = CloudyIcon;
