import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarComponent } from './menu-bar.component';
import { StateStatus, TemperatureUnitEnum, WeatherConditionTypeEnum } from '@chill-desktop/shared/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectWeatherState, type WeatherState } from '@chill-desktop/data-acess';
import { DatePipe } from '@angular/common';
import { LOCALE_ID } from '@angular/core';
import { of } from 'rxjs';

const mockWeatherStateLoading: WeatherState = {
  status: StateStatus.LOADING,
  error: undefined,
};

const mockWeatherStateSuccess: WeatherState = {
  status: StateStatus.SUCCESS,
  data: {
    temperature: {
      unit: TemperatureUnitEnum.CELSIUS,
      degrees: 19.13,
    },
    feelsLikeTemperature: {
      unit: TemperatureUnitEnum.CELSIUS,
      degrees: 18.77,
    },
    weatherCondition: {
      icon: 'wb_sunny',
      description: {
        text: 'céu limpo',
        languageCode: 'pt',
      },
      type: WeatherConditionTypeEnum.CLEAR,
    },
    isDaytime: false,
    uvIndex: 0,
    cloudCover: 0.01,
    relativeHumidity: 64,
  },
  error: undefined,
};

const mockWeatherStateError: WeatherState = {
  status: StateStatus.ERROR,
  error: 'Error loading weather',
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
          selectors: [{ selector: selectWeatherState, value: mockWeatherStateLoading }],
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
      const loadingIcon = fixture.nativeElement.querySelector('mat-icon[data-testid="loading-icon"]');
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
      const errorMessage = fixture.nativeElement.querySelector('span[data-testid="error-message"]');
      expect(errorMessage).toBeTruthy();
      expect(errorMessage.textContent).toBe('Error loading weather');
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
      const currencyIcon = fixture.nativeElement.querySelector('mat-icon[data-testid="currency-icon"]');
      expect(currencyIcon).toBeTruthy();
    });

    it('should render currency value', () => {
      const currencyValue = fixture.nativeElement.querySelector('span[data-testid="currency-value"]');
      expect(currencyValue).toBeTruthy();
      expect(currencyValue.textContent).toBe('1 USD = 5.25 BRL');
    });
  });
});
