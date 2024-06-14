import { createActionGroup, props } from '@ngrx/store';

import { CharacterEntity } from '../../entities/character.models';

// NgRx actions are not tested in isolation, instead, they are tested indirectly
// when we test the reducers and components

// Actions related to user interactions on the Character feature page(s),
// including retrieving data action when initializing a component
export const CharacterPageActions = createActionGroup({
  source: 'Character/Page',
  events: {
    'Load Characters': props<{ characterName: string | undefined }>(),
    'Add to Favorites': props<{
      character: CharacterEntity;
    }>(),
    'Remove from Favorites': props<{ id: number }>(),
  },
});

// Actions related to API responses or side effects for Characters
export const CharacterApiActions = createActionGroup({
  source: 'Character/API',
  events: {
    'Load Characters Success': props<{
      characters: CharacterEntity[];
    }>(),
    'Load Characters Failure': props<{ error: any }>(),
  },
});
