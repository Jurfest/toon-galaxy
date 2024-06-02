import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'manage-characters',
        pathMatch: 'full',
      },
      {
        path: 'manage-characters',
        loadChildren: () =>
          import('@toon-galaxy/toon-galaxy/feature-character').then(
            (m) => m.CHARACTER_ROUTES,
          ),
      },
      // This route ALWAYS needs to be the last one:
      {
        path: '**',
        redirectTo: 'manage-characters',
      },
    ],
  },
];
