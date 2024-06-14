import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { firstValueFrom } from 'rxjs';

import {
  CharacterApiActions,
  CharacterPageActions,
} from '../+state/character/character.actions';
import * as CharacterSelectors from '../+state/character/character.selectors';
import { CharacterEntity } from '../entities/character.models';
import { CharacterFacade } from './character.facade';

describe('Character Facade', () => {
  let facade: CharacterFacade;
  let store: MockStore;
  const character1: CharacterEntity = {
    id: 1,
    name: 'Rick Sanchez',
    species: 'Human',
    image: 'image_url-1',
    type: '',
  };
  const character2: CharacterEntity = {
    id: 2,
    name: 'Morty Smith',
    species: 'Human',
    image: 'image_url-2',
    type: '',
  };
  const characters: CharacterEntity[] = [character1, character2];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CharacterFacade,
        provideMockStore({
          initialState: {
            // Define your initial state here if needed
          },
        }),
      ],
    });

    facade = TestBed.inject(CharacterFacade);
    store = TestBed.inject(Store) as MockStore;

    // Mock the selectors
    store.overrideSelector(CharacterSelectors.getCharacterLoaded, true);
    store.overrideSelector(CharacterSelectors.getAllCharacter, characters);
    store.overrideSelector(CharacterSelectors.getSelected, character1);
    store.overrideSelector(CharacterSelectors.getAllFavorites, [character2]);
    store.overrideSelector(CharacterSelectors.getFavoriteTotal, 1);
  });

  it('should be created', () => {
    expect(facade).toBeTruthy();
  });

  it('loaded$ should return the loaded state', (done) => {
    facade.loaded$.subscribe((loaded) => {
      expect(loaded).toBe(true);
      done();
    });
  });

  //
  //

  it('characterList$ should return the list of characters', (done) => {
    facade.characterList$.subscribe((list) => {
      expect(list).toEqual(characters);
      done();
    });
  });

  it('selectedCharacter$ should return the selected character', (done) => {
    facade.selectedCharacter$.subscribe((selected) => {
      expect(selected).toEqual(character1);
      done();
    });
  });

  it('load should dispatch loadCharacters action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');
    const characterName = 'Rick';

    facade.load(characterName);

    expect(dispatchSpy).toHaveBeenCalledWith(
      CharacterPageActions.loadCharacters({ characterName }),
    );
  });

  it('load should dispatch loadCharacters action with undefined characterName', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    facade.load(undefined);

    expect(dispatchSpy).toHaveBeenCalledWith(
      CharacterPageActions.loadCharacters({ characterName: undefined }),
    );
  });

  it('characterList$ should return the loaded list; and loaded flag == true', async () => {
    store.overrideSelector(CharacterSelectors.getCharacterLoaded, false);
    store.overrideSelector(CharacterSelectors.getAllCharacter, []);

    let list = await firstValueFrom(facade.characterList$);
    let isLoaded = await firstValueFrom(facade.loaded$);

    expect(list.length).toBe(0);
    expect(isLoaded).toBe(false);

    store.overrideSelector(CharacterSelectors.getCharacterLoaded, true);
    store.overrideSelector(CharacterSelectors.getAllCharacter, [
      character1,
      character2,
    ]);

    store.dispatch(
      CharacterApiActions.loadCharactersSuccess({
        characters: [character1, character2],
      }),
    );

    list = await firstValueFrom(facade.characterList$);
    isLoaded = await firstValueFrom(facade.loaded$);

    expect(list.length).toBe(2);
    expect(isLoaded).toBe(true);
  });

  // Favorites
  it('favoriteCharacterList$ should return the list of favorite characters', (done) => {
    facade.favoriteCharacterList$.subscribe((list) => {
      expect(list).toEqual([character2]);
      done();
    });

    store.dispatch(
      CharacterPageActions.addToFavorites({ character: character1 }),
    );

    facade.favoriteCharacterList$.subscribe((list) => {
      expect(list).toEqual([character1, character2]);
      done();
    });
  });

  it('addToFavorites should dispatch addToFavorites action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    facade.addToFavorites(character1);

    expect(dispatchSpy).toHaveBeenCalledWith(
      CharacterPageActions.addToFavorites({ character: character1 }),
    );
  });

  it('removeFromFavorites should dispatch removeFromFavorites action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    facade.addToFavorites(character1);
    facade.removeFromFavorites(character1.id);

    expect(dispatchSpy).toHaveBeenCalledWith(
      CharacterPageActions.removeFromFavorites({ id: character1.id }),
    );
  });

  it('totalFavoriteCharacters$ should return the number of favorite characters', (done) => {
    facade.totalFavoriteCharacters$.subscribe((favCharacters: number) => {
      expect(favCharacters).toEqual(1);
      done();
    });

    store.dispatch(
      CharacterPageActions.addToFavorites({ character: character1 }),
    );

    facade.totalFavoriteCharacters$.subscribe((favCharacters: number) => {
      expect(favCharacters).toEqual(2);
      done();
    });
  });
});
