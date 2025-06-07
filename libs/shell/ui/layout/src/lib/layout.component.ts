import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainContentComponent } from '@chill-desktop/shell/ui/main-content';

@Component({
  selector: 'chill-layout',
  standalone: true,
  imports: [CommonModule, MainContentComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LayoutComponent {}
