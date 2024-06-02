import { expect, within } from '@storybook/test';

import { TextComponent } from './text.component';

import type { Meta, StoryObj } from '@storybook/angular';
const meta: Meta<TextComponent> = {
  component: TextComponent,
  title: 'Design System/Atoms/Text',
};
export default meta;
type Story = StoryObj<TextComponent>;

export const Poppins: Story = {
  args: {
    label: 'Human',
  },
};

export const CreepsterNormal: Story = {
  args: {
    label: 'RICK SANCHEZ',
    font: 'creepster',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/RICK SANCHEZ/gi)).toBeTruthy();
  },
};

export const CreepsterWithBorder: Story = {
  args: {
    label: 'Início',
    font: 'creepster',
    withBorder: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/Início/gi)).toBeTruthy();
  },
};
