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
  /**
   * NOTE: -
   *
   * Favorites could be implemented in several ways:
   *
   * 1. As a list of IDs:
   *    favoriteIds: number[];
   *
   * 2. As a list of CharacterEntity objects without using EntityState:
   *    favorites: CharacterEntity[];
   *
   * Given that the entities are the same but belong to two distinct lists (all
   * characters and favorite characters), managing them in a single feature
   * state using NgRx's EntityAdapter is a pragmatic approach.
   *
   * Benefits of this approach:
   * - Maintains consistency in state management.
   * - Leverages NgRx's powerful entity management features.
   * - Reduces the number of API calls since the favorite characters are already
   * stored in the state.
   *
   */
  favorites: EntityState<CharacterEntity>;
}

export interface CharacterPartialState {
  readonly [CHARACTER_FEATURE_KEY]: State;
}

export const characterAdapter: EntityAdapter<CharacterEntity> =
  createEntityAdapter<CharacterEntity>();
export const favoriteAdapter: EntityAdapter<CharacterEntity> =
  createEntityAdapter<CharacterEntity>();

export const initialState: State = characterAdapter.getInitialState({
  // Set initial required properties (for the additional entity state properties)
  loaded: false,
  favorites: favoriteAdapter.getInitialState(),
});

const characterReducer = createReducer(
  initialState,
  on(CharacterPageActions.loadCharacters, (state) => ({
    ...state,
    loaded: false,
    error: null,
  })),
  on(CharacterApiActions.loadCharactersSuccess, (state, { characters }) =>
    characterAdapter.setAll(characters, {
      ...state,
      loaded: true,
      error: null,
    }),
  ),
  on(CharacterApiActions.loadCharactersFailure, (state, { error }) =>
    characterAdapter.setAll([], {
      ...state,
      loaded: true,
      error,
    }),
  ),
  // Favorites:
  on(CharacterPageActions.addToFavorites, (state, { character }) => ({
    ...state,
    favorites: favoriteAdapter.addOne(character, state.favorites),
  })),
  on(CharacterPageActions.removeFromFavorites, (state, { id }) => ({
    ...state,
    favorites: favoriteAdapter.removeOne(id, state.favorites),
  })),
);

export function reducer(state: State | undefined, action: Action) {
  return characterReducer(state, action);
}
