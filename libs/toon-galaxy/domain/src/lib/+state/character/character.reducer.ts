import { createReducer, on, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import { CharacterPageActions, CharacterApiActions } from './character.actions';
import { CharacterEntity } from '../../entities/character.models';

export const CHARACTER_FEATURE_KEY = 'toonGalaxy-character';

export interface State extends EntityState<CharacterEntity> {
  // Additional entities state properties
  selectedId?: string | number; // which Character record has been selected
  loaded: boolean; // has the Character list been loaded
  error?: string | null; // last known error (if any)
}

export interface CharacterPartialState {
  readonly [CHARACTER_FEATURE_KEY]: State;
}

export const characterAdapter: EntityAdapter<CharacterEntity> =
  createEntityAdapter<CharacterEntity>();

export const initialState: State = characterAdapter.getInitialState({
  // Set initial required properties (for the additional entity state properties)
  loaded: false,
});

const characterReducer = createReducer(
  initialState,
  on(CharacterPageActions.loadCharacters, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(
    CharacterApiActions.loadCharactersSuccess,
    (state, { characters }) =>
      characterAdapter.upsertMany(characters, {
        ...state,
        loaded: true,
        error: null,
      }),
    // obs: characterAdapter.setAll(users, state); // when there is no search terms
  ),
  on(CharacterApiActions.loadCharactersFailure, (state, { error }) => ({
    ...state,
    error,
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return characterReducer(state, action);
}
