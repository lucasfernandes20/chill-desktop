import { AppEnvironment } from '@chill-desktop/shared/models';

/**
 * This is an example of the environment file.
 * You can use this file to configure the environment variables for your application.
 * Create a copy of this file and name it environment.ts and remove this comment.
 * When you create a pull request, the CI will create a new environment.ts file with the correct values. Don't worry about it ;)
 */
export const environment: AppEnvironment = {
  openWeatherApiKey: 'YOUR_API_KEY_FOR_OPEN_WEATHER_API',
  openWeatherApiUrl: 'YOUR_API_URL_FOR_OPEN_WEATHER_API (I CAN DEPEND THE API VERSION YOU BOUGHT)',
  currencyApiUrl: 'https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/usd.json',
};
