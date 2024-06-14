import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  CardListComponent,
  HeadingComponent,
  InputComponent,
  EmptyResultComponent,
} from '@toon-galaxy/shared/ui-design-system';
import {
  CharacterEntity,
  CharacterFacade,
  CharacterViewModel,
} from '@toon-galaxy/toon-galaxy/domain';
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HeadingComponent,
    InputComponent,
    CardListComponent,
    EmptyResultComponent,
    // temps:
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'toon-galaxy-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  private characterFacade = inject(CharacterFacade);
  private fb = inject(FormBuilder);

  characterList$!: Observable<CharacterEntity[]>;
  favCharacterList$: Observable<CharacterEntity[]> =
    this.characterFacade.favoriteCharacterList$;
  characterViewModelList$!: Observable<CharacterViewModel[]>;
  loaded$ = this.characterFacade.loaded$;

  searchCharactersForm = this.fb.group({
    search: [''],
  });

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    const debounceSearchInput$ = this.searchCharactersForm.controls[
      'search'
    ].valueChanges.pipe(debounceTime(300));

    this.characterList$ = debounceSearchInput$.pipe(
      startWith(''),
      distinctUntilChanged(),
      switchMap((input) => this.loadCharacters(input || '')),
    );

    this.loadCharacterViewModelList();
  }

  private loadCharacters(characterName: string): Observable<CharacterEntity[]> {
    return this.characterFacade.load(characterName);
  }

  private loadCharacterViewModelList(): void {
    this.characterViewModelList$ = combineLatest([
      this.characterList$,
      this.favCharacterList$,
    ]).pipe(
      map(([characterList, favCharacterList]) => {
        return characterList.map((searchedCharacter: CharacterEntity) => {
          return {
            ...searchedCharacter,
            isFavorite: favCharacterList.some(
              (favoriteCharacter: CharacterEntity) =>
                favoriteCharacter.id === searchedCharacter.id,
            ),
          };
        });
      }),
    );
  }

  updateFavorites(character: CharacterViewModel): void {
    const { isFavorite, ...characterEntity } = character;
    if (isFavorite) {
      this.characterFacade.removeFromFavorites(character.id);
    } else {
      this.characterFacade.addToFavorites(characterEntity);
    }
  }
}

export default CharacterComponent;
