import type { Meta, StoryObj } from '@storybook/angular';
import { TextComponent } from './text.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<TextComponent> = {
  component: TextComponent,
  title: 'TextComponent',
};
export default meta;
type Story = StoryObj<TextComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/text works!/gi)).toBeTruthy();
  },
};
