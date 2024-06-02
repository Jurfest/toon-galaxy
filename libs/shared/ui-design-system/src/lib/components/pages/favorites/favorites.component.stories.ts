import type { Meta, StoryObj } from '@storybook/angular';
import { FavoritesComponent } from './favorites.component';

const meta: Meta<FavoritesComponent> = {
  component: FavoritesComponent,
  title: 'Design System/Pages/Favorites',
  tags: ['autodocs'],
};
export default meta;
type Story = StoryObj<FavoritesComponent>;

export const Primary: Story = {
  args: {},
};
