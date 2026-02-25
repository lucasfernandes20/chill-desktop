import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from '@chill-desktop/shell/ui/navbar';
import { MenuBarComponent } from '@chill-desktop/shell/ui/menu-bar';

@Component({
  selector: 'chill-main-content',
  standalone: true,
  imports: [CommonModule, NavbarComponent, MenuBarComponent],
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {}
