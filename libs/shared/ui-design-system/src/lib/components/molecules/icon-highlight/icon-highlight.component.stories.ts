import {
  applicationConfig,
  moduleMetadata,
  type Meta,
  type StoryObj,
} from '@storybook/angular';
import { IconHighlightComponent } from './icon-highlight.component';

import { CommonModule } from '@angular/common';
import { IconComponent } from '../../atoms/icon/icon.component';
import { importProvidersFrom } from '@angular/core';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';

const meta: Meta<IconHighlightComponent> = {
  component: IconHighlightComponent,
  title: 'Design System/Molecules/Icon Highlight',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, IconComponent, BrowserAnimationsModule],
    }),
    // Apply application config to all stories
    applicationConfig({
      // List of providers and environment providers that should be available to the root component and all its children.
      providers: [
        // Import application-wide providers from a module
        importProvidersFrom(BrowserAnimationsModule),
        // Or use provide-style functions if available instead, e.g.
        provideAnimations(),
      ],
    }),
  ],
  argTypes: {
    isSelected: {
      control: {
        type: 'boolean',
      },
    },
  },
};
export default meta;
type IconHighlightStory = StoryObj<IconHighlightComponent>;

// export const Default = (args) => ({
//   props: {
//     ...args,
//     isSelected: false,
//     toggleIconSeleted: () => {
//       args.isSelected = !args.isSelected; // Toggle isSelected
//     },
//   },
// });

export const Selected: IconHighlightStory = {
  args: {
    isSelected: true,
    // toggleIconSeleted: () => {
    //   isSelected: false;
    // },
  },
};
