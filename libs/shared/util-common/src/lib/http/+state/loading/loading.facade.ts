import { inject, Injectable } from '@angular/core';
import { select, Store } from '@ngrx/store';

import * as LoadingSelectors from './loading.selectors';
import { LoadingActions } from './loading.actions';

@Injectable({ providedIn: 'root' })
export class LoadingFacade {
  private readonly store = inject(Store);

  loaded$ = this.store.pipe(select(LoadingSelectors.isLoading));
  // TODO: NgRx Signal Store
  // loaded$ = this.store.selectSignal(selectLoadingState.selectLoading);

  start() {
    this.store.dispatch(LoadingActions.loadStart());
  }

  stop(): void {
    this.store.dispatch(LoadingActions.loadStop());
  }
}
