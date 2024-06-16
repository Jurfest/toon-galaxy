import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
  input,
  model,
  OnInit,
  Signal,
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
  templateUrl: './icon.component.html',
  styleUrl: './icon.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent implements OnInit {
  library = inject(FaIconLibrary);

  // REFACTOR: - Simplify inputs based on utilized states
  iconName = input.required<IconNameFas | IconNameFar>();
  isClickable = input<boolean>(false);
  initialIconPrefix = input<'far' | 'fas'>('fas');
  isSelected = model<boolean>(false);

  faIcon!: Signal<['fas' | 'far', IconNameFas | IconNameFar]>;

  constructor() {
    this.library.addIconPacks(fas, far);
  }

  ngOnInit(): void {
    this.faIcon = computed(() => [this.initialIconPrefix(), this.iconName()]);
  }

  toggleIconState(): void {
    if (!this.isClickable()) return;
    this.isSelected.set(!this.isSelected());

    this.faIcon = computed(() =>
      this.isSelected() ? ['fas', this.iconName()] : ['far', this.iconName()],
    );
  }
}
