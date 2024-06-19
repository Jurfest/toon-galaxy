// import { importProvidersFrom } from '@angular/core';
// import {
//   BrowserAnimationsModule,
//   provideAnimations,
// } from '@angular/platform-browser/animations';
// import {
//   applicationConfig,
//   Meta,
//   moduleMetadata,
//   StoryObj,
// } from '@storybook/angular';
// import { expect, within } from '@storybook/test';

// import { ButtonComponent } from './button.component';
// import { MatButtonModule } from '@angular/material/button';

// const meta: Meta<ButtonComponent> = {
//   component: ButtonComponent,
//   title: 'Design System/Atoms/Button',
//   decorators: [
//     // Apply application config to all stories
//     applicationConfig({
//       // List of providers and environment providers that should be available to the root component and all its children.
//       providers: [
//         // Import application-wide providers from a module
//         importProvidersFrom(BrowserAnimationsModule),
//         // Or use provide-style functions if available instead, e.g.
//         provideAnimations(),
//       ],
//     }),
//   ],
//   args: {
//     label: 'Button',
//   },
// };
// export default meta;

// type Story = StoryObj<ButtonComponent>;

// export const Primary: Story = {};

// export const Heading: Story = {
//   play: async ({ canvasElement }) => {
//     const canvas = within(canvasElement);
//     expect(canvas.getByText(/Button/gi)).toBeTruthy();
//   },
// };

// const Template = (args: ButtonComponent) => ({
//   props: args,
// });

// export default {
//   title: 'Design System/Atoms/Button',
//   component: ButtonComponent,
//   tags: ['autodocs'],
// decorators: [
//   moduleMetadata({
//     imports: [MatButtonModule],
//   }),

//   // Apply application config to all stories
//   applicationConfig({
//     // List of providers and environment providers that should be available to the root component and all its children.
//     providers: [
//       // Import application-wide providers from a module
//       importProvidersFrom(BrowserAnimationsModule),
//       // Or use provide-style functions if available instead, e.g.
//       provideAnimations(),
//     ],
//   }),
// ],
// };

// export const Default = Template.bind({});
// Default.args = {
//   label: 'Button label',
// };

// <design-system-button (buttonClickEvent)="navigateToHome()"
//           >Voltar ao início</design-system-button
//         >
//       </design-system-empty-result>

//
import {
  applicationConfig,
  Meta,
  moduleMetadata,
  StoryObj,
} from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';

import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';

//
//

//
//

export default {
  component: ButtonComponent,
  title: 'Design System/Atoms/Button',
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, IconComponent],
    }),
  ],
} as Meta;

type ButtonStory = StoryObj<ButtonComponent>;

// export const Default: ButtonStory = () => ({
//   template: `
//     <design-system-button (buttonClickEvent)="onClick($event)">
//       Click me
//     </design-system-button>
//   `,
// });
export const Default: ButtonStory = {
  render: (args) => ({
    props: args,
    template: `
      <design-system-button (buttonClickEvent)="onClick($event)">
        Voltar ao início
      </design-system-button>
    `,
  }),
};

export const WithIconAtRight: ButtonStory = {
  render: (args) => ({
    props: args,
    template: `
      <design-system-button (buttonClickEvent)="onClick($event)">
        Click me with icon
        <design-system-icon iconName="home"></design-system-icon>
      </design-system-button>
    `,
  }),
};
