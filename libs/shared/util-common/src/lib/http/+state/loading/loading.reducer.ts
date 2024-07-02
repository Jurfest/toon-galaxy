import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingActions } from './loading.actions';

export const loadingFeatureKey = 'loading';

export interface LoadingState {
  loading: boolean;
  activeRequests: string[];
}

export const initialState: LoadingState = {
  loading: false,
  activeRequests: [],
};

export const reducer = createReducer(
  initialState,
  on(LoadingActions.loadStart, (state, { requestId }) => ({
    ...state,
    loading: true,
    activeRequests: [...state.activeRequests, requestId],
  })),
  on(LoadingActions.loadStop, (state, { requestId }) => ({
    ...state,
    activeRequests: state.activeRequests.filter((id) => id !== requestId),
    loading: state.activeRequests.length > 1,
  })),
);

export const loadingFeature = createFeature({
  name: loadingFeatureKey,
  reducer,
});

// TODO: - Simplify
// export const {
//   name, // feature name
//   reducer: loadingReducer, // feature reducer
//   selectLoadingState, // selector for the entire loading feature state
//   selectLoading, // selector for the loading property
//   selectActiveRequests, // selector for the activeRequests property
// } = loadingFeature;
