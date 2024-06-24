import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { v4 as uuidv4 } from 'uuid';
import { MockStore, provideMockStore } from '@ngrx/store/testing';

import { LoadingFacade } from './loading.facade';
import { LoadingActions } from './loading.actions';
import * as LoadingSelectors from './loading.selectors';

describe('LoadingFacade', () => {
  let loadingFacade: LoadingFacade;
  let store: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        LoadingFacade,
        provideMockStore({
          initialState: {},
        }),
      ],
    });

    loadingFacade = TestBed.inject(LoadingFacade);
    store = TestBed.inject(Store) as MockStore;

    // Mock the selectors
    store.overrideSelector(LoadingSelectors.isLoading, true);
  });

  it('should be created', () => {
    expect(loadingFacade).toBeTruthy();
  });

  it('isLoading$ should return the loaded state', (done) => {
    loadingFacade.isLoading$.subscribe((loaded) => {
      expect(loaded).toBe(true);
      done();
    });
  });

  it('start should dispatch loadStart action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const requestId = loadingFacade.start();

    expect(dispatchSpy).toHaveBeenCalledWith(
      LoadingActions.loadStart({ requestId }),
    );
  });

  it('stop should dispatch loadStop action', () => {
    const dispatchSpy = jest.spyOn(store, 'dispatch');

    const requestId = uuidv4();
    loadingFacade.stop(requestId);

    expect(dispatchSpy).toHaveBeenCalledWith(
      LoadingActions.loadStop({ requestId }),
    );
  });
});
