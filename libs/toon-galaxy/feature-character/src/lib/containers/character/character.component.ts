import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import {
  ButtonComponent,
  CardListComponent,
  EmptyResultComponent,
  HeadingComponent,
  InputComponent,
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
  shareReplay,
  startWith,
  switchMap,
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
    ButtonComponent,
    MatFormFieldModule,
    MatInputModule,
  ],
  selector: 'toon-galaxy-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss'],
})
export class CharacterComponent implements OnInit {
  private router = inject(Router);
  private fb = inject(FormBuilder);
  private route = inject(ActivatedRoute);
  private characterFacade = inject(CharacterFacade);

  characterList$!: Observable<CharacterEntity[]>;
  favCharacterList$: Observable<CharacterEntity[]> =
    this.characterFacade.favoriteCharacterList$;
  characterViewModelList$!: Observable<CharacterViewModel[]>;
  favCharacterViewModelList$: Observable<CharacterViewModel[]> =
    this.favCharacterList$.pipe(
      map((favList) =>
        favList.map((fav) => {
          return { ...fav, isFavorite: true };
        }),
      ),
    );
  loaded$ = this.characterFacade.loaded$;

  searchCharactersForm = this.fb.group({
    search: [''],
  });

  isFavorites$ = this.route.url.pipe(
    map((segments) => segments.some((segment) => segment.path === 'favorites')),
  );

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
      shareReplay({ bufferSize: 1, refCount: true }),
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
      shareReplay({ bufferSize: 1, refCount: true }),
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

  navigateToHome(): void {
    this.router.navigate(['/manage-characters/search']);
  }
}

export default CharacterComponent;
