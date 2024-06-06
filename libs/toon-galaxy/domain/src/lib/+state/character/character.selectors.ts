import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CHARACTER_FEATURE_KEY,
  characterAdapter,
  favoriteAdapter,
  State,
} from './character.reducer';

/**
 * Character List
 */

// Lookup the 'Character' feature state managed by NgRx
export const getCharacterState = createFeatureSelector<State>(
  CHARACTER_FEATURE_KEY,
);

// Get the built-in selectors from the character
const { selectAll, selectEntities, selectIds, selectTotal } =
  characterAdapter.getSelectors();

// Select the 'loaded' flag from the character state
export const getCharacterLoaded = createSelector(
  getCharacterState,
  (state: State) => state.loaded,
);

// Select the 'error' flag from the character state
export const getCharacterError = createSelector(
  getCharacterState,
  (state: State) => state.error,
);

// Select all characters as an array
export const getAllCharacter = createSelector(
  getCharacterState,
  (state: State) => selectAll(state),
);

// Select characters as a dictionary (key-value pairs)
export const getCharacterEntities = createSelector(
  getCharacterState,
  (state: State) => selectEntities(state),
);

// Select the currently selected character ID
export const getSelectedId = createSelector(
  getCharacterState,
  (state: State) => state.selectedId,
);

// Select the character corresponding to the currently selected ID
export const getSelected = createSelector(
  getCharacterEntities,
  getSelectedId,
  (entities, selectedId) => (selectedId ? entities[selectedId] : undefined),
);

// Select the total number of characters
export const selectCharacterTotal = createSelector(
  getCharacterState,
  (state: State) => selectTotal(state),
);

// Select the character IDs
export const selectCharacterIds = createSelector(
  getCharacterState,
  (state: State) => selectIds(state),
);

/**
 * Favorite Character List
 */

// Get the built-in selectors from the favorite characters
const {
  selectAll: selectAllFavorites,
  selectEntities: selectFavoriteEntities,
  selectTotal: selectTotalFavorites,
} = favoriteAdapter.getSelectors();

// Select all favorite characters as an array
export const getAllFavorites = createSelector(
  getCharacterState,
  (state: State) => selectAllFavorites(state.favorites),
);

// Select favorite characters as a dictionary (key-value pairs)
export const getFavoriteEntities = createSelector(
  getCharacterState,
  (state: State) => selectFavoriteEntities(state.favorites),
);

// Select the total number of favorite characters
export const getFavoriteTotal = createSelector(
  getCharacterState,
  (state: State) => selectTotalFavorites(state.favorites),
);
