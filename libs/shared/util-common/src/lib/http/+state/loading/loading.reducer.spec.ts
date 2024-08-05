import { Action } from '@ngrx/store';

import { LoadingActions } from './loading.actions';
import {
  initialState,
  loadingFeature,
  LoadingState,
  reducer,
  selectActiveRequests,
} from './loading.reducer';

describe('Loading Reducer', () => {
  it('should return the initial state whithin an unknown action', () => {
    const action = {} as Action;

    const result = reducer(initialState, action);

    expect(result).toBe(initialState);
  });

  it('should handle loadStart action', () => {
    const requestId = 'request123';

    const action = LoadingActions.loadStart({ requestId });
    const state: LoadingState = {
      ...initialState,
      loading: false,
      activeRequests: [],
    };

    const nextState = reducer(state, action);

    expect(nextState.loading).toEqual(true);
    expect(nextState.activeRequests).toContain(requestId);
  });

  it('should handle loadStop action for single request', () => {
    const requestId = 'request123';
    const state: LoadingState = {
      ...initialState,
      loading: true,
      activeRequests: [requestId],
    };

    const action = LoadingActions.loadStop({ requestId });
    const nextState = reducer(state, action);

    expect(nextState.loading).toEqual(false);
    expect(nextState.activeRequests).not.toContain(requestId);
  });

  it('should handle loadStop action when multiple requests are active', () => {
    const requestId1 = 'request123';
    const requestId2 = 'request456';
    const state: LoadingState = {
      ...initialState,
      loading: true,
      activeRequests: [requestId1, requestId2],
    };

    const action = LoadingActions.loadStop({ requestId: requestId1 });
    const nextState = reducer(state, action);

    expect(nextState.loading).toEqual(true);
    expect(nextState.activeRequests).toEqual([requestId2]);
  });

  describe('selectors', () => {
    let state: LoadingState;

    beforeEach(() => {
      state = initialState;
    });

    it('should select the loading state', () => {
      const result = loadingFeature.selectLoadingState.projector(state);
      expect(result).toEqual(state);
    });

    it('should return the loaded flag', () => {
      const result = loadingFeature.selectLoading.projector(state);
      expect(result).toBe(state.loading);
    });

    it('should return active requests', () => {
      const requestId = 'request123';
      const loadStartAction = LoadingActions.loadStart({ requestId });
      const nextState = reducer(initialState, loadStartAction);

      const allProducts = selectActiveRequests.projector(nextState);
      expect(allProducts.length).toBe(1);
      expect(allProducts).toEqual([requestId]);
    });
  });
});
