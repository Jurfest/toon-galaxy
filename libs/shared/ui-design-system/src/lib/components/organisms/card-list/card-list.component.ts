import { Component, input } from '@angular/core';

import { Card } from '../../../models/card';

@Component({
  selector: 'design-system-card-list',
  standalone: true,
  imports: [],
  templateUrl: './card-list.component.html',
  styleUrl: './card-list.component.scss',
})
export class CardListComponent {
  // @Input() cards: Card[] = [];

  characterList = input.required<Card[]>();
}
