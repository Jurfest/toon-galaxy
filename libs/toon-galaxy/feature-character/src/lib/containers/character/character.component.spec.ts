import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ButtonComponent,
  CardListComponent,
  EmptyResultComponent,
  HeadingComponent,
  InputComponent,
} from '@toon-galaxy/shared/ui-design-system';
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
      loaded$: of(true),
    };

    routerMock = {
      navigate: jest.fn(),
    };

    activatedRouteMock = {
      url: of([{ path: 'favorites' }]),
    };

    TestBed.configureTestingModule({
      imports: [
        CharacterComponent,
        ReactiveFormsModule,
        NoopAnimationsModule,
        HeadingComponent,
        InputComponent,
        CardListComponent,
        EmptyResultComponent,
        ButtonComponent,
        // Temp
        MatProgressSpinnerModule,
      ],
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
    characterFacade.load.mockReturnValue(of([]));
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

  // it('should set loading to true when search input changes', async () => {
  //   const searchControl = component.searchCharactersForm.controls['search'];
  //   searchControl.setValue('test');
  //   fixture.detectChanges();

  //   await new Promise((resolve) => setTimeout(resolve, 400));

  //   expect(component.loading).toBeTruthy();
  // });

  // it('should call loadCharacters when search input changes', async () => {
  //   // jest.spyOn(component, 'loadCharacters').mockReturnValue(of([]));
  //   jest
  //     .spyOn(component as any, 'loadCharacters') // Access private method using 'any'
  //     .mockReturnValue(of([]));

  //   const searchControl = component.searchCharactersForm.controls['search'];
  //   searchControl.setValue('test');
  //   fixture.detectChanges();

  //   await new Promise((resolve) => setTimeout(resolve, 400));

  //   expect(component['loadCharacters']).toHaveBeenCalledWith('test');
  // });

  // it('should call loadCharacters on search input value change', waitForAsync(() => {
  //   const loadCharactersSpy = jest
  //     .spyOn(characterFacade, 'load')
  //     .mockReturnValue(of([]));

  //   component.searchCharactersForm.get('search')?.setValue('test');
  //   fixture.detectChanges();

  //   expect(loadCharactersSpy).toHaveBeenCalledWith('test');
  // }));

  // it('should set loading to false after characters are loaded', async () => {
  //   jest
  //     .spyOn(component as any, 'loadCharacters') // Access private method using 'any'
  //     .mockReturnValue(
  //       of([
  //         {
  //           id: 1,
  //           name: 'Character 1',
  //           species: 'Species',
  //           image: 'Image URL',
  //           type: 'Type',
  //         },
  //       ]),
  //     );

  //   const searchControl = component.searchCharactersForm.controls['search'];
  //   searchControl.setValue('test');
  //   fixture.detectChanges();

  //   await new Promise((resolve) => setTimeout(resolve, 400));

  //   expect(component.loaded$).toBeFalsy();
  // });

  it('should navigate to home on navigateToHome call', () => {
    component.navigateToHome();
    expect(routerMock.navigate).toHaveBeenCalledWith([
      '/manage-characters/search',
    ]);
  });

  // it('should handle successful loadCharacters', waitForAsync(() => {
  //   const character = {
  //     id: 1,
  //     name: 'Character 1',
  //     species: 'Species',
  //     image: 'Image URL',
  //     type: 'Type',
  //     isFavorite: true,
  //   };

  //   const loadCharactersSpy = jest
  //     .spyOn(characterFacade, 'load')
  //     .mockReturnValue(of([character]));

  //   component.searchCharactersForm.get('search')?.setValue('test');
  //   fixture.detectChanges();

  //   component.characterList$.subscribe((characters) => {
  //     expect(characters).toEqual([{ id: '1' }]);
  //   });

  //   expect(loadCharactersSpy).toHaveBeenCalledWith('test');
  // }));
});
