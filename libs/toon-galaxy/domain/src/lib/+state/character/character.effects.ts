import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { CharacterDataService } from '../../infrastructure/character.data.service';
import * as CharacterActions from './character.actions';

@Injectable()
export class CharacterEffects {
  loadCharacter$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CharacterActions.loadCharacter),
      switchMap((action) =>
        this.characterDataService.load().pipe(
          map((character) =>
            CharacterActions.loadCharacterSuccess({ character }),
          ),
          catchError((error) =>
            of(CharacterActions.loadCharacterFailure({ error })),
          ),
        ),
      ),
    ),
  );

  constructor(
    private actions$: Actions,
    private characterDataService: CharacterDataService,
  ) {}
}
