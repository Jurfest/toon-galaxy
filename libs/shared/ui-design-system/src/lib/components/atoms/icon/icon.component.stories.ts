import type { Meta, StoryObj } from '@storybook/angular';
import { IconComponent } from './icon.component';

const meta: Meta<IconComponent> = {
  component: IconComponent,
  title: 'Design System/Atoms/Icon',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<IconComponent>;

export const Primary: Story = {
  args: {
    iconName: 'heart',
  },
};
