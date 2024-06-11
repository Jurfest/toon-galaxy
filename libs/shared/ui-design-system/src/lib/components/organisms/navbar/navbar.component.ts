import { animate, style, transition, trigger } from '@angular/animations';
import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatRippleModule } from '@angular/material/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

import { IconComponent } from '../../atoms/icon/icon.component';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { ToggleButtonComponent } from '../../molecules/toggle-button/toggle-button.component';
import { map, shareReplay } from 'rxjs';

@Component({
  selector: 'design-system-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    ToggleButtonComponent,
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

  private breakpointObserver = inject(BreakpointObserver);

  /**
   * Matches small viewport or handset in portrait mode
   *
   */
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  toggleActive(tab: string): void {
    this.active = tab;
  }
}

export default NavbarComponent;
