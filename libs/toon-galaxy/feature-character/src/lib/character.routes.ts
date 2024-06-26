import { Routes } from '@angular/router';

export const CHARACTER_ROUTES: Routes = [
  {
    path: '',
    providers: [],
    children: [
      {
        path: '',
        redirectTo: 'search',
        pathMatch: 'full',
      },
      {
        path: 'search',
        title: 'Toon Galaxy | Home',
        loadComponent: () =>
          import('./containers/character/character.component'),
      },
      {
        path: 'favorites',
        title: 'Toon Galaxy | Favorites',
        loadComponent: () =>
          import('./containers/character/character.component'),
      },
      // This route ALWAYS needs to be the last one:
      {
        path: '**',
        redirectTo: 'search',
      },
    ],
  },
];

export default CHARACTER_ROUTES;
// import { Routes } from '@angular/router';

// export const CHARACTER_ROUTES: Routes = [
//   {
//     path: '',
//     providers: [],
//     children: [
//       {
//         path: '',
//         redirectTo: 'search',
//         pathMatch: 'full',
//       },
//       {
//         path: 'search',
//         loadComponent: () => import('./character.component'),
//       },
//       {
//         path: 'favorites',
//         loadComponent: () => import('./character.component'),
//       },
//       // This route ALWAYS needs to be the last one:
//       {
//         path: '**',
//         redirectTo: 'search',
//       },
//     ],
//   },
// ];

// export default CHARACTER_ROUTES;
