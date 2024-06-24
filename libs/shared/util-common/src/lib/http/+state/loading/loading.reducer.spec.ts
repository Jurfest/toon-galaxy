import { initialState, LoadingState, reducer } from './loading.reducer';
import { LoadingActions } from './loading.actions';

describe('Loading Reducer', () => {
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

  it('should handle loadStop action', () => {
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
});
