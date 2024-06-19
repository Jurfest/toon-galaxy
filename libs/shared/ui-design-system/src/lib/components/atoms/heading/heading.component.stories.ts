import type { Meta, StoryObj } from '@storybook/angular';
import { HeadingComponent } from './heading.component';
import { expect, within } from '@storybook/test';

const meta: Meta<HeadingComponent> = {
  component: HeadingComponent,
  title: 'Design System/Atoms/Heding',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<HeadingComponent>;

export const Creepster: Story = {
  args: {
    label: 'Início',
    font: 'creepster',
    withBorder: true,
    size: 'md',
  },
};

export const Poppins: Story = {
  args: {
    label: 'Heading works!',
    font: 'poppins',
    withBorder: false,
    size: 'md',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/heading works!/gi)).toBeTruthy();
  },
};
