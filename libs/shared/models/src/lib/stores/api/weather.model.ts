import { TemperatureUnitEnum, Weather, WeatherConditionTypeEnum } from '../weather.model';

export interface WeatherApiResponse {
  lat: number;
  lon: number;
  timezone: string;
  timezone_offset: number;
  current: {
    dt: number;
    sunrise: number;
    sunset: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    rain?: {
      '1h'?: number;
    };
    snow?: {
      '1h'?: number;
    };
  };
  minutely?: Array<{
    dt: number;
    precipitation: number;
  }>;
  hourly?: Array<{
    dt: number;
    temp: number;
    feels_like: number;
    pressure: number;
    humidity: number;
    dew_point: number;
    uvi: number;
    clouds: number;
    visibility: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    pop: number;
  }>;
  daily?: Array<{
    dt: number;
    sunrise: number;
    sunset: number;
    moonrise: number;
    moonset: number;
    moon_phase: number;
    summary: string;
    temp: {
      day: number;
      min: number;
      max: number;
      night: number;
      eve: number;
      morn: number;
    };
    feels_like: {
      day: number;
      night: number;
      eve: number;
      morn: number;
    };
    pressure: number;
    humidity: number;
    dew_point: number;
    wind_speed: number;
    wind_deg: number;
    wind_gust?: number;
    weather: Array<{
      id: number;
      main: string;
      description: string;
      icon: string;
    }>;
    clouds: number;
    pop: number;
    rain?: number;
    snow?: number;
    uvi: number;
  }>;
  alerts?: Array<{
    sender_name: string;
    event: string;
    start: number;
    end: number;
    description: string;
  }>;
}

const mapWeatherType = (data: WeatherApiResponse): WeatherConditionTypeEnum => {
  const id = data.current.weather[0].id;

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
      degrees: data.current.temp,
    },
    feelsLikeTemperature: {
      unit: TemperatureUnitEnum.CELSIUS,
      degrees: data.current.feels_like,
    },
    weatherCondition: {
      icon: 'cloud_queue',
      description: {
        text: data.current.weather[0].description,
        languageCode: 'pt',
      },
      type: mapWeatherType(data),
    },
    isDaytime: data.current.dt > data.current.sunrise && data.current.dt < data.current.sunset,
    uvIndex: data.current.uvi,
    cloudCover: data.current.clouds / 100,
    relativeHumidity: data.current.humidity,
  };

  weather.weatherCondition.icon = mapWeatherIcon(weather.weatherCondition.type);

  return weather;
};

const mapWeatherIcon = (type: WeatherConditionTypeEnum) => {
  const iconMap: Partial<Record<WeatherConditionTypeEnum, string>> = {
    [WeatherConditionTypeEnum.CLEAR]: 'wb_sunny',
    [WeatherConditionTypeEnum.CLOUDY]: 'cloud',
    [WeatherConditionTypeEnum.PARTLY_CLOUDY]: 'partly_cloudy_day',
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
