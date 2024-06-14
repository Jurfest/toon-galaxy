import { CharacterEntity } from '../../entities/character.models';
import {
  CHARACTER_FEATURE_KEY,
  characterAdapter,
  favoriteAdapter,
  State,
} from './character.reducer';
import * as CharacterSelectors from './character.selectors';

describe('Character Selectors', () => {
  // Default state with no characters loaded
  const initialState: State = characterAdapter.getInitialState({
    loaded: false,
    error: null,
    selectedId: null,
    favorites: favoriteAdapter.getInitialState(),
  });

  const character1: CharacterEntity = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    image: 'image-1',
    type: '',
  };
  const character2: CharacterEntity = {
    id: 2,
    name: 'Morty Smith',
    species: 'Human',
    image: 'image-2',
    type: '',
  };

  // State with characters loaded and a selected character
  const populatedState: State = characterAdapter.setAll(
    [character1, character2],
    {
      ...initialState,
      loaded: true,
      selectedId: 1,
    },
  );

  // State with a favorite character added
  const populatedStateWithFavorites: State = {
    ...populatedState,
    favorites: favoriteAdapter.setAll([character1], initialState.favorites),
  };

  describe('getCharacterState', () => {
    it('should select the feature state', () => {
      const result = CharacterSelectors.getCharacterState({
        [CHARACTER_FEATURE_KEY]: populatedState,
      });

      expect(result).toEqual(populatedState);
    });
  });

  describe('getCharacterLoaded', () => {
    it('should return the loaded flag', () => {
      // Using .projector on selectors allows to test the selectors without
      // providing the entire state tree. This isolates the selector logic and
      // makes tests more focused
      const result =
        CharacterSelectors.getCharacterLoaded.projector(populatedState);
      expect(result).toBe(true);
    });
  });

  describe('getCharacterError', () => {
    it('should return the error flag', () => {
      const result =
        CharacterSelectors.getCharacterError.projector(populatedState);
      expect(result).toBeNull();
    });
  });

  describe('getAllCharacter', () => {
    it('should return all characters as an array', () => {
      const result =
        CharacterSelectors.getAllCharacter.projector(populatedState);
      expect(result).toEqual([character1, character2]);
    });
  });

  describe('getCharacterEntities', () => {
    it('should return characters as a dictionary', () => {
      const result =
        CharacterSelectors.getCharacterEntities.projector(populatedState);
      expect(result).toEqual({
        1: character1,
        2: character2,
      });
    });
  });

  describe('getSelectedId', () => {
    it('should return the selected character ID', () => {
      const result = CharacterSelectors.getSelectedId.projector(populatedState);
      expect(result).toBe(1);
    });
  });

  describe('getSelected', () => {
    it('should return the selected character', () => {
      const entities =
        CharacterSelectors.getCharacterEntities.projector(populatedState);
      const selectedId =
        CharacterSelectors.getSelectedId.projector(populatedState);
      const result = CharacterSelectors.getSelected.projector(
        entities,
        selectedId,
      );
      expect(result).toEqual(character1);
    });

    it('should return undefined if no character is selected', () => {
      const state = { ...populatedState, selectedId: null };
      const entities = CharacterSelectors.getCharacterEntities.projector(state);
      const selectedId = CharacterSelectors.getSelectedId.projector(state);
      const result = CharacterSelectors.getSelected.projector(
        entities,
        selectedId,
      );
      expect(result).toBeUndefined();
    });
  });

  describe('selectCharacterTotal', () => {
    it('should return the total number of characters', () => {
      const result =
        CharacterSelectors.selectCharacterTotal.projector(populatedState);
      expect(result).toBe(2);
    });
  });

  describe('selectCharacterIds', () => {
    it('should return the character IDs', () => {
      const result =
        CharacterSelectors.selectCharacterIds.projector(populatedState);
      expect(result).toEqual([1, 2]);
    });
  });

  // Favorite characters selectors
  // describe('getFavoriteEntities', () => {
  //   it('should return the favorite entities', () => {
  //     const result =
  //       CharacterSelectors.getFavoriteEntities.projector(populatedState);
  //     expect(result).toEqual(populatedState.favorites);
  //   });
  // });

  //
  //
  // New tests for favorites
  describe('Favorites', () => {
    describe('getAllFavorites', () => {
      it('should return all favorite characters as an array', () => {
        const result = CharacterSelectors.getAllFavorites.projector(
          populatedStateWithFavorites,
        );
        expect(result).toEqual([character1]);
      });
    });

    describe('getFavoriteEntities', () => {
      it('should return favorite characters as a dictionary', () => {
        const result = CharacterSelectors.getFavoriteEntities.projector(
          populatedStateWithFavorites,
        );
        expect(result).toEqual({
          1: character1,
        });
      });
    });

    describe('selectFavoriteTotal', () => {
      it('should return the total number of favorite characters', () => {
        const result = CharacterSelectors.getFavoriteTotal.projector(
          populatedStateWithFavorites,
        );
        expect(result).toBe(1);
      });
    });
  });
});
