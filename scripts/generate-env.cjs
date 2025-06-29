// scripts/generate-env.ts
const fs = require('fs');
const path = require('path');

const content = `import { AppEnvironment } from '@chill-desktop/shared/models';

export const environment: AppEnvironment = {
  openWeatherApiKey: '${process.env.OPEN_WEATHER_API_KEY || ''}',
  openWeatherApiUrl: '${process.env.OPEN_WEATHER_API_URL || ''}',
  currencyApiUrl: '${process.env.CURRENCY_API_URL || ''}',
};
`;

const envPath = path.join(__dirname, '../apps/chill-desktop/src/environments');
fs.mkdirSync(envPath, { recursive: true });
fs.writeFileSync(path.join(envPath, 'environment.ts'), content);

console.log('✔️ Arquivo environment.ts gerado com sucesso');
