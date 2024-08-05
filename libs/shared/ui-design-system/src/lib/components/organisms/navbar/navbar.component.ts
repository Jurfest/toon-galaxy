import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  input,
} from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { QuicklinkModule } from 'ngx-quicklink';
import { filter, map, Observable, shareReplay, startWith } from 'rxjs';

import { TabName } from '../../../models/tab-name';
import { LogoComponent } from '../../atoms/logo/logo.component';
import { ToggleButtonComponent } from '../../molecules/toggle-button/toggle-button.component';

@Component({
  selector: 'design-system-navbar',
  standalone: true,
  imports: [
    CommonModule,
    LogoComponent,
    ToggleButtonComponent,
    QuicklinkModule,
  ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarComponent {
  totalFavoriteCharacters = input.required<number | null>();

  private router = inject(Router);
  private breakpointObserver = inject(BreakpointObserver);

  active$: Observable<TabName> = this.router.events.pipe(
    filter((event) => event instanceof NavigationEnd),
    startWith(new NavigationEnd(0, this.router.url, this.router.url)),
    map(() => {
      const segments = this.router.url.split('/');
      return segments.includes('favorites') ? TabName.Favorites : TabName.Home;
    }),
  );

  /**
   * The Breakpoints.Handset media query matches small viewport
   * or handset in portrait mode
   *
   */
  isHandset$ = this.breakpointObserver.observe(Breakpoints.Handset).pipe(
    map((result) => result.matches),
    shareReplay(),
  );

  navigateToTabName(tabName: TabName): void {
    this.router.navigate([`manage-characters/${tabName}`]);
  }
}

export default NavbarComponent;
