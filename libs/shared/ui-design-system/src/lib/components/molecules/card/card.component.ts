import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { Card } from '../../../models/card';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'design-system-card',
  standalone: true,
  imports: [CommonModule, IconComponent],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
  animations: [
    trigger('toggleHeartBackground', [
      state(
        'false',
        style({
          backgroundColor: 'rgba(255, 255, 255, 0.01)',
        }),
      ),
      state(
        'true',
        style({
          backgroundColor: '#ffffff',
        }),
      ),
      transition('transparent <=> white', [animate('0.5s ease-in-out')]),
    ]),
  ],
})
export class CardComponent {
  card = input.required<Card>();
  favCardUpdate = output<Card>();

  onToggleFavCard(card: Card): void {
    this.favCardUpdate.emit(card);
  }
}
