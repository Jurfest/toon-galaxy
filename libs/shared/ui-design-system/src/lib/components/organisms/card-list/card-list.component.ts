import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Card } from '../../../models/card';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'design-system-card-list',
  standalone: true,
  imports: [IconComponent, MatCardModule, MatButtonModule],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
  animations: [
    trigger('toggleHeart', [
      state(
        'transparent',
        style({
          backgroundColor: 'rgba(255, 255, 255, 0.05)',
        }),
      ),
      state(
        'white',
        style({
          backgroundColor: '#ffffff',
        }),
      ),
      transition('transparent <=> white', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class CardListComponent {
  cardList = input.required<Card[]>();
  favCardUpdate = output<Card>();

  onToggleFavCard(card: Card): void {
    this.favCardUpdate.emit(card);
  }

  heartState: 'transparent' | 'white' = 'transparent';

  toggleHeart() {
    this.heartState =
      this.heartState === 'transparent' ? 'white' : 'transparent';
  }
}
