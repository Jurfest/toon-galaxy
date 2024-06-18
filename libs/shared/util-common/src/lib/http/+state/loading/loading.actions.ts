import { createActionGroup, props } from '@ngrx/store';

export const LoadingActions = createActionGroup({
  source: 'Loading',
  events: {
    'Load Start': props<{ requestId: string }>(),
    'Load Stop': props<{ requestId: string }>(),
  },
});
