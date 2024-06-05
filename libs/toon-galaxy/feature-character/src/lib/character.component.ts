import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import {
  CharacterFacade,
  CharacterEntity,
} from '@toon-galaxy/toon-galaxy/domain';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import {
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  switchMap,
  tap,
} from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

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

  // characterList$: Observable<CharacterEntity[]> | undefined;
  characterList$: Observable<CharacterEntity[]> | undefined =
    this.characterFacade.characterList$;

  searchCharactersForm = this.fb.group({
    search: [''],
  });

  loading: boolean | undefined;

  // characterGroups: CharacterGroup[] = [];

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
  }

  private loadCharacters(characterName: string): Observable<CharacterEntity[]> {
    return this.characterFacade.load(characterName);
  }

  toggleFavoriteCharacter(character: CharacterEntity): void {
    // TODO: - Perform actions after a character is selected/unselected as favorite
  }
}

export default CharacterComponent;
