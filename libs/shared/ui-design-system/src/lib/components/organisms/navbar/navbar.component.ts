import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { map, shareReplay } from 'rxjs';

import { LogoComponent } from '../../atoms/logo/logo.component';
import { ToggleButtonComponent } from '../../molecules/toggle-button/toggle-button.component';
import { TabName } from '../../../models/tab-name';

@Component({
  selector: 'design-system-navbar',
  standalone: true,
  imports: [CommonModule, LogoComponent, ToggleButtonComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  totalFavoriteCharacters = input.required<number | null>();
  active: TabName = TabName.Home;

  private breakpointObserver = inject(BreakpointObserver);

  /**
   * Matches small viewport or handset in portrait mode
   *
   */
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  toggleActive(tab: TabName): void {
    this.active = tab;
  }
}

export default NavbarComponent;
