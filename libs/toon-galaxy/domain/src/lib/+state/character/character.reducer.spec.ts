import { Action } from '@ngrx/store';

import { CharacterEntity } from '../../entities/character.models';
import { CharacterApiActions, CharacterPageActions } from './character.actions';
import { initialState, reducer, favoriteAdapter } from './character.reducer';

describe('Character Reducer', () => {
  const createCharacterEntity = (id: number, name = ''): CharacterEntity => ({
    id,
    name: name || `name-${id}`,
    species: 'species',
    image: `image-${id}`,
  });

  describe('valid Character actions', () => {
    it('loadCharacters should set loaded to false', () => {
      const action = CharacterPageActions.loadCharacters({
        characterName: 'Rick',
      });

      const result = reducer(initialState, action);

      expect(result.loaded).toBe(false);
      expect(result.error).toBeNull();
    });

    it('loadCharactersSuccess should update the state with the loaded characters', () => {
      const characters = [
        createCharacterEntity(1, 'Rick Sanchez'),
        createCharacterEntity(2, 'Morty Smith'),
      ];
      const action = CharacterApiActions.loadCharactersSuccess({ characters });

      const result = reducer(initialState, action);

      expect(result.loaded).toBe(true);
      expect(result.error).toBeNull();
      expect(result.ids.length).toBe(2);
    });

    it('loadCharactersFailure should update the state with the error', () => {
      const error = 'Error loading characters';
      const action = CharacterApiActions.loadCharactersFailure({ error });

      const result = reducer(initialState, action);

      expect(result.error).toBe(error);
    });

    // New tests for favorites
    it('addToFavorites should add a character to the favorites list', () => {
      const character = createCharacterEntity(1, 'Rick Sanchez');
      const action = CharacterPageActions.addToFavorites({ character });

      const result = reducer(initialState, action);

      expect(result.favorites.ids.length).toBe(1);
      expect(result.favorites.entities[1]).toEqual(character);
    });

    it('removeFromFavorites should remove a character from the favorites list', () => {
      const character = createCharacterEntity(1, 'Rick Sanchez');
      const initialStateWithFavorite = {
        ...initialState,
        favorites: favoriteAdapter.addOne(character, initialState.favorites),
      };
      const action = CharacterPageActions.removeFromFavorites({ id: 1 });

      const result = reducer(initialStateWithFavorite, action);

      expect(result.favorites.ids.length).toBe(0);
      expect(result.favorites.entities[1]).toBeUndefined();
    });
  });

  describe('unknown action', () => {
    it('should return the initial state', () => {
      // An unknown action should return the current state without any modifications
      const action = {} as Action;

      const result = reducer(initialState, action);

      expect(result).toBe(initialState);
    });
  });
});
