import { initialState, LoadingState } from './loading.reducer';
import { isLoading, selectLoadingState } from './loading.selectors';

describe('Loading Selectors', () => {
  let state: LoadingState;

  beforeEach(() => {
    state = initialState;
  });

  it('should select the loading state', () => {
    const result = selectLoadingState.projector(state);
    expect(result).toEqual(state);
  });

  it('should return the loaded flag', () => {
    const result = isLoading.projector(state);
    expect(result).toBe(state.loading);
  });
});
