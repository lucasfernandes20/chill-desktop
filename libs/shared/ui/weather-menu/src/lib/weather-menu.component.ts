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

  getUvDescription(uvIndex: number): string {
    if (uvIndex <= 2) return 'Baixo';
    if (uvIndex <= 5) return 'Moderado';
    if (uvIndex <= 7) return 'Alto';
    if (uvIndex <= 10) return 'Muito Alto';
    return 'Extremo';
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
