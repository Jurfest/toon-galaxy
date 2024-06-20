import { createFeatureSelector, createSelector } from '@ngrx/store';

import { loadingFeatureKey, LoadingState } from './loading.reducer';

export const selectLoadingState =
  createFeatureSelector<LoadingState>(loadingFeatureKey);

export const isLoading = createSelector(
  selectLoadingState,
  (state) => state.loading,
);
