import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Design System/Atoms/Icon',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Heart: Story = {
  args: {
    iconName: 'heart',
  },
};

export const Home: Story = {
  args: {
    iconName: 'home',
    isSelected: true,
  },
};

export const Interactive: Story = {
  args: {
    iconName: 'heart',
    isClickable: true,
    initialIconPrefix: 'far',
  },
};
