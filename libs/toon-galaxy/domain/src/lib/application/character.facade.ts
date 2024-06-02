import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import { loadCharacter } from '../+state/character/character.actions';
import * as fromCharacter from '../+state/character/character.reducer';
import * as CharacterSelectors from '../+state/character/character.selectors';

@Injectable({ providedIn: 'root' })
export class CharacterFacade {
  private store = inject(Store<fromCharacter.CharacterPartialState>);

  loaded$ = this.store.pipe(select(CharacterSelectors.getCharacterLoaded));
  characterList$ = this.store.pipe(select(CharacterSelectors.getAllCharacter));
  selectedCharacter$ = this.store.pipe(select(CharacterSelectors.getSelected));

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  constructor() {}

  load(): void {
    this.store.dispatch(loadCharacter());
  }
}
