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

export const currencyApiResponseToCurrencyExchangeRate = (data: CurrencyApiResponse): CurrencyExchangeRate => {
  return {
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    rate: data.usd['brl'],
    lastUpdated: new Date(data.date),
  };
};
