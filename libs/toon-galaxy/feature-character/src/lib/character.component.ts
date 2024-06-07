import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  of,
  startWith,
  switchMap,
  tap,
} from 'rxjs';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
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

  searchCharactersForm = this.fb.group({
    search: [''],
  });

  loading: boolean | undefined;

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  ngOnInit(): void {
    const debounceSearchInput$ = this.searchCharactersForm.controls[
      'search'
    ].valueChanges.pipe(debounceTime(300));

    this.characterList$ = debounceSearchInput$.pipe(
      startWith(''),
      distinctUntilChanged(),
      tap(() => (this.loading = true)),
      switchMap((input) => this.loadCharacters(input || '')),
      tap(() => (this.loading = false)),
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

  toggleFavoriteCharacter(character: CharacterEntity): void {
    // TODO: - Perform actions after a character is selected/unselected as favorite
  }
}

export default CharacterComponent;
