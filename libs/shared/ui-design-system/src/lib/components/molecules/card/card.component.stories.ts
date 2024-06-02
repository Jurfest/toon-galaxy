import type { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'Design System/Molecules/Card',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<CardComponent>;

export const Primary: Story = {
  args: {},
};
