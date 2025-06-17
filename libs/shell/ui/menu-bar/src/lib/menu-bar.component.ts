import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Store } from '@ngrx/store';
import { selectWeatherState } from '@chill-desktop/data-acess';
import { StateStatus } from '@chill-desktop/shared/models';

@Component({
  selector: 'chill-menu-bar',
  standalone: true,
  imports: [CommonModule, MatIconModule, MatButtonModule],
  templateUrl: './menu-bar.component.html',
  styleUrl: './menu-bar.component.scss',
})
export class MenuBarComponent {
  private readonly store = inject(Store);
  public readonly stateStatus = StateStatus;
  $weather = this.store.select(selectWeatherState);
}
