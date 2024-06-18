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
})
export class CardComponent {
  card = input.required<Card>();
  favCardUpdate = output<Card>();

  onToggleFavCard(card: Card): void {
    this.favCardUpdate.emit(card);
  }
}
