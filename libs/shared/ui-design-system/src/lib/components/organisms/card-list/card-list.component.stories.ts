import type { Meta, StoryObj } from '@storybook/angular';
import { CardListComponent } from './card-list.component';

import { moduleMetadata, applicationConfig } from '@storybook/angular';
import { CardComponent } from '../../molecules/card/card.component';
import { CommonModule } from '@angular/common';
import { importProvidersFrom } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Card } from '../../../models/card';

const mockCardList: Card[] = [
  {
    id: 1,
    name: 'Card 1',
    species: 'Species 1',
    type: 'Type 1',
    image: '../../../../assets/images/talkin-cat.jpeg',
    isFavorite: false,
  },
  {
    id: 2,
    name: 'Card 2',
    species: 'Species 2',
    type: 'Type 2',
    image: '../../../../assets/images/talkin-cat.jpeg',
    isFavorite: true,
  },
  {
    id: 3,
    name: 'Card 3',
    species: 'Species 3',
    type: 'Type 3',
    image: '../../../../assets/images/talkin-cat.jpeg',
    isFavorite: false,
  },
  {
    id: 4,
    name: 'Card 4',
    species: 'Species 4',
    type: 'Type 4',
    image: '../../../../assets/images/talkin-cat.jpeg',
    isFavorite: false,
  },
  {
    id: 5,
    name: 'Card 5',
    species: 'Species 5',
    type: 'Type 5',
    image: '../../../../assets/images/talkin-cat.jpeg',
    isFavorite: false,
  },
];

const meta: Meta<CardListComponent> = {
  component: CardListComponent,
  title: 'Design System/Organisms/Card List',
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [CommonModule, CardComponent, BrowserAnimationsModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom(BrowserAnimationsModule)],
    }),
  ],
};
export default meta;

type CardListStory = StoryObj<CardListComponent>;

export const Default: CardListStory = {
  render: (args) => {
    const updatedCardList = [...mockCardList];

    const handleFavCardUpdate = (card: Card) => {
      const cardIndex = updatedCardList.findIndex((c) => c.id === card.id);
      if (cardIndex !== -1) {
        updatedCardList[cardIndex] = {
          ...updatedCardList[cardIndex],
          isFavorite: !updatedCardList[cardIndex].isFavorite,
        };
      }
      // action('favCardUpdate')(updatedCardList[cardIndex]);
    };

    return {
      props: {
        ...args,
        cardList: updatedCardList,
        favCardUpdate: handleFavCardUpdate,
      },
      template: `
        <design-system-card-list
          [cardList]="cardList"
          (favCardUpdate)="favCardUpdate($event)"
        ></design-system-card-list>
      `,
    };
  },
};
