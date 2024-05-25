import type { Meta, StoryObj } from '@storybook/angular';
import { ColorsGridComponent } from './colors-grid.component';
import { expect, within } from '@storybook/test';

const meta: Meta<ColorsGridComponent> = {
  component: ColorsGridComponent,
  title: 'ColorsGridComponent',
};
export default meta;
type Story = StoryObj<ColorsGridComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/colors-grid works!/gi)).toBeTruthy();
  },
};
