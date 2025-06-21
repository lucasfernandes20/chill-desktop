export interface CurrencyExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rates: {
    [currencyCode: string]: number;
  };
  targetRate: number;
  lastUpdated: Date;
}

export type CurrencyApiResponse = {
  date: string;
} & {
  [currencyCode: string]: {
    [currencyCode: string]: number;
  };
};

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
}

export const AVAILABLE_CURRENCIES: CurrencyOption[] = [
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
  { code: 'USD', name: 'Dólar Americano', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'Libra Esterlina', symbol: '£' },
  { code: 'JPY', name: 'Iene Japonês', symbol: '¥' },
  { code: 'CAD', name: 'Dólar Canadense', symbol: 'C$' },
  { code: 'AUD', name: 'Dólar Australiano', symbol: 'A$' },
  { code: 'CHF', name: 'Franco Suíço', symbol: 'CHF' },
  { code: 'CNY', name: 'Yuan Chinês', symbol: '¥' },
  { code: 'INR', name: 'Rupia Indiana', symbol: '₹' },
  { code: 'KRW', name: 'Won Sul-Coreano', symbol: '₩' },
];

export const currencyApiResponseToCurrencyExchangeRate = (
  data: CurrencyApiResponse,
  fromCurrency = 'USD',
  toCurrency = 'BRL'
): CurrencyExchangeRate => {
  const fromCurrencyKey = fromCurrency.toLowerCase();
  const rates = data[fromCurrencyKey];
  const targetRate = rates[toCurrency.toLowerCase()];

  if (!targetRate) {
    throw new Error(`Moeda ${toCurrency} não encontrada na resposta da API`);
  }

  return {
    fromCurrency: fromCurrency.toUpperCase(),
    rates,
    toCurrency: toCurrency.toUpperCase(),
    targetRate,
    lastUpdated: new Date(data.date + 'T00:00:00'),
  };
};
