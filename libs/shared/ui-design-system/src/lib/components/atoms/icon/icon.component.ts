import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { BrowserModule } from '@angular/platform-browser';
import {
  BrowserAnimationsModule,
  provideAnimations,
} from '@angular/platform-browser/animations';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  faHeart as farHeart,
  far,
  IconName as IconNameFar,
} from '@fortawesome/free-regular-svg-icons';
import {
  faHeart as fasHeart,
  fas,
  IconName as IconNameFas,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'design-system-icon',
  standalone: true,
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatIconModule,
    FontAwesomeModule,
  ],
  providers: [
    // Import application-wide providers from a module
    // Or use provide-style functions if available instead, e.g.
    provideAnimations(),
  ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  iconName = input<IconNameFas | IconNameFar>('heart');

  faIcon: ['fas' | 'far', IconNameFas | IconNameFar] = ['fas', this.iconName()];
  isFavorite = false;

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  toggleIconState(): void {
    this.isFavorite = !this.isFavorite;
    this.faIcon = this.isFavorite
      ? ['far', this.iconName()]
      : ['fas', this.iconName()];
  }
}
