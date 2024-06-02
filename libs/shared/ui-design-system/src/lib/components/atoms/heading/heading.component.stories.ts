import type { Meta, StoryObj } from '@storybook/angular';
import { HeadingComponent } from './heading.component';
import { expect, within } from '@storybook/test';

const meta: Meta<HeadingComponent> = {
  component: HeadingComponent,
  title: 'Design System/Atoms/Heding',
};
export default meta;
type Story = StoryObj<HeadingComponent>;

export const Primary: Story = {
  args: {},
};

export const Heading: Story = {
  args: {},
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/heading works!/gi)).toBeTruthy();
  },
};
