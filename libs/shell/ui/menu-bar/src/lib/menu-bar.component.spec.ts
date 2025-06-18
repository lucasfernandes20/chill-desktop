import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MenuBarComponent } from './menu-bar.component';
import { StateStatus, TemperatureUnitEnum, WeatherConditionTypeEnum } from '@chill-desktop/shared/models';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { selectWeatherState, type WeatherState } from '@chill-desktop/data-acess';
import { DatePipe } from '@angular/common';

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
    it('should render current date time', () => {
      const datePipe = new DatePipe('en-US');
      const dateTime = fixture.nativeElement.querySelector('p[data-testid="date-time"]');
      const date = datePipe.transform(new Date(), 'EEE dd MMM HH:mm a');
      expect(dateTime).toBeTruthy();
      expect(dateTime.textContent).toContain(date);
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
