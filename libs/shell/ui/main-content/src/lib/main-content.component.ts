import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'chill-desktop-main-content',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './main-content.component.html',
  styleUrl: './main-content.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainContentComponent {}
