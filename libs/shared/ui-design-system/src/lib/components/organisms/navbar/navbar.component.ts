import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';

import { IconComponent } from '../../atoms/icon/icon.component';
import { LogoComponent } from '../../atoms/logo/logo.component';

@Component({
  selector: 'design-system-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    IconComponent,
    MatRippleModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
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
export class NavbarComponent {
  totalFavoriteCharacters = input.required<number | null>();
  active = 'home';

  toggleActive(tab: string): void {
    this.active = tab;
  }
}

export default NavbarComponent;
