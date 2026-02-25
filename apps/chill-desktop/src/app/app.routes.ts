import { Route } from '@angular/router';
import { LayoutComponent } from '@chill-desktop/shell/ui/layout';

export const appRoutes: Route[] = [
  {
    path: '',
    component: LayoutComponent,
  },
  {
    path: '**',
    redirectTo: '',
  },
];
