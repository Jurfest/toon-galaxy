import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CharacterFacade } from '@toon-galaxy/toon-galaxy/domain';
import { of } from 'rxjs';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { CharacterComponent } from './character.component';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;
  let characterFacade: jest.Mocked<CharacterFacade>;

  beforeEach(waitForAsync(() => {
    const characterFacadeMock = {
      load: jest.fn(),
      addToFavorites: jest.fn(),
      removeFromFavorites: jest.fn(),
      favoriteCharacterList$: of([]),
    };

    TestBed.configureTestingModule({
      imports: [
        CharacterComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule,
      ],
      providers: [{ provide: CharacterFacade, useValue: characterFacadeMock }],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    characterFacade = TestBed.inject(
      CharacterFacade,
    ) as jest.Mocked<CharacterFacade>;
    characterFacade.load.mockReturnValue(of([]));
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeDefined();
  });

  it('should initialize search form', () => {
    expect(component.searchCharactersForm).toBeDefined();
    expect(component.searchCharactersForm.controls['search']).toBeDefined();
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

  it('should call loadCharacters when search input changes', async () => {
    // jest.spyOn(component, 'loadCharacters').mockReturnValue(of([]));
    jest
      .spyOn(component as any, 'loadCharacters') // Access private method using 'any'
      .mockReturnValue(of([]));

    const searchControl = component.searchCharactersForm.controls['search'];
    searchControl.setValue('test');
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(component['loadCharacters']).toHaveBeenCalledWith('test');
  });

  it('should set loading to false after characters are loaded', async () => {
    jest
      .spyOn(component as any, 'loadCharacters') // Access private method using 'any'
      .mockReturnValue(
        of([
          {
            id: 1,
            name: 'Character 1',
            species: 'Species',
            image: 'Image URL',
            type: 'Type',
          },
        ]),
      );

    const searchControl = component.searchCharactersForm.controls['search'];
    searchControl.setValue('test');
    fixture.detectChanges();

    await new Promise((resolve) => setTimeout(resolve, 400));

    expect(component.loading).toBeFalsy();
  });
});
