import { Component, Input, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatMenuModule, MatMenu } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatDividerModule } from '@angular/material/divider';
import { A11yModule } from '@angular/cdk/a11y';
import { type Weather } from '@chill-desktop/shared/models';

@Component({
  selector: 'chill-weather-menu',
  imports: [CommonModule, MatMenuModule, MatIconModule, MatDividerModule, A11yModule],
  templateUrl: './weather-menu.component.html',
  styleUrl: './weather-menu.component.scss',
})
export class WeatherMenuComponent {
  @Input() weather?: Weather;
  @ViewChild(MatMenu, { static: true }) matMenu!: MatMenu;

  getWindDescription(windSpeed: number): string {
    if (windSpeed < 1) return 'Calmo';
    if (windSpeed < 3.3) return 'Brisa Leve';
    if (windSpeed < 5.5) return 'Brisa Suave';
    if (windSpeed < 8) return 'Brisa Moderada';
    if (windSpeed < 10.8) return 'Brisa Fresca';
    if (windSpeed < 13.9) return 'Brisa Forte';
    if (windSpeed < 17.2) return 'Vento Moderado';
    if (windSpeed < 20.8) return 'Vento Fresco';
    if (windSpeed < 24.5) return 'Vento Forte';
    return 'Vento Muito Forte';
  }

  getWindDirection(degrees: number): string {
    const directions = ['Norte', 'Nordeste', 'Leste', 'Sudeste', 'Sul', 'Sudoeste', 'Oeste', 'Noroeste'];
    const index = Math.round(degrees / 45) % 8;
    return directions[index];
  }

  getHumidityDescription(humidity: number): string {
    if (humidity < 30) return 'Muito Seco';
    if (humidity < 50) return 'Seco';
    if (humidity < 70) return 'Confortável';
    if (humidity < 85) return 'Úmido';
    return 'Muito Úmido';
  }

  getCloudDescription(cloudCover: number): string {
    const percentage = cloudCover * 100;
    if (percentage < 10) return 'Céu Limpo';
    if (percentage < 25) return 'Poucas Nuvens';
    if (percentage < 50) return 'Parcialmente Nublado';
    if (percentage < 75) return 'Nublado';
    return 'Muito Nublado';
  }
}
