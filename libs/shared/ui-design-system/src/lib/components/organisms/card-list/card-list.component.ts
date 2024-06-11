import { Component, input, output } from '@angular/core';

import { Card } from '../../../models/card';
import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'design-system-card-list',
  standalone: true,
  imports: [IconComponent],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  cardList = input.required<Card[]>();
  favCardUpdate = output<Card>();

  onToggleFavCard(card: Card): void {
    this.favCardUpdate.emit(card);
  }
}
