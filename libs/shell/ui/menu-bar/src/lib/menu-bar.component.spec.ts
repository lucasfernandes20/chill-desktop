import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarComponent } from './menu-bar.component';
import { StateStatus, TemperatureUnitEnum, WeatherConditionTypeEnum } from '@chill-desktop/shared/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { CurrencyState, selectCurrencyState, selectWeatherState, type WeatherState } from '@chill-desktop/data-acess';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { of } from 'rxjs';

const mockWeatherStateLoading: WeatherState = {
  status: StateStatus.LOADING,
  error: undefined,
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

const mockWeatherStateSuccess: WeatherState = {
  status: StateStatus.SUCCESS,
  data: {
    temperature: {
      degrees: 19.13,
      unit: TemperatureUnitEnum.CELSIUS,
    },
    feelsLikeTemperature: {
      degrees: 18.77,
      unit: TemperatureUnitEnum.CELSIUS,
    },
    weatherCondition: {
      icon: 'wb_sunny',
      description: {
        languageCode: 'pt',
        text: 'céu limpo',
      },
      type: WeatherConditionTypeEnum.CLEAR,
    },
    isDaytime: false,
    cloudCover: 0.01,
    relativeHumidity: 64,
    coordinates: {
      latitude: 19.13,
      longitude: 18.77,
    },
    wind: {
      speed: 19.13,
      direction: 18.77,
    },
    visibility: 19.13,
    pressure: 18.77,
    precipitation: 19.13,
    locationName: 'São Paulo',
  },
  error: undefined,
};

const mockWeatherStateError: WeatherState = {
  status: StateStatus.ERROR,
  error: 'Error loading weather',
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

const mockCurrencyStateSuccess: CurrencyState = {
  status: StateStatus.SUCCESS,
  data: {
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    targetRate: 5.25,
    rates: {
      USD: 1,
      BRL: 5.25,
    },
    lastUpdated: new Date(),
  },
};

const mockCurrencyStateError: CurrencyState = {
  status: StateStatus.ERROR,
  error: 'Error loading currency',
  data: {
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    targetRate: 0,
    rates: {},
    lastUpdated: new Date(),
  },
};

const mockCurrencyStateLoading: CurrencyState = {
  status: StateStatus.LOADING,
  error: undefined,
  data: {
    fromCurrency: 'USD',
    toCurrency: 'BRL',
    targetRate: 0,
    rates: {},
    lastUpdated: new Date(),
  },
};

describe('MenuBarComponent', () => {
  let component: MenuBarComponent;
  let fixture: ComponentFixture<MenuBarComponent>;
  let store: MockStore;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MenuBarComponent],
      providers: [
        DatePipe,
        { provide: LOCALE_ID, useValue: 'pt-BR' },
        provideMockStore({
          selectors: [
            { selector: selectWeatherState, value: mockWeatherStateLoading },
            { selector: selectCurrencyState, value: mockCurrencyStateLoading },
          ],
        }),
      ],
    }).compileComponents();

    store = TestBed.inject(MockStore);
    fixture = TestBed.createComponent(MenuBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Weather', () => {
    it('should render loading icon when weather is loading', () => {
      const loadingIcon = fixture.nativeElement.querySelector('mat-icon[data-testid="weather-loading-icon"]');
      expect(loadingIcon).toBeTruthy();
    });

    it('should render weather icon when weather is success', () => {
      store.overrideSelector(selectWeatherState, mockWeatherStateSuccess);
      store.refreshState();
      fixture.detectChanges();
      const weatherIcon = fixture.nativeElement.querySelector('mat-icon[data-testid="weather-icon"]');
      expect(weatherIcon).toBeTruthy();
    });

    it('should render weather temperature with correct unit when weather is success', () => {
      store.overrideSelector(selectWeatherState, mockWeatherStateSuccess);
      store.refreshState();
      fixture.detectChanges();
      const weatherTemperature = fixture.nativeElement.querySelector('span[data-testid="weather-temperature"]');
      expect(weatherTemperature).toBeTruthy();
      expect(weatherTemperature.textContent).toBe('19 °C');
    });

    it('should render error icon when weather is error', () => {
      store.overrideSelector(selectWeatherState, mockWeatherStateError);
      store.refreshState();
      fixture.detectChanges();
      const errorIcon = fixture.nativeElement.querySelector('mat-icon[data-testid="error-icon"]');
      expect(errorIcon).toBeTruthy();
    });

    it('should render error message when weather is error', () => {
      store.overrideSelector(selectWeatherState, mockWeatherStateError);
      store.refreshState();
      fixture.detectChanges();
      const errorMessage = fixture.nativeElement.querySelector('div[data-testid="weather-error"] > span');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toBe('Error loading weather');
    });

    it('should open a mat-menu when weather button is clicked', () => {
      store.overrideSelector(selectWeatherState, mockWeatherStateSuccess);
      store.refreshState();
      fixture.detectChanges();

      const weatherButton = fixture.nativeElement.querySelector('button[data-testid="weather-button"]');
      weatherButton.click();
      fixture.detectChanges();
      const matMenu = fixture.nativeElement.querySelector('mat-menu[data-testid="weather-menu"]');
      expect(matMenu).toBeTruthy();
    });
  });

  describe('date time', () => {
    it('should render date time with Brazilian Portuguese locale format with datepipe', () => {
      const mockDate = new Date('2024-03-20T09:15:00');

      component.$currentDateTime = of(mockDate);

      fixture.detectChanges();

      const datePipe = new DatePipe('pt-BR');
      const expectedDate = datePipe.transform(mockDate, 'EEE dd MMM HH:mm a');
      const dateTime = fixture.nativeElement.querySelector('p[data-testid="date-time"]');

      expect(dateTime).toBeTruthy();
      expect(dateTime.textContent.trim()).toBe(expectedDate);
    });

    it('should update date time when observable emits new value', () => {
      const datePipe = new DatePipe('pt-BR');

      const firstDate = new Date('2024-01-15T10:00:00');
      const secondDate = new Date('2024-01-16T15:30:00');

      const expectedFirstDate = datePipe.transform(firstDate, 'EEE dd MMM HH:mm a');
      const expectedSecondDate = datePipe.transform(secondDate, 'EEE dd MMM HH:mm a');

      component.$currentDateTime = of(firstDate);
      fixture.detectChanges();

      let dateTime = fixture.nativeElement.querySelector('p[data-testid="date-time"]');
      expect(dateTime.textContent.trim()).toBe(expectedFirstDate);

      component.$currentDateTime = of(secondDate);
      fixture.detectChanges();

      dateTime = fixture.nativeElement.querySelector('p[data-testid="date-time"]');
      expect(dateTime.textContent.trim()).toBe(expectedSecondDate);
    });

    it('should render error message when observable emits null', () => {
      component.$currentDateTime = of(null as unknown as Date);
      fixture.detectChanges();

      const dateTimeError = fixture.nativeElement.querySelector('p[data-testid="date-time-error"]');
      const dateTime = fixture.nativeElement.querySelector('p[data-testid="date-time"]');
      expect(dateTimeError).toBeTruthy();
      expect(dateTime).toBeNull();
      expect(dateTimeError.textContent.trim()).toBe('Horário não disponível');
    });

    it('should render error message when observable emits undefined', () => {
      component.$currentDateTime = of(undefined as unknown as Date);
      fixture.detectChanges();

      const dateTimeError = fixture.nativeElement.querySelector('p[data-testid="date-time-error"]');
      const dateTime = fixture.nativeElement.querySelector('p[data-testid="date-time"]');
      expect(dateTimeError).toBeTruthy();
      expect(dateTime).toBeNull();
      expect(dateTimeError.textContent.trim()).toBe('Horário não disponível');
    });

    it('isValidDate should return true when value is a Date and false when value is not a Date', () => {
      expect(component.isValidDate(new Date())).toBe(true);
      expect(component.isValidDate('wrong' as unknown as Date)).toBe(false);
    });

    it('should render error message when observable emits wrong type', () => {
      component.$currentDateTime = of('wrong' as unknown as Date);
      fixture.detectChanges();

      const dateTimeError = fixture.nativeElement.querySelector('p[data-testid="date-time-error"]');
      const dateTime = fixture.nativeElement.querySelector('p[data-testid="date-time"]');
      expect(dateTimeError).toBeTruthy();
      expect(dateTime).toBeNull();
      expect(dateTimeError.textContent.trim()).toBe('Horário não disponível');
    });
  });

  describe('Currency', () => {
    it('should render currency icon', () => {
      store.overrideSelector(selectCurrencyState, mockCurrencyStateSuccess);
      store.refreshState();
      fixture.detectChanges();

      const currencyIcon = fixture.nativeElement.querySelector('mat-icon[data-testid="currency-icon"]');
      expect(currencyIcon).toBeTruthy();
    });

    it('should render currency value', () => {
      store.overrideSelector(selectCurrencyState, mockCurrencyStateSuccess);
      store.refreshState();
      fixture.detectChanges();

      const currencyValue = fixture.nativeElement.querySelector('span[data-testid="currency-value"]');
      expect(currencyValue).toBeTruthy();
      expect(currencyValue.textContent).toBe('1 USD = 5.25 BRL');
    });

    it('should render an error message when currency is error', () => {
      store.overrideSelector(selectCurrencyState, mockCurrencyStateError);
      store.refreshState();
      fixture.detectChanges();

      const currencyError = fixture.nativeElement.querySelector('div[data-testid="currency-error"] > span');
      expect(currencyError).toBeTruthy();
      expect(currencyError.textContent).toBe('Error loading currency');
    });

    it('should render a loading icon when currency is loading', () => {
      store.overrideSelector(selectCurrencyState, mockCurrencyStateLoading);
      store.refreshState();
      fixture.detectChanges();

      const loadingIcon = fixture.nativeElement.querySelector('mat-icon[data-testid="currency-loading-icon"]');
      expect(loadingIcon).toBeTruthy();
    });

    it('should open a mat-menu when currency button is clicked', () => {
      store.overrideSelector(selectCurrencyState, mockCurrencyStateSuccess);
      store.refreshState();
      fixture.detectChanges();

      const currencyButton = fixture.nativeElement.querySelector('button[data-testid="currency-button"]');
      currencyButton.click();
      fixture.detectChanges();
      const matMenu = fixture.nativeElement.querySelector('mat-menu[data-testid="currency-menu"]');
      expect(matMenu).toBeTruthy();
    });
  });
});
