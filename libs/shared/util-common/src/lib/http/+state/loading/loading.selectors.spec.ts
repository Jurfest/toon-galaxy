import * as fromLoading from './loading.reducer';
import { selectLoadingState } from './loading.selectors';

describe('Loading Selectors', () => {
  it('should select the feature state', () => {
    const result = selectLoadingState({
      [fromLoading.loadingFeatureKey]: {},
    });

    expect(result).toEqual({});
  });
});
