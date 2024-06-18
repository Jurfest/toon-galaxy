import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

import { Card } from '../../../models/card';
import { IconHighlightComponent } from '../icon-highlight/icon-highlight.component';

@Component({
  selector: 'design-system-card',
  standalone: true,
  imports: [CommonModule, IconHighlightComponent],
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
