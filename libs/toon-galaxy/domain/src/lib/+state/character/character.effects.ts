import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CharacterDataService } from '../../infrastructure/character.data.service';
import { CharacterPageActions, CharacterApiActions } from './character.actions';

@Injectable()
export class CharacterEffects {
  private actions$ = inject(Actions);
  private characterDataService = inject(CharacterDataService);

  loadCharacters$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterPageActions.loadCharacters),
      switchMap((action) =>
        this.characterDataService.load(action.characterName).pipe(
          map((characters) =>
            CharacterApiActions.loadCharactersSuccess({ characters }),
          ),
          catchError((error) =>
            of(CharacterApiActions.loadCharactersFailure({ error })),
          ),
        ),
      ),
    ),
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}
}
