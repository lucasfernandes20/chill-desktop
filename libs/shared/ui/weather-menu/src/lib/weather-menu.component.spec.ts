import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { A11yModule } from '@angular/cdk/a11y';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Component, ViewChild } from '@angular/core';

import { WeatherMenuComponent } from './weather-menu.component';
import { Weather, TemperatureUnitEnum, WeatherConditionTypeEnum } from '@chill-desktop/shared/models';

@Component({
  template: `
    <button [matMenuTriggerFor]="weatherMenu.matMenu">Open Menu</button>
    <chill-weather-menu #weatherMenu [weather]="weather"></chill-weather-menu>
  `,
  standalone: true,
  imports: [MatMenuModule, WeatherMenuComponent],
})
class TestHostComponent {
  @ViewChild(MatMenuTrigger) menuTrigger!: MatMenuTrigger;
  @ViewChild(WeatherMenuComponent) weatherMenu!: WeatherMenuComponent;
  weather?: Weather;
}

describe('WeatherMenuComponent', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let component: WeatherMenuComponent;

  const mockWeatherData: Weather = {
    temperature: {
      unit: TemperatureUnitEnum.CELSIUS,
      degrees: 25.5,
    },
    feelsLikeTemperature: {
      unit: TemperatureUnitEnum.CELSIUS,
      degrees: 28.0,
    },
    weatherCondition: {
      icon: 'wb_sunny',
      description: {
        text: 'Sunny',
        languageCode: 'en-US',
      },
      type: WeatherConditionTypeEnum.CLEAR,
    },
    isDaytime: true,
    uvIndex: 8,
    cloudCover: 0.2,
    relativeHumidity: 65,
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        WeatherMenuComponent,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        A11yModule,
        NoopAnimationsModule,
        TestHostComponent,
      ],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();
    component = hostComponent.weatherMenu;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have matMenu defined', () => {
    expect(component.matMenu).toBeDefined();
  });

  it('should display no data message when weather is undefined', () => {
    hostComponent.weather = undefined;
    hostFixture.detectChanges();

    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const noDataElement = hostFixture.debugElement.query(By.css('[role="alert"]'));
    expect(noDataElement).toBeTruthy();

    const noDataText = hostFixture.debugElement.query(By.css('[role="alert"] span'));
    expect(noDataText.nativeElement.textContent.trim()).toBe('Dados do clima não disponíveis');
  });

  it('should display weather data when available', () => {
    hostComponent.weather = mockWeatherData;
    hostFixture.detectChanges();

    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const weatherContent = hostFixture.debugElement.query(By.css('.weather-menu-content'));
    expect(weatherContent).toBeTruthy();

    const temperature = hostFixture.debugElement.query(By.css('.main-temperature'));
    expect(temperature.nativeElement.textContent.trim()).toBe('25.5°C');

    const feelsLike = hostFixture.debugElement.query(By.css('.feels-like'));
    expect(feelsLike.nativeElement.textContent.trim()).toContain('Sensação térmica 28.0°C');

    const description = hostFixture.debugElement.query(By.css('.description-text'));
    expect(description.nativeElement.textContent.trim()).toBe('Sunny');
  });

  it('should display correct day/night indicators', () => {
    hostComponent.weather = mockWeatherData;
    hostFixture.detectChanges();

    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const dayIcon = hostFixture.debugElement.query(By.css('.time-icon'));
    expect(dayIcon.nativeElement.textContent.trim()).toBe('wb_sunny');

    hostComponent.menuTrigger.closeMenu();
    hostFixture.detectChanges();

    hostComponent.weather = { ...mockWeatherData, isDaytime: false };
    hostFixture.detectChanges();

    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const nightIcon = hostFixture.debugElement.query(By.css('.time-icon'));
    expect(nightIcon.nativeElement.textContent.trim()).toBe('nights_stay');
  });

  it('should display correct weather details', () => {
    hostComponent.weather = mockWeatherData;
    hostFixture.detectChanges();

    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const uvValue = hostFixture.debugElement.query(By.css('[data-testid="uv-index-value"]'));
    const uvDescription = hostFixture.debugElement.query(By.css('[data-testid="uv-index-description"]'));
    expect(uvValue.nativeElement.textContent.trim()).toBe('8');
    expect(uvDescription.nativeElement.textContent.trim()).toBe('Muito Alto');

    const humidityValue = hostFixture.debugElement.query(By.css('[data-testid="humidity-value"]'));
    const humidityDescription = hostFixture.debugElement.query(By.css('[data-testid="humidity-description"]'));
    expect(humidityValue.nativeElement.textContent.trim()).toBe('65%');
    expect(humidityDescription.nativeElement.textContent.trim()).toBe('Confortável');

    const cloudValue = hostFixture.debugElement.query(By.css('[data-testid="cloud-cover-value"]'));
    const cloudDescription = hostFixture.debugElement.query(By.css('[data-testid="cloud-cover-description"]'));
    expect(cloudValue.nativeElement.textContent.trim()).toBe('20%');
    expect(cloudDescription.nativeElement.textContent.trim()).toBe('Poucas Nuvens');
  });

  it('should return correct UV index descriptions', () => {
    expect(component.getUvDescription(1)).toBe('Baixo');
    expect(component.getUvDescription(4)).toBe('Moderado');
    expect(component.getUvDescription(7)).toBe('Alto');
    expect(component.getUvDescription(9)).toBe('Muito Alto');
    expect(component.getUvDescription(12)).toBe('Extremo');
  });

  it('should return correct humidity descriptions', () => {
    expect(component.getHumidityDescription(20)).toBe('Muito Seco');
    expect(component.getHumidityDescription(40)).toBe('Seco');
    expect(component.getHumidityDescription(60)).toBe('Confortável');
    expect(component.getHumidityDescription(80)).toBe('Úmido');
    expect(component.getHumidityDescription(90)).toBe('Muito Úmido');
  });

  it('should return correct cloud cover descriptions', () => {
    expect(component.getCloudDescription(0.05)).toBe('Céu Limpo');
    expect(component.getCloudDescription(0.15)).toBe('Poucas Nuvens');
    expect(component.getCloudDescription(0.35)).toBe('Parcialmente Nublado');
    expect(component.getCloudDescription(0.65)).toBe('Nublado');
    expect(component.getCloudDescription(0.85)).toBe('Muito Nublado');
  });

  it('should have proper accessibility attributes', () => {
    hostComponent.weather = mockWeatherData;
    hostFixture.detectChanges();

    hostComponent.menuTrigger.openMenu();
    hostFixture.detectChanges();

    const menu = hostFixture.debugElement.query(By.css('mat-menu'));
    expect(menu.attributes['role']).toBe('dialog');
    expect(menu.attributes['aria-label']).toBe('Informações meteorológicas');

    const weatherIcon = hostFixture.debugElement.query(By.css('.weather-icon'));
    expect(weatherIcon).toBeTruthy();
    expect(weatherIcon.attributes['aria-label']).toBe(mockWeatherData.weatherCondition.description.text);
    expect(weatherIcon.attributes['role']).toBe('img');

    const hiddenTitle = hostFixture.debugElement.query(By.css('.cdk-visually-hidden'));
    expect(hiddenTitle).toBeTruthy();
    expect(hiddenTitle.nativeElement.textContent.trim()).toBe('Detalhes meteorológicos');
  });
});
