import type { Meta, StoryObj } from '@storybook/angular';
import { InputComponent, InputType } from './input.component';

import { expect, within } from '@storybook/test';

const meta: Meta<InputComponent> = {
  component: InputComponent,
  title: 'Design System/Atoms/Input',
  tags: ['autodocs'],
};
export default meta;

export const Default: StoryObj<Omit<InputComponent, 'input'>> = {
  args: {
    inputType: InputType.text,
    placeholder: 'This is a placeholder',
    value: '',
    id: 'uuid',
  },
  argTypes: {
    placeholder: { control: 'text' },
    value: { control: 'text' },
  },
};

type Story = StoryObj<InputComponent>;

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
