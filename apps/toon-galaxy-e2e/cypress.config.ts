import { nxE2EPreset } from '@nx/cypress/plugins/cypress-preset';

import { defineConfig } from 'cypress';

export default defineConfig({
  // Uncomment to generate video on dist folder
  // video: true,
  e2e: {
    ...nxE2EPreset(__filename, {
      cypressDir: 'src',
      webServerCommands: {
        default: 'nx run toon-galaxy:serve:development',
        production: 'nx run toon-galaxy:serve:production',
      },
      ciWebServerCommand: 'nx run toon-galaxy:serve-static',
    }),
    baseUrl: 'http://localhost:4200',
  },
});
