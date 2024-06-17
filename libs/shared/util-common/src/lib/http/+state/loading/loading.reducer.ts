import { createFeature, createReducer, on } from '@ngrx/store';

import { LoadingActions } from './loading.actions';

export const loadingFeatureKey = 'loading';

export interface LoadingState {
  loading: boolean;
  activeRequests: number;
  // activeRequests: string[];
}

export const initialState: LoadingState = {
  loading: false,
  activeRequests: 0,
  // activeRequests: [],
};

export const reducer = createReducer(
  initialState,
  // on(LoadingActions.loadStart, (state) => ({ ...state, loading: true })),
  // on(LoadingActions.loadStop, (state) => ({ ...state, loading: false })),
  on(LoadingActions.loadStart, (state) => ({
    ...state,
    activeRequests: state.activeRequests + 1,
    loading: true,
  })),
  on(LoadingActions.loadStop, (state) => ({
    ...state,
    activeRequests: Math.max(0, state.activeRequests - 1),
    loading: state.activeRequests > 1,
  })),
  // on(LoadingActions.loadStart, (state, { requestId }) => ({
  //   ...state,
  //   loading: true,
  //   activeRequests: [...state.activeRequests, requestId],
  // })),
  // on(LoadingActions.loadStop, (state, { requestId }) => ({
  //   ...state,
  //   loading: state.activeRequests.length > 0,
  //   activeRequests: state.activeRequests.filter((id) => id !== requestId),
  // })),
);

export const loadingFeature = createFeature({
  name: loadingFeatureKey,
  reducer,
});
