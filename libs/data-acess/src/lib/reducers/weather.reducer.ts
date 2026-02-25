import { createReducer, on } from '@ngrx/store';
import { StateStatus, TemperatureUnitEnum, WeatherConditionTypeEnum, type Weather } from '@chill-desktop/shared/models';
import { loadWeatherAction, loadWeatherFailureAction, loadWeatherSuccessAction } from '../actions';

export const WEATHER_FEATURE_KEY = 'weather';

export interface WeatherState {
  data: Weather;
  status: StateStatus;
  error?: string;
}

const initialState: WeatherState = {
  status: StateStatus.INITIAL,
  data: {
    temperature: {
      degrees: 0,
      unit: TemperatureUnitEnum.CELSIUS,
    },
    feelsLikeTemperature: {
      degrees: 0,
      unit: TemperatureUnitEnum.CELSIUS,
    },
    weatherCondition: {
      icon: '',
      description: {
        languageCode: '',
        text: '',
      },
      type: WeatherConditionTypeEnum.CLEAR,
    },
    isDaytime: true,
    cloudCover: 0,
    relativeHumidity: 0,
    coordinates: {
      latitude: 0,
      longitude: 0,
    },
    wind: {
      speed: 0,
      direction: 0,
    },
    visibility: 0,
    pressure: 0,
    precipitation: 0,
    locationName: '',
  },
};

export const weatherReducer = createReducer(
  initialState,
  on(loadWeatherAction, (state) => ({ ...state, status: StateStatus.LOADING })),
  on(loadWeatherSuccessAction, (state, { data }) => ({
    ...state,
    data,
    status: StateStatus.SUCCESS,
  })),
  on(loadWeatherFailureAction, (state, { error }) => ({
    ...state,
    status: StateStatus.ERROR,
    error: error,
  }))
);
