import type { Meta, StoryObj } from '@storybook/angular';
import { CommonModule } from '@angular/common';
import { moduleMetadata } from '@storybook/angular';
import { action } from '@storybook/addon-actions';

import { IconHighlightComponent } from '../icon-highlight/icon-highlight.component';
import { CardComponent } from './card.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const mockCard = {
  id: '1',
  name: 'Talking Cat',
  species: 'Animal',
  type: '',
  image: '../../../../assets/images/talkin-cat.jpeg',
  isFavorite: false,
};

const meta: Meta<CardComponent> = {
  component: CardComponent,
  title: 'Design System/Molecules/Card',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, IconHighlightComponent, BrowserAnimationsModule],
    }),
  ],
};
export default meta;

type CardStory = StoryObj<CardComponent>;

export const Default = () => ({
  component: CardComponent,
  props: {
    card: mockCard,
    favCardUpdate: action('Favorite Card Updated'),
  },
});

export const Favorite = () => ({
  component: CardComponent,
  props: {
    card: { ...mockCard, isFavorite: true },
    favCardUpdate: action('Favorite Card Updated'),
  },
});
