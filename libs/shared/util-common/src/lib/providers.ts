import { provideState } from '@ngrx/store';

import { loadingFeature } from './http/+state/loading/loading.reducer';

export function provideSharedUtilCommon() {
  return [provideState(loadingFeature)];
}
