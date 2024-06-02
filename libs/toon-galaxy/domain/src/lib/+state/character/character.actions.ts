import { createAction, props } from '@ngrx/store';

import { Character } from '../../entities/character';

export const loadCharacter = createAction('[Character] Load Character');

export const loadCharacterSuccess = createAction(
  '[Character] Load Character Success',
  props<{ character: Character[] }>(),
);

export const loadCharacterFailure = createAction(
  '[Character] Load Character Failure',
  props<{ error: any }>(),
);
