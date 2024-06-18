import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { Card } from '../../../models/card';
import { HeadingComponent } from '../../atoms/heading/heading.component';
import { IconComponent } from '../../atoms/icon/icon.component';
import { TextComponent } from '../../atoms/text/text.component';
import { MatInput } from '@angular/material/input';
import { CardComponent } from '../../molecules/card/card.component';

@Component({
  selector: 'design-system-card-list',
  standalone: true,
  imports: [
    TextComponent,
    HeadingComponent,
    IconComponent,
    CardComponent,
    MatCardModule,
    MatButtonModule,
    MatInput,
  ],
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
