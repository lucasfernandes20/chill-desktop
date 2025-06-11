// Returns of the google weather api (https://developers.google.com/maps/documentation/weather/reference/rest/v1/currentConditions/lookup?hl=pt-br)
export interface Weather {
  temperature: Temperature;
  feelsLikeTemperature: Temperature;
  weatherCondition: WeatherCondition;
  isDaytime: boolean;
  uvIndex: number;
  cloudCover: number;
  relativeHumidity: number;
}

export interface WeatherCondition {
  iconBaseUri: string;
  description: WeatherDescription;
  type: WeatherConditionTypeEnum;
}

export interface Temperature {
  unit: TemperatureUnitEnum;
  degrees: number;
}

export enum TemperatureUnitEnum {
  TEMPERATURE_UNIT_UNSPECIFIED = '°',
  CELSIUS = '°C',
  FAHRENHEIT = '°F',
}

export interface WeatherDescription {
  text: string;
  languageCode: string;
}

export enum WeatherConditionTypeEnum {
  TYPE_UNSPECIFIED = 'As condições climáticas não foram especificadas.',
  CLEAR = 'Sem nuvens.',
  MOSTLY_CLEAR = 'Nuvens periódicas.',
  PARTLY_CLOUDY = 'Parcialmente nublado (algumas nuvens).',
  MOSTLY_CLOUDY = 'Predominantemente nublado (mais nuvens do que sol).',
  CLOUDY = 'Nublado (apenas nuvens, sem sol).',
  WINDY = 'Vento forte.',
  WIND_AND_RAIN = 'Vento forte com precipitação.',
  LIGHT_RAIN_SHOWERS = 'Chuva leve intermitente.',
  CHANCE_OF_SHOWERS = 'Possibilidade de chuva intermitente.',
  SCATTERED_SHOWERS = 'Chuva intermitente.',
  RAIN_SHOWERS = 'Chuviscos são considerados chuvas com duração menor do que a chuva, e são caracterizadas por início e término repentinos e mudanças rápidas na intensidade.',
  HEAVY_RAIN_SHOWERS = 'Pancadas intensas.',
  LIGHT_TO_MODERATE_RAIN = 'Chuva (quantidade fraca a moderada).',
  MODERATE_TO_HEAVY_RAIN = 'Chuva (quantidade moderada a intensa).',
  RAIN = 'Chuva moderada.',
  LIGHT_RAIN = 'Chuva fraca.',
  RAIN_PERIODICALLY_HEAVY = 'Chuva, com períodos mais fortes.',
  LIGHT_SNOW_SHOWERS = 'Neve fraca que cai com intensidades variadas por breves períodos.',
  CHANCE_OF_SNOW_SHOWERS = 'Possibilidade de pancadas de neve.',
  SCATTERED_SNOW_SHOWERS = 'Neve que cai com intensidades variadas por períodos curtos.',
  SNOW_SHOWERS = 'Pancadas de neve.',
  HEAVY_SNOW_SHOWERS = 'Pancadas intensas de neve.',
  LIGHT_TO_MODERATE_SNOW = 'Neve fraca a moderada.',
  MODERATE_TO_HEAVY_SNOW = 'Neve moderada a intensa.',
  SNOW = 'Neve moderada.',
  LIGHT_SNOW = 'Neve fraca.',
  HEAVY_SNOW = 'Neve forte.',
  SNOWSTORM = 'Neve com possibilidade de trovões e relâmpagos.',
  SNOW_PERIODICALLY_HEAVY = 'Neve, às vezes forte.',
  HEAVY_SNOW_STORM = 'Neve forte com possíveis trovões e relâmpagos.',
  BLOWING_SNOW = 'Neve com vento intenso.',
  RAIN_AND_SNOW = 'Mistura de chuva e neve.',
  HAIL = 'Granizo.',
  HAIL_SHOWERS = 'Saíde que cai com intensidades variadas por períodos curtos.',
  THUNDERSTORM = 'Tempestade.',
  THUNDERSHOWER = 'Uma chuva forte acompanhada de trovões e relâmpagos.',
  LIGHT_THUNDERSTORM_RAIN = 'Chuva com trovoadas leves.',
  SCATTERED_THUNDERSTORMS = 'Tempestades com chuva de várias intensidades por breves períodos.',
  HEAVY_THUNDERSTORM = 'Tempestade intensa.',
}
