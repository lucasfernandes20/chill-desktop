import { EntityState } from '@ngrx/entity';
import { AppItem, appsList, StateStatus } from '@chill-desktop/shared/models';
import { createReducer } from '@ngrx/store';

export const APPS_FEATURE_KEY = 'apps';

export interface AppsState extends EntityState<AppItem> {
  status: StateStatus;
  error?: string;
}

const initialState: AppsState = {
  ids: Object.keys(appsList).map(Number),
  entities: appsList,
  status: StateStatus.INITIAL,
};

export const appsReducer = createReducer(initialState);
