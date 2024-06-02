import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  input,
  model,
} from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import {
  FaIconLibrary,
  FontAwesomeModule,
} from '@fortawesome/angular-fontawesome';
import {
  far,
  IconName as IconNameFar,
} from '@fortawesome/free-regular-svg-icons';
import {
  fas,
  IconName as IconNameFas,
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'design-system-icon',
  standalone: true,
  imports: [CommonModule, MatIconModule, FontAwesomeModule],
  // providers: [
  //   // Import application-wide providers from a module
  //   // Or use provide-style functions if available instead, e.g.
  //   provideAnimations(),
  // ],
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
  iconName = input<IconNameFas | IconNameFar>('heart');
  isClickable = input<boolean>(false);
  initialIconPrefix = input<'far' | 'fas'>('fas');
  isSelected = model<boolean>(false);

  faIcon: ['fas' | 'far', IconNameFas | IconNameFar] = [
    this.initialIconPrefix(),
    this.iconName(),
  ];

  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  toggleIconState(): void {
    if (!this.isClickable()) return;
    this.isSelected.set(!this.isSelected());
    this.faIcon = this.isSelected()
      ? ['far', this.iconName()]
      : ['fas', this.iconName()];
  }
}
