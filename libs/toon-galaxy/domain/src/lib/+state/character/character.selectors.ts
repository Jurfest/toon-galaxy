import { createFeatureSelector, createSelector } from '@ngrx/store';

import {
  CHARACTER_FEATURE_KEY,
  characterAdapter,
  CharacterPartialState,
  State,
} from './character.reducer';

// Lookup the 'Character' feature state managed by NgRx
export const getCharacterState = createFeatureSelector<
  CharacterPartialState,
  State
>(CHARACTER_FEATURE_KEY);

const { selectAll, selectEntities } = characterAdapter.getSelectors();

export const getCharacterLoaded = createSelector(
  getCharacterState,
  (state: State) => state.loaded,
);

export const getCharacterError = createSelector(
  getCharacterState,
  (state: State) => state.error,
);

export const getAllCharacter = createSelector(
  getCharacterState,
  (state: State) => selectAll(state),
);

export const getCharacterEntities = createSelector(
  getCharacterState,
  (state: State) => selectEntities(state),
);

export const getSelectedId = createSelector(
  getCharacterState,
  (state: State) => state.selectedId,
);

export const getSelected = createSelector(
  getCharacterEntities,
  getSelectedId,
  (entities, selectedId) => selectedId && entities[selectedId],
);
