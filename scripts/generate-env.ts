// scripts/generate-env.ts
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';

const environment = process.env.NODE_ENV === 'production' ? 'environment.prod.ts' : 'environment.ts';

const content = `
import { AppEnvironment } from '@chill-desktop/shared/models';

export const environment: AppEnvironment = {
  openWeatherApiKey: '${process.env.OPEN_WEATHER_API_KEY || ''}',
  openWeatherApiUrl: '${process.env.OPEN_WEATHER_API_URL || ''}',
  currencyApiUrl: '${process.env.CURRENCY_API_URL || ''}',
};
`;

const envPath = join(__dirname, '../apps/chill-desktop/src/environments');
mkdirSync(envPath, { recursive: true });
writeFileSync(join(envPath, environment), content);

console.log(`✔️ Arquivo ${environment} gerado com sucesso`);
