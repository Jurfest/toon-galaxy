import { provideEffects } from '@ngrx/effects';
import { provideState } from '@ngrx/store';

import { CharacterEffects } from './+state/character/character.effects';
import {
  CHARACTER_FEATURE_KEY,
  reducer,
} from './+state/character/character.reducer';

export function provideToonGalaxyDomain() {
  return [
    provideState(CHARACTER_FEATURE_KEY, reducer),
    provideEffects([CharacterEffects]),
  ];
}
