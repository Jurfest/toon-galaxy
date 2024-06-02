import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as CharacterActions from './character.actions';
import { Character } from '../../entities/character';

export const CHARACTER_FEATURE_KEY = 'toonGalaxy-character';

export interface State extends EntityState<Character> {
  selectedId?: string | number; // which Character record has been selected
  loaded: boolean; // has the Character list been loaded
  error?: string | null; // last known error (if any)
}

export interface CharacterPartialState {
  readonly [CHARACTER_FEATURE_KEY]: State;
}

export const characterAdapter: EntityAdapter<Character> =
  createEntityAdapter<Character>();

export const initialState: State = characterAdapter.getInitialState({
  // set initial required properties
  loaded: false,
});

const characterReducer = createReducer(
  initialState,
  on(CharacterActions.loadCharacter, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CharacterActions.loadCharacterSuccess, (state, { character }) =>
    characterAdapter.upsertMany(character, { ...state, loaded: true }),
  ),
  on(CharacterActions.loadCharacterFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return characterReducer(state, action);
}
