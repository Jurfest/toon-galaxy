import type { Meta, StoryObj } from '@storybook/angular';
import { CardListComponent } from './card-list.component';

const meta: Meta<CardListComponent> = {
  component: CardListComponent,
  title: 'CardListComponent',
};
export default meta;
type Story = StoryObj<CardListComponent>;

export const Primary: Story = {
  args: {},
};
