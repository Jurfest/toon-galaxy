import { expect, within } from '@storybook/test';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { MatButtonModule } from '@angular/material/button';

import { ButtonComponent } from './button.component';
import { IconComponent } from '../icon/icon.component';

export default {
  component: ButtonComponent,
  title: 'Design System/Atoms/Button',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [MatButtonModule, IconComponent],
    }),
  ],
} as Meta;

type ButtonStory = StoryObj<ButtonComponent>;

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
        <design-system-icon iconName="home" data-testid="home-icon"></design-system-icon>
      </design-system-button>
    `,
  }),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByTestId(/home-icon/gi)).toBeTruthy();
  },
};
