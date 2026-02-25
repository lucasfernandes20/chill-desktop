import { createSelector } from '@ngrx/store';
import { type AppsState } from '../reducers/apps.reducer';

const selectChillDesktopState = (state: Record<string, unknown>) => state;

export const selectAppsState = createSelector(
  selectChillDesktopState,
  (state: Record<string, unknown>) => state['apps'] as AppsState
);

export const selectApps = createSelector(selectAppsState, (state: AppsState) => Object.values(state?.entities));

export const selectAppById = (appId: number) => createSelector(selectApps, (apps) => apps[appId]);

export const selectAppByName = (appName: string) =>
  createSelector(selectApps, (apps) => Object.values(apps).find((app) => app?.name === appName));
