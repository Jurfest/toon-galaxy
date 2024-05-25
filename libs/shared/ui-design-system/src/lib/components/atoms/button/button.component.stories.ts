import { importProvidersFrom } from '@angular/core';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { expect, within } from '@storybook/test';

import { ButtonComponent } from './button.component';

const meta: Meta<ButtonComponent> = {
  component: ButtonComponent,
  title: 'Design System/Atoms/Button',
  decorators: [
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
  args: {
    label: 'Button',
  },
};
export default meta;

type Story = StoryObj<ButtonComponent>;

export const Primary: Story = {};

export const Heading: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Button/gi)).toBeTruthy();
  },
};
