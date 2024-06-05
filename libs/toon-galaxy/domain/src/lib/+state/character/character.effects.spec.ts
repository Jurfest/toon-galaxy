import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ActionsSubject, Action } from '@ngrx/store';

import { CharacterEffects } from './Character.effects';
import { CharacterDataService } from '../../infrastructure/character.data.service';
import { CharacterApiActions, CharacterPageActions } from './character.actions';
import { CharacterEntity } from '../../entities/character.models';

describe('CharacterEffects', () => {
  let actions$: Observable<Action>;
  let effects: CharacterEffects;
  let characterDataService: jest.Mocked<CharacterDataService>;

  beforeEach(() => {
    const characterDataServiceMock = {
      load: jest.fn(),
    };

    TestBed.configureTestingModule({
      providers: [
        CharacterEffects,
        provideMockActions(() => actions$),
        { provide: CharacterDataService, useValue: characterDataServiceMock },
      ],
    });

    effects = TestBed.inject(CharacterEffects);
    characterDataService = TestBed.inject(
      CharacterDataService,
    ) as jest.Mocked<CharacterDataService>;
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  it('should dispatch loadCharactersSuccess action when loadCharacters$ is successful', () => {
    const characterName = 'Summer Smith';
    const characters: CharacterEntity[] = [
      {
        id: 3,
        name: 'Summer Smith',
        species: 'Human',
        image: 'https://rickandmortyapi.com/api/character/avatar/3.jpeg',
      },
    ];
    const action = CharacterPageActions.loadCharacters({ characterName });
    const completion = CharacterApiActions.loadCharactersSuccess({
      characters,
    });

    characterDataService.loadCharacters.mockReturnValueOnce(of(characters));

    // Subscribe on the loadCharacters effect to catch emitted actions, which
    // are used to assert the effect output
    effects.loadCharacters$.subscribe((result) => {
      expect(result).toEqual(completion);
    });

    const actionsSubject$ = new ActionsSubject();

    actionsSubject$.next(action);
  });

  it('should dispatch loadCharactersFailure action when loadCharacters$ fails', () => {
    const characterName = 'Summer Smith';
    const error = 'Error loading characters';
    const action = CharacterPageActions.loadCharacters({ characterName });
    const completion = CharacterApiActions.loadCharactersFailure({ error });

    characterDataService.loadCharacters.mockReturnValueOnce(
      throwError(() => new Error(error)),
    );

    // Subscribe to the loadCharacters effect to assert the emitted action
    effects.loadCharacters$.subscribe((result) => {
      expect(result).toEqual(completion);
    });

    const actionsSubject$ = new ActionsSubject();

    actionsSubject$.next(action);
  });
});
