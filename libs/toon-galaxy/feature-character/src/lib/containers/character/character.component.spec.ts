import { NO_ERRORS_SCHEMA } from '@angular/core';
import {
  ComponentFixture,
  fakeAsync,
  flush,
  TestBed,
  tick,
  waitForAsync,
} from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import { CharacterFacade } from '@toon-galaxy/toon-galaxy/domain';
import { of } from 'rxjs';

import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let characterFacade: jest.Mocked<CharacterFacade>;
  let routerMock: any;
  let activatedRouteMock: any;

  beforeEach(waitForAsync(() => {
    const characterFacadeMock = {
      load: jest.fn(),
      addToFavorites: jest.fn(),
      removeFromFavorites: jest.fn(),
      favoriteCharacterList$: of([]),
      loaded$: of(false),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    activatedRouteMock = {
      url: of([{ path: 'favorites' }]),
    };

    TestBed.configureTestingModule({
      imports: [CharacterComponent, NoopAnimationsModule],
      providers: [
        { provide: CharacterFacade, useValue: characterFacadeMock },
        { provide: Router, useValue: routerMock },
        { provide: ActivatedRoute, useValue: activatedRouteMock },
      ],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    characterFacade = TestBed.inject(
      CharacterFacade,
    ) as jest.Mocked<CharacterFacade>;
    // characterFacade.load.mockReturnValue(of([]));
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize search form with empty search control', () => {
    expect(component.searchCharactersForm).toBeDefined();
    expect(component.searchCharactersForm.controls['search']).toBeDefined();
    expect(component.searchCharactersForm.get('search')?.value).toBe('');
  });

  it('should call addToFavorites when character is not favorite', () => {
    const character = {
      id: 1,
      name: 'Character 1',
      species: 'Species',
      image: 'Image URL',
      type: 'Type',
      isFavorite: false,
    };

    component.updateFavorites(character);
    expect(characterFacade.addToFavorites).toHaveBeenCalledWith({
      id: 1,
      name: 'Character 1',
      species: 'Species',
      image: 'Image URL',
      type: 'Type',
    });
  });

  it('should call removeFromFavorites when character is favorite', () => {
    const character = {
      id: 1,
      name: 'Character 1',
      species: 'Species',
      image: 'Image URL',
      type: 'Type',
      isFavorite: true,
    };

    component.updateFavorites(character);
    expect(characterFacade.removeFromFavorites).toHaveBeenCalledWith(1);
  });

  it('should handle successful loadCharacters', fakeAsync(() => {
    const character = {
      id: 1,
      name: 'Character 1',
      species: 'Species',
      image: 'Image URL',
      type: 'Type',
      isFavorite: true,
    };

    jest
      .spyOn(component as any, 'loadCharacters') // Access private method using 'any'
      .mockReturnValue(of([character]));

    fixture.detectChanges();

    tick(400);
    flush();

    component.characterList$.subscribe((characters) => {
      expect(characters).toEqual([character]);
    });
  }));

  it('should navigate to home on navigateToHome call', () => {
    component.navigateToHome();
    expect(routerMock.navigate).toHaveBeenCalledWith([
      '/manage-characters/search',
    ]);
  });
});
