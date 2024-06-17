import { createActionGroup, emptyProps } from '@ngrx/store';

export const LoadingActions = createActionGroup({
  source: 'Loading',
  events: {
    'Load Start': emptyProps(),
    'Load Stop': emptyProps(),
  },
});
