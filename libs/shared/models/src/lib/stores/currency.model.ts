export interface CurrencyExchangeRate {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  lastUpdated: Date;
}

export interface CurrencyApiResponse {
  date: string;
  usd: {
    [currencyCode: string]: number;
  };
}

export interface CurrencyOption {
  code: string;
  name: string;
  symbol: string;
}

export const AVAILABLE_CURRENCIES: CurrencyOption[] = [
  { code: 'BRL', name: 'Real Brasileiro', symbol: 'R$' },
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
  toCurrency = 'BRL'
): CurrencyExchangeRate => {
  const currencyKey = toCurrency.toLowerCase();
  const rate = data.usd[currencyKey];

  if (!rate) {
    throw new Error(`Moeda ${toCurrency} não encontrada na resposta da API`);
  }

  return {
    fromCurrency: 'USD',
    toCurrency: toCurrency.toUpperCase(),
    rate,
    lastUpdated: new Date(data.date),
  };
};
