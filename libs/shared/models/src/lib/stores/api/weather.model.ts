import { TemperatureUnitEnum, Weather, WeatherConditionTypeEnum } from '../weather.model';

// Interface baseada na documentação oficial da OpenWeather Current Weather API
// https://openweathermap.org/current#fields_json
export interface WeatherApiResponse {
  coord: {
    lon: number;
    lat: number;
  };
  weather: Array<{
    id: number;
    main: string;
    description: string;
    icon: string;
  }>;
  base: string;
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
    sea_level?: number;
    grnd_level?: number;
  };
  visibility: number;
  wind: {
    speed: number;
    deg: number;
    gust?: number;
  };
  rain?: {
    '1h'?: number;
  };
  snow?: {
    '1h'?: number;
  };
  clouds: {
    all: number;
  };
  dt: number;
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

const mapWeatherType = (data: WeatherApiResponse): WeatherConditionTypeEnum => {
  const id = data.weather[0].id;

  // Mapeamento baseado nos códigos de condição climática da OpenWeatherMap
  // https://openweathermap.org/weather-conditions
  if (id >= 200 && id < 300) {
    return WeatherConditionTypeEnum.THUNDERSTORM;
  } else if (id >= 300 && id < 400) {
    return WeatherConditionTypeEnum.LIGHT_RAIN_SHOWERS;
  } else if (id >= 500 && id < 600) {
    if (id === 500 || id === 501) {
      return WeatherConditionTypeEnum.LIGHT_RAIN;
    } else if (id === 502 || id === 503 || id === 504) {
      return WeatherConditionTypeEnum.MODERATE_TO_HEAVY_RAIN;
    } else {
      return WeatherConditionTypeEnum.RAIN;
    }
  } else if (id >= 600 && id < 700) {
    if (id === 600) {
      return WeatherConditionTypeEnum.LIGHT_SNOW;
    } else if (id === 601) {
      return WeatherConditionTypeEnum.SNOW;
    } else if (id === 602) {
      return WeatherConditionTypeEnum.HEAVY_SNOW;
    } else {
      return WeatherConditionTypeEnum.SNOW;
    }
  } else if (id >= 700 && id < 800) {
    return WeatherConditionTypeEnum.CLOUDY;
  } else if (id === 800) {
    return WeatherConditionTypeEnum.CLEAR;
  } else if (id === 801) {
    return WeatherConditionTypeEnum.MOSTLY_CLEAR;
  } else if (id === 802) {
    return WeatherConditionTypeEnum.PARTLY_CLOUDY;
  } else if (id === 803) {
    return WeatherConditionTypeEnum.MOSTLY_CLOUDY;
  } else if (id === 804) {
    return WeatherConditionTypeEnum.CLOUDY;
  }

  return WeatherConditionTypeEnum.TYPE_UNSPECIFIED;
};

export const weatherRequestToWeather = (data: WeatherApiResponse): Weather => {
  const weather = {
    temperature: {
      unit: TemperatureUnitEnum.CELSIUS,
      degrees: data.main.temp,
    },
    feelsLikeTemperature: {
      unit: TemperatureUnitEnum.CELSIUS,
      degrees: data.main.feels_like,
    },
    weatherCondition: {
      icon: 'cloud_queue',
      description: {
        text: data.weather[0].description,
        languageCode: 'pt',
      },
      type: mapWeatherType(data),
    },
    isDaytime: data.dt > data.sys.sunrise && data.dt < data.sys.sunset,
    cloudCover: data.clouds.all / 100,
    relativeHumidity: data.main.humidity,
    coordinates: {
      latitude: data.coord.lat,
      longitude: data.coord.lon,
    },
    wind: {
      speed: data.wind.speed,
      direction: data.wind.deg,
    },
    visibility: data.visibility,
    pressure: data.main.pressure,
    precipitation: data.rain?.['1h'] || data.snow?.['1h'] || 0,
    locationName: data.name,
  };

  weather.weatherCondition.icon = mapWeatherIcon(weather.weatherCondition.type);

  return weather;
};

const mapWeatherIcon = (type: WeatherConditionTypeEnum) => {
  const iconMap: Partial<Record<WeatherConditionTypeEnum, string>> = {
    [WeatherConditionTypeEnum.CLEAR]: 'wb_sunny',
    [WeatherConditionTypeEnum.CLOUDY]: 'cloud_queue',
    [WeatherConditionTypeEnum.PARTLY_CLOUDY]: 'cloud_queue',
    [WeatherConditionTypeEnum.MOSTLY_CLOUDY]: 'cloud_queue',
    [WeatherConditionTypeEnum.MOSTLY_CLEAR]: 'wb_sunny',
    [WeatherConditionTypeEnum.LIGHT_RAIN_SHOWERS]: 'water_drop',
    [WeatherConditionTypeEnum.LIGHT_RAIN]: 'rainy',
    [WeatherConditionTypeEnum.RAIN]: 'rainy',
    [WeatherConditionTypeEnum.MODERATE_TO_HEAVY_RAIN]: 'thunderstorm',
    [WeatherConditionTypeEnum.THUNDERSTORM]: 'thunderstorm',
    [WeatherConditionTypeEnum.SNOW]: 'ac_unit',
    [WeatherConditionTypeEnum.LIGHT_SNOW]: 'ac_unit',
    [WeatherConditionTypeEnum.HEAVY_SNOW]: 'ac_unit',
  };

  return iconMap[type] || 'cloud_queue';
};
