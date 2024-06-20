// import { NgModule } from '@angular/core';
// import { TestBed } from '@angular/core/testing';
// import { EffectsModule } from '@ngrx/effects';
// import { StoreModule, Store } from '@ngrx/store';
// import { readFirst } from '@nx/angular/testing';

// import * as TemporaryActions from './temporary.actions';
// import { TemporaryEffects } from './temporary.effects';
// import { TemporaryFacade } from './temporary.facade';
// import { TemporaryEntity } from './temporary.models';
// import {
//   TEMPORARY_FEATURE_KEY,
//   TemporaryState,
//   initialTemporaryState,
//   temporaryReducer,
// } from './temporary.reducer';
// import * as TemporarySelectors from './temporary.selectors';

// interface TestSchema {
//   temporary: TemporaryState;
// }

// describe('TemporaryFacade', () => {
//   let facade: TemporaryFacade;
//   let store: Store<TestSchema>;
//   const createTemporaryEntity = (id: string, name = ''): TemporaryEntity => ({
//     id,
//     name: name || `name-${id}`,
//   });

//   describe('used in NgModule', () => {
//     beforeEach(() => {
//       @NgModule({
//         imports: [
//           StoreModule.forFeature(TEMPORARY_FEATURE_KEY, temporaryReducer),
//           EffectsModule.forFeature([TemporaryEffects]),
//         ],
//         providers: [TemporaryFacade],
//       })
//       class CustomFeatureModule {}

//       @NgModule({
//         imports: [
//           StoreModule.forRoot({}),
//           EffectsModule.forRoot([]),
//           CustomFeatureModule,
//         ],
//       })
//       class RootModule {}
//       TestBed.configureTestingModule({ imports: [RootModule] });

//       store = TestBed.inject(Store);
//       facade = TestBed.inject(TemporaryFacade);
//     });

//     /**
//      * The initially generated facade::loadAll() returns empty array
//      */
//     it('loadAll() should return empty list with loaded == true', async () => {
//       let list = await readFirst(facade.allTemporary$);
//       let isLoaded = await readFirst(facade.loaded$);

//       expect(list.length).toBe(0);
//       expect(isLoaded).toBe(false);

//       facade.init();

//       list = await readFirst(facade.allTemporary$);
//       isLoaded = await readFirst(facade.loaded$);

//       expect(list.length).toBe(0);
//       expect(isLoaded).toBe(true);
//     });

//     /**
//      * Use `loadTemporarySuccess` to manually update list
//      */
//     it('allTemporary$ should return the loaded list; and loaded flag == true', async () => {
//       let list = await readFirst(facade.allTemporary$);
//       let isLoaded = await readFirst(facade.loaded$);

//       expect(list.length).toBe(0);
//       expect(isLoaded).toBe(false);

//       store.dispatch(
//         TemporaryActions.loadTemporarySuccess({
//           temporary: [
//             createTemporaryEntity('AAA'),
//             createTemporaryEntity('BBB'),
//           ],
//         }),
//       );

//       list = await readFirst(facade.allTemporary$);
//       isLoaded = await readFirst(facade.loaded$);

//       expect(list.length).toBe(2);
//       expect(isLoaded).toBe(true);
//     });
//   });
// });
