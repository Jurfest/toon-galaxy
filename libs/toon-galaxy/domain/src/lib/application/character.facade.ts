import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { CharacterPageActions } from '../+state/character/character.actions';
import * as fromCharacter from '../+state/character/character.reducer';
import * as CharacterSelectors from '../+state/character/character.selectors';
import { CharacterEntity } from '../entities/character.models';

@Injectable({ providedIn: 'root' })
export class CharacterFacade {
  private readonly store = inject(Store<fromCharacter.CharacterPartialState>);

  /**
   * To extend, it's possible to
   * combine pieces of state using createSelector,
   * and expose them as observables through the facade
   */
  loaded$ = this.store.pipe(select(CharacterSelectors.getCharacterLoaded));
  characterList$ = this.store.pipe(select(CharacterSelectors.getAllCharacter));
  selectedCharacter$ = this.store.pipe(select(CharacterSelectors.getSelected));
  favoriteCharacterList$ = this.store.pipe(
    select(CharacterSelectors.getAllFavorites),
  );
  totalFavoriteCharacters$ = this.store.pipe(
    select(CharacterSelectors.getFavoriteTotal),
  );

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  load(characterName: string): Observable<CharacterEntity[]> {
    this.store.dispatch(CharacterPageActions.loadCharacters({ characterName }));
    return this.characterList$;
  }

  addToFavorites(character: CharacterEntity): void {
    this.store.dispatch(CharacterPageActions.addToFavorites({ character }));
  }

  removeFromFavorites(id: number): void {
    this.store.dispatch(CharacterPageActions.removeFromFavorites({ id }));
  }
}
