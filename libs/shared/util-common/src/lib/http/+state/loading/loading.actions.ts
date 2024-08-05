import { createActionGroup, props } from '@ngrx/store';

export const LoadingActions = createActionGroup({
  source: 'Loading',
  events: {
    loadStart: props<{ requestId: string }>(),
    loadStop: props<{ requestId: string }>(),
  },
});
