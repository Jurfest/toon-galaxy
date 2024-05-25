import { expect, within } from '@storybook/test';

import { TextComponent } from './text.component';

import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<TextComponent> = {
  component: TextComponent,
  title: 'Design System/Atoms/Button',
};
export default meta;
type Story = StoryObj<TextComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {
    font: 'creepster',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/text works!/gi)).toBeTruthy();
  },
};
