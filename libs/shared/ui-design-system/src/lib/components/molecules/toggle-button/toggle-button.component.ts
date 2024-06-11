import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatToolbarModule } from '@angular/material/toolbar';

import { IconComponent } from '../../atoms/icon/icon.component';

@Component({
  selector: 'design-system-toggle-button',
  standalone: true,
  imports: [
    CommonModule,
    IconComponent,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './toggle-button.component.html',
  styleUrl: './toggle-button.component.scss',
  animations: [
    trigger('numberChange', [
      transition(':increment', [
        style({ transform: 'translateY(-20%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 }),
        ),
      ]),
      transition(':decrement', [
        style({ transform: 'translateY(20%)', opacity: 0 }),
        animate(
          '300ms ease-out',
          style({ transform: 'translateY(0)', opacity: 1 }),
        ),
      ]),
    ]),
  ],
})
export class ToggleButtonComponent {
  totalFavoriteCharacters = input.required<number | null>();
  isHandset = input.required<boolean | null>();
  active = 'home';

  toggleActive(tab: string): void {
    this.active = tab;
  }
}
