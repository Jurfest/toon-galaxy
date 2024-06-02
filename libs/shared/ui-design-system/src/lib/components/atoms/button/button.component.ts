import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { IconComponent } from '../icon/icon.component';

@Component({
  selector: 'design-system-button',
  standalone: true,
  imports: [MatButtonModule, IconComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ButtonComponent {
  label = input.required<string>();
  hasIconBefore = input<boolean>(false);
  hasIconAfter = input<boolean>(false);
  iconName = input<string>();
}
